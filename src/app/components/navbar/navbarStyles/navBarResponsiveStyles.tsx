import styled from "styled-components";

export const MobileMenuButton = styled.button`
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

export const NavLinksContainerDesktop = styled.div`
  display: flex;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const MenuWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.7);
`;

export const MobileMenuContainer = styled.div<{ isOpen: boolean }>`
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  width: 100%;
  height: 100%;
  align-items: flex-start; // Cambio aquí
  padding-top: 4rem; // Añade un padding-top aquí
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: hidden;
  transition: transform 0.3s ease-out;
`;

export const InnerMenuContainer = styled.div`
  position: absolute; // Cambiar de relative a absolute
  top: 50%; // Centrar verticalmente
  left: 50%; // Centrar horizontalmente
  transform: translate(-50%, -50%);
  background-color: #faf3e0;
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);

  max-width: 800px;
  min-height: 300px;

  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px; // Incrementa el espaciado entre elementos si es necesario
  padding: 40px; // Aumenta el padding para dar más espacio
  text-align: center; // Centra el contenido de texto
  width: 90%;
  min-width: 350px;
  max-width: 1000px;
  a {
    margin-left: 0rem !important;
  }
  button {
    margin-left: 0 !important;
  }
  
  .innerMenuContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px; // Puedes ajustar este valor si es necesario
    width: 100%; // Asegura que el contenedor ocupe todo el espacio disponible
  }
  & > * {
    flex: 1; // Hace que todos los elementos hijos ocupen el mismo espacio
    margin: 0;
    padding: 25px;
    text-align: center;
    max-width: 100%;
    box-sizing: border-box; // Asegura que el padding y el borde no aumenten el tamaño del elemento
  }

  @media (min-width: 481px) {
    width: 95%;
  }

  @media (min-width: 769px) {
    width: 80%;
  }
`;
