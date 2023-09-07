import React, { useState } from "react";
import { useProducts } from "../productContext/ProductContext";
import {
  ProductContainer,
  StyledTable,
  StyledButton,
  StyledInput,
  StyledH2,
} from "./productStyled"; 

const ProductTable = () => {
  const { allProducts, editProduct, deleteProduct } = useProducts();

  const [editingId, setEditingId] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState({});

  const startEditing = (product) => {
    setEditingId(product.id);
    setUpdatedProduct(product);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct({
      ...updatedProduct,
      [name]: value,
    });
  };

  const handleUpdate = () => {
    editProduct(editingId, updatedProduct);
    setEditingId(null);
  };

  return (
    <ProductContainer>
      <StyledH2>Productos existentes</StyledH2>
      <StyledTable>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {allProducts.map((product, index) => (
            <tr key={index}>
              <td>
                <div style={{ width: "100px" }}>{product.id}</div>
              </td>
              <td>
                <div style={{ width: "150px" }}>
                  {editingId === product.id ? (
                    <StyledInput
                      name="nombre"
                      value={updatedProduct.nombre}
                      onChange={handleInputChange}
                    />
                  ) : (
                    product.nombre
                  )}
                </div>
              </td>
              <td>
                <div style={{ width: "100px" }}>
                  {editingId === product.id ? (
                    <StyledInput
                      name="precio"
                      value={updatedProduct.precio}
                      onChange={handleInputChange}
                    />
                  ) : (
                    product.precio
                  )}
                </div>
              </td>
              <td>
                <div style={{ width: "100px" }}>
                  {editingId === product.id ? (
                    <StyledInput
                      name="stock"
                      value={updatedProduct.stock}
                      onChange={handleInputChange}
                    />
                  ) : (
                    product.stock
                  )}
                </div>
              </td>
              <td>
                <div style={{ width: "200px" }}>
                  {editingId === product.id ? (
                    <>
                      <StyledButton onClick={handleUpdate}>
                        Guardar
                      </StyledButton>
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
                        $isDeleteButton
                        onClick={() => deleteProduct(product.id)}
                      >
                        Eliminar
                      </StyledButton>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </ProductContainer>
  );
};

export default ProductTable;
