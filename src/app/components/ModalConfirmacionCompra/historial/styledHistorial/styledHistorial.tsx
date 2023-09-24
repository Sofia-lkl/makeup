import styled from "styled-components";
import { Paper } from "@mui/material";

export const StyledOrderContainer = styled(Paper)`
  margin: 20px 0;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
`;

export const OrderHeader = styled.div`
  cursor: pointer;
  font-weight: bold;
  padding: 10px;
  border-bottom: 1px solid #f0f0f0;
`;

export const OrderDetailsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  padding: 20px 0;
`;

export const OrderSection = styled.div``;

export const SectionTitle = styled.h4`
  font-weight: bold;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 10px;
  margin-bottom: 15px;
`;

export const ListItem = styled.li`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
`;
