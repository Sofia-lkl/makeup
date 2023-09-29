import React from "react";
import Navbar from "@/app/components/navbar/navbar/navbar";
import Products from "@/app/components/products/products/products/products";

import { ProductPageContainer } from "../../src/app/components/products/products/styles/stylesTodosLosProductos/todosLosProductosStyles";

const TodosLosProductos: React.FC = () => {
  return (
    <ProductPageContainer>
      <Navbar />
      <Products displayMode="both" />
    </ProductPageContainer>
  );
};

export default TodosLosProductos;
