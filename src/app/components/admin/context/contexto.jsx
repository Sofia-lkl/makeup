"use client"
import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

export const UnifiedContext = createContext();

export const UnifiedProvider = ({ children }) => {
  // Estados generales
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Estados específicos para mensajes y errores
  const [loginMessage, setLoginMessage] = useState(null);
  const [loginError, setLoginError] = useState(null);

  // Estados específicos para el usuario
  const [userId, setUserId] = useState(null);
  const [userDetails, setUserDetails] = useState({});

  // Validar formulario de usuario
  const validateUserForm = (username, password, email, isSignIn = false) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (
      username.length < 5 ||
      password.length < 8 ||
      (!isSignIn && !emailPattern.test(email))
    ) {
      setLoginError(
        "El nombre de usuario debe tener al menos 5 caracteres, la contraseña al menos 8 y el correo electrónico debe ser válido"
      );
      return false;
    }
    return true;
  };
  // Función para verificar y validar el token existente en localStorage
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      try {
        const decodedToken = jwt_decode(token);

        // Autenticar el token con el servidor
        axios
          .post("http://localhost:3002/api/validateToken", { token })
          .then((response) => {
            if (response.data.isValid) {
              setUserRole(decodedToken.role);
              if (decodedToken.id) {
                setUserId(decodedToken.id);
              }
              setIsAuthenticated(true);
            } else {
              localStorage.removeItem("jwt");
            }
          })
          .catch((err) => {
            console.error("Error during token validation", err);
            localStorage.removeItem("jwt");
          });
      } catch (err) {
        console.error("Invalid token", err);
        localStorage.removeItem("jwt");
      }
    }
  }, []);

  // Función para manejar el inicio de sesión
  const handleLogin = async (username, password, apiEndpoint) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(apiEndpoint, { username, password });

      // Guardar el nuevo token en localStorage
      localStorage.setItem("jwt", data.token);

      const decodedToken = jwt_decode(data.token);
      setUserRole(decodedToken.role);
      if (decodedToken.id) {
        setUserId(decodedToken.id);
      }
      setIsAuthenticated(true);
      setLoginMessage("Inicio de sesión exitoso");
    } catch (error) {
      setLoginError("Error en la autenticación. Por favor intente nuevamente.");
    }
    setIsLoading(false);
  };
  // Manejar registro de usuario
  const handleSubmitSignUp = async (username, password, email) => {
    if (!validateUserForm(username, password, email)) return;
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:3002/api/users/register",
        { username, password, email }
      );
      setLoginMessage("Registro exitoso");
      setLoginError(null);
    } catch (error) {
      setLoginMessage(null);
      setLoginError("Error en el registro. Vuelve a intentarlo.");
    }
    setIsLoading(false);
  };

  // Manejar inicio de sesión
  const handleSubmitSignIn = async (username, password) => {
    if (!validateUserForm(username, password, null, true)) return;
    handleLogin(username, password, "http://localhost:3002/api/login");
  };

  // Manejar cierre de sesión
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsAuthenticated(false);
    setUserRole(null);
    setUserId(null);
    setLoginMessage(null);
  };

  // Obtener detalles del usuario
  const fetchUserDetails = async (userId) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3002/api/users/${userId}`
      );
      setUserDetails(data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };
  // Función genérica para manejar el inicio de sesión social
  const handleSocialLogin = async (token, apiEndpoint) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(apiEndpoint, { token });
      localStorage.setItem("jwt", data.token);

      const decodedToken = jwt_decode(data.token);
      setUserRole(decodedToken.role);
      if (decodedToken.id) {
        setUserId(decodedToken.id);
      }
      setIsAuthenticated(true);
      setLoginMessage("Inicio de sesión exitoso");
    } catch (error) {
      setLoginError("Error en la autenticación. Por favor intente nuevamente.");
    }
    setIsLoading(false);
  };

  return (
    <UnifiedContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        userRole,
        setUserRole,
        isLoading,
        setIsLoading,
        loginMessage,
        setLoginMessage,
        loginError,
        setLoginError,
        userId,
        setUserId,
        userDetails,
        setUserDetails,
        handleLogin,
        handleLogout,
        validateUserForm,
        fetchUserDetails,
        handleSubmitSignUp,
        handleSubmitSignIn,
        isLoginModalOpen,
        setIsLoginModalOpen,
      }}
    >
      {children}
    </UnifiedContext.Provider>
  );
};

export const useUnified = () => {
  const context = useContext(UnifiedContext);
  if (context === undefined) {
    throw new Error("useUnified must be used within a UnifiedProvider");
  }
  return context;
};
