import React from "react";
import Products from "@/app/components/products/products/products/products";

import { ProductPageContainer } from "../../src/app/components/products/products/styles/stylesTodosLosProductos/todosLosProductosStyles";

const TodosLosProductos: React.FC = () => {
  return (
    <ProductPageContainer>
      <Products displayMode="both" />
    </ProductPageContainer>
  );
};

export default TodosLosProductos;
