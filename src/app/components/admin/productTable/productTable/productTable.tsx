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
      setUpdatedProduct({
        ...updatedProduct,
        [name]: value,
      });
    }
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
    <ProductContainer>
      <StyledH2>Productos existentes</StyledH2>
      {message && <div style={{ color: "green" }}>{message}</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
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
              <td>
                {editingId === product.id ? (
                  <StyledInput
                    name="color"
                    value={updatedProduct?.color}
                    onChange={handleInputChange}
                  />
                ) : (
                  product.color
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
