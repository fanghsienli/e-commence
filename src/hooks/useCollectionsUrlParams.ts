import {
  getSearchParamByKeyToNumber,
  getSearchParamByKeyToStringArray,
} from "@/utilies";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export function useCollectionsUrlParams() {
  const searchParams = useSearchParams();
  const categoriesJson = JSON.stringify(
    getSearchParamByKeyToStringArray({
      searchParams,
      searchParamKey: "categories",
    })
  );
  const categories = useMemo(
    () =>
      getSearchParamByKeyToStringArray({
        searchParams,
        searchParamKey: "categories",
      }) || [],
    [categoriesJson]
  );
  const rating = getSearchParamByKeyToNumber({
    searchParams,
    searchParamKey: "rating",
    digits: 2,
  });
  const price = getSearchParamByKeyToNumber({
    searchParams,
    searchParamKey: "price",
  });

  return {
    categories,
    rating,
    price,
  };
}
