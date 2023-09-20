import React, { useState } from "react";
import ProductForm from "../productForm/productFrom";
import ProductTable from "../productTable/productTable";
import { Button, StyledH1, ButtonContainer, Message } from "./adminPanelStyled";
import { useSelector } from "react-redux";
import { setMessage, setError } from "../../products/products/cart/contextCart/productManagement/productManagementSlice";
import { RootState } from "../../products/products/cart/contextCart/store/rootReducer";
import { GetServerSideProps } from "next";
import axios from "axios";

interface Props {
  products: any[]; // Puedes cambiar 'any' por el tipo correcto de tus productos
}

const AdminPanel: React.FC<Props> = ({ products }) => {
  const [showTable, setShowTable] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const productManagementState = useSelector(
    (state: RootState) => state.productManagement
  );

  return (
    <div>
      <StyledH1>Panel de Administración</StyledH1>
      <ButtonContainer>
        <Button onClick={() => setShowTable(!showTable)}>
          {showTable ? "Ocultar Tabla" : "Mostrar Tabla"}
        </Button>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Ocultar Formulario" : "Mostrar Formulario"}
        </Button>
      </ButtonContainer>
      {showForm && <ProductForm />}
      {productManagementState.message && (
        <Message variant="success">{productManagementState.message}</Message>
      )}
      {productManagementState.error && (
        <Message variant="error">{productManagementState.error}</Message>
      )}
      {showTable && <ProductTable products={products} />}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const response = await axios.get(`http://localhost:3002/api/products`);
  const products = response.data;

  return {
    props: { products },
  };
};

export default AdminPanel;
