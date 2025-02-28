import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-01-27.acacia",
});

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const sessionId = url.searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ valid: false }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session && session.payment_status === "paid") {
      return NextResponse.json({ valid: true });
    } else {
      return NextResponse.json({ valid: false });
    }
  } catch (error) {
    console.error("Erro ao verificar session_id:", error);
    return NextResponse.json({ valid: false }, { status: 500 });
  }
}
