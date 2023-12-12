"use client";
import CartItems from "./CartItems";
import CartSummary from "./CartSummary";

export default function Cart() {
  return (
    <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
      <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch  w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
        <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
          <CartItems />
        </div>
        <div className="bg-gray-50 w-full h-full xl:w-96">
          <CartSummary />
        </div>
      </div>
    </div>
  );
}
