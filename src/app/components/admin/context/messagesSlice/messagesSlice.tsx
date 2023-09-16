import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { registerUser } from "../authSlice/authThunks";

interface MessagesState {
  loginMessage: string | null;
  loginError: string | null;
}

const initialState: MessagesState = {
  loginMessage: null,
  loginError: null,
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setLoginMessage: (state, action: PayloadAction<string | null>) => {
      state.loginMessage = action.payload;
    },
    setLoginError: (state, action: PayloadAction<string | null>) => {
      state.loginError = action.payload;
    },
    clearMessages: (state) => {
      state.loginMessage = null;
      state.loginError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state) => {
        state.loginMessage = "Registro exitoso";
        state.loginError = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loginError = action.payload as string;
        state.loginMessage = null;
      });
  },
});

export const { setLoginMessage, setLoginError, clearMessages } =
  messagesSlice.actions;
export default messagesSlice.reducer;
