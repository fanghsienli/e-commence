"use client";
import useCartStore from "@/store/cartStore";
import { useStripe, useElements } from "@stripe/react-stripe-js";

export default function () {
  const { cartItems } = useCartStore();
  const stripe = useStripe();
  const elements = useElements();

  const getTotalOriginalPrice = () => {
    return (
      cartItems?.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ) || 0
    );
  };

  const getTotalDiscountedPrice = () => {
    return (
      cartItems?.reduce(
        (total, item) =>
          total +
          ((item.price * (100 - item.discountPercentage)) / 100) *
            item.quantity,
        0
      ) || 0
    );
  };

  const handleCheckoutClick = async () => {
    if (!stripe || !elements) {
      return;
    }

    const lineItems = cartItems.map((item) => ({
      price_data: {
        currency: "sgd",
        product_data: {
          name: item.title,
        },
        unit_amount: (item.price * (100 - item.discountPercentage)).toFixed(),
      },
      quantity: item.quantity,
    }));

    const response = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ lineItems }),
    });

    const session = await response.json();

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.error(result.error.message);
    }
  };

  return (
    <div className="flex flex-col justify-between items-start md:items-start px-4 py-6 md:p-6 xl:p-8">
      <h2 className="text-xl font-semibold leading-5 text-gray-800 mb-6">
        Summary
      </h2>
      <div className="flex flex-col justify-between items-center w-full space-y-4 border-gray-200 border-b pb-4">
        <div className="flex justify-between w-full">
          <p className="text-base leading-4 text-gray-800">Subtotal</p>
          <p className="text-base leading-4 text-gray-600">
            {`S$${getTotalOriginalPrice().toFixed(2)}`}
          </p>
        </div>
        <div className="flex justify-between items-center w-full">
          <p className="text-base leading-4 text-gray-800">Discount</p>
          <p className="text-base leading-4 text-red-300">
            {`- S$${(
              getTotalOriginalPrice() - getTotalDiscountedPrice()
            ).toFixed(2)}`}
            {getTotalOriginalPrice() !== 0
              ? `(- ${(
                  (1 - getTotalDiscountedPrice() / getTotalOriginalPrice()) *
                  100
                ).toFixed(0)}%)`
              : null}
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center w-full mt-4">
        <p className="text-base font-semibold leading-4 text-gray-800">Total</p>
        <p className="text-base font-semibold leading-4 text-gray-600">
          {`S$${getTotalDiscountedPrice().toFixed(2)}`}
        </p>
      </div>
      <button
        className="mt-10 flex w-full items-center justify-center rounded-full border border-transparent bg-red-600 px-8 py-3 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        onClick={handleCheckoutClick}
      >
        Checkout
      </button>
    </div>
  );
}
