import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { setLoginError, setLoginMessage, setLoading } from "../messagesSlice/messagesSlice";

interface DecodedToken {
  role: string;
  id: string;
  [key: string]: any; 
}
interface RegisterUserData {
  username: string;
  password: string;
  email: string;
}

export const verifyToken = createAsyncThunk("auth/verifyToken", async () => {
  const token = localStorage.getItem("jwt");
  if (!token) throw new Error("No token found");

  try {
    const decodedToken = jwt_decode(token) as DecodedToken;
    const response = await axios.post(
      "http://localhost:3002/api/validateToken",
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
    // Establecer isLoading a true al inicio de la operación
    thunkAPI.dispatch(setLoading(true));

    try {
      const response = await axios.post(
        "http://localhost:3002/api/login",
        credentials
      );
      const token = response.data.token;
      localStorage.setItem("jwt", token);

      const decodedToken = jwt_decode(token) as DecodedToken;

      // Establecer isLoading a false inmediatamente después de recibir el token
      thunkAPI.dispatch(setLoading(false));

      return {
        userRole: decodedToken.role,
        userId: decodedToken.id,
      };
    } catch (error: any) {
      console.error("Login failed:", error);
      
      // Establecer isLoading a false en caso de error
      thunkAPI.dispatch(setLoading(false));

      thunkAPI.dispatch(setLoginError(error.message || "Login failed"));
      throw error;
    }
  }
);


export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData: RegisterUserData, thunkAPI) => {
    // Establecer isLoading a true al inicio de la operación
    thunkAPI.dispatch(setLoading(true));

    try {
      await axios.post("http://localhost:3002/api/users/register", userData);

      // Establecer isLoading a false una vez que se complete con éxito
      thunkAPI.dispatch(setLoading(false));

      return "Registro exitoso";
    } catch (error: any) {
      console.error("Registration failed:", error);

      // Establecer isLoading a false en caso de error
      thunkAPI.dispatch(setLoading(false));

      let errorMessage = "";

      if (error.response?.data?.errors) {
        const validationErrors = error.response.data.errors.map((err: { msg: any; }) => err.msg);
        
        errorMessage = validationErrors.join('. ');

      } else if (error.response?.data?.error) {
        const serverErrorMessage = error.response.data.error;

        if (serverErrorMessage.includes("nombre de usuario ya está registrado")) {
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


