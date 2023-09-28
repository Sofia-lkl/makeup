import { RadioGroup, TextField } from "@mui/material";
import styled from "styled-components";

export const StyledSeleccionEnvio = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 420px;
  margin: 24px auto;
  padding: 30px;
  border-radius: 15px;
  background: linear-gradient(145deg, #f5f5f5, #ffffff); 
  box-shadow: 10px 10px 20px #e0e0e0, -10px -10px 20px #ffffff; 

  h6 {
    font-size: 1.6em;
    margin-bottom: 20px;
    color: #4ecdc4;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1.5px;
  }

  .MuiFormControlLabel-root {
    margin-left: 0;
    margin-right: 0;

    .MuiRadio-root {
      color: #4ecdc4;
    }

    .MuiTypography-root {
      font-size: 1em;
      color: #555;
      font-weight: 500; 
    }
  }

  .MuiButton-root {
    align-self: center;
    background: linear-gradient(
      45deg,
      #fe6b8b 30%,
      #ff8e53 90%
    ); 
    color: white;
    transition: transform 0.3s ease; 

    &:hover {
      background-color: #3db9a8;
      transform: scale(1.05); 
    }
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 24px;
`;

export const StyledTextField = styled(TextField)`
  background-color: #f7f7f7;
  border-radius: 10px;
  box-shadow: 4px 4px 10px #e0e0e0, -4px -4px 10px #ffffff; 

  label.Mui-focused {
    color: #4ecdc4;
  }

  .MuiOutlinedInput-root {
    &:hover fieldset {
      border-color: #4ecdc4;
    }
    &.Mui-focused fieldset {
      border-color: #4ecdc4;
    }
  }
`;

export const StyledRadioGroup = styled(RadioGroup)`
  .MuiFormControlLabel-root {
    margin-left: 0;
    margin-right: 0;

    .MuiRadio-root {
      color: #4ecdc4;
    }

    .MuiTypography-root {
      font-size: 1.1em;
      color: #555;
      font-weight: 500;
    }
  }
`;
