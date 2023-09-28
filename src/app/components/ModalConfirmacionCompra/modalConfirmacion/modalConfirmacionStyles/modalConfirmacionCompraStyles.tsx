
import styled from "styled-components";
import { Button as MuiButton } from "@mui/material";

const primaryColor = "#FF6B6B"; 
const secondaryColor = "#4ECDC4";
export const ModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  max-width: 800px;
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  outline: none;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  color: black;
  max-height: 80vh;  
  overflow-y: auto; 

`;

export const Total = styled.div`
  font-weight: bold;
  margin-top: 1.5rem;
  font-size: 1.5rem;
  border-top: 2px solid #e1e1e1;
  padding-top: 1rem;
  display: flex;
  justify-content: space-between;
`;

export const Button = styled(MuiButton)`
  margin-top: 1rem;
  width: 100%;
  background-color: ${secondaryColor} !important;
  &:hover {
    background-color: ${primaryColor} !important;
  }
`;

export const ProductRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e1e1e1;
  padding: 1rem 0;
`;

export const ProductImage = styled.div`
  flex: 1; 
  img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 5px;
  }
`;

export const ProductName = styled.div`
  flex: 3; 
  text-align: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-left: 1rem;
`;

export const ProductPrice = styled.span`
  flex: 2;
  text-align: right;
  font-weight: 600;
  margin-right: 2rem;
`;

export const ProductQuantity = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: flex-end;
`;
