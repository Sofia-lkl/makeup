import {
  colors,
  primaryColor,
  secondaryColor,
  thumbColorHover,
} from "./colors";
import styled from "styled-components";

export const FilterInput = styled.input`
  width: 100%;
  padding: 12px 40px 12px 15px; // Aumentar el padding izquierdo para el ícono
  border: 2px solid ${colors.pinkDark};
  border-radius: 25px; // Hacerlo más redondeado
  font-size: 1em; // Aumentar el tamaño de fuente
  outline: none;
  color: ${colors.text};
  background-color: white; // Fondo blanco para destacar
  transition: border-color 0.3s, box-shadow 0.3s;

  &:focus {
    border-color: ${colors.pinkDark};
    box-shadow: 0px 4px 12px rgba(255, 105, 180, 0.2);
  }

  &:hover {
    border-color: ${colors.pinkDark};
  }

  &::placeholder {
    color: ${colors.darkerGray};
    font-style: italic;
  }
`;

export const PriceRangeInput = styled.input`
  width: 45%;
  padding: 8px 14px; // Aumentar el padding para un mejor aspecto
  border: 2px solid ${primaryColor};
  border-radius: 20px;
  font-size: 0.95em;
  outline: none;
  appearance: none;
  color: ${primaryColor};
  background-color: ${secondaryColor};
  transition: border-color 0.3s, box-shadow 0.3s, background-color 0.3s;
  text-align: center;

  /* Para navegadores Webkit (como Chrome y Safari) */
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Para Firefox */
  &::-moz-inner-spin-button,
  &::-moz-outer-spin-button {
    -moz-appearance: none;
    margin: 0;
  }

  /* Para Internet Explorer */
  &::-ms-clear {
    display: none;
  }

  &:focus {
    background-color: #fff0f5; // Lavender Blush
    border-color: ${thumbColorHover};
    box-shadow: 0px 4px 12px rgba(255, 105, 180, 0.2);
  }
`;
