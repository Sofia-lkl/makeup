import React, { useState, ChangeEvent, FormEvent } from "react";
import { useSelector } from "react-redux";
import {
  StyledForm,
  StyledDiv,
  StyledLabel,
  StyledInput,
  StyledButton,
  StyledFormContainer,
} from "./productFormStyled";
import {
  setMessage,
  setError,
  setLoading,
  apiAddProduct,
  ProductManagementState, 
} from "../../products/products/cart/contextCart/productManagement/productManagementSlice"; 
import { useAppDispatch } from "../../products/products/cart/contextCart/store/appHooks";

interface FormData {
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  imagen_url: string;
  marca: string;
  color: string;
}

const ProductForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    descripcion: "",
    precio: 0,
    stock: 0,
    imagen_url: "",
    marca: "",
    color: "",
  });

  const dispatch = useAppDispatch();
  const isLoading = useSelector(
    (state: ProductManagementState) => state.isLoading
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = (e.target.name === "precio" || e.target.name === "stock") ? parseFloat(e.target.value) : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setLoading(true));
    dispatch(setMessage(null));
    dispatch(setError(null));
    dispatch(apiAddProduct(formData));
  };
  

  return (
    <StyledFormContainer>
      {" "}
      {/* contenedor estilizado */}
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
