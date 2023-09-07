import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import cookie from "cookie";
import { useProducts } from "../productContext/ProductContext"; 
import ProductForm from "../productForm/productFrom";
import ProductTable from "../productTable/productTable";
import { useRouter } from "next/navigation"; 
import { Button, StyledH1, ButtonContainer, Message,as } from "./adminPanelStyled"; 

const AdminPanel = () => {
  const [showTable, setShowTable] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const { message, error } = useProducts();
  const router = useRouter();
 /* df */
   useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      const decodedToken = jwt_decode(token);
      if (decodedToken.role !== "admin") {
        router.push("/");
      }
    } else {
      router.push("/");
    }
  }, [router]);

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
      {message && <Message type="success">{message}</Message>}
      {error && <Message type="error">{error}</Message>}
      {showTable && <ProductTable />}
    </div>
  );
};
export const getServerSideProps = async (context) => {
  const { jwt } = cookie.parse(context.req.headers.cookie || "");

  if (!jwt) {
    return {
      redirect: {
        destination: "/loginUerAdmin",
        permanent: false,
      },
    };
  }

  const decodedToken = jwt_decode(jwt);
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
