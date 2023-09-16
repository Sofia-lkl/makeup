// cartSlice.tsx

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../productManagement/productManagementSlice";

export interface CartItem {
  imagen_url: string;
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
  stock: number;
}

export type CartState = CartItem[];

const initialState: CartState = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    syncCartWithUpdatedStock: (state, action: PayloadAction<Product[]>) => {
      action.payload.forEach((updatedProduct) => {
        const itemInCart = state.find((item) => item.id === updatedProduct.id);
        if (itemInCart && typeof updatedProduct.stock === "number") {
          itemInCart.stock = updatedProduct.stock;
          if (itemInCart.cantidad > itemInCart.stock) {
            itemInCart.cantidad = itemInCart.stock;
          }
        }
      });
    },

    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.find((item) => item.id === action.payload.id);
      if (existingItem) {
        if (existingItem.stock && existingItem.cantidad < existingItem.stock) {
          const index = state.findIndex(
            (item) => item.id === action.payload.id
          );
          state[index].cantidad += 1;
        }
      } else {
        state.push(action.payload);
      }
    },
    incrementItem: (state, action: PayloadAction<number>) => {
      const existingItem = state.find((item) => item.id === action.payload);
      if (existingItem && existingItem.cantidad < existingItem.stock) {
        existingItem.cantidad += 1;
      }
    },
    decrementItem: (state, action: PayloadAction<number>) => {
      const existingItem = state.find((item) => item.id === action.payload);
      if (existingItem && existingItem.cantidad > 1) {
        existingItem.cantidad -= 1;
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      const index = state.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
    clearCart: (state) => {
      return [];
    },
    initCart: (state, action: PayloadAction<CartState>) => {
      return action.payload;
    },
    updateItemStock: (
      state,
      action: PayloadAction<{ id: number; newStock: number }>
    ) => {
      const existingItem = state.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.stock = action.payload.newStock;
        if (existingItem.cantidad > existingItem.stock) {
          existingItem.cantidad = existingItem.stock;
        }
      }
    },
  },
});

export const {
  addItem,
  incrementItem,
  decrementItem,
  removeItem,
  clearCart,
  initCart,
  updateItemStock,
  syncCartWithUpdatedStock,
} = cartSlice.actions;

export default cartSlice.reducer;
