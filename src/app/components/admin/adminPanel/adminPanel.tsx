import React, { useState } from "react";
import jwt_decode from "jwt-decode";
import cookie from "cookie";
import ProductForm from "../productForm/productFrom";
import ProductTable from "../productTable/productTable";
import { useRouter } from "next/router";
import { Button, StyledH1, ButtonContainer, Message } from "./adminPanelStyled";
import { useDispatch, useSelector } from "react-redux";
import {
  setMessage,
  setError,
} from "../../products/products/cart/contextCart/productManagement/productManagementSlice";
import { RootState } from "../../products/products/cart/contextCart/store/rootReducer";
import { GetServerSideProps } from "next";

interface DecodedToken {
  role: string;
  exp: number;
  iat: number;
}

const AdminPanel = () => {
  const [showTable, setShowTable] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const dispatch = useDispatch();

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
      {showTable && <ProductTable />}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { jwt } = cookie.parse(context.req.headers.cookie || "");

  if (!jwt) {
    return {
      redirect: {
        destination: "/loginUserAdmin",
        permanent: false,
      },
    };
  }

  const decodedToken = jwt_decode(jwt) as DecodedToken;
  if (decodedToken.role !== "admin") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default AdminPanel;
