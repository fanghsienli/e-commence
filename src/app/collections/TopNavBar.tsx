"use client";
import useCartStore from "@/store/cartStore";
import { useRouter } from "next/navigation";

export default function TopNavBar() {
  const router = useRouter();
  const { cartQuantity } = useCartStore();

  const handleCartClick = () => {
    router.push("/cart");
  };

  return (
    <div className="border-b border-slate-200 flex justify-between items-center space-x-4">
      <h1 className="text-5xl font-semibold mb-4">Collection</h1>
      <div
        className="flex justify-center items-center px-4 cursor-pointer"
        onClick={handleCartClick}
      >
        <div className="relative py-2">
          <div className="t-0 absolute left-3">
            {cartQuantity ? (
              <span className="inline-flex items-center rounded-full bg-pink-50 px-2 py-1 text-xs font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10">
                {cartQuantity}
              </span>
            ) : null}
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="file: mt-4 h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
