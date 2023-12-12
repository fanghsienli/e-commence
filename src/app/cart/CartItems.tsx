"use client";
import useCartStore from "@/store/cartStore";
import { useRouter } from "next/navigation";

export default function () {
  const { cartItems, removeAllFromCart, updateQuantity } = useCartStore();

  const router = useRouter();

  const handleProductClick = (produictId: number) => {
    router.push(`/products/${produictId}`);
  };
  return (
    <>
      {cartItems?.length > 0 ? (
        <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
          <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800">
            Cart Items
          </p>
          {cartItems.map(
            ({
              id,
              title,
              thumbnail,
              images,
              brand,
              category,
              description,
              price,
              discountPercentage,
              quantity,
            }) => (
              <div
                className="mt-4 md:mt-6 flex  flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full "
                key={id}
              >
                <div className="pb-4 md:pb-8 w-full md:w-40">
                  <img
                    className="w-full hidden md:block"
                    src={thumbnail}
                    alt={title}
                  />
                  {images?.length > 0 ? (
                    <img
                      className="w-full md:hidden"
                      src={images[0]}
                      alt={title}
                    />
                  ) : null}
                </div>
                <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full  pb-8 space-y-4 md:space-y-0">
                  <div
                    className="w-full flex flex-col justify-start items-start space-y-8 cursor-pointer"
                    onClick={() => handleProductClick(id)}
                  >
                    <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800">
                      {title}
                    </h3>

                    <div className="flex justify-start items-start flex-col space-y-2">
                      <p className="text-sm leading-none text-gray-800">
                        <span className="text-gray-300">Brand: </span>
                        {brand}
                      </p>
                      <p className="text-sm leading-none text-gray-800">
                        <span className="text-gray-300">Category: </span>
                        {category}
                      </p>
                      <p className="text-sm leading-none text-gray-800">
                        <span className="text-gray-300">{description}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex  justify-between space-x-8 items-start w-full">
                    <div className="flex flex-col">
                      <p className="text-base xl:text-lg leading-6">
                        {`S$${(
                          (price * (100 - discountPercentage)) /
                          100
                        ).toFixed(2)}`}
                      </p>
                      <p className="text-base xl:text-lg leading-6">
                        <span className="text-red-300 line-through">
                          {`S$${price.toFixed(2)}`}
                        </span>
                      </p>
                    </div>
                    <div className="flex flex-col items-center space-x-2">
                      <div>
                        <button
                          className="px-2 py-1 border border-gray-300"
                          onClick={() => updateQuantity(id, quantity - 1)}
                        >
                          -
                        </button>
                        <span className="px-3">{quantity}</span>
                        <button
                          className="px-2 py-1 border border-gray-300"
                          onClick={() => updateQuantity(id, quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        className="text-base xl:text-lg leading-6 text-red-600 underline pr-2"
                        onClick={() => removeAllFromCart(id)}
                      >
                        Remove
                      </button>
                    </div>
                    <p className="text-base xl:text-lg font-semibold leading-6 text-gray-800">
                      {`S$${(
                        (price * quantity * (100 - discountPercentage)) /
                        100
                      ).toFixed(2)}`}
                    </p>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      ) : null}
    </>
  );
}
