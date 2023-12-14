"use client";
import CartItems from "./CartItems";
import CartSummary from "./CartSummary";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePublicKey: string = process.env.STRIPE_PUBLIC_KEY!;
const stripePromise = loadStripe(stripePublicKey);

export default function Cart() {
  return (
    <Elements stripe={stripePromise}>
      <div className="max-w-screen-2xl mx-4 my-4 md:mx-40">
        <div className="flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
          <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
            <CartItems />
          </div>
          <div className="bg-gray-50 w-full h-full xl:w-96">
            <CartSummary />
          </div>
        </div>
      </div>
    </Elements>
  );
}
