import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const ProductContainer = styled.div`
  margin: 2rem;
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${fadeIn} 1s ease-in;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 15px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
  animation: ${fadeIn} 1.5s ease-in;

  thead {
    background-color: #009879;
    color: white;
    font-size: 1.3em;
    text-shadow: 2px 2px 2px #000;
  }

  th,
  td {
    padding: 1em;
    text-align: center;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }
  }

  th {
    border-bottom: 3px solid #ddd;
  }

  tbody tr {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    border-radius: 10px;

    &:hover {
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
    }
  }
`;

export const StyledButton = styled.button`
  padding: 0.5em 1em;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 0.2em;
  transition: background-color 0.3s ease, transform 0.3s ease;
  background-color: ${({ $isDeleteButton }) =>
    $isDeleteButton ? "#e74c3c" : "#1d72b8"};
  color: white;

  &:hover {
    background-color: ${({ $isDeleteButton }) =>
      $isDeleteButton ? "#c0392b" : "#155a8a"};
    transform: scale(1.05);
  }
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 0.7em;
  border: 2px solid #ccc;
  border-radius: 5px;
  font-size: 1em;
  transition: box-shadow 0.3s ease, border 0.3s ease;

  &:focus {
    box-shadow: 0 0 10px rgba(81, 203, 238, 1);
    border: 2px solid rgba(81, 203, 238, 1);
  }
`;

export const StyledH2 = styled.h2`
  color: #009879;
  font-size: 2em;
  margin-bottom: 1em;
  text-align: center;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
`;
