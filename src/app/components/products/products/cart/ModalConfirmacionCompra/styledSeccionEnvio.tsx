import styled from "styled-components";

export const StyledSeleccionEnvio = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #f9f9f9;

  h6 {
    font-size: 1.2em;
    margin-bottom: 10px;
    color: #333;
  }

  .MuiFormControlLabel-root {
    margin-left: 0;
    margin-right: 0;

    .MuiRadio-root {
      color: #4ECDC4;
    }

    .MuiTypography-root {
      font-size: 0.9em;
      color: #555;
    }
  }

  .MuiButton-root {
    align-self: center;
    background-color: #4ECDC4;
    color: white;
    &:hover {
      background-color: #3db9a8;
    }
  }
`;
