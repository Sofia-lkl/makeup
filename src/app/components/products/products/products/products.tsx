import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  CartItem,
} from "../../../../redux/cartSlice/cartSlice";
import Slider from "react-slick";
import { toast } from "react-toastify";
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

  // Usar useSelector fuera del manejador de eventos
  const existingItem = useSelector((state: RootState) =>
    state.cart.find((item) => item.id === id)
  );

  const handleAddToCart = () => {
    if (typeof stock === "undefined" || stock <= 0) {
      toast.error("Producto sin stock!");
      return;
    }

    if (existingItem && existingItem.cantidad >= stock) {
      toast.error("No se pueden agregar más unidades, producto sin stock!");
      return;
    }

    const itemToAdd: CartItem = {
      id,
      nombre,
      precio,
      cantidad: 1,
      imagen_url: imagen_url || "ruta_por_defecto.jpg",
      stock: stock || 0,
    };

    dispatch(addItem(itemToAdd));

    const uniqueToastId = `${id}-${Date.now()}`;
    toast.success("Producto agregado al carrito!", { toastId: uniqueToastId });
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
    const socket = io("http://localhost:3002");
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
      .get("http://localhost:3002/api/products")
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
