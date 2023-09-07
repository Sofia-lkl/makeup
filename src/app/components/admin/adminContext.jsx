"use client";
import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("jwt");
  };

  const validateForm = (formData) => {
    if (formData.nombre.length < 3 || formData.precio <= 0) {
      setMessage(
        "Nombre necesita al menos 3 caracteres y precio debe ser mayor que 0"
      );
      return false;
    }
    return true;
  };
  const handleLogin = async (username, password) => {
    console.log("handleLogin se está ejecutando");

    setIsLoading(true); 
    try {
      const { data } = await axios.post(
        "http://localhost:3002/api/admin/login",
        {
          username,
          password,
        }
      );

      localStorage.setItem("jwt", data.token);

      const decodedToken = jwt_decode(data.token);
      setUserRole(decodedToken.role);

      if (decodedToken.role === "admin") {
        setIsAuthenticated(true);
        setMessage(null); 
        setError(null);
      } else {
        setError("No tienes permisos para acceder al panel de administración"); 
      }

      setIsLoading(false); 
      return true;
    } catch (error) {
      console.error("Error en la autenticación:", error);
      setError("Error en la autenticación. Por favor intente nuevamente."); 
      setIsLoading(false); 
      return false;
    }
  };

  return (
    <AdminContext.Provider
      value={{
        isLoading, 
        setIsLoading, 
        message,
        setMessage,
        error,
        setError,
        validateForm,
        handleLogin, 
        userRole,
        setUserRole,
        isAuthenticated,
        setIsAuthenticated,
        logout, 
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};
