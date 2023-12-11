import type { Product } from "@/types";
import {
  getSearchParamByKeyToNumber,
  getSearchParamByKeyToStringArray,
  getUrlSearchParams,
} from "@/utilies";
import { filterProducts } from "@/utilies/products";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type Filter = {
  type: string;
  value: string;
};

type ProductsStore = {
  filters: Filter[];
  products: Product[];
  filteredProducts: Product[];
  selectedCategories: string[];
  minRating?: number;
  minPrice?: number;
  total: number;
  skip: number;
  limit: number;
  setSelectedCategories: (categories: string[]) => void;
  setMinRating: (minRating?: number) => void;
  setMinPrice: (minPrice?: number) => void;
  fetchProducts: ({ categories }: { categories: string[] }) => void;
  setTotal: (total: number) => void;
  setSkip: (skip: number) => void;
  setLimit: (limit: number) => void;
};

const useProductsStore = create<ProductsStore>()(
  devtools(
    (set) => ({
      filters: [],
      products: [],
      filteredProducts: [],
      selectedCategories: [],
      minRating: undefined,
      minPrice: undefined,
      total: 0,
      skip: 0,
      limit: 30,
      setSelectedCategories: (selectedCategories) =>
        set({ selectedCategories }),
      setMinRating: (minRating) =>
        set(({ minPrice, products }) => {
          const filteredProducts = filterProducts({
            minPrice,
            products,
            minRating,
          });
          return {
            filteredProducts,
            minRating,
          };
        }),
      setMinPrice: (minPrice) =>
        set(({ products, minRating }) => {
          const filteredProducts = filterProducts({
            minPrice,
            products,
            minRating,
          });
          return {
            filteredProducts,
            minPrice,
          };
        }),
      fetchProducts: async ({ categories }) => {
        if (categories.length > 0) {
          let products: Product[] = [];
          let total: number = 0;

          for (const category of categories || []) {
            const response = await fetch(
              `https://dummyjson.com/products/category/${category}`
            );
            const data = await response.json();

            products = [...products, ...(data.products || [])];
            total += data.total;
          }

          set(({ minPrice, minRating }) => {
            const filteredProducts = filterProducts({
              minPrice,
              products,
              minRating,
            });
            return {
              filteredProducts,
              products,
            };
          });
        } else {
          const response = await fetch("https://dummyjson.com/products");
          const { products, total } = await response.json();
          set(({ minPrice, minRating }) => {
            const filteredProducts = filterProducts({
              minPrice,
              products,
              minRating,
            });
            return {
              filteredProducts,
              products,
              total,
            };
          });
        }
      },
      setTotal: (total) => set({ total }),
      setSkip: (skip) => set({ skip }),
      setLimit: (limit) => set({ limit }),
    }),
    {
      enabled: true,
      name: "products-store",
    }
  )
);

export default useProductsStore;
