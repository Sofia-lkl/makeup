import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define el estado inicial
interface LoginModalState {
  isLoginModalOpen: boolean;
}

const initialState: LoginModalState = {
  isLoginModalOpen: false
};

// Crea el slice
const loginModalSlice = createSlice({
  name: "loginModal",
  initialState,
  reducers: {
    // Acción para abrir el modal
    openLoginModal: (state) => {
      state.isLoginModalOpen = true;
    },
    // Acción para cerrar el modal
    closeLoginModal: (state) => {
      state.isLoginModalOpen = false;
    }
  }
});

// Exporta las acciones para ser usadas en componentes React
export const { openLoginModal, closeLoginModal } = loginModalSlice.actions;

// Exporta el reducer para ser agregado al store
export default loginModalSlice.reducer;
