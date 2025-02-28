import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-01-27.acacia",
});

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData.user?.id;
    const userEmail = userData.user?.email;
    const { priceId } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "Usuário não autenticado" }, { status: 401 });
    }

    const { data: subscriptionData } = await supabase
      .from("subscriptions")
      .select("stripe_customer_id, status")
      .eq("user_id", userId)
      .single();

    let stripeCustomerId = subscriptionData?.stripe_customer_id;

    if (!stripeCustomerId) {
      const existingCustomers = await stripe.customers.list({ email: userEmail, limit: 1 });

      if (existingCustomers.data.length > 0) {
        stripeCustomerId = existingCustomers.data[0].id;
      } else {
        const customer = await stripe.customers.create({
          email: userEmail,
          metadata: { userId },
        });

        stripeCustomerId = customer.id;
      }

      await supabase
        .from("subscriptions")
        .update({ stripe_customer_id: stripeCustomerId })
        .eq("user_id", userId);
    }

    if (!subscriptionData || subscriptionData.status !== "active") {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "subscription",
        customer: stripeCustomerId,
        metadata: { userId, priceId },
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        success_url: `${req.headers.get("origin")}/sucesso?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.get("origin")}/assinatura`,
      });

      return NextResponse.json({ url: session.url });
    }

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: stripeCustomerId,
      return_url: `${req.headers.get("origin")}/dashboard`,
    });

    return NextResponse.json({ url: portalSession.url });
  } catch (error) {
    console.error("Erro na API do Customer Portal:", error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
