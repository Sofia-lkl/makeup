import styled from "styled-components";
import { Paper } from "@mui/material";

export const StyledOrderContainer = styled(Paper)`
  font-family: "Inter", sans-serif;
  margin: 25px 0;
  padding: 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  background-color: #f8fafc; 

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  }
`;
export const OrderHeader = styled.div`
  cursor: pointer;
  font-weight: 600;
  padding: 10px 0;
  margin-bottom: 20px; 
  color: #2c5282; 
  font-size: 20px; 
  transition: color 0.2s ease-in-out;
  white-space: nowrap;
  span {
    white-space: normal;
  }
  &:hover {
    color: #4a90e2;
  }
`;

export const OrderDetailsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  padding: 20px 0;
`;

export const successMessageStyle = {
  color: "#38a169", 
  backgroundColor: "#edf7ed", 
  border: "1px solid #c6f6d5", 
  padding: "10px",
  borderRadius: "8px",
  marginTop: "10px",
};

export const OrderSection = styled.div`
  padding: 15px 0;
  border-top: 1px solid #e2e8f0; 
  margin-top: 20px; 
`;

export const SectionTitle = styled.h4`
  font-weight: 600; // Más negrita
  margin-bottom: 10px;
  font-size: 18px;
  color: #4a5568;
  display: flex;
  align-items: center;

  svg {
   
    margin-right: 10px;
  }
`;

export const ListItem = styled.li`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
  color: #718096; 
  div {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
`;
