import React from "react";
import styled from "styled-components/native";
import { theme } from "../styles";

interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary";
  style?: any;
}

interface StyledButtonProps {
  disabled: boolean;
  variant: "primary" | "secondary";
}

const StyledButton = styled.TouchableOpacity<StyledButtonProps>`
  width: 100%;
  height: 54px;
  border-radius: 10px;
  background-color: ${({ disabled, variant }: StyledButtonProps) => {
    if (disabled) return theme.colors.border;
    return variant === "secondary" ? theme.colors.white : "#0BC1BF";
  }};
  border-width: ${({ variant }: StyledButtonProps) => (variant === "secondary" ? 1 : 0)}px;
  border-color: ${({ variant }: StyledButtonProps) => (variant === "secondary" ? theme.colors.border : "transparent")};
  align-items: center;
  justify-content: center;
  opacity: ${({ disabled }: StyledButtonProps) => (disabled ? 0.6 : 1)};
`;

interface ButtonTextProps {
  disabled: boolean;
  variant: "primary" | "secondary";
}

const ButtonText = styled.Text<ButtonTextProps>`
  font-family: ${theme.fonts.primary};
  color: ${({ disabled, variant }: ButtonTextProps) => {
    if (disabled) return theme.colors.text.secondary;
    return variant === "secondary" ? theme.colors.text.primary : theme.colors.white;
  }};
  font-size: ${theme.fontSize.md}px;
  font-weight: ${theme.fontWeight.semibold};
`;

export const Button = ({ title, onPress, disabled = false, variant = "primary", style }: ButtonProps) => {
  return (
    <StyledButton
      disabled={disabled}
      variant={variant}
      onPress={onPress}
      activeOpacity={0.8}
      style={style}
    >
      <ButtonText
        disabled={disabled}
        variant={variant}
      >
        {title}
      </ButtonText>
    </StyledButton>
  );
};
