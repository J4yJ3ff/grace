import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

interface CartState {
  items: CartItem[];
  total: number;
}

interface CartActions {
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

type CartStore = CartState & CartActions;

const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      total: 0,

      addItem: (item) =>
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id);
          let newItems: CartItem[];

          if (existingItem) {
            newItems = state.items.map((i) =>
              i.id === item.id
                ? { ...i, quantity: i.quantity + (item.quantity || 1) }
                : i
            );
          } else {
            const newItem: CartItem = {
              ...item,
              quantity: item.quantity || 1,
            };
            newItems = [...state.items, newItem];
          }

          return {
            items: newItems,
            total: calculateTotal(newItems),
          };
        }),

      removeItem: (id) =>
        set((state) => {
          const newItems = state.items.filter((item) => item.id !== id);
          return {
            items: newItems,
            total: calculateTotal(newItems),
          };
        }),

      updateQuantity: (id, quantity) =>
        set((state) => {
          let newItems: CartItem[];

          if (quantity <= 0) {
            newItems = state.items.filter((item) => item.id !== id);
          } else {
            newItems = state.items.map((item) =>
              item.id === id ? { ...item, quantity } : item
            );
          }

          return {
            items: newItems,
            total: calculateTotal(newItems),
          };
        }),

      clearCart: () =>
        set({
          items: [],
          total: 0,
        }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() =>
        typeof window !== "undefined"
          ? localStorage
          : {
              getItem: () => null,
              setItem: () => {},
              removeItem: () => {},
            }
      ),
      partialize: (state) => ({ items: state.items }),
    }
  )
);
