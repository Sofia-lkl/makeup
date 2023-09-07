import React from "react";
import { ModalContainer, ModalContent, CloseButton, InputField } from "./modalPanelStyled"; 
import AdminPanel from "../adminPanel/adminPanel";

const ModalPanel = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }
  return (
    <ModalContainer>
      <ModalContent>
        <CloseButton onClick={onClose}>X</CloseButton>
        <AdminPanel /> 
        
      </ModalContent>
    </ModalContainer>
  );
};

export default ModalPanel;
