import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-01-27.acacia",
});

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature") as string;

  let event;
  try {
    const rawBody = await req.text();
    event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error("Erro ao validar webhook:", err);
    return NextResponse.json({ error: "Erro ao validar webhook" }, { status: 400 });
  }

  const supabase = await createClient();

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const stripeCustomerId = session.customer as string;
      const subscriptionId = session.subscription as string;
      const userId = session.metadata?.userId;
      const priceId = session.metadata?.priceId;

      if (!userId || userId.length !== 36) {
        return NextResponse.json({ error: "User ID inválido" }, { status: 400 });
      }

      const { data: existingSubscription } = await supabase
        .from("subscriptions")
        .select("stripe_subscription_id")
        .eq("user_id", userId)
        .single();

      if (existingSubscription) {
        const { error } = await supabase
          .from("subscriptions")
          .update({ stripe_subscription_id: subscriptionId, status: "active", plan_id: priceId })
          .eq("user_id", userId);

        if (error) {
          console.error("Erro ao atualizar assinatura:", error);
          return NextResponse.json({ error: error.message }, { status: 500 });
        }
      } else {
        const { error } = await supabase.from("subscriptions").insert([
          {
            user_id: userId,
            stripe_customer_id: stripeCustomerId,
            stripe_subscription_id: subscriptionId,
            status: "active",
            plan_id: priceId,
          },
        ]);

        if (error) {
          console.error("Erro ao inserir no Supabase:", error);
          return NextResponse.json({ error: error.message }, { status: 500 });
        }
      }
      break;
    }

    case "invoice.payment_succeeded": {
      const invoice = event.data.object as Stripe.Invoice;
      const subscriptionId = invoice.subscription as string;

      const { data: userData, error: userError } = await supabase
        .from("subscriptions")
        .select("user_id, plan_id")
        .eq("stripe_subscription_id", subscriptionId)
        .single();

      if (!userData || userError) {
        return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
      }

      const { user_id, plan_id } = userData;

      let monthlyCredits = 0;
      if (plan_id === process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_START) monthlyCredits = 7000;
      if (plan_id === process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_GROWTH) monthlyCredits = 15000;
      if (plan_id === process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_SCALE) monthlyCredits = 25000;

      const { error: updateError } = await supabase
        .from("subscriptions")
        .update({ monthly_credits: monthlyCredits })
        .eq("user_id", user_id);

      if (updateError) {
        return NextResponse.json({ error: updateError.message }, { status: 500 });
      }

      console.log(
        `✅ Créditos resetados para ${monthlyCredits} disparos para o usuário ${user_id}.`
      );
      return NextResponse.json({ success: true });
    }

    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice;
      const subscriptionId = invoice.subscription as string;

      await supabase
        .from("subscriptions")
        .update({ status: "past_due" })
        .eq("stripe_subscription_id", subscriptionId);

      console.log(
        `🚨 Pagamento falhou para a assinatura ${subscriptionId}. Assinatura marcada como 'past_due'.`
      );
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;

      const { error } = await supabase
        .from("subscriptions")
        .update({ status: "canceled" })
        .eq("stripe_subscription_id", subscription.id);

      if (error) {
        console.error("Erro ao atualizar status de cancelamento:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      break;
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription;

      const { error } = await supabase
        .from("subscriptions")
        .update({
          plan_id: subscription.items.data[0].price.id,
          status: subscription.status,
        })
        .eq("stripe_subscription_id", subscription.id);

      if (error) {
        console.error("Erro ao atualizar assinatura:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      console.log("Assinatura atualizada com sucesso.");
      break;
    }

    case "customer.deleted": {
      const customer = event.data.object as Stripe.Customer;

      const { error } = await supabase
        .from("subscriptions")
        .delete()
        .eq("stripe_customer_id", customer.id);

      if (error) {
        console.error("Erro ao remover assinatura após exclusão do cliente:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      break;
    }
  }

  return NextResponse.json({ received: true });
}
