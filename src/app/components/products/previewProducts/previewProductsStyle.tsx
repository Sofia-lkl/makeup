import styled from "styled-components";
import { motion } from "framer-motion";
import { Button } from "@mui/material";
export const colors = {
  neutralLight: "#FAF3E0",
  pinkDark: "#FF69B4",
};

export const PreviewContainer = styled.div`
  position: relative;
  overflow: hidden;
  background-color: ${colors.neutralLight};
  padding: 4rem 0;
`;

export const ProductSlide = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 400px;
  position: relative; // Se necesita para posicionar absolutamente los hijos

  &::before {
    // Añadir una capa de color negro con cierta transparencia
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1; // Asegurar que esté por encima de la imagen, pero debajo del contenido
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute; // Posicionar absolutamente la imagen para que ocupe todo el espacio
    top: 0;
    left: 0;
    z-index: 0; // Asegurar que la imagen esté detrás del pseudoelemento y del contenido
  }
`;

export const ViewAllButton = styled(Button)`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${colors.pinkDark};
  color: white;
  &:hover {
    background-color: ${colors.pinkDark};
    opacity: 0.9;
  }
`;
export const ProductDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2;
  width: 50%; // O el tamaño que desees para el contenedor del producto
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.8); // Fondo blanco semi-transparente
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
`;
