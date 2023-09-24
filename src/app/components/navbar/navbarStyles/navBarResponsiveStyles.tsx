import styled from 'styled-components';

export const MobileMenuButton = styled.button`
  display: none; // Por defecto, el botón estará oculto
  
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

export const MobileMenuContainer = styled.div<{ isOpen: boolean }>`
  display: ${props => props.isOpen ? 'flex' : 'none'};
  flex-direction: column;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #FAF3E0; // color de fondo neutral
`;

// Aquí puedes agregar más estilos según lo necesites
