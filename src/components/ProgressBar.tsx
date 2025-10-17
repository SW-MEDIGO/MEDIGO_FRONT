import React from "react";
import styled from "styled-components/native";
import { theme } from "../styles";

interface ProgressBarProps {
  currentStep: number;
  totalSteps?: number;
}

const ProgressBarContainer = styled.View`
  width: 76px;
  height: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StepCircle = styled.View<{ isActive: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: ${({ isActive }: { isActive: boolean }) => (isActive ? "#0BC1BF" : "#D9D9D9")};
`;

export function ProgressBar({ currentStep, totalSteps = 4 }: ProgressBarProps) {
  return (
    <ProgressBarContainer>
      {Array.from({ length: totalSteps }, (_, index) => (
        <StepCircle
          key={index}
          isActive={index + 1 === currentStep}
        />
      ))}
    </ProgressBarContainer>
  );
}
