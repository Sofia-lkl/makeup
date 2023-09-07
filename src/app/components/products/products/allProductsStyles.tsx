import styled from "styled-components";
import { motion } from "framer-motion";
import { colors } from "../bar/sideBarStyle";

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
  justify-content: center; /* Esto centrará las tarjetas en el contenedor */

  flex-grow: 1;
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

interface ProductContainerProps {
  displayType: "highlighted" | "fullList";
  children: React.ReactNode;
}

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

export const ProductCardContainer = styled(motion.div)`
  position: relative;
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
  margin: 15px;
  margin-top: 15px;
  margin-left: 15px;
  width: 280px;
  min-height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.15);
    .productOptions {
      opacity: 1;
      visibility: visible;
    }
  }
`;

export const ProductName = styled.h3`
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.4em;
  color: #333;
  font-weight: 600;
`;

export const ProductPrice = styled.p`
  color: ${colors.gold};
  font-weight: bold;
  font-size: 1.3em;
  margin-top: 1rem;
  margin-bottom: 3.5rem;
`;

export const ProductImage = styled.img`
  border-radius: 10px;
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  margin-top: 1rem;
  transition: transform 0.3s;
  padding: 0;
  &:hover {
    transform: scale(1.05);
  }
`;

export const ProductOptions = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s, visibility 0.3s;
`;

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
export const AddToCartButton = styled.button`
  margin-top: 15px;
  padding: 8px 12px;
  background-color: ${colors.secondary};
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${colors.primary};
  }
`;
