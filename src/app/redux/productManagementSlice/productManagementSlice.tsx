import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { syncCartWithUpdatedStock } from "../cartSlice/cartSlice";

export interface Product {
  id: number;
  nombre: string;
  descripcion?: string;
  precio: number;
  stock?: number;
  imagen_url?: string;
  marca?: string;
  color: string | string[] | undefined;
  categoria?: string;
}

export interface ProductManagementState {
  allProducts: Product[];
  message: string | null;
  error: string | null;
  isLoading: boolean;
}

export const initialState: ProductManagementState = {
  allProducts: [],
  message: null,
  error: null,
  isLoading: false,
};
export const apiAddProduct = createAsyncThunk(
  "productManagement/addProduct",
  async (newProduct: Omit<Product, "id">, { dispatch }) => {
    try {
      const response = await axios.post(
        `http://localhost:3002/api/products`,
        newProduct
      );
      dispatch(setMessage(`Producto creado con éxito.`));
      return response.data;
    } catch (error) {
      console.error("Error al crear el producto:", error);
      dispatch(
        setError("Error al crear el producto. Por favor, inténtalo de nuevo.")
      );
      dispatch(setLoading(false));
      throw error;
    }
  }
);

export const apiDeleteProduct = createAsyncThunk(
  "productManagement/deleteProduct",
  async (id: number) => {
    await axios.delete(`http://localhost:3002/api/products/${id}`);
    return id;
  }
);
export const apiEditProduct = createAsyncThunk(
  "productManagement/editProduct",
  async (updatedProduct: Product, { dispatch }) => {
    // Convertir el campo 'color' a una cadena JSON
    const productToSend = {
      ...updatedProduct,
      color: Array.isArray(updatedProduct.color)
        ? JSON.stringify(updatedProduct.color)
        : updatedProduct.color,
    };

    const response = await axios.put(
      `http://localhost:3002/api/products/${updatedProduct.id}`,
      productToSend
    );
    console.log("Respuesta del servidor después de editar:", response.data);

    dispatch(syncCartWithUpdatedStock(response.data));

    return response.data;
  }
);

export const apiGetAllProducts = createAsyncThunk(
  "productManagement/getAllProducts",
  async () => {
    const response = await axios.get(`http://localhost:3002/api/products`);
    return response.data;
  }
);

const productManagementSlice = createSlice({
  name: "productManagement",
  initialState,
  reducers: {
    updateProductStock: (
      state,
      action: PayloadAction<{ productId: number; newStock: number }>
    ) => {
      const product = state.allProducts.find(
        (p) => p.id === action.payload.productId
      );
      if (product) {
        product.stock = action.payload.newStock;
      }
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.allProducts.push(action.payload);
    },
    setMessage: (state, action: PayloadAction<string | null>) => {
      state.message = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    validateForm: (
      state,
      action: PayloadAction<{ nombre: string; precio: number }>
    ) => {
      const { nombre, precio } = action.payload;
      if (nombre.length < 3 || precio <= 0) {
        state.message =
          "Nombre necesita al menos 3 caracteres y precio debe ser mayor que 0";
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(apiAddProduct.fulfilled, (state, action) => {
        state.allProducts.push(action.payload);
        state.message = "Producto agregado con éxito";
        state.error = null;
        state.isLoading = false;
      })

      .addCase(apiAddProduct.rejected, (state, action) => {
        state.error = action.error.message || "Error al agregar el producto";
        state.message = null;
      })
      .addCase(apiDeleteProduct.fulfilled, (state, action) => {
        state.allProducts = state.allProducts.filter(
          (product) => product.id !== action.payload
        );
        state.message = "Producto eliminado con éxito";
        state.error = null;
      })
      .addCase(apiDeleteProduct.rejected, (state, action) => {
        state.error = action.error.message || "Error al eliminar el producto";
        console.log(action.error);
      })
      .addCase(apiEditProduct.fulfilled, (state, action) => {
        const index = state.allProducts.findIndex(
          (product) => product.id === action.payload.id
        );
        console.log("Estado actual de todos los productos:", state.allProducts);

        if (index !== -1) {
          state.allProducts[index] = action.payload;
          state.message = "Producto editado con éxito";
          state.error = null;
          console.log(
            "Producto actualizado en estado:",
            state.allProducts[index]
          );
          console.log("Estado completo después de editar:", state.allProducts);
        } else {
          console.log("Producto no encontrado en el estado.");
        }
      })

      .addCase(apiEditProduct.rejected, (state, action) => {
        state.error = action.error.message || "Error al editar el producto";
        state.message = null;
      })
      .addCase(apiGetAllProducts.fulfilled, (state, action) => {
        state.allProducts = action.payload.map((product: any) => {
          // Cambio de tipo aquí a "any" temporalmente para evitar problemas
          let parsedColor: string[] = [];

          if (product.color) {
            try {
              parsedColor = JSON.parse(product.color);
              if (!Array.isArray(parsedColor)) {
                parsedColor = [product.color]; // Si no es un array, conviértelo en uno
              }
            } catch (e) {
              parsedColor = [product.color]; // Si hay un error en la deserialización, asumimos que es una string y la convertimos en un array
            }
          }

          return {
            ...product,
            color: parsedColor,
          };
        });
        state.error = null;
      });
  },
});
export const {
  addProduct,
  setMessage,
  setError,
  setLoading,
  validateForm,
  updateProductStock,
} = productManagementSlice.actions;

export default productManagementSlice.reducer;
