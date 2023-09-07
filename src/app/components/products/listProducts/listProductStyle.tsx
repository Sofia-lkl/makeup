import styled from "styled-components";
import { Button } from "@mui/material";
import Modal from "@mui/material/Modal";

export const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
  

`;
export const colors = {
  neutralLight: "#FAF3E0",
  pinkDark: "#FF69B4",
};

export const ViewAllButton = styled(Button)`
  margin: 20px auto; // Centra el botón y le da un margen arriba y abajo
  background-color: ${colors.pinkDark};
  color: white;
  &:hover {
    background-color: ${colors.pinkDark};
    opacity: 0.9;
  }
`;

export const ModalContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  
  overflow-y: auto; // Para hacer scroll si el contenido es muy extenso
  border-radius: 20px;  // Agrega bordes redondeados para un mejor aspecto
  padding: 20px;  
`;
export const CloseButton = styled.button`
  position: absolute;
  top: 20px; // Ajusta según necesites
  right: 20px; // Ajusta según necesites
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #333; // Color oscuro para el "X"
`;





export const ModalBody = styled.div`
  display: flex;
`;



export const ProductListStyled = styled.div`
  flex: 1; // Asegura que ocupa todo el espacio disponible
  overflow-y: auto; // Añade un scrollbar si es necesario
  padding: 20px; // Espacio alrededor de los productos
`;

export const ResponsiveContainer = styled.div`
  @media (max-width: 768px) {
    ${ModalBody} {
      flex-direction: column;
    }
  }
`;
