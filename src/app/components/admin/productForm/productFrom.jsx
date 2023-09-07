import React, { useState } from "react";
import axios from "axios";
import { useProducts } from "../productContext/ProductContext";
import {
  StyledForm,
  StyledDiv,
  StyledLabel,
  StyledInput,
  StyledButton,
  StyledFormContainer,
} from "./productFormStyled"; 

const ProductForm = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    imagen_url: "",
    marca: "",
    color: "",
  });

  const {
    isLoading,
    validateForm,
    setIsLoading,
    setMessage,
    setError,
    addProduct,
  } = useProducts();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm(formData)) {
      return;
    }

    setIsLoading(true);
    setMessage(null);
    setError(null);

    try {
      const { data } = await axios.post(
        "http://localhost:3002/api/products",
        formData
      );
      addProduct({ id: data.id, ...formData });
      setMessage(`Producto creado con éxito. ID del producto: ${data.id}`);
    } catch (error) {
      console.error("Error al crear el producto:", error);
      setError("Error al crear el producto. Por favor, inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <StyledFormContainer>
      {" "}
      {/* Usar el contenedor estilizado */}
      <StyledForm onSubmit={handleSubmit}>
        <StyledDiv>
          <StyledLabel>Nombre:</StyledLabel>
          <StyledInput
            type="text"
            name="nombre"
            onChange={handleChange}
            required
          />
        </StyledDiv>
        <StyledDiv>
          <StyledLabel>Descripción:</StyledLabel>
          <StyledInput
            type="text"
            name="descripcion"
            onChange={handleChange}
            required
          />
        </StyledDiv>
        <StyledDiv>
          <StyledLabel>Precio:</StyledLabel>
          <StyledInput
            type="number"
            name="precio"
            onChange={handleChange}
            required
          />
        </StyledDiv>
        <StyledDiv>
          <StyledLabel>Stock:</StyledLabel>
          <StyledInput
            type="number"
            name="stock"
            onChange={handleChange}
            required
          />
        </StyledDiv>
        <StyledDiv>
          <StyledLabel>URL de la imagen:</StyledLabel>
          <StyledInput
            type="url"
            name="imagen_url"
            onChange={handleChange}
            required
          />
        </StyledDiv>
        <StyledDiv>
          <StyledLabel>Marca:</StyledLabel>
          <StyledInput
            type="text"
            name="marca"
            onChange={handleChange}
            required
          />
        </StyledDiv>
        <StyledDiv>
          <StyledLabel>Color:</StyledLabel>
          <StyledInput
            type="text"
            name="color"
            onChange={handleChange}
            required
          />
        </StyledDiv>
        <StyledButton type="submit">
          {isLoading ? "Cargando..." : "Agregar Producto"}
        </StyledButton>
      </StyledForm>
    </StyledFormContainer>
  );
};

export default ProductForm;
