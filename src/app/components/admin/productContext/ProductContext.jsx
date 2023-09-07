"use client"
import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); 

  const addProduct = (newProduct) => {
    setAllProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:3002/api/products/${id}`);
      setAllProducts(allProducts.filter((product) => product.id !== id));
      setMessage("Producto eliminado con éxito");
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      setError("Error al eliminar el producto. Por favor, inténtalo de nuevo.");
    }
  };

  const editProduct = async (id, updatedProduct) => {
    try {
      await axios.put(
        `http://localhost:3002/api/products/${id}`,
        updatedProduct
      );
      setAllProducts(
        allProducts.map((product) =>
          product.id === id ? updatedProduct : product
        )
      );
      setMessage("Producto editado con éxito");
    } catch (error) {
      console.error("Error al editar el producto:", error);
      setError("Error al editar el producto. Por favor, inténtalo de nuevo.");
    }
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

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const { data } = await axios.get("http://localhost:3002/api/products");
        setAllProducts(data);
      } catch (error) {
        console.error("Error al obtener todos los productos:", error);
      }
    };
    fetchAllProducts();
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        allProducts,
        message,
        setMessage,
        error,
        setError,
        addProduct,
        deleteProduct,
        editProduct,
        validateForm,
        isLoading, 
        setIsLoading, 
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }
  return context;
};
