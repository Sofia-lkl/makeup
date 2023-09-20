import React, { useEffect } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addItem, CartItem } from "./cart/contextCart/cart/cartSlice";

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

import { ProductType } from "../context/ProductsFilterContext/filterSlice";

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
  const dispatch = useDispatch(); 

  const handleAddToCart = () => {
    console.log(`Agregando producto al carrito: ${nombre} con ID: ${id}`); 

    const itemToAdd: CartItem = {
      id,
      nombre,
      precio,
      cantidad: 1,
      imagen_url,
      stock,
    };

    dispatch(addItem(itemToAdd));
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
  useEffect(() => {
    console.log("Updated product list received:", productList);
  }, [productList]);

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
