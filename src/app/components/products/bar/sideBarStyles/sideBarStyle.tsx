import Slider from '@mui/material/Slider';
import styled from "styled-components";

export const colors = {
  neutralLight: "#FAF3E0",
  borderGray: "#B0B0B0",
  pinkLight: "#FFD1DC",
  pinkDark: "#FF69B4",
  purpleLight: "#D8BFD8",
  gold: "#FFD700",
  primary: "#FFB6C1",
  secondary: "#FF69B4",
  background: "#FFFFFF",
  cardShadow: "rgba(0, 0, 0, 0.1)",
  text: "#333333",
  darkerGray: "#808080",
};

const activeColor = "#FF69B4";
const inactiveColor = "#E0E0E0";
const hoverColor = "#FFB6C1";

export const SidebarTitle = styled.h2`
  font-size: 0.84em; // Antes era 1.2em
  color: ${colors.pinkDark};
  margin-bottom: 10.5px; // Antes era 15px
  text-align: center;
  font-weight: 600;
`;

export const StyledFilterBar = styled.div`
  display: flex;
  flex-direction: column; /* Cambiar de flex-direction: row (por defecto) a column */
  gap: 12px;
  padding: 12px;
  align-items: center; /* Esto centrará los elementos horizontalmente */
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
  margin-top: 10px;

  .price-section,
  .color-section,
  .brand-section {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 10px;

    label {
      margin-bottom: 10px;
      color: ${colors.pinkDark};
      font-weight: 600;
    }
  }
`;

export const FilterSelect = styled.select`
  width: 70%;
  padding: 10px;
  border: 2px solid ${colors.pinkLight};
  border-radius: 20px;
  font-size: 0.95em;
  outline: none;
  color: ${colors.text};
  background-color: white;
  transition: border-color 0.3s, box-shadow 0.3s;

  &:focus {
    border-color: ${colors.pinkDark};
    box-shadow: 0px 4px 10px ${colors.cardShadow};
  }

  &:hover {
    border-color: ${colors.pinkDark};
  }
`;


// Colores de tema para el rango de precio
const primaryColor = "#FF69B4"; // Hot Pink
const secondaryColor = "#FFE4E1"; // Misty Rose
const thumbColor = "#FFB6C1"; // Light Pink
const thumbColorHover = "#FF1493"; // Deep Pink
const thumbBorder = "#FF1493"; // Deep Pink



export const StickyFilterContainer = styled(StyledFilterBar)`
  position: sticky;
  top: 10px; /* El espacio que quieres que sea visible cuando esté contraído */
  z-index: 2;
  background-color: #fff5ee;
  padding: 12px;
  box-shadow: 0px 8px 15px rgba(255, 105, 180, 0.1);
  margin-top: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-y: hidden; /* Ocultamos el scroll vertical */
  transition: transform 0.5s; /* Animación para la transformación */
  transform: translateY(0); /* Por defecto, no hay transformación */

  &:hover,
  &.expanded {
      transform: translateY(0); /* Se muestra completamente */
  }

  &.collapsed {
      transform: translateY(-60%); /* Se contraerá y esconderá el 80% de su contenido hacia arriba */
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

  body.menu-open {
    overflow: hidden;
  }
`;

