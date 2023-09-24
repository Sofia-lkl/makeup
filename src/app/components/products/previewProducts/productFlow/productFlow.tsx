import React, { useState } from 'react';
import { ProductDetailsContainer, ProductFlowContainer } from '../preview-flow-productStyles/previewProductsStyle';
import { Product } from "@/app/components/admin/productAction-reducer-types/types/types";  



type ProductFlowProps = {
  products: Product[];
};

const ProductFlow: React.FC<ProductFlowProps> = ({ products }) => {
  const [focusedCard, setFocusedCard] = useState<number | null>(null);

  return (
    <ProductFlowContainer>
      {products.map((product, index) => (
        <ProductDetailsContainer
          key={`product-a-${index}`}
          onMouseEnter={() => setFocusedCard(index)}
          onMouseLeave={() => setFocusedCard(null)}
          style={{ transform: focusedCard === index ? 'scale(0.9)' : 'scale(0.8)' }}
        >
          <img src={product.imagen_url} alt={product.nombre} />
          <h4>{product.nombre}</h4>
          <p>{product.marca}</p>
        </ProductDetailsContainer>
      ))}
    </ProductFlowContainer>
  );
};

export default ProductFlow;


