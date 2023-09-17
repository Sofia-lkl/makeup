import styled from "styled-components";
import { Button } from "@mui/material";
import Modal from "@mui/material/Modal";

export const colors = {
  neutralLight: "#FAF3E0",
  pinkDark: "#FF69B4",
  modalBackground: "rgba(0, 0, 0, 0.6)", // Fondo oscuro y semi-transparente
};

export const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ViewAllButton = styled(Button)`
  margin: 20px auto;
  background-color: ${colors.pinkDark};
  color: white;

  &:hover {
    background-color: ${colors.pinkDark};
    opacity: 0.9;
  }
`;

export const ModalContent = styled.div`
  position: relative;
  background-color: ${colors.modalBackground}; 
  overflow-y: auto; 
  border-radius: 20px;
  padding: 20px;
  max-width: 90vw; 
  max-height: 80vh; 
  width: 1200px; 
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2); 
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: white; 
  border-radius: 50%; 
  width: 30px; 
  height: 30px; 
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(
      255,
      255,
      255,
      0.2
    ); 
  }
`;

export const ModalBody = styled.div`
  display: flex;
  background-color: white; 
  border-radius: 15px; 
  overflow: hidden; 
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1); 
`;

export const ProductListStyled = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
`;

export const ResponsiveContainer = styled.div`
  @media (max-width: 768px) {
    ${ModalBody} {
      flex-direction: column;
    }
  }
`;
