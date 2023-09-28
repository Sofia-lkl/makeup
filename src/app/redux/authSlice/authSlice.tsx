import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {  loginUser, verifyToken } from "./authThunks";

interface AuthState {
  isAuthenticated: boolean;
  userRole: string | null;
  userId: string | null;
  isLoading: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  userRole: null,
  userId: null,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    startLogin(state) {
      state.isLoading = true;
    },
    loginSuccess(
      state,
      action: PayloadAction<{ userRole: string; userId: string | null }>
    ) {
      state.isAuthenticated = true;
      state.userRole = action.payload.userRole;
      state.userId = action.payload.userId;
      state.isLoading = false;
    },
    loginFailure(state) {
      state.isLoading = false;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.userRole = null;
      state.userId = null;
      localStorage.removeItem("jwt");
    },
    setUserId(state, action: PayloadAction<string | null>) {
      state.userId = action.payload;
    },
    setUserRole(state, action: PayloadAction<string | null>) {
      state.userRole = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.userRole = action.payload.userRole;
      state.userId = action.payload.userId;
    });
    builder.addCase(verifyToken.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.userRole = action.payload.userRole;
      state.userId = action.payload.userId;
    });
  },
});

export const {
  logout,
  setUserId,
  setUserRole,
  startLogin,
  loginSuccess,
  loginFailure,
} = authSlice.actions;
export default authSlice.reducer;
