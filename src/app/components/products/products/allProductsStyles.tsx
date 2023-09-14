import styled from "styled-components";
import { motion } from "framer-motion";
import { colors } from "../bar/sideBarStyle";

interface ProductContainerProps {
  displayType: "highlighted" | "fullList";
  children: React.ReactNode;
}
export const createProductGrid = () => styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

export const createProductContainer = (
  displayType: "highlighted" | "fullList"
) => styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  background-color: ${displayType === "highlighted" ? "#EFEFEF" : "white"};

  padding: 20px;
  margin: 0 auto;
  max-width: 1200px;
  border-radius: 10px;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.15);
  
`;

const ProductContainerBase = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
  margin: 0 auto;
  max-width: 1200px;
  border-radius: 10px;

  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.15);
`;
export const ProductContainer: React.FC<ProductContainerProps> = ({
  displayType,
  children,
}) => {
  const backgroundColor = displayType === "highlighted" ? "#EFEFEF" : "white";

  return (
    <ProductContainerBase style={{ backgroundColor }}>
      {children}
    </ProductContainerBase>
  );
};

export const ProductGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;

`;

export const ProductListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center; 

  flex-grow: 1;
`;

export const ProductName = styled.h3`
  color: #222;
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.5em;
  font-weight: 700;
  transition: color 0.3s; // Transición suave al cambiar el color
  &:hover {
    color: ${colors.secondary}; // Cambia el color al pasar el mouse para resaltarlo
  }
`;

export const ProductImage = styled.img`
  border-radius: 15px; // Un borde redondeado más grande para coincidir con la tarjeta
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  margin-top: 1rem;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.1); // Ampliamos un poco más al pasar el mouse
    box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.1); // Sombra suave para darle profundidad
  }
`;
export const ProductPrice = styled.p`
  color: ${colors.gold};
  font-weight: bold;
  font-size: 1.4em;
  margin-top: 0.5rem; // Reducimos el margen superior
  margin-bottom: 0.5rem;
  transition: transform 0.3s ease-in-out;
`;

export const ProductDescription = styled.p`
  color: #555;
  margin-top: 0.5rem; // Reducimos el margen superior
  font-style: italic;
  font-size: 0.9em;
  line-height: 1.4;
  transition: transform 0.3s ease-in-out;
`;

export const ProductColor = styled.p`
  color: #444;
  margin-top: 0.5rem;
  font-weight: bold;
  font-size: 0.95em;
  transition: transform 0.3s ease-in-out;
  &:hover {
    color: ${colors.primary}; // Cambiamos a un color primario al pasar el mouse
  }
`;
export const ProductBrand = styled.p`
  color: #666;
  margin-top: 0.3rem; // Reducimos el margen superior
  text-transform: uppercase;
  font-size: 0.85em;
  letter-spacing: 1.2px;
  transition: transform 0.3s ease-in-out;
`;
export const ProductCardContainer = styled(motion.div)`
  position: relative;
  background: #f9f9f9; // Un color ligeramente gris para dar un aspecto premium
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: all 0.3s ease-in-out;
  margin: 15px;
  width: 280px;
  min-height: 400px; // Aumentamos la altura mínima
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  &:hover {
    ${ProductPrice} {
      transform: translateY(-5px); // Elevamos el precio
    }
    ${ProductDescription} {
      transform: translateY(-10px); // Elevamos la descripción
    }
    ${ProductBrand} {
      transform: translateY(-15px); // Elevamos la marca
    }
    .productOptions {
      opacity: 1;
      visibility: visible;
      transform: translate(-50%, -50%); // Centramos el botón en la parte inferior
    }
  }
`;

export const ProductOptions = styled.div`
  position: absolute;
  bottom: 5%; // Inicialmente lo posicionamos más abajo
  left: 50%; // Posicionamos el botón en el centro horizontalmente
  transform: translate(-50%, 50%); 
  opacity: 0;
  visibility: hidden;
  transition: all 0.5s ease-in-out;
`;

export const AddToCartButton = styled.button`
  padding: 8px 15px; 
  background-color: ${colors.secondary};
  color: white;
  border: none;
  border-radius: 25px; 
  font-size: 1em; 
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  background-color: ${colors.primary};
  &:hover {
    background-color: ${colors.secondary}; 
    transform: translateY(-5px); 
  }
`;


