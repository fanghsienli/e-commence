import type { Product } from "@/types";

export function filterProducts({
  products,
  minRating,
  minPrice,
}: {
  products: Product[];
  minRating?: number;
  minPrice?: number;
}) {
  if (minRating && minPrice) {
    return products.filter((x) => x.price >= minPrice && x.rating >= minRating);
  }

  if (minRating) {
    return products.filter((x) => x.rating >= minRating);
  }

  if (minPrice) {
    return products.filter((x) => x.price >= minPrice);
  }

  return products;
}
