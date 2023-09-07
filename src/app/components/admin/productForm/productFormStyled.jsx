import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const StyledFormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${fadeIn} 1s ease-in;
  background: rgba(255, 255, 255, 0.8);
  padding: 2em;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  &:hover {
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    transition: box-shadow 0.3s ease;
  }
`;

export const StyledForm = styled.form`
  width: 100%;
  max-width: 400px;
  background: #fff;
  padding: 2em;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
`;

export const StyledDiv = styled.div`
  margin-bottom: 1em;
  position: relative;
`;

export const StyledLabel = styled.label`
  font-size: 1.2em;
  color: #333;
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 0.8em;
  border: 2px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #009879;
  }
  &:hover,
  &:focus {
    border-color: #00765e;
    box-shadow: 0 0 10px rgba(0, 152, 121, 0.3);
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
  }
`;

export const StyledButton = styled.button`
  padding: 0.8em 1.5em;
  background-color: #009879;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #00765e;
    box-shadow: 0 0 10px rgba(0, 152, 121, 0.3);
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
  }
`;
