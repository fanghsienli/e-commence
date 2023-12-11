import { usePresistStoreWithNextJs } from "@/hooks/usePresistStoreWithNextJs";
import type { CartItem, Product } from "@/types";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type CartStore = {
  cartQuantity: number;
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeAllFromCart: (itemId: number) => void;
  removeFromCart: (itemId: number) => void;
  updateQuantity: (itemId: number, newQuantity: number) => void;
};

const useCartStore = create<CartStore>()(
  persist(
    devtools(
      (set) => ({
        cartQuantity: 0,
        cartItems: [],
        addToCart: (product) =>
          set((state) => {
            const existingItem = state.cartItems.find(
              (cartItem) => cartItem.id === product.id
            );

            if (existingItem) {
              const updatedItems = state.cartItems.map((cartItem) =>
                cartItem.id === product.id
                  ? {
                      ...cartItem,
                      quantity: Math.min(cartItem.quantity + 1, product.stock),
                      stock: product.stock, // stock should keep updating from backend if there is a stock API
                    }
                  : cartItem
              );

              const cartQuantity = updatedItems.reduce(
                (sum, item) => sum + item.quantity,
                0
              );

              return {
                cartItems: updatedItems,
                cartQuantity,
              };
            } else {
              const newCartItem = {
                id: product.id,
                title: product.title,
                description: product.description,
                price: product.price,
                discountPercentage: product.discountPercentage,
                rating: product.rating,
                stock: product.stock,
                thumbnail: product.thumbnail,
                quantity: 1,
              };

              const cartQuantity = state.cartQuantity + newCartItem.quantity;

              return {
                cartItems: [...state.cartItems, newCartItem],
                cartQuantity,
              };
            }
          }),

        removeAllFromCart: (itemId) =>
          set((state) => {
            const updatedItems = state.cartItems.filter(
              (item) => item.id !== itemId
            );
            const cartQuantity = updatedItems.reduce(
              (sum, item) => sum + item.quantity,
              0
            );

            return {
              cartItems: updatedItems,
              cartQuantity,
            };
          }),

        removeFromCart: (itemId) =>
          set((state) => {
            const existingItem = state.cartItems.find((i) => i.id === itemId);

            if (existingItem) {
              const updatedItems = state.cartItems.map((i) =>
                i.id === itemId
                  ? { ...i, quantity: Math.max(i.quantity - 1, 0) }
                  : i
              );

              const filteredItems = updatedItems.filter((i) => i.quantity > 0);
              const cartQuantity = filteredItems.reduce(
                (sum, item) => sum + item.quantity,
                0
              );

              return {
                cartItems: filteredItems,
                cartQuantity,
              };
            } else {
              return state;
            }
          }),

        updateQuantity: (itemId, newQuantity) =>
          set((state) => {
            const updatedItems = state.cartItems.map((item) =>
              item.id === itemId
                ? {
                    ...item,
                    quantity: Math.min(newQuantity, item.stock),
                  }
                : item
            );

            const cartQuantity = updatedItems.reduce(
              (sum, item) => sum + item.quantity,
              0
            );

            return {
              cartItems: updatedItems,
              cartQuantity,
            };
          }),
      }),
      {
        enabled: true,
        name: "cart-store",
      }
    ),
    {
      name: "cart-store",
    }
  )
);

const usePersistCartStoreWithNextJs = () => {
  return usePresistStoreWithNextJs(useCartStore, (state) => state) || {};
};

export default usePersistCartStoreWithNextJs;
