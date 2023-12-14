"use client";
import useCartStore from "@/store/cartStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Drawer from "./Drawer";
import FilterSection from "./FilterSection";
import { usePathname } from "next/navigation";

export default function NavBarHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const { cartQuantity } = useCartStore();
  const [open, setOpen] = useState(false);

  const handleHomeClick = () => {
    router.push("/collections");
  };

  const handleCartClick = () => {
    router.push("/cart");
  };

  return (
    <nav className="bg-white-800 border-b border-gray-200">
      <Drawer title="Filter" open={open} setOpen={setOpen}>
        <FilterSection />
      </Drawer>
      <div className="max-w-screen-2xl mx-2 md:mx-40">
        <div className="relative flex h-16 justify-between">
          {pathname === "/collections" ? (
            <div
              className="absolute inset-y-0 left-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 cursor-pointer"
              onClick={() => setOpen(true)}
            >
              <div className="p-2 text-gray-400 hover:text-gray-500">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  ></path>
                </svg>
              </div>
            </div>
          ) : null}

          <div
            className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start cursor-pointer"
            onClick={handleHomeClick}
          >
            <div className="flex flex-shrink-0 items-center">My Shop</div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div
              className="ml-4 flow-root lg:ml-6 cursor-pointer"
              onClick={handleCartClick}
            >
              <div className="group -m-2 flex items-center p-2">
                <svg
                  className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  ></path>
                </svg>
                <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                  {cartQuantity}
                </span>
                <span className="sr-only">items in cart, view bag</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
