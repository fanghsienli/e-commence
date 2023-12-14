"use client";
import useProductsStore from "@/store/productsStore";
import { useRouter } from "next/navigation";

export default function ProductSection() {
  const { filteredProducts } = useProductsStore();
  const router = useRouter();

  const handleProductClick = (produictId: number) => {
    router.push(`/products/${produictId}`);
  };
  if (filteredProducts.length === 0) {
    return <p className="text-center text-slate-700">No Product Available.</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-8 gap-y-12">
      {filteredProducts.map((product) => (
        <div key={product.id} className="cursor-pointer">
          <img
            src={product.images[0]}
            alt={product.title}
            width={400}
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
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
