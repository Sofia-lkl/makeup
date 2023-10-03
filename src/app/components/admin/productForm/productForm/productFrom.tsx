import React, { useState, ChangeEvent, FormEvent } from "react";
import { useSelector } from "react-redux";
import {
  StyledForm,
  StyledDiv,
  StyledLabel,
  StyledInput,
  StyledButton,
  StyledFormContainer,
  StyledSelect,
} from "../productFormStyled/productFormStyled";
import {
  setMessage,
  setError,
  setLoading,
  apiAddProduct,
  ProductManagementState,
} from "../../../../redux/productManagementSlice/productManagementSlice";
import { useAppDispatch } from "../../../../redux/store/appHooks";
import GradientColorPicker from "../../productTable/productTable/gradientColorPicker";
const CATEGORIAS = ["Ojos", "Rostro", "Labios", "Uñas"];

interface FormData {
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  imagen_url: string;
  marca: string;
  color: string[];
  categoria: string;
}
const ColorPickerOverlay: React.CSSProperties = {
  position: "fixed", // Cambiado a 'fixed' para asegurarnos de que siempre esté encima
  zIndex: 1000,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: "white",
  padding: "20px",
  boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.2)",
  borderRadius: "8px",
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap", // Permite que los elementos se ajusten automáticamente en filas
  justifyContent: "center",
  alignItems: "center",
};

const ProductForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    descripcion: "",
    precio: 0,
    stock: 0,
    imagen_url: "",
    marca: "",
    color: [],
    categoria: "",
  });
  const [showColorPicker, setShowColorPicker] = useState(false);

  const dispatch = useAppDispatch();
  const isLoading = useSelector(
    (state: ProductManagementState) => state.isLoading
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value =
      e.target.name === "precio" || e.target.name === "stock"
        ? parseFloat(e.target.value)
        : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleColorsChange = (colors: string[]) => {
    setFormData({
      ...formData,
      color: colors,
    });
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setLoading(true));
    dispatch(setMessage(null));
    dispatch(setError(null));

    // Convertir el array color a una cadena JSON
    const productToSend = {
      ...formData,
      color: JSON.stringify(formData.color),
    };

    // Enviar la copia modificada a la API
    dispatch(apiAddProduct(productToSend));
  };

  return (
    <StyledFormContainer>
      {" "}
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
            value={formData.color.join(", ")}
            onClick={() => setShowColorPicker(true)}
            readOnly
          />
          {showColorPicker && (
            <div style={ColorPickerOverlay}>
              <GradientColorPicker
                onColorsChange={handleColorsChange}
                onClose={() => setShowColorPicker(false)}
              />
            </div>
          )}
        </StyledDiv>
        <StyledDiv>
          <StyledLabel>Categoría:</StyledLabel>
          <StyledSelect
            name="categoria"
            value={formData.categoria}
            onChange={handleSelectChange}
            required
          >
            <option value="">-- Selecciona una categoría --</option>
            {CATEGORIAS.map((categoria) => (
              <option key={categoria} value={categoria}>
                {categoria}
              </option>
            ))}
          </StyledSelect>
        </StyledDiv>
        <StyledButton type="submit">
          {isLoading ? "Cargando..." : "Agregar Producto"}
        </StyledButton>
      </StyledForm>
    </StyledFormContainer>
  );
};

export default ProductForm;
