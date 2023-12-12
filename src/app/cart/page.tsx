"use client";
import useCartStore from "@/store/cartStore";
import { useRouter } from "next/navigation";

export default function Cart() {
  const { cartItems, removeAllFromCart, updateQuantity } = useCartStore();

  const getTotalOriginalPrice = () => {
    return (
      cartItems?.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ) || 0
    );
  };

  const getTotalDiscountedPrice = () => {
    return (
      cartItems?.reduce(
        (total, item) =>
          total +
          ((item.price * (100 - item.discountPercentage)) / 100) *
            item.quantity,
        0
      ) || 0
    );
  };

  const router = useRouter();

  const handleProductClick = (produictId: number) => {
    router.push(`/products/${produictId}`);
  };

  const handleCheckoutClick = () => {};

  return (
    <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
      <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch  w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
        <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
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
                            {`S$${price}`}
                          </p>
                          <p className="text-base xl:text-lg leading-6">
                            <span className="text-red-300 line-through">
                              {`S$${(
                                (price * (100 - discountPercentage)) /
                                100
                              ).toFixed(2)}`}
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
        </div>
        <div className="bg-gray-50 w-full h-full xl:w-96">
          <div className="flex flex-col justify-between items-start md:items-start px-4 py-6 md:p-6 xl:p-8">
            <h2 className="text-xl font-semibold leading-5 text-gray-800 mb-6">
              Summary
            </h2>
            <div className="flex flex-col justify-between items-center w-full space-y-4 border-gray-200 border-b pb-4">
              <div className="flex justify-between w-full">
                <p className="text-base leading-4 text-gray-800">Subtotal</p>
                <p className="text-base leading-4 text-gray-600">
                  {`S$${getTotalOriginalPrice().toFixed(2)}`}
                </p>
              </div>
              <div className="flex justify-between items-center w-full">
                <p className="text-base leading-4 text-gray-800">Discount</p>
                {/* Calculate the total discount as a percentage of the original price */}
                <p className="text-base leading-4 text-gray-600">
                  -
                  {`S$${(
                    getTotalOriginalPrice() - getTotalDiscountedPrice()
                  ).toFixed(2)}`}
                  {getTotalOriginalPrice() !== 0
                    ? `(-${(
                        (1 -
                          getTotalDiscountedPrice() / getTotalOriginalPrice()) *
                        100
                      ).toFixed(0)}%)`
                    : null}
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center w-full mt-4">
              <p className="text-base font-semibold leading-4 text-gray-800">
                Total
              </p>
              {/* Display the discounted total price */}
              <p className="text-base font-semibold leading-4 text-gray-600">
                {`S$${getTotalDiscountedPrice().toFixed(2)}`}
              </p>
            </div>
            <button
              className="mt-10 flex w-full items-center justify-center rounded-full border border-transparent bg-red-600 px-8 py-3 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              onClick={handleCheckoutClick}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /* <div className="container mx-auto p-8">
      <div className="flex flex-col">
        <div className="w-full md:w-2/3 pr-8">
          <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
          {cartItems?.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b border-gray-300 pb-2 mb-2"
            >
              <div
                className="flex items-center space-x-4 cursor-pointer"
                onClick={() => handleProductClick(item.id)}
              >
               
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-gray-500">{item.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <p className="font-semibold text-green-700">
                  S$
                  {(
                    (item.price * (100 - item.discountPercentage)) /
                    100
                  ).toFixed(2)}
                </p>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="px-2 py-1 border border-gray-300"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-2 py-1 border border-gray-300"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </div>
                <p className="font-semibold text-green-700">
                  S$
                  {(
                    (item.price *
                      item.quantity *
                      (100 - item.discountPercentage)) /
                    100
                  ).toFixed(2)}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-500 line-through">
                  S${item.price.toFixed(2)}
                </span>{" "}
              </div>
            </div>
          ))}
        </div>
        <div className="w-full md:w-1/3 mt-4">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Cart Summary</h2>
            <div className="flex justify-between mb-2">
              <p>Non-Direct Pricing</p>
              <p className="font-semibold">S${calculateTotal().toFixed(2)}</p>
            </div>
            <div className="flex justify-between mb-2">
              <p>Total</p>
              <p className="text-red-500 font-semibold">
                S${calculateTotal().toFixed(2)}
              </p>
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              Checkout Securely
            </button>
          </div>
        </div>
      </div>
    </div> */
}
