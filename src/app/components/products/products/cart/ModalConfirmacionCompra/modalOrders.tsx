import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import {
    StyledDialog,
    StyledDialogTitle,
    StyledDialogContent,
    StyledDialogActions,
    StyledButton
} from './modalOrdersStyles';  

interface ModalProps {
    isOpen: boolean;
    title?: string;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, title, onClose, children }) => {
    return (
        <StyledDialog open={isOpen} onClose={onClose} aria-labelledby="form-dialog-title">
            {title && <StyledDialogTitle id="form-dialog-title">{title}</StyledDialogTitle>}
            <StyledDialogContent>
                {children}
            </StyledDialogContent>
            <StyledDialogActions>
                <StyledButton onClick={onClose}>
                    Cerrar
                </StyledButton>
            </StyledDialogActions>
        </StyledDialog>
    );
};

export default Modal;
