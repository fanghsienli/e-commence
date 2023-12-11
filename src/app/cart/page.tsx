"use client";
import useCartStore from "@/store/cartStore";
import { useRouter } from "next/navigation";

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useCartStore();

  // 計算總價
  const calculateTotal = (): number => {
    return (
      cartItems?.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ) || 0
    );
  };

  const router = useRouter();

  const handleProductClick = (produictId: number) => {
    router.push(`/products/${produictId}`);
  };

  return (
    <div className="container mx-auto p-8">
      <div className="flex">
        <div className="w-2/3 pr-8">
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
                <img
                  src={item.thumbnail}
                  alt={`Product ${item.id}`}
                  className="w-16 h-16 object-cover"
                />
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-gray-500">{item.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <p className="font-semibold">S${item.price.toFixed(2)}</p>
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
                <p className="font-semibold">
                  S${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="w-1/3">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Cart Summary</h2>
            <div className="flex justify-between mb-2">
              <p>Non-Direct Pricing</p>
              <p className="font-semibold">S$9,078</p>
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
    </div>
  );
}
