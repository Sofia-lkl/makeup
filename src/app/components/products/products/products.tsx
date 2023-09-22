import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addItem, CartItem } from "./cart/contextCart/cart/cartSlice";
import { motion } from "framer-motion";
import Slider from "react-slick";

import {
  HighlightedContainer,
  SectionTitle,
  SectionDescription,
} from "./highlightedProductsStyles";
import { ProductType } from "../context/ProductsFilterContext/filterSlice";
import {
  AddToCartButton,
  ProductBrand,
  ProductCardContainer,
  ProductColor,
  ProductDescription,
  ProductImage,
  ProductName,
  ProductOptions,
  ProductPrice,
} from "./styleProducts";
import {
  CarouselContainer,
  HighlightedProductCardContainer,
} from "./stylesCarousel";
import { ProductContainer, ProductListContainer } from "./stylesContainer";

const getProductLink = (productName: string) => `/products/${productName}`;

const ProductCard: React.FC<ProductType & { highlighted?: boolean }> = ({
  id,
  imagen_url,
  nombre,
  precio,
  color,
  marca,
  stock,
  descripcion,
  highlighted = false,
}) => {
  const dispatch = useDispatch();
  const CardContainer = (
    highlighted ? HighlightedProductCardContainer : ProductCardContainer
  ) as React.ElementType;

  const handleAddToCart = () => {
    console.log(`Agregando producto al carrito: ${nombre} con ID: ${id}`);
    const itemToAdd: CartItem = {
      id,
      nombre,
      precio,
      cantidad: 1,
      imagen_url: imagen_url || "ruta_por_defecto.jpg",
      stock: stock || 0,
    };
    dispatch(addItem(itemToAdd));
  };

  return (
    <CardContainer>
      <Link href={getProductLink(nombre)}>
        <ProductImage
          src={imagen_url || "path_to_default_image.jpg"}
          alt={nombre}
        />
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
    </CardContainer>
  );
};

const HighlightedCarousel: React.FC<{ products: ProductType[] }> = ({
  products,
}) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    centerMode: true,
    centerPadding: "60px",
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    focusOnSelect: true,
    adaptiveHeight: true,
  };

  return (
    <CarouselContainer>
      <Slider {...settings}>
        {products.map((product) => (
          <div key={product.id}>
            <ProductCard {...product} />
          </div>
        ))}
      </Slider>
    </CarouselContainer>
  );
};
const Products: React.FC<{
  productList: ProductType[];
  highlightedProductList?: ProductType[];
  displayMode: "highlighted" | "fullList" | "both";
  activeFilter?: string | undefined;
  onFilterChange?: (filter: string | null) => void;
}> = ({
  productList,
  highlightedProductList,
  displayMode = "highlighted",
  activeFilter,
  onFilterChange,
}) => {
  useEffect(() => {
    console.log("Updated product list received:", productList);
  }, [productList]);

  const displayedHighlightedProducts =
    highlightedProductList || productList.slice(0, 6);

  return (
    <ProductContainer
      displayType={displayMode === "both" ? "fullList" : displayMode}
    >
      {(displayMode === "highlighted" || displayMode === "both") && (
        <>
          <SectionTitle>Productos Destacados</SectionTitle>
          <SectionDescription>
            Descubre los productos que están marcando tendencia esta temporada.
          </SectionDescription>
          <HighlightedCarousel products={displayedHighlightedProducts} />
        </>
      )}
      {(displayMode === "fullList" || displayMode === "both") && (
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
