"use client";
import { useEffect, useState } from "react";
import Range from "@/components/Range";
import Checkbox from "@/components/Checkbox";
import useProductsStore from "@/store/productsStore";
import { useRouter } from "next/navigation";
import { convertValidStringQueries } from "@/utilies";
import Filter from "./Filter";

async function fetchCategories() {
  try {
    const response = await fetch("https://dummyjson.com/products/categories");
    const categories = await response.json();

    return {
      categories,
    } as { categories: string[] };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export default function FilterSection() {
  const {
    selectedCategories,
    minRating,
    minPrice,
    setSelectedCategories,
    setMinRating,
    setMinPrice,
  } = useProductsStore();

  const [categoriesOptions, setCategoriesOptions] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const { categories } = await fetchCategories();
      setCategoriesOptions(categories);
    };
    fetchData();
  }, []);

  function handleSelectCategoriesOptions(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const selectedCategory = e.target.value;
    let categories;
    if (selectedCategories.includes(selectedCategory)) {
      categories = selectedCategories.filter((x) => x !== selectedCategory);
    } else {
      categories = [...selectedCategories, selectedCategory];
    }
    setSelectedCategories(categories);
    let selectedQueries = {
      categories,
      rating: minRating,
      price: minPrice,
    };
    router.push(`/collections${convertValidStringQueries(selectedQueries)}`, {
      scroll: false,
    });
  }

  function handleRatingChange(rating: number) {
    let selectedQueries = {
      categories: selectedCategories,
      rating,
      price: minPrice,
    };
    setMinRating(rating);
    router.push(`/collections${convertValidStringQueries(selectedQueries)}`, {
      scroll: false,
    });
  }

  function handlePriceChange(price: number) {
    let selectedQueries = {
      categories: selectedCategories,
      rating: minRating,
      price,
    };
    setMinPrice(price);
    router.push(`/collections${convertValidStringQueries(selectedQueries)}`, {
      scroll: false,
    });
  }

  function isChecked(option: string) {
    return selectedCategories?.includes(option);
  }

  return (
    <div className="col-span-2 space-y-6 h-fit flex flex-col gap-5 md:block">
      <Filter title="Categories">
        {categoriesOptions?.length > 0
          ? categoriesOptions.map((option) => (
              <Checkbox
                key={option}
                type="checkbox"
                name="categories"
                label={option}
                value={option.toLowerCase().trim()}
                checked={isChecked(option)}
                onChange={handleSelectCategoriesOptions}
              />
            ))
          : null}
      </Filter>
      <Filter title="Rating">
        <Range
          onValueChange={handleRatingChange}
          maxValue={5}
          defaultValue={minRating}
          step={0.01}
          digits={2}
        />
      </Filter>
      <Filter title="Price">
        <Range
          onValueChange={handlePriceChange}
          defaultValue={minPrice}
          maxValue={2000}
        />
      </Filter>
    </div>
  );
}
