import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ProductType {
  id: number;
  imagen_url?: string;
  nombre: string;
  precio: number;
  stock?: number;
  marca?: string; // Aquí haces la propiedad "marca" opcional
  color?: string;
  descripcion?: string;
}

interface FilterState {
  searchTerm: string;
  priceRange: [number, number];
  selectedColor: string | null;
  selectedMarca: string | null;
  activeFilter: string | undefined;
}

const initialState: FilterState = {
  searchTerm: "",
  priceRange: [0, 1000],
  selectedColor: null,
  selectedMarca: null,
  activeFilter: undefined,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setPriceRange: (state, action: PayloadAction<[number, number]>) => {
      state.priceRange = action.payload;
    },
    setSelectedColor: (state, action: PayloadAction<string | null>) => {
      state.selectedColor = action.payload;
    },
    setSelectedMarca: (state, action: PayloadAction<string | null>) => {
      state.selectedMarca = action.payload;
    },
    setActiveFilter: (state, action: PayloadAction<string | undefined>) => {
      state.activeFilter = action.payload;
    },
  },
});

export const {
  setSearchTerm,
  setPriceRange,
  setSelectedColor,
  setSelectedMarca,
  setActiveFilter,
} = filterSlice.actions;

export default filterSlice.reducer;
