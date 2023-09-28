import React from "react";
import Navbar from "@/app/components/navbar/navbar/navbar";
import Products from "@/app/components/products/products/products/products";

import { ProductPageContainer } from "../src/app/components/stylesTodosLosProductos/todosLosProductosStyles";

const TodosLosProductos: React.FC = () => {
  return (
    <ProductPageContainer>
      <Navbar />
      <h1>Lista de Todos los Productos</h1>
      <Products displayMode="both" />
    </ProductPageContainer>
  );
};

export default TodosLosProductos;
