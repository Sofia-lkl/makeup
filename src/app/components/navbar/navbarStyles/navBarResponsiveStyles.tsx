import styled from 'styled-components';

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

export const MobileMenuContainer = styled.div<{ isOpen: boolean }>`
  display: ${props => props.isOpen ? 'flex' : 'none'};
  flex-direction: column;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #FAF3E0; 
`;

