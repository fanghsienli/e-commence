"use client";

import type { Product } from "@/types";
import { useEffect, useState } from "react";
import useCartStore from "@/store/cartStore";
import Image from "next/image";
import { Experience } from "@/components/Experience";
import QuickView from "@/components/QuickView";

async function fetchProductById({ id }: { id: number }) {
  try {
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

const features = [
  "Quis ullamco consectetur id ut esse sint quis officia aliquip aliqua.",
  "Enim aute culpa dolore pariatur tempor incididunt aliqua minim sunt Lorem.",
  "Sit nulla sint elit consectetur ut eu voluptate sunt nostrud quis sint laborum esse duis.",
];
const specifications = [
  "Quis ullamco consectetur id ut esse sint quis officia aliquip aliqua.",
  "Enim aute culpa dolore pariatur tempor incididunt aliqua minim sunt Lorem.",
];

export default function Products({
  params,
}: {
  params: { productsId: string };
}) {
  const { cartItems, addToCart, updateQuantity } = useCartStore();
  const [product, setProduct] = useState<Product>();
  const [quantity, setQuantity] = useState(0);
  const [open, setOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const toggleModal = (index: number) => {
    setOpen(!open);
    setImageIndex(index);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchProductById({
        id: Number(params.productsId),
      });

      setProduct(data);
    };
    fetchData();
  }, []);

  const handleAddToCartClick = () => {
    if (product) {
      if (!cartItems.find((x) => x.id === product.id)) {
        addToCart(product);
      }

      updateQuantity(product.id, quantity);
    }
  };

  if (!product) {
    return <p className="text-center text-slate-700">No Product Available.</p>;
  }

  return (
    <div className="mx-auto max-w-2xl max-h-auto px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
      <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8 lg:flex lg:flex-col items-center">
        <div className="lg:block w-full" style={{ height: "600px" }}>
          <div className="h-full w-full first-line:w-full flex flex-col items-center justify-between">
            <Experience />
          </div>
        </div>

        <div className="flex gap-5 w-full h-32 pt-5">
          {product.images.map((image, index) => (
            <a
              key={index}
              className="w-64 group cursor-pointer"
              onClick={() => toggleModal(index)}
            >
              <Image
                src={image}
                alt={image}
                className="snap-center h-full w-full object-cover object-center group-hover:opacity-75"
              />
            </a>
          ))}
        </div>
      </div>
      <div className="mt-4 lg:row-span-2 lg:mt-0">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          {product.title}
        </h1>
        <p className="text-3xl tracking-tight text-red-600">
          $ {product.price}
        </p>

        <div className="py-10 lg:col-span-2 lg:col-start-1  lg:pb-16 lg:pr-8 lg:pt-6">
          <div>
            <h3 className="sr-only">Description</h3>
            <div className="space-y-6">
              <p className="text-base text-gray-900">{product.description}</p>
            </div>
            <a
              href="#"
              className="text-sm font-medium text-red-600 hover:text-red-500"
            >
              Learn More
            </a>
          </div>

          <div className="mt-10">
            <h3 className="text-sm font-bold text-gray-900">Features</h3>

            <div className="mt-4">
              <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                {features.map((feature) => (
                  <li key={feature} className="text-gray-400">
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-sm font-bold text-gray-900">Specifications</h2>

            <div className="mt-4 space-y-6">
              <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                {specifications.map((spec) => (
                  <li key={spec} className="text-gray-400">
                    <span className="text-gray-600">{spec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex items-center p-3 text-base font-bold rounded-lg bg-slate-100">
          <span className="flex-1 ms-3 whitespace-nowrap">Quantity</span>
          <div className="flex items-center space-x-2">
            <button
              className="px-2 py-1 border border-gray-300"
              onClick={() => setQuantity((prev) => Math.max(prev - 1, 0))}
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              className="px-2 py-1 border border-gray-300"
              onClick={() =>
                setQuantity((prev) => Math.min(prev + 1, product.stock))
              }
            >
              +
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="mt-10 flex w-full items-center justify-center rounded-full border border-transparent bg-red-600 px-8 py-3 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          onClick={handleAddToCartClick}
        >
          ADD TO CART
        </button>
      </div>
      {open ? (
        <QuickView
          open={open}
          setOpen={setOpen}
          photo={product.images[imageIndex]}
        />
      ) : (
        ""
      )}
    </div>
  );
}
