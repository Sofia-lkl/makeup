import React from "react";
import styled from "styled-components";

const StepperContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Circle = styled.div<{ $completed: boolean }>`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${({ $completed }) => ($completed ? "#4ECDC4" : "#e0e0e0")};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8em;
  color: white;
  transition: background-color 1.0s ease;  // Transición agregada aquí
`;

const Bar = styled.div<{ $completed: boolean }>`
  height: 5px;
  flex-grow: 1;
  background-color: ${({ $completed }) => ($completed ? "#4ECDC4" : "#e0e0e0")};
  margin: 0 10px;
  transition: background-color 1.0s ease;  // Transición agregada aquí
`;

export const Stepper: React.FC<{ currentStep: number }> = ({ currentStep }) => {
  return (
    <StepperContainer>
      <Circle $completed={currentStep > 0}>Confirmación</Circle>
      <Bar $completed={currentStep > 1} />
      <Circle $completed={currentStep > 1}>Datos</Circle>
      <Bar $completed={currentStep > 2} />
      <Circle $completed={currentStep > 2}>Terminar Compra</Circle>
    </StepperContainer>
  );
};

export default Stepper;
