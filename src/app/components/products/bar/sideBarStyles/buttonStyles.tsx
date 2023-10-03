import { colors } from "./colors";
import styled from "styled-components";
import { StyledFilterBar } from "./sideBarStyle";
export const FilterButtons = styled(StyledFilterBar)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 15px;
  width: 100%; // Ajusta a 100% para aprovechar todo el ancho disponible
  justify-content: center;
  align-items: center; // Centrar elementos verticalmente

  button {
    display: flex;
    align-items: center;
    justify-content: center; // Centra el contenido del botón horizontalmente
    gap: 5px;
    padding: 10px 20px; // Aumenta el padding horizontal para dar más espacio
    border: 2px solid ${colors.pinkDark};
    border-radius: 20px;
    font-size: 0.9em;
    font-weight: 600;
    cursor: pointer;
    background-color: ${colors.neutralLight};
    color: ${colors.text};
    transition: background-color 0.3s, transform 0.3s;
    text-align: center; // Asegura que el texto esté centrado

    &.active {
      background-color: ${colors.pinkLight};
      color: white;
    }

    &:hover {
      background-color: ${colors.pinkDark};
      transform: scale(1.05);
      color: white;
    }
  }

  @media (max-width: 768px) {
    justify-content: center;
    flex-direction: column;

    button {
      width: 100%; // Ocupa todo el ancho disponible
      text-align: center;
      padding: 8px 10px;
      margin: 5px 0;
    }
  }
`;

export const FilterOption = styled.button`
  background: none;
  border: 2px solid ${colors.pinkDark}; // Borde cohesivo
  padding: 8px 14px; // Aumentar el padding para un mejor aspecto
  border-radius: 20px; // Radio cohesivo
  margin-right: 12px;
  margin-bottom: 12px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s, color 0.3s;
  color: ${colors.pinkDark};
  font-weight: 600; // Peso de fuente cohesivo

  &:hover {
    background-color: ${colors.pinkDark};
    transform: scale(1.05);
    color: white;
  }

  &.active {
    background-color: ${colors.pinkDark};
    color: white;
  }
  @media (max-width: 768px) {
    // Estilos específicos para pantallas pequeñas, si es necesario
  }
`;
