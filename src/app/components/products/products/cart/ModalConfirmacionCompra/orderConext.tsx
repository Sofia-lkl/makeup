import React, { createContext, useContext, useState } from "react";

export interface OrderDetail {
  producto_id: number;
  cantidad: number;
  precio: number;
  imagen_url?: string;
}

export interface ShippingInfo {
  direccion: string;
  ciudad: string;
  estado: string;
  codigo_postal: string;
  pais: string;
  metodo_envio?: string; 
}
export interface User {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
}
export interface Order {
  id: number;
  fecha: string;
  total: number;
  nombre: string;
  email: string;
  telefono: string;
  detalles?: OrderDetail[];
  shippingInfo?: ShippingInfo; 
  comprobante_pago?: string;  

}

interface OrderProviderProps {
  children: React.ReactNode;
}

interface OrderContextType {
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<OrderProviderProps> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  return (
    <OrderContext.Provider value={{ orders, setOrders }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = (): OrderContextType => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrders debe ser usado dentro de un OrderProvider");
  }
  return context;
};
