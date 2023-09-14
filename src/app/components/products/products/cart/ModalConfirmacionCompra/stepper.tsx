import React from "react";
import styled from "styled-components";

const StepperContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Circle = styled.div<{ $completed: boolean }>`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: ${({ $completed }) => ($completed ? "#4ECDC4" : "#e0e0e0")};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8em;
  color: white;
  transition: background-color 1s ease;
`;

const Bar = styled.div<{ $completed: boolean }>`
  height: 5px;
  flex-grow: 1;
  background-color: ${({ $completed }) => ($completed ? "#4ECDC4" : "#e0e0e0")};
  margin: 0 10px;
  transition: background-color 1s ease;
`;

const STEPS = ["Confirmación", "Datos", "Método de Envío", "Terminar Compra"];

export const Stepper: React.FC<{ currentStep: number }> = ({ currentStep }) => {
  return (
    <StepperContainer>
      {STEPS.map((step, index) => (
        <React.Fragment key={index}>
          <Circle $completed={currentStep > index}>{step}</Circle>
          {index < STEPS.length - 1 && (
            <Bar $completed={currentStep > index + 1} />
          )}
        </React.Fragment>
      ))}
    </StepperContainer>
  );
};

export default Stepper;
