import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import io from "socket.io-client";
import { GetServerSidePropsContext } from "next";
import { ProductPageContainer } from "../../src/app/components/products/products/styles/stylesTodosLosProductos/todosLosProductosStyles";
import {
  CenteredContainer,
  DetailContainer,
  ImageContainer,
  ProductDetailContainer,
} from "@/app/components/products/products/styles/stylesTodosLosProductos/productoDetailStyles";
import { FaTag, FaPalette, FaBox, FaTrademark } from "react-icons/fa";
import { Button } from "@mui/material";
import { useHandleAddToCart } from "@/app/components/products/products/products/cartActions";
import Image from "next/image"; 

interface ProductProps {
  product: {
    id: number;
    imagen_url: string;
    nombre: string;
    precio: number;
    color: string;
    marca: string;
    stock: number;
    descripcion: string;
  };
}

const ProductDetail: React.FC<ProductProps> = ({ product }) => {
  const [currentProduct, setCurrentProduct] = useState(product);
  const handleAddToCart = useHandleAddToCart(currentProduct);

  const handleProductUpdated = useCallback(
    (updatedProduct: ProductProps["product"]) => {
      console.log("Producto actualizado:", updatedProduct);
      if (updatedProduct.id === currentProduct.id) {
        console.log("Actualizando detalles del producto:", updatedProduct.id);
        setCurrentProduct(updatedProduct);
      }
    },
    [currentProduct.id]
  );

  useEffect(() => {
    const socket = io("http://localhost:3003");
    socket.on("product-updated", handleProductUpdated);
    socket.on("product-added", handleProductUpdated);
    socket.on("product-edited", handleProductUpdated);
    return () => {
      socket.disconnect();
    };
  }, [handleProductUpdated]);

  if (!currentProduct) {
    return <div>Cargando producto...</div>;
  }

  return (
    <ProductPageContainer>
      <CenteredContainer>
        <ProductDetailContainer>
          <ImageContainer>
            <ImageContainer>
              <Image
                src={currentProduct.imagen_url}
                alt={currentProduct.nombre}
                width={500} 
                height={500} 
                priority
              />
            </ImageContainer>
          </ImageContainer>
          <DetailContainer>
            <h2>{currentProduct.nombre}</h2>
            <p>
              <FaTrademark />
              Marca: {currentProduct.marca}
            </p>
            <p>
              <FaTag />
              Precio: ${currentProduct.precio.toFixed(2)}
            </p>
            <p>
              <FaPalette />
              Color: {currentProduct.color}
            </p>
            <p>
              <FaBox />
              Stock: {currentProduct.stock}
            </p>
            <p>Descripción: {currentProduct.descripcion}</p>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddToCart}
            >
              Agregar al carrito
            </Button>
          </DetailContainer>
        </ProductDetailContainer>
      </CenteredContainer>
    </ProductPageContainer>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const id = context.params?.id;

  if (!id) {
    return { notFound: true };
  }

  let product = {};

  try {
    const response = await axios.get(
      `http://localhost:3003/api/products/${id}`
    );
    product = response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
  }

  return {
    props: {
      product,
    },
  };
};

export default ProductDetail;
