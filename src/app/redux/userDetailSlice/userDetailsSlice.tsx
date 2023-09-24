import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define una interfaz para los detalles del usuario
interface UserDetails {
  userId?: string;
  username?: string;
  email?: string;
}

// Define el estado inicial
interface UserDetailsState {
  userDetails: UserDetails | null;
  isLoading: boolean;
}

const initialState: UserDetailsState = {
  userDetails: null,
  isLoading: false,
};

// Crea el slice
const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    // Acción para comenzar la carga de los detalles del usuario
    fetchUserDetailsStart: (state) => {
      state.isLoading = true;
    },
    // Acción para establecer los detalles del usuario tras una carga exitosa
    fetchUserDetailsSuccess: (state, action: PayloadAction<UserDetails>) => {
      state.userDetails = action.payload;
      state.isLoading = false;
    },
    // Acción para manejar un error durante la carga
    fetchUserDetailsError: (state) => {
      state.isLoading = false;
    },
    // Acción para limpiar los detalles del usuario (por ejemplo, en el logout)
    clearUserDetails: (state) => {
      state.userDetails = null;
    },
  },
});

// Exporta las acciones para ser usadas en componentes React y thunks
export const {
  fetchUserDetailsStart,
  fetchUserDetailsSuccess,
  fetchUserDetailsError,
  clearUserDetails,
} = userDetailsSlice.actions;

// Exporta el reducer para ser agregado al store
export default userDetailsSlice.reducer;
