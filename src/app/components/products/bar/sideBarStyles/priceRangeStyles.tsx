import styled from "styled-components";
import {
  primaryColor,
  secondaryColor,
  thumbBorder,
  thumbColor,
  thumbColorHover,
} from "./colors";
import { StyledFilterBar } from "./sideBarStyle";

export const PriceRangeContainer = styled(StyledFilterBar)`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 10px;
  background-color: white;
  border: 2px solid ${primaryColor};
  border-radius: 30px;
  box-shadow: 0px 4px 12px rgba(255, 105, 180, 0.2);

  width: 100%; // Asegúrate de que ocupe todo el ancho

  @media (max-width: 768px) {
    padding: 15px;
    margin-left: auto;
    margin-right: auto;
  }
`;
export const PriceRangeBar = styled.div`
  width: 100%;
  height: 6px;
  background: ${secondaryColor};
  border-radius: 5px;
  position: relative;
  margin: 10px 0;

  @media (max-width: 768px) {
    width: 100% !important;
    height: 3px;
    margin: 20px 0;
  }
`;
export const PriceRangeInputs = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 10px; // Añade un pequeño espacio entre los dos inputs
`;

export const thumbStyles = {
  height: "22px",
  width: "22px",
  borderRadius: "50%",
  backgroundColor: thumbColor,
  border: `4px solid ${thumbBorder}`,
  boxShadow: "0px 2px 6px rgba(255, 105, 180, 0.2)",
  zIndex: 2,
  cursor: "pointer",
  transition: "background-color 0.3s, transform 0.3s",

  "&:hover": {
    backgroundColor: thumbColorHover,
    transform: "scale(1.15)",
  },
};

export const PriceRangeTrack = styled.div`
  height: 6px;
  background: ${secondaryColor};
  border-radius: 5px;
`;
