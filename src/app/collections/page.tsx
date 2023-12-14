"use client";
import ProductSection from "./ProductSection";

import { useEffect } from "react";
import { useCollectionsUrlParams } from "@/hooks/useCollectionsUrlParams";
import useProductsStore from "@/store/productsStore";

export default function Collections() {
  const { categories, rating, price } = useCollectionsUrlParams();
  const { setSelectedCategories, setMinRating, setMinPrice, fetchProducts } =
    useProductsStore();

  useEffect(() => {
    setMinRating(rating);
  }, [rating]);

  useEffect(() => {
    setMinRating(rating);
    setMinPrice(price);
  }, [price]);

  useEffect(() => {
    setSelectedCategories(categories);
    fetchProducts({ categories });
  }, [categories]);

  return (
    <main className="min-h-screen flex justify-center">
      <div className="max-w-screen-2xl w-full mx-4 md:mx-40 py-4">
        <div className="text-center">
          <ProductSection />
        </div>
      </div>
    </main>
  );
}
