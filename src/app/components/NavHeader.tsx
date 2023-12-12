"use client";
import useCartStore from "@/store/cartStore";
import { useRouter } from "next/navigation";

export default function NavHeader() {
  const router = useRouter();
  const { cartQuantity } = useCartStore();

  const handleCartClick = () => {
    router.push("/cart");
  };

  return (
    <nav className="bg-white-800 border-b border-gray-200">
      <div className="mx-auto px-5 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div
            onClick={() => router.push("/collections")}
            className="flex flex-shrink-0 items-center cursor-pointer"
          >
            Shop
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="relative rounded-full p-1 text-black hover:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-gray-800"
              onClick={handleCartClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
            </button>
            {cartQuantity ? (
              <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full top-2 -end-2 ">
                {cartQuantity}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  );
}
