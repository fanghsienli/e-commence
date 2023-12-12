"use client";
import FilterSection from "./FilterSection";
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
    <main className="max-w-full mx-auto px-4">
      <div className="grid grid-cols-8 py-8 gap-10">
        <FilterSection />
        <div className="col-span-6">
          <ProductSection />
        </div>
      </div>
    </main>
  );
}
