import { NextResponse } from "next/server";
import Stripe from "stripe";
const stripeSecretKey: string = process.env.STRIPE_SECRET_KEY!;
const successUrl: string = process.env.SUCCESS_URL!;
const cancelUrl: string = process.env.CANCEL_URL!;
const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2023-10-16",
});

export async function POST(req: Request) {
  try {
    const { lineItems } = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: successUrl,
      cancel_url: cancelUrl,
    });
    return NextResponse.json({ id: session.id });
  } catch (error) {
    return NextResponse.error();
  }
}
