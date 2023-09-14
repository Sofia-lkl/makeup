"use client";
import React from "react";
import Link from "next/link";
import { useCart } from "./cart/contextCart/contextCart";

import {
  createProductGrid,
  ProductOptions,
  ProductCardContainer,
  ProductName,
  ProductPrice,
  ProductImage,
  createProductContainer,
  ProductGrid,
  ProductListContainer,
  AddToCartButton,
  ProductContainer,
  ProductDescription,
  ProductColor,
  ProductBrand,
} from "./allProductsStyles";
import {
  HighlightedContainer,
  SectionTitle,
  SectionDescription,
} from "./highlightedProductsStyles";
import { ProductType } from "../context/ProductsFilterContext/ProductsFilterContext";

const getProductLink = (productName: string) => `/products/${productName}`;

const ProductCard: React.FC<ProductType> = ({
  id,
  imagen_url,
  nombre,
  precio,
  color,
  marca,
  stock,
  descripcion,
}) => {
  const [cartItems, dispatch] = useCart();

  const handleAddToCart = () => {
    const currentItem = cartItems.find((item) => item.id === id);
    if (currentItem) {
      if (currentItem.cantidad < currentItem.stock) {
        dispatch({
          type: "ADD_ITEM",
          item: {
            id,
            nombre,
            precio,
            cantidad: 1,
            imagen_url,
            stock,
          },
        });
      } else {
        // Mostrar un mensaje de error: "Stock insuficiente"
      }
    } else {
      if (stock > 0) {
        dispatch({
          type: "ADD_ITEM",
          item: {
            id,
            nombre,
            precio,
            cantidad: 1,
            imagen_url,
            stock,
          },
        });
      } else {
        // Mostrar un mensaje de error: "Stock insuficiente"
      }
    }
  };

  return (
    <ProductCardContainer>
      <Link href={getProductLink(nombre)}>
        <div style={{ cursor: "pointer" }}>
          <ProductImage
            src={imagen_url || "path_to_default_image.jpg"}
            alt={nombre}
          />
        </div>
      </Link>
      <ProductName>{nombre}</ProductName>
      <ProductPrice>${precio.toFixed(2)}</ProductPrice>
      <ProductBrand>{marca}</ProductBrand>
      <ProductDescription>{descripcion}</ProductDescription>
      <ProductColor>{color}</ProductColor>
      <ProductOptions className="productOptions">
        <AddToCartButton onClick={handleAddToCart}>
          Agregar al Carrito
        </AddToCartButton>
      </ProductOptions>
    </ProductCardContainer>
  );
};

const Products: React.FC<{
  productList: ProductType[];
  highlightedProductList?: ProductType[];
  type?: "highlighted" | "fullList";
  activeFilter?: string | undefined;
  onFilterChange?: (filter: string | null) => void;
}> = ({
  productList,
  highlightedProductList,
  type = "highlighted",
  activeFilter,
  onFilterChange,
}) => {
  const displayedHighlightedProducts =
    highlightedProductList || productList.slice(0, 3);

  return (
    <ProductContainer displayType={type}>
      {type === "highlighted" && (
        <>
          <SectionTitle>Productos Destacados</SectionTitle>
          <SectionDescription>
            Descubre los productos que están marcando tendencia esta temporada.
          </SectionDescription>
          <ProductGrid>
            {displayedHighlightedProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </ProductGrid>
        </>
      )}
      {type === "fullList" && (
        <ProductListContainer>
          {productList.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </ProductListContainer>
      )}
    </ProductContainer>
  );
};

export default Products;
