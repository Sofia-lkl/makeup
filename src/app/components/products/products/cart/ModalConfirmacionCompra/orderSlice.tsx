import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

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

const initialState: { orders: Order[]; error: string | null } = {
  orders: [],
  error: null,
};

interface UserOrdersResponse {
  user: User;
  orders: Order[];
}

type RejectWithValue<T> = {
  action: {
    type: string;
    payload?: T;
    error: {
      message: string;
    };
  };
};

export const fetchUserOrders = createAsyncThunk<
  Order[] | RejectWithValue<string>,
  void,
  {
    rejectValue: string;
  }
>("order/fetchUserOrders", async (_, { rejectWithValue }) => {
  const isClient = typeof window !== "undefined";
  const userToken = isClient ? localStorage.getItem("jwt") : null;
  if (!userToken) {
    return rejectWithValue(
      "Token no encontrado. Asegúrate de estar autenticado."
    );
  }

  try {
    const response = await fetch(
      "http://localhost:3002/api/orders/user-orders",
      {
        headers: {
          "x-auth-token": userToken,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error fetching user orders: ${response.statusText}`);
    }

    const data: UserOrdersResponse = await response.json();
    return data.orders;
  } catch (error) {
    const err = error as Error;
    return rejectWithValue(err.message || "Error desconocido.");
  }
});

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
    },
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.push(action.payload);
    },
    removeOrder: (state, action: PayloadAction<number>) => {
      state.orders = state.orders.filter(
        (order) => order.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchUserOrders.fulfilled,
        (state, action: PayloadAction<Order[] | RejectWithValue<string>>) => {
          console.log("Datos devueltos por la API:", action.payload); // Registro agregado aquí
          if (Array.isArray(action.payload)) {
            state.orders = action.payload;
            state.error = null;
          } else {
            state.error = action.payload.action.error.message;
          }
        }
      )
      .addCase(
        fetchUserOrders.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.error = action.payload || "Error desconocido.";
        }
      );
  },
});

export const { setOrders, addOrder, removeOrder } = orderSlice.actions;

export default orderSlice.reducer;
