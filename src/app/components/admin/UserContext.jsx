"use strict";
import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null); 

  const [userDetails, setUserDetails] = useState({});

  // Inicialización y verificación del token almacenado, si existe
  useEffect(() => {
    const storedToken = localStorage.getItem("userToken");
    if (storedToken) {
      const decoded = jwt_decode(storedToken);
      if (decoded && decoded.exp * 1000 > new Date().getTime()) {
        setIsAuthenticated(true);
        setUserRole(decoded.role);
        setUserId(decoded.id); // Establecer userId desde el token decodificado
      }
    }
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3002/api/users/login",
        {
          username,
          password,
        }
      );
      console.log("Token recibido:", data.token);

      if (data.token) {
        localStorage.setItem("userToken", data.token);
        const decodedToken = jwt_decode(data.token);
        setIsAuthenticated(true);
        setUserRole(decodedToken.role);
        setUserId(decodedToken.id); // Establecer userId desde el token decodificado
      }
    } catch (error) {
      console.error("Error en el login:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    setIsAuthenticated(false);
    setUserRole(null);
    setUserId(null); // Reset userId
  };

  const handleRegister = async (username, password, email) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3002/api/users/register",
        {
          username,
          password,
          email,
        }
      );
      if (data.userId) {
        handleLogin(username, password);
      }
    } catch (error) {
      console.error("Error en el registro:", error);
    }
  };
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

  return (
    <UserContext.Provider
      value={{
        userId,
        isAuthenticated,
        setIsAuthenticated,
        userRole,
        setUserRole,

        userDetails,

        handleLogin,
        handleLogout,
        handleRegister,
        fetchUserDetails,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
