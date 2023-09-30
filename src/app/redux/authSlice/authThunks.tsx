import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { setLoginError, setLoading } from "../messagesSlice/messagesSlice";

interface DecodedToken {
  role: string;
  id: string;
  [key: string]: unknown;
}

interface RegisterUserData {
  username: string;
  password: string;
  email: string;
}

interface LoginResponse {
  token: string;
}

interface ErrorResponseData {
  errors: { msg: string }[];
  error: string;
}

interface RegisterErrorResponse {
  response: {
    data: ErrorResponseData;
  };
}

export const verifyToken = createAsyncThunk("auth/verifyToken", async () => {
  const token = localStorage.getItem("jwt");
  if (!token) throw new Error("No token found");

  try {
    const decodedToken = jwt_decode(token) as DecodedToken;
    const response = await axios.post(
      "http://localhost:3003/api/validateToken",
      { token }
    );

    if (!response.data.isValid) {
      localStorage.removeItem("jwt");
      throw new Error("Invalid token");
    }

    return {
      userRole: decodedToken.role,
      userId: decodedToken.id,
    };
  } catch (error) {
    console.error("Token verification failed:", error);
    throw new Error("Token verification failed");
  }
});

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials: { username: string; password: string }, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));

    try {
      const response = await axios.post<LoginResponse>(
        "http://localhost:3003/api/login",
        credentials
      );
      const token = response.data.token;

      localStorage.setItem("jwt", token);

      const decodedToken = jwt_decode(token) as DecodedToken;

      thunkAPI.dispatch(setLoading(false));

      return {
        userRole: decodedToken.role,
        userId: decodedToken.id,
      };
    } catch (error: unknown) {
      thunkAPI.dispatch(setLoading(false));
      if (error instanceof Error) {
        console.error("Login failed:", error.message);
        thunkAPI.dispatch(setLoginError(error.message || "Login failed"));
      }
      throw error;
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData: RegisterUserData, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));

    try {
      await axios.post("http://localhost:3003/api/users/register", userData);
      thunkAPI.dispatch(setLoading(false));
      return "Registro exitoso";
    } catch (error: unknown) {
      thunkAPI.dispatch(setLoading(false));

      let errorMessage = "";

      if (
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        (error as RegisterErrorResponse).response.data.errors
      ) {
        const validationErrors = (error as RegisterErrorResponse).response.data.errors.map((err) => err.msg);
        errorMessage = validationErrors.join(". ");
      } else if (
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        (error as RegisterErrorResponse).response.data.error
      ) {
        const serverErrorMessage = (error as RegisterErrorResponse).response.data.error;
        if (
          serverErrorMessage.includes("nombre de usuario ya está registrado")
        ) {
          errorMessage = "El nombre ingresado ya existe.";
        } else if (serverErrorMessage.includes("correo electrónico")) {
          errorMessage = "El email ingresado ya está en uso.";
        } else {
          errorMessage = serverErrorMessage;
        }
      } else {
        errorMessage = "Error al registrarse. Por favor, intente nuevamente.";
      }

      console.log("Mensaje de error desde thunk:", errorMessage);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);