import React, { FC } from "react";
import { ModalContainer, ModalContent, CloseButton } from "../modalPanelStyled/modalPanelStyled"; 
import AdminPanel from "../../adminPanel/adminPanel/adminPanel";

interface ModalPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalPanel: FC<ModalPanelProps> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }
  return (
    <ModalContainer>
      <ModalContent>
        <CloseButton onClick={onClose}>X</CloseButton>
        <AdminPanel products={[]} /> 
      </ModalContent>
    </ModalContainer>
  );
};

export default ModalPanel;
