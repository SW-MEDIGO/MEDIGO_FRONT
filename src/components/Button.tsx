import React from "react";
import styled from "styled-components/native";
import { theme } from "../styles";

interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

interface StyledButtonProps {
  disabled: boolean;
}

const StyledButton = styled.TouchableOpacity<StyledButtonProps>`
  width: 100%;
  height: 54px;
  border-radius: 10px;
  background-color: ${({ disabled }: StyledButtonProps) => (disabled ? theme.colors.border : "#0BC1BF")};
  align-items: center;
  justify-content: center;
  opacity: ${({ disabled }: StyledButtonProps) => (disabled ? 0.6 : 1)};
`;

interface ButtonTextProps {
  disabled: boolean;
}

const ButtonText = styled.Text<ButtonTextProps>`
  font-family: ${theme.fonts.primary};
  color: ${({ disabled }: ButtonTextProps) => (disabled ? theme.colors.textSecondary : theme.colors.white)};
  font-size: ${theme.fontSize.md}px;
  font-weight: ${theme.fontWeight.semibold};
`;

export const Button = ({ title, onPress, disabled = false }: ButtonProps) => {
  return (
    <StyledButton
      disabled={disabled}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <ButtonText disabled={disabled}>{title}</ButtonText>
    </StyledButton>
  );
};
