import Slider from "@mui/material/Slider";
import styled from "styled-components";

export const colors = {
  neutralLight: "#FAF3E0",
  borderGray: "#A0A0A0", // Un poco más oscuro
  pinkLight: "#FFC1DC", // Un poco más saturado
  pinkDark: "#FF59B4", // Un poco más saturado
  purpleLight: "#D8BFD8",
  gold: "#FFD700",
  primary: "#FFA6C1", // Un poco más saturado
  secondary: "#FF59B4", // Un poco más saturado
  background: "#FFFFFF",
  cardShadow: "rgba(0, 0, 0, 0.1)",
  text: "#333333",
  darkerGray: "#707070", // Un poco más oscuro
};

export const SidebarTitle = styled.h2`
  font-size: 1em; // Aumentar el tamaño de fuente para un mejor aspecto
  color: ${colors.pinkDark};
  margin-bottom: 15px; // Aumentar el margen inferior
  text-align: center;
  font-weight: 600;
`;

export const StyledFilterBar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px;
  align-items: center;
  width: 100%;
  border-radius: 15px;
  box-shadow: 0px 5px 15px ${colors.cardShadow};
  transition: box-shadow 0.3s ease;
  &:hover {
    box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.2);
  }
`;

export const FilterSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  .price-section,
  .color-section,
  .brand-section {
    border-radius: 25px;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 15px; // Aumentar el margen para separación

    label {
      margin-bottom: 10px;
      color: ${colors.pinkDark};
      font-weight: 600;
    }
  }
`;

export const FilterSectionItem = styled.div`
  overflow: visible;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center; // Centrado horizontal
  justify-content: center; // Centrado vertical
  margin: 0 10px;
  label {
    margin-bottom: 10px;
    color: ${colors.pinkDark};
    font-weight: 600;
    text-align: center; // Centrar el texto
  }
`;

export const FilterSelect = styled.select`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid ${colors.pinkLight};
  border-radius: 25px;
  font-size: 1em;
  outline: none;
  color: ${colors.text};
  background-color: white;
  transition: border-color 0.3s, box-shadow 0.3s, background-color 0.3s;
  text-align-last: center; // Centra el texto en el menú desplegable
  cursor: pointer; // Cambia el cursor a mano al pasar por encima

  // Estilo de las opciones
  option {
    text-align: center; // Centra el texto de las opciones
    padding: 8px 12px; // Añade padding para más espacio
    background-color: white; // Fondo blanco para las opciones
    cursor: pointer; // Cambia el cursor a mano al pasar por encima

    // Estilo al pasar el mouse por encima de las opciones
    &:hover {
      background-color: ${colors.pinkLight};
      color: white;
    }
  }

  // Estilo al enfocar el menú desplegable
  &:focus {
    border-color: ${colors.pinkDark};
    box-shadow: 0px 4px 12px rgba(255, 105, 180, 0.2);
    background-color: ${colors.neutralLight}; // Cambia el fondo al enfocar
  }

  // Estilo al pasar el mouse por encima del menú desplegable
  &:hover {
    border-color: ${colors.pinkDark};
  }
`;

export const StickyFilterContainer = styled(StyledFilterBar)`
  position: sticky;
  top: 20px;
  z-index: 2;
  background-color: #f5f5f5; // Fondo más claro
  padding: 20px; // Aumentar el padding
  box-shadow: 0px 8px 15px rgba(255, 105, 180, 0.1);
  margin-top: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-y: hidden;
  transition: transform 0.5s, opacity 0.5s; // Añadir transición de opacidad
  transform: translateY(0);
  opacity: 0.9; // Hacerlo ligeramente transparente

  &:hover,
  &.expanded {
    transform: translateY(0);
    opacity: 1; // Opacidad completa al pasar el mouse
  }

  &.collapsed {
    transform: translateY(-60%);
  }
`;

export const StyledInputRange = styled(Slider)`
  &.input-range {
    .input-range__track {
      background-color: #000;
    }

    .input-range__track--active {
      background-color: #000;
    }

    .input-range__slider {
      background-color: #000;
      border: 1px solid #000;
    }

    .input-range__label {
      color: #000;
    }
  }
`;

import { createGlobalStyle } from "styled-components";
export const GlobalRangeStyles = createGlobalStyle`

  .input-range {
    .input-range__track {
      background-color: #000 !important;
    }

    .input-range__track--active {
      background-color: #000 !important;
    }

    .input-range__slider {
      background-color: #000 !important;
      border: 1px solid #000 !important;
    }

    .input-range__label {
      color: #000 !important;
    }
  }
  a {
    text-decoration: none !important; 
  }

  body.menu-open {
    overflow: hidden;
  }
`;
