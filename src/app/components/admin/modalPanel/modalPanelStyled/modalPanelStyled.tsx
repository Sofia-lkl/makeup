import styled from "styled-components";
import { motion } from "framer-motion";

export const ModalContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled(motion.div)`
  background-color: #fff;
  padding: 2em;
  width: 80%;
  height: 80%;
  overflow: auto; // Cambia 'scroll' por 'auto'
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;

  // Agrega estas líneas para ocultar las barras de desplazamiento
  scrollbar-width: none; // Para Firefox
  -ms-overflow-style: none; // Para Internet Explorer y Edge
  &::-webkit-scrollbar {
    display: none; // Para Chrome, Safari y Opera
  }

  &:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;

  &:hover {
    color: red;
  }
`;

export const Label = styled.label`
  font-size: 18px;
  margin-right: 10px;
`;

export const FieldContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 10px 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 10px;
  border-radius: 4px;

  &:hover {
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
  }
`;

