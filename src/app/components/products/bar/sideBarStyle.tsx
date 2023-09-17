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
  font-size: 1em;
  color: ${colors.text};
  margin-bottom: 10px; 
  text-align: center;
`;
export const StyledFilterBar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px; 
  padding: 10px; 
  align-items: center;
  background-color: #fafafa;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
`;

export const FilterInput = styled.input`
  width: 100%;
  padding: 8px 10px; 
  border: 2px solid ${colors.borderGray};
  border-radius: 15px; 
  font-size: 0.9em; 
  outline: none;
  color: ${colors.text};
  transition: border-color 0.3s, box-shadow 0.3s;

  &:focus {
    border-color: ${colors.primary};
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  }

  &:hover {
    border-color: ${colors.primary};
  }
  &:active,
  &:focus {
    transform: scale(1.02);
  }
`;
export const FilterButtons = styled.div`
  display: flex;
  gap: 6px; 
  width: 90%;
  justify-content: center;

  button {
    display: flex;
    align-items: center;
    gap: 5px; 
    padding: 8px 12px; 
    border: none;
    border-radius: 15px; 
    font-size: 0.9em; 
    cursor: pointer;
    background-color: ${colors.neutralLight};
    color: white;
    transition: background-color 0.3s;

    &.active {
      background-color: ${colors.pinkLight};
      color: white;
    }

    &:hover {
      background-color: ${hoverColor};
      transform: scale(1.05);
    }
  }
`;

export const FilterSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 8px;

  .price-section,
  .color-section,
  .brand-section {
    flex: 1;
    display: flex;
    flex-direction: column; 
    align-items: center; 
    justify-content: center; 
    margin: 0 8px;
    label {
      margin-bottom: 8px; 
    }
  }
`;

export const FilterSelect = styled.select`
  width: 60%;
  padding: 8px;
  border: 2px solid ${colors.borderGray};
  border-radius: 15px;
  font-size: 0.9em;
  outline: none;
  color: ${colors.text};
  background-color: white;
  transition: border-color 0.3s, box-shadow 0.3s;

  &:focus {
    border-color: ${colors.primary};
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  }

  &:hover {
    border-color: ${colors.primary};
  }
  &:active,
  &:focus {
    transform: scale(1.02);
  }
`;

export const FilterOption = styled.button`
  background: none;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  margin-right: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
  color: #333;

  &:hover {
    background-color: #f5f5f5;
    transform: scale(1.05); // Efecto de "zoom" al pasar el ratón por encima
  }

  &.active {
    background-color: #333;
    color: #fff;
  }
`;

/* rango de price */

// Colores de tema para el rango de precio
const primaryColor = "#4CAF50"; 
const secondaryColor = "#ccc"; 
const thumbColor = "#ffffff"; 
const thumbBorder = "#4CAF50"; 

export const PriceRangeContainer = styled.div`
  display: flex;
  flex-direction: row; /* Cambio a row */
  align-items: center;
  padding: 5px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.08);
`;
export const PriceRangeBar = styled.div`
  width: 100%;
  margin: 10px 0;
  height: 6px;
  background: ${secondaryColor};
  border-radius: 5px;
`;

export const PriceRangeInputs = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 10px 0;
`;

export const PriceRangeInput = styled.input`
  width: 40%; 
  padding: 10px;
  border: 2px solid ${primaryColor};
  border-radius: 4px;
  font-size: 1em;
  outline: none;
  color: black;
  transition: border-color 0.3s, box-shadow 0.3s;

  &:focus {
    border-color: ${primaryColor};
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  }
`;

export const thumbStyles = {
  height: "16px",
  width: "16px",
  borderRadius: "50%",
  backgroundColor: thumbColor,
  border: `4px solid ${thumbBorder}`,
  zIndex: 2, // Para elevar el "thumb" por encima de la pista
};

// Añadir un nuevo componente de estilo para el track
export const PriceRangeTrack = styled.div`
  height: 6px;
  background: ${secondaryColor};
  border-radius: 5px;
`;
export const StickyFilterContainer = styled.div`
  position: sticky;
  top: 0;
  z-index: 2;
  background-color: #fafafa; 
  padding: 10px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
`;
