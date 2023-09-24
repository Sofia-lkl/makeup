import styled from "styled-components";
import { TextField } from "@mui/material";

export const StyledFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 500px;
  margin: 20px auto;
  padding: 25px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  background-color: #ffffff;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.1);

  h6 {
    font-size: 1.5em;
    margin-bottom: 20px;
    color: #333;
    font-weight: 600;
  }
`;

export const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;

  .MuiButton-root {
    background: linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%);
    color: white;
    transition: transform 0.3s ease;

    &:hover {
      background-color: #3db9a8;
      transform: scale(1.05);
    }
  }
`;

export const StyledTextField = styled(TextField)`
  background-color: #f7f7f7;
  border-radius: 6px;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.05);

  label.Mui-focused {
    color: #4ECDC4;
  }

  .MuiOutlinedInput-root {
    &:hover fieldset {
      border-color: #4ECDC4;
    }
    &.Mui-focused fieldset {
      border-color: #4ECDC4;
    }
  }
`;
