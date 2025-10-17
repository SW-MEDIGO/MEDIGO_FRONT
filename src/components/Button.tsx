import React from "react";
import styled from "styled-components/native";
import { theme } from "../styles";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
}

const StyledButton = styled.TouchableOpacity<{
  variant: "primary" | "secondary" | "outline";
  size: "small" | "medium" | "large";
  disabled: boolean;
}>`
  background-color: ${({ variant, disabled }) => {
    if (disabled) return theme.colors.border;
    switch (variant) {
      case "primary":
        return theme.colors.primary;
      case "secondary":
        return theme.colors.secondary;
      case "outline":
        return "transparent";
      default:
        return theme.colors.primary;
    }
  }};
  border: ${({ variant }) =>
    variant === "outline" ? `2px solid ${theme.colors.primary}` : "none"};
  border-radius: ${theme.borderRadius.md}px;
  padding: ${({ size }) => {
    switch (size) {
      case "small":
        return `${theme.spacing.sm}px ${theme.spacing.md}px`;
      case "medium":
        return `${theme.spacing.md}px ${theme.spacing.lg}px`;
      case "large":
        return `${theme.spacing.lg}px ${theme.spacing.xl}px`;
      default:
        return `${theme.spacing.md}px ${theme.spacing.lg}px`;
    }
  }};
  align-items: center;
  justify-content: center;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
`;

const ButtonText = styled.Text<{
  variant: "primary" | "secondary" | "outline";
  size: "small" | "medium" | "large";
  disabled: boolean;
}>`
  color: ${({ variant, disabled }) => {
    if (disabled) return theme.colors.textSecondary;
    switch (variant) {
      case "primary":
      case "secondary":
        return theme.colors.white;
      case "outline":
        return theme.colors.primary;
      default:
        return theme.colors.white;
    }
  }};
  font-size: ${({ size }) => {
    switch (size) {
      case "small":
        return theme.fontSize.sm;
      case "medium":
        return theme.fontSize.md;
      case "large":
        return theme.fontSize.lg;
      default:
        return theme.fontSize.md;
    }
  }}px;
  font-weight: ${theme.fontWeight.semibold};
`;

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  size = "medium",
  disabled = false,
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      disabled={disabled}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <ButtonText variant={variant} size={size} disabled={disabled}>
        {title}
      </ButtonText>
    </StyledButton>
  );
};
