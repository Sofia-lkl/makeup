import React, { useState, useEffect, useCallback } from "react";
import Navbar from "@/app/components/navbar/navbar/navbar";
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
import {
  FaTag,
  FaPalette,
  FaBox,
  FaTrademark,
  FaPencilAlt,
} from "react-icons/fa";
import { Button } from "@mui/material";
import { useHandleAddToCart } from "@/app/components/products/products/products/cartActions";
import Image from "next/image";
import { useSelector } from "react-redux";
import { Button as MuiButton } from "@mui/material";

interface RootState {
  auth: {
    isAuthenticated: boolean;
    userRole: string | null;
    userId: string | null;
    isLoading: boolean;
  };
}

interface ProductProps {
  product: {
    id: number;
    imagen_url: string;
    nombre: string;
    precio: number;
    color: string | string[];
    marca: string;
    stock: number;
    descripcion: string;
  };
}
const ProductDetail: React.FC<ProductProps> = ({ product }) => {
  const [currentProduct, setCurrentProduct] = useState(product);
  const [isEditing, setIsEditing] = useState(false);
  const handleAddToCart = useHandleAddToCart(currentProduct);
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);
  const [isClient, setIsClient] = useState(false); 
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setIsClient(true); 
  }, []);

  const { isAuthenticated, userRole, isLoading } = useSelector(
    (state: RootState) => state.auth
  );
  const handleProductUpdated = useCallback(
    (updatedProduct: ProductProps["product"]) => {
      if (updatedProduct.id === currentProduct.id) {
        setCurrentProduct(updatedProduct);
      }
    },
    [currentProduct.id]
  );

  useEffect(() => {
    const socket = io("http://localhost:3002");
    socket.on("product-updated", handleProductUpdated);
    return () => {
      socket.disconnect();
    };
  }, [handleProductUpdated]);

  function renderColorCircles(colors: string | string[] | null | undefined) {
    if (!colors) {
      return [];
    }

    let colorArray: string[] = [];
    if (typeof colors === "string") {
      if (colors.startsWith("[") && colors.endsWith("]")) {
        try {
          colorArray = JSON.parse(colors);
        } catch (error) {
          console.error("Failed to parse color JSON:", error);
          return [];
        }
      } else {
        colorArray = [colors];
      }
    } else {
      colorArray = colors;
    }

    return colorArray.map((color: string, index: number) => {
      const isValidColor =
        /^#([0-9A-F]{3}){1,2}$/i.test(color) ||
        ["red", "blue", "green", "yellow", "black"].includes(color);
      const backgroundColor = isValidColor ? color : "gray";

      return (
        <div
          key={index}
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            marginRight: "10px",
          }}
        >
          <span
            style={{
              position: "relative",
              width: "40px",
              height: "40px",
              borderRadius: "8px",
              backgroundColor: backgroundColor,
              display: "inline-block",
              margin: "10px 5px",
              border: "none",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
              transition: "all 0.3s",
              cursor: "pointer",
              background: `linear-gradient(135deg, ${backgroundColor} 0%, ${backgroundColor} 55%, #fff 60%)`,
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.boxShadow =
                "0 8px 16px rgba(0, 0, 0, 0.1)";
              (e.target as HTMLElement).style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.boxShadow =
                "0 4px 12px rgba(0, 0, 0, 0.05)";
              (e.target as HTMLElement).style.transform = "scale(1)";
            }}
          >
            {isEditing && userRole === "admin" && (
              <input
                type="number"
                placeholder="Stock"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "80%",
                  textAlign: "center",
                }}
              />
            )}
          </span>
          {isEditing && userRole === "admin" && (
            <FaPencilAlt
              style={{ marginLeft: "10px", cursor: "pointer" }}
              onClick={() => {
              }}
            />
          )}
        </div>
      );
    });
  }

  function handleSaveChanges() {
    setIsEditing(false);
  }
  if (isLoading) {
    return <div>Cargando...</div>; 
  }
  useEffect(() => {
    setHasHydrated(true);
  }, []);
  return (
    <ProductPageContainer>
      <Navbar />
      {isLoading ? (
        <div>Cargando...</div>
      ) : (
        <CenteredContainer>
          <ProductDetailContainer>
            <div style={{ position: "relative", flex: 1, display: "flex" }}>
              {hasHydrated && isAuthenticated && userRole === "admin" && (
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    zIndex: 1,
                  }}
                >
                  {isEditing ? (
                    <MuiButton
                      size="small"
                      variant="contained"
                      color="primary"
                      onClick={handleSaveChanges}
                    >
                      Guardar
                    </MuiButton>
                  ) : (
                    <MuiButton
                      size="small"
                      variant="outlined"
                      color="primary"
                      onClick={() => setIsEditing(true)}
                    >
                      Editar
                    </MuiButton>
                  )}
                </div>
              )}
              <ImageContainer>
                <Image
                  src={currentProduct.imagen_url}
                  alt={currentProduct.nombre}
                  width={500}
                  height={500}
                  priority
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddToCart}
                  style={{ marginTop: "20px", alignSelf: "center" }}
                >
                  Agregar al carrito
                </Button>
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
                  Color:
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  {renderColorCircles(currentProduct.color)}
                </div>
                <p>
                  <FaBox />
                  Stock: {currentProduct.stock}
                </p>
                <p>Descripción: {currentProduct.descripcion}</p>
              </DetailContainer>
            </div>
          </ProductDetailContainer>
        </CenteredContainer>
      )}
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
      `http://localhost:3002/api/products/${id}`
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
