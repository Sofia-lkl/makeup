import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import {
  SectionTitle,
  SectionDescription,
} from "../styles/highlightedProductsStyles";
import { ProductType } from "../../../../redux/ProductsFilterSlice/filterSlice";
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
} from "../styles/styleProducts";
import {
  CarouselContainer,
  HighlightedProductCardContainer,
} from "../styles/stylesCarousel";
import {
  ProductContainer,
  ProductListContainer,
} from "../styles/stylesContainer";
import { RootState } from "../../../../redux/store/rootReducer";
import CombinedFilterComponent from "../../bar/sideBar/sideBar";
import { useHandleAddToCart } from "./cartActions";

const getProductLink = (productId: number) => `/products/${productId}`;

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
  const handleAddToCart = useHandleAddToCart({
    id,
    nombre,
    precio,
    imagen_url,
    stock,
  });
  const CardContainer = (
    highlighted ? HighlightedProductCardContainer : ProductCardContainer
  ) as React.ElementType;

  return (
    <Link href={getProductLink(id)} passHref>
      <CardContainer as="a" style={{ textDecoration: "none" }}>
        <div style={{ cursor: "pointer" }}>
          <ProductImage
            src={imagen_url || "path_to_default_image.jpg"}
            alt={nombre}
          />
          <ProductName>{nombre}</ProductName>
        </div>
        <ProductPrice>${precio.toFixed(2)}</ProductPrice>
        <ProductBrand>{marca}</ProductBrand>
        <ProductDescription>{descripcion}</ProductDescription>
        <ProductColor>{color}</ProductColor>
        <ProductOptions className="productOptions">
          <AddToCartButton
            onClick={(e) => {
              e.stopPropagation(); 
              e.preventDefault();
              handleAddToCart();
            }}
          >
            Agregar al Carrito
          </AddToCartButton>
        </ProductOptions>
      </CardContainer>
    </Link>
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
  displayMode: "highlighted" | "fullList" | "both";
}> = ({ displayMode = "highlighted" }) => {
  const searchTerm = useSelector((state: RootState) => state.filter.searchTerm);
  const priceRange = useSelector((state: RootState) => state.filter.priceRange);
  const selectedColor = useSelector(
    (state: RootState) => state.filter.selectedColor
  );
  const selectedMarca = useSelector(
    (state: RootState) => state.filter.selectedMarca
  );
  const selectedCategory = useSelector(
    (state: RootState) => state.filter.selectedCategory
  );

  const [productList, setProductList] = useState<ProductType[]>([]);
  const [highlightedProductList, setHighlightedProductList] = useState<
    ProductType[]
  >([]);

  useEffect(() => {
    const socket = io("http://localhost:3003");
    socket.on("stock-updated", fetchProducts);
    socket.on("product-updated", fetchProducts);
    socket.on("product-added", fetchProducts);
    socket.on("product-edited", fetchProducts);
    socket.on("product-deleted", fetchProducts);
    return () => {
      socket.disconnect();
    };
  }, []);

  const fetchProducts = () => {
    console.log("Fetching products...");
    axios
      .get("http://localhost:3003/api/products")
      .then((response) => {
        console.log("Fetched products:", response.data);
        setProductList(response.data);
        setHighlightedProductList(response.data.slice(0, 6));
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };
  useEffect(fetchProducts, []);

  const filterProducts = (products: ProductType[]): ProductType[] => {
    return products
      .filter(
        (product) =>
          product.precio >= priceRange[0] && product.precio <= priceRange[1]
      )
      .filter((product) =>
        selectedColor ? product.color === selectedColor : true
      )
      .filter((product) =>
        selectedMarca ? product.marca === selectedMarca : true
      )
      .filter((product) =>
        product.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((product) =>
        selectedCategory && selectedCategory !== "Todos"
          ? product.categoria === selectedCategory
          : true
      );
  };

  const displayedProducts = filterProducts(productList);
  const displayedHighlightedProducts = highlightedProductList.slice(0, 6);

  return (
    <ProductContainer
      displayType={displayMode === "both" ? "fullList" : displayMode}
    >
      <CombinedFilterComponent />
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
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </ProductListContainer>
      )}
    </ProductContainer>
  );
};

export default Products;
