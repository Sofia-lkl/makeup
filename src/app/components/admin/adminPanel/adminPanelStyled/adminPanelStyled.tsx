import styled from "styled-components";
export const StyledH1 = styled.h1`
  font-size: 3em;
  font-family: "Courier New", Courier, monospace;
  color: #009879;
  text-align: center;
  margin-bottom: 1em;
  text-shadow: 2px 2px 4px #000;
`;

export const Button = styled.button`
  font-size: 1.2em;
  font-family: Arial, sans-serif;
  margin: 0 1em;
  padding: 0.7em 1.2em;
  border: none;
  border-radius: 10px;
  background-color: #009879;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #00765e;
  }
`;

export const Message = styled.div<{ $variant: "error" | "success" }>`
  color: ${(props) => (props.$variant === "error" ? "red" : "green")};
  border: 2px solid ${(props) => (props.$variant === "error" ? "red" : "green")};
  padding: 0.5em;
  border-radius: 5px;
  font-size: 1.2em;
  text-align: center;
  margin: 1em 0;
`;


export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1em;
`;
