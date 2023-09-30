import { colors } from "./colors";
import styled from "styled-components";
import { StyledFilterBar } from "./sideBarStyle";
export const FilterButtons = styled(StyledFilterBar)`
  display: flex;
  flex-direction: row;
  gap: 15px; // Aumentar el espacio entre botones
  width: 80%;
  justify-content: center;

  button {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 10px 15px; // Aumentar el padding para un mejor aspecto
    border: 2px solid ${colors.pinkDark}; // Borde cohesivo
    border-radius: 20px;
    font-size: 0.9em;
    font-weight: 600; // Peso de fuente cohesivo
    cursor: pointer;
    background-color: ${colors.neutralLight};
    color: ${colors.text};
    transition: background-color 0.3s, transform 0.3s;

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
`;
