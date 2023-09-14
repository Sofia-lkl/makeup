import styled from "styled-components";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

export const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
    max-width: 80%;
    width: 600px;
    padding: 1rem;
    background-color: #f5f5f5;
    border-radius: 12px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  }
`;

export const StyledDialogTitle = styled(DialogTitle)`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1rem;
`;

export const StyledDialogContent = styled(DialogContent)`
  font-size: 1rem;
  color: #666;
`;

export const StyledDialogActions = styled(DialogActions)`
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
`;

export const StyledButton = styled(Button)`
  font-size: 1rem;
  padding: 0.5rem 1rem;
  color: white;
  background-color: #007bff;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

export const OrderContainer = styled.div`
  display: flex;
  margin: 1rem 0;
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 10px;
  background-color: #fff;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.02);
  }
`;

export const ProductsContainer = styled.div`
  flex: 2;
  padding-right: 1rem;
  border-right: 1px solid #ddd;
`;

export const ShippingInfoContainer = styled.div`
  flex: 1;
  padding-left: 1rem;
  background-color: #f8f8f8;
  border-radius: 10px;
`;

export const UserDetail = styled.p`
  font-weight: bold;
  color: #333;
  margin-bottom: 0.5rem;
`;

export const ProductDetail = styled.li`
  list-style-type: none;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
`;

export const Image = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 1rem;
  object-fit: cover;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

export const ProductInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px; 
`;
