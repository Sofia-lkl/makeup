import React, { useState } from "react";
import ProductForm from "../../productForm/productForm/productFrom";
import ProductTable from "../../productTable/productTable/productTable";
import {
  Button,
  StyledH1,
  ButtonContainer,
  Message,
} from "../adminPanelStyled/adminPanelStyled";
import { useSelector } from "react-redux";

import { RootState } from "../../../../redux/store/rootReducer";
import { GetServerSideProps } from "next";
import axios from "axios";
import { Product } from "../../../../redux/productManagementSlice/productManagementSlice";
interface Props {
  products: Product[];
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
        <Message $variant="success">{productManagementState.message}</Message>
      )}
      {productManagementState.error && (
        <Message $variant="error">{productManagementState.error}</Message>
      )}

      {showTable && <ProductTable products={products} />}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await axios.get(`http://localhost:3002/api/products`);
  const products = response.data;

  return {
    props: { products },
  };
};

export default AdminPanel;
