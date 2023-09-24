import { colors, primaryColor, secondaryColor, thumbColorHover } from './colors';
import styled from 'styled-components';


export const FilterInput = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 2px solid ${colors.pinkLight};
  border-radius: 20px;
  font-size: 0.95em;
  outline: none;
  color: ${colors.text};
  transition: border-color 0.3s, box-shadow 0.3s;

  &:focus {
    border-color: ${colors.pinkDark};
    box-shadow: 0px 4px 10px ${colors.cardShadow};
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
  padding: 6px 12px;
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