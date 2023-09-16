import React, { useState, useEffect } from "react";
import {
  StyledTable,
  StyledButton,
  StyledInput,
  StyledH2,
  ProductContainer,
} from "./productStyled";
import {
  useAppDispatch,
  useAppSelector,
} from "../../products/products/cart/contextCart/store/appHooks";
import {
  apiEditProduct,
  apiDeleteProduct,
  apiGetAllProducts,
  Product,
} from "../../products/products/cart/contextCart/productManagement/productManagementSlice";

const ProductTable = () => {
  const allProducts = useAppSelector(
    (state) => state.productManagement.allProducts
  );
  const message = useAppSelector((state) => state.productManagement.message);
  const error = useAppSelector((state) => state.productManagement.error);
  const dispatch = useAppDispatch();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [updatedProduct, setUpdatedProduct] = useState<Product | null>(null);

  useEffect(() => {
    console.log("Llamando a apiGetAllProducts desde useEffect"); // Nuevo console.log
    dispatch(apiGetAllProducts());
  }, [dispatch]);

  const startEditing = (product: Product) => {
    console.log("Estado actual de todos los productos:", allProducts); // Nuevo console.log
    console.log(`Comenzando a editar producto con ID: ${product.id}`);
    setEditingId(product.id);
    setUpdatedProduct(product);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(`Cambio en el input ${name} con valor: ${value}`);
    if (updatedProduct) {
      setUpdatedProduct({
        ...updatedProduct,
        [name]: value,
      });
    }
  };

  const handleUpdate = async () => {
    if (updatedProduct) {
      console.log(`Actualizando producto con ID: ${updatedProduct.id}`);
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
            <th>Descripción</th>
            <th>Color</th>
            <th>Marca</th>
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
                      value={updatedProduct?.nombre}
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
                      value={updatedProduct?.precio}
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
                      value={updatedProduct?.stock}
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
                    <StyledInput
                      name="descripcion"
                      value={updatedProduct?.descripcion}
                      onChange={handleInputChange}
                    />
                  ) : (
                    product.descripcion
                  )}
                </div>
              </td>
              <td>
                <div style={{ width: "100px" }}>
                  {editingId === product.id ? (
                    <StyledInput
                      name="color"
                      value={updatedProduct?.color}
                      onChange={handleInputChange}
                    />
                  ) : (
                    product.color
                  )}
                </div>
              </td>
              <td>
                <div style={{ width: "100px" }}>
                  {editingId === product.id ? (
                    <StyledInput
                      name="marca"
                      value={updatedProduct?.marca}
                      onChange={handleInputChange}
                    />
                  ) : (
                    product.marca
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
                        $isDeleteButton={true}
                        onClick={() => handleDelete(product.id)}
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
