import React, { useState, useEffect } from "react";
import {
  StyledTable,
  StyledButton,
  StyledInput,
  StyledH2,
  ProductContainer,
  StyledSelect,
} from "../ProductStyled/productStyled";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../redux/store/appHooks";
import {
  apiEditProduct,
  apiDeleteProduct,
  Product,
  apiGetAllProducts,
} from "../../../../redux/productManagementSlice/productManagementSlice";
import tinycolor from "tinycolor2";
import { ChromePicker } from "react-color";
import GradientColorPicker from "./gradientColorPicker";

export interface ProductTableProps {
  products: Product[];
}

const CATEGORIAS = ["Ojos", "Rostro", "Labios", "Uñas"];

const ProductTable: React.FC<ProductTableProps> = ({}) => {
  const allProducts = useAppSelector(
    (state) => state.productManagement.allProducts
  );
  const message = useAppSelector((state) => state.productManagement.message);
  const error = useAppSelector((state) => state.productManagement.error);
  const dispatch = useAppDispatch();
  const [showColorPicker, setShowColorPicker] = useState(false);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [updatedProduct, setUpdatedProduct] = useState<Product | null>(null);

  useEffect(() => {
    dispatch(apiGetAllProducts());
  }, [dispatch]);

  const startEditing = (product: Product) => {
    setEditingId(product.id);
    setUpdatedProduct(product);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "categoria" && updatedProduct) {
      setUpdatedProduct({
        ...updatedProduct,
        categoria: value,
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (updatedProduct) {
      if (name === "color") {
        // Convertir el string a un array
        const colors = value.split(",").map((color) => color.trim());

        // Usar tinycolor para generar un gradiente (si hay más de un color)
        if (colors.length > 1) {
          const gradientColors = generateGradient(colors);
          setUpdatedProduct({
            ...updatedProduct,
            color: gradientColors,
          });
        } else {
          setUpdatedProduct({
            ...updatedProduct,
            color: colors,
          });
        }
      } else {
        setUpdatedProduct({
          ...updatedProduct,
          [name]: value,
        });
      }
    }
  };
  const generateGradient = (baseColors: string[]) => {
    let gradientColors = [];

    for (let i = 0; i < baseColors.length - 1; i++) {
      const color1 = tinycolor(baseColors[i]);
      const color2 = tinycolor(baseColors[i + 1]);

      gradientColors.push(color1.toHexString()); // Agrega el primer color

      // Aquí es donde generamos los colores intermedios
      for (let j = 1; j <= 8; j++) {
        const mixedColor = tinycolor.mix(color1, color2, j * 10);
        gradientColors.push(mixedColor.toHexString());
      }
    }
    gradientColors.push(
      tinycolor(baseColors[baseColors.length - 1]).toHexString()
    ); // Agrega el último color

    return gradientColors;
  };
  const handleUpdate = async () => {
    if (updatedProduct) {
      try {
        await dispatch(apiEditProduct(updatedProduct)).unwrap();
        setEditingId(null);
      } catch (error) {
        console.error("Error updating product:", error);
      }
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await dispatch(apiDeleteProduct(id)).unwrap();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <ProductContainer style={{ position: "relative" }}>
      <StyledH2>Productos existentes</StyledH2>
      {message && <div style={{ color: "green" }}>{message}</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
      {showColorPicker && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)", // Fondo opaco
            display: "flex",
            justifyContent: "center",
            alignItems: "center", // Centrar el modal
            zIndex: 1000,
          }}
          onClick={() => setShowColorPicker(false)} 
        >
          <div
            style={{
              padding: "20px",
              backgroundColor: "white",
              borderRadius: "10px",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
              minWidth: "50%",
            }}
            onClick={(e) => e.stopPropagation()} 
          >
            <GradientColorPicker
              onColorsChange={(colors) => {
                if (updatedProduct) {
                  setUpdatedProduct({
                    ...updatedProduct,
                    color: colors,
                  });
                }
              }}
              onClose={() => setShowColorPicker(false)}
            />
          </div>
        </div>
      )}

      <StyledTable>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Categoría</th>
            <th>Descripción</th>
            <th>Color</th>
            <th>Marca</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {allProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>
                {editingId === product.id ? (
                  <StyledInput
                    name="nombre"
                    value={updatedProduct?.nombre}
                    onChange={handleInputChange}
                  />
                ) : (
                  product.nombre
                )}
              </td>
              <td>
                {editingId === product.id ? (
                  <StyledInput
                    name="precio"
                    value={updatedProduct?.precio}
                    onChange={handleInputChange}
                  />
                ) : (
                  product.precio
                )}
              </td>
              <td>
                {editingId === product.id ? (
                  <StyledInput
                    name="stock"
                    value={updatedProduct?.stock}
                    onChange={handleInputChange}
                  />
                ) : (
                  product.stock
                )}
              </td>
              <td>
                {editingId === product.id ? (
                  <StyledSelect
                    name="categoria"
                    value={updatedProduct?.categoria || "valor_por_defecto"}
                    onChange={handleSelectChange}
                  >
                    <option value="valor_por_defecto" disabled>
                      Selecciona una categoría
                    </option>
                    {CATEGORIAS.map((categoria) => (
                      <option key={categoria} value={categoria}>
                        {categoria}
                      </option>
                    ))}
                  </StyledSelect>
                ) : (
                  product.categoria
                )}
              </td>

              <td>
                {editingId === product.id ? (
                  <StyledInput
                    name="descripcion"
                    value={updatedProduct?.descripcion}
                    onChange={handleInputChange}
                  />
                ) : (
                  product.descripcion
                )}
              </td>
              <td style={{ textAlign: "center" }}>
                {editingId === product.id ? (
                  <StyledInput
                    name="color"
                    placeholder="Haz clic para seleccionar colores"
                    value={
                      updatedProduct?.color &&
                      Array.isArray(updatedProduct.color)
                        ? updatedProduct.color.join(", ")
                        : ""
                    }
                    onFocus={() => setShowColorPicker(true)}
                    readOnly
                  />
                ) : product.color && Array.isArray(product.color) ? (
                  <div
                    style={{
                      width: "100px",
                      height: "20px",
                      background: `linear-gradient(to right, ${product.color.join(
                        ","
                      )})`,
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                    }}
                    title={product.color.join(", ")}
                  ></div>
                ) : (
                  ""
                )}
              </td>

              <td>
                {editingId === product.id ? (
                  <StyledInput
                    name="marca"
                    value={updatedProduct?.marca}
                    onChange={handleInputChange}
                  />
                ) : (
                  product.marca
                )}
              </td>
              <td>
                {editingId === product.id ? (
                  <>
                    <StyledButton onClick={handleUpdate}>Guardar</StyledButton>
                    <StyledButton
                      $isDeleteButton
                      onClick={() => setEditingId(null)}
                    >
                      Cancelar
                    </StyledButton>
                  </>
                ) : (
                  <>
                    <StyledButton onClick={() => startEditing(product)}>
                      Editar
                    </StyledButton>
                    <StyledButton
                      $isDeleteButton={true}
                      onClick={() => handleDelete(product.id)}
                    >
                      Eliminar
                    </StyledButton>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </ProductContainer>
  );
};

export default ProductTable;
