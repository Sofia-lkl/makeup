import styled from "styled-components";

const breakpoints = {
  tablet: "768px",
  mobile: "480px",
};

export const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const ProductDetailContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 1000px; /* Reducido de 1200px a 1000px */
  width: 100%;

  @media only screen and (max-width: ${breakpoints.tablet}) {
    flex-direction: column;
    padding: 20px;
  }
`;
export const ImageContainer = styled.div`
  flex: 1; /* Ajustado a 1 */
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 90%; /* Si sientes que la imagen es demasiado grande, puedes reducir este porcentaje */
    margin-right: 20px;
    height: auto;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease-in-out;

    &:hover {
      transform: scale(1.05);
    }
  }

  @media only screen and (max-width: ${breakpoints.tablet}) {
    margin-bottom: 20px;
  }
`;
export const ProductDetailSection = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;

  svg {
    margin-right: 10px;
    color: #555;
  }
`;
export const DetailContainer = styled.div`
  flex: 1.2; /* Ajustado a 1.2 */
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative; /* Necesario para posicionar el botón "Editar" en la esquina superior derecha */

  h2 {
    font-size: 28px;
    margin-bottom: 10px;
    color: #333;
  }

  p {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 18px;
    color: #555;

    svg {
      font-size: 24px;
    }
  }

  button {
    align-self: flex-start;
    padding: 10px 20px;
    font-size: 16px;
    background-color: #333;
    color: #fff;
    transition: background-color 0.3s ease-in-out;
    position: absolute; /* Posiciona el botón en relación con DetailContainer */
    top: 10px; /* Espacio desde la parte superior */
    right: 10px; /* Espacio desde la derecha */

    &:hover {
      background-color: #555;
    }
  }

  @media only screen and (max-width: ${breakpoints.tablet}) {
    h2 {
      font-size: 24px;
    }
    p {
      font-size: 16px;
    }
    button {
      font-size: 14px;
    }
  }

  @media only screen and (max-width: ${breakpoints.mobile}) {
    h2 {
      font-size: 20px;
    }
    p {
      font-size: 14px;
    }
    button {
      font-size: 12px;
    }
  }
`;
