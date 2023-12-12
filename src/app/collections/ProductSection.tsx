"use client";
import useCartStore from "@/store/cartStore";
import useProductsStore from "@/store/productsStore";
import { useRouter } from "next/navigation";

export default function ProductSection() {
  const { filteredProducts } = useProductsStore();
  const { addToCart } = useCartStore();
  const router = useRouter();

  const handleProductClick = (produictId: number) => {
    router.push(`/products/${produictId}`);
  };
  if (filteredProducts.length === 0) {
    return <p className="text-center text-slate-700">No Product Available.</p>;
  }

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 grid-cols-1 gap-x-8 gap-y-12">
      {filteredProducts.map((product) => (
        <div key={product.id} className="cursor-pointer">
          <img
            src={product.images[0]}
            alt={product.title}
            width="400px"
            height={400}
            className="rounded-md shadow-sm aspect-[1/1] object-cover object-top"
            onClick={() => handleProductClick(product.id)}
          />
          <div className="space-y-1">
            <div>
              <p className="mt-4 font-medium truncate">{product.title}</p>
            </div>

            <p className="line-clamp-2 text-slate-500 text-sm">
              {product.description}
            </p>

            <div className="flex justify-between items-center">
              <p className="font-semibold">{`S$${product.price}`}</p>
              <p className="flex gap-2 items-center">{`⭐${product.rating}`}</p>
              <div onClick={() => addToCart(product)}>
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
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
