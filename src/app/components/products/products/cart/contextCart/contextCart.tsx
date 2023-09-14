"use client"
import React, { createContext, useReducer, useContext, useEffect } from "react";

export interface CartItem {
  imagen_url: string;
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
  stock: number;  
}


export type CartState = CartItem[];
interface CartProviderProps {
  children: React.ReactNode;
}
type CartAction =
  | { type: "ADD_ITEM"; item: CartItem }
  | { type: "REMOVE_ITEM"; id: number }
  | { type: "CLEAR_CART" }
  | { type: "INCREMENT_ITEM"; id: number }
  | { type: "DECREMENT_ITEM"; id: number }
  | { type: "INIT_CART"; cart: CartState };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  let newState: CartState = state;

  switch (action.type) {
    case "ADD_ITEM":
      const existingItem = state.find((item) => item.id === action.item.id);
      if (existingItem) {
        if (existingItem.stock && existingItem.cantidad < existingItem.stock) { 
          // Verifica si no excede el stock
          newState = state.map((item) =>
            item.id === action.item.id
              ? { ...item, cantidad: item.cantidad + 1 }
              : item
          );
        }
      } else if (action.item.cantidad < action.item.stock) {
        // Si es un nuevo ítem, verifica el stock
        newState = [...state, action.item];
      }
      break;
    case "INCREMENT_ITEM":
      return state.map((item) =>
        item.id === action.id && item.cantidad < item.stock // Verifica si no excede el stock
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      );
    case "DECREMENT_ITEM":
      return state.map((item) =>
        item.id === action.id && item.cantidad > 1
          ? { ...item, cantidad: item.cantidad - 1 }
          : item
      );
    case "REMOVE_ITEM":
      newState = state.filter((item) => item.id !== action.id);
      break;
    case "CLEAR_CART":
      newState = [];
      break;
    case "INIT_CART":
      return action.cart;
    default:
      return state;
  }

  // Guarda el estado actualizado en el LocalStorage
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(newState));
  }

  return newState;
};

const CartContext = createContext<
  [CartState, React.Dispatch<CartAction>] | undefined
>(undefined);

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      dispatch({ type: "INIT_CART", cart: JSON.parse(storedCart) });
    }
  }, []);

  return (
    <CartContext.Provider value={[cart, dispatch]}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
