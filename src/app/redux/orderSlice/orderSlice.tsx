import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { updateStockFromOrder } from "../cartSlice/cartSlice";

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
  details?: OrderDetail[];
  detalles?: OrderDetail[];

  direccion?: string;
  ciudad?: string;
  estado?: string;
  codigo_postal?: string;
  pais?: string;
  metodo_envio?: string;
  comprobante_pago?: string;
}

const initialState: {
  orders: Order[];
  error: string | null;
  newOrdersCount: number;
} = {
  orders: [],
  error: null,
  newOrdersCount: 0, // Nuevo estado para rastrear las órdenes nuevas
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
export const addNewOrder = createAsyncThunk(
  "order/addNewOrder",
  async (orderData, { dispatch }) => {
    console.log("Ejecutando addNewOrder con datos:", orderData);

    const isClient = typeof window !== "undefined";
    const userToken = isClient ? localStorage.getItem("jwt") : null;
    if (!userToken) {
      throw new Error("Token no encontrado. Asegúrate de estar autenticado.");
    }

    const response = await fetch("http://localhost:3002/api/orders/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": userToken,
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error("Error al agregar la orden");
    }

    const data = await response.json();

    if (data.estado === "Activo" || data.estado === "Aprobado") {
      console.log(
        "Actualizando stock y incrementando contador de órdenes nuevas."
      );
      dispatch(updateStockFromOrder(data.detalles));
      dispatch(incrementNewOrdersCount());
    }

    return data;
  }
);

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
export const fetchOrdersByStatus = createAsyncThunk<
  Order[] | RejectWithValue<string>,
  {
    status: string;
    sortByDate?: "asc" | "desc";
    startDate?: string;
    endDate?: string;
  },
  {
    rejectValue: string;
  }
>(
  "order/fetchOrdersByStatus",
  async ({ status, sortByDate, startDate, endDate }, { rejectWithValue }) => {
    const isClient = typeof window !== "undefined";
    const userToken = isClient ? localStorage.getItem("jwt") : null;

    if (!userToken) {
      return rejectWithValue(
        "Token no encontrado. Asegúrate de estar autenticado."
      );
    }

    let url = `http://localhost:3002/api/orders/orders-by-status/${status}`;
    const queryParams = [];
    if (sortByDate) {
      queryParams.push(`sortByDate=${sortByDate}`);
    }
    if (startDate && endDate) {
      queryParams.push(`startDate=${startDate}`, `endDate=${endDate}`);
    }
    if (queryParams.length) {
      url += `?${queryParams.join("&")}`;
    }

    try {
      const response = await fetch(url, {
        headers: {
          "x-auth-token": userToken,
        },
      });

      if (!response.ok) {
        throw new Error(
          `Error fetching orders by status: ${response.statusText}`
        );
      }

      const data: Order[] = await response.json();
      console.log("Data received:", data); // <-- Agrega este log
      return data;
    } catch (error) {
      const err = error as Error;
      return rejectWithValue(err.message || "Error desconocido.");
    }
  }
);

export const deleteOrderById = createAsyncThunk<
  { orderId: number; message: string } | RejectWithValue<string>,
  number,
  {
    rejectValue: string;
  }
>("order/deleteOrderById", async (orderId, { rejectWithValue }) => {
  const isClient = typeof window !== "undefined";
  const userToken = isClient ? localStorage.getItem("jwt") : null;

  if (!userToken) {
    return rejectWithValue(
      "Token no encontrado. Asegúrate de estar autenticado."
    );
  }

  try {
    const response = await fetch(
      `http://localhost:3002/api/orders/order/${orderId}`,
      {
        method: "DELETE",
        headers: {
          "x-auth-token": userToken,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error deleting order: ${response.statusText}`);
    }

    const data: { message: string } = await response.json();
    return { ...data, orderId };
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
    incrementNewOrdersCount: (state) => {
      // Incrementa en 1 el contador de órdenes nuevas
      console.log("Incrementando contador de órdenes nuevas.");

      state.newOrdersCount += 1;
    },
    resetNewOrdersCount: (state) => {
      // Restablece el contador de órdenes nuevas a 0
      state.newOrdersCount = 0;
    },
    setNewOrdersCount: (state, action: PayloadAction<number>) => {
      // Establece el contador a un valor específico
      state.newOrdersCount = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchUserOrders.fulfilled,
        (state, action: PayloadAction<Order[] | RejectWithValue<string>>) => {
          if (Array.isArray(action.payload)) {
            console.log("Cargando órdenes del usuario:", action.payload);

            state.orders = action.payload;
            state.error = null;
          } else {
            console.error(
              "Error cargando órdenes del usuario:",
              action.payload.action.error.message
            );

            state.error = action.payload.action.error.message;
          }
        }
      )
      .addCase(
        fetchUserOrders.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.error = action.payload || "Error desconocido.";
        }
      )
      .addCase(
        fetchOrdersByStatus.fulfilled,
        (state, action: PayloadAction<Order[] | RejectWithValue<string>>) => {
          if (Array.isArray(action.payload)) {
            console.log("Cargando órdenes del usuario:", action.payload);

            state.orders = action.payload;
            state.error = null;
          } else {
            console.error(
              "Error cargando órdenes del usuario:",
              action.payload.action.error.message
            );

            state.error = action.payload.action.error.message;
          }
        }
      )
      .addCase(
        fetchOrdersByStatus.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.error = action.payload || "Error desconocido.";
        }
      )
      .addCase(
        deleteOrderById.fulfilled,
        (
          state,
          action: PayloadAction<
            { orderId: number; message: string } | RejectWithValue<string>
          >
        ) => {
          if ("orderId" in action.payload) {
            const { orderId } = action.payload as {
              orderId: number;
              message: string;
            };
            state.orders = state.orders.filter((order) => order.id !== orderId);
          }
        }
      );
  },
});

export const {
  setOrders,
  addOrder,
  removeOrder,
  incrementNewOrdersCount,
  resetNewOrdersCount,
  setNewOrdersCount,
} = orderSlice.actions;

export default orderSlice.reducer;
