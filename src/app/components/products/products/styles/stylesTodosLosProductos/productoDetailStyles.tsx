import styled from "styled-components";

export const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const ProductDetailContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #fff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 900px; // Reduzco el tamaño para que sea más pequeño
  width: 90%; // Reduzco un poco el ancho para darle margen a los lados
  margin: auto;
`;

export const ImageContainer = styled.div`
  flex: 0.5;
  position: relative; 
  img {
    width: 90%;
    margin-right: 20px;
    height: auto;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease-in-out;
    &:hover {
      transform: scale(1.05);
    }
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
  flex: 0.5;
  display: flex;
  flex-direction: column;
  gap: 20px;
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
    &:hover {
      background-color: #555;
    }
  }
`;
