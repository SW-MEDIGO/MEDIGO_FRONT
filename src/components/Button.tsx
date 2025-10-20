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

interface StyledButtonProps {
  variant: "primary" | "secondary" | "outline";
  size: "small" | "medium" | "large";
  disabled: boolean;
}

const StyledButton = styled.TouchableOpacity<StyledButtonProps>`
  background-color: ${({ variant, disabled }: StyledButtonProps) => {
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
  border-width: ${({ variant }: StyledButtonProps) => (variant === "outline" ? "2px" : "0px")};
  border-color: ${({ variant }: StyledButtonProps) => (variant === "outline" ? theme.colors.primary : "transparent")};
  border-radius: ${theme.borderRadius.md}px;
  padding-top: ${({ size }: StyledButtonProps) => {
    switch (size) {
      case "small":
        return theme.spacing.sm;
      case "medium":
        return theme.spacing.md;
      case "large":
        return theme.spacing.lg;
      default:
        return theme.spacing.md;
    }
  }}px;
  padding-bottom: ${({ size }: StyledButtonProps) => {
    switch (size) {
      case "small":
        return theme.spacing.sm;
      case "medium":
        return theme.spacing.md;
      case "large":
        return theme.spacing.lg;
      default:
        return theme.spacing.md;
    }
  }}px;
  padding-left: ${({ size }: StyledButtonProps) => {
    switch (size) {
      case "small":
        return theme.spacing.md;
      case "medium":
        return theme.spacing.lg;
      case "large":
        return theme.spacing.xl;
      default:
        return theme.spacing.lg;
    }
  }}px;
  padding-right: ${({ size }: StyledButtonProps) => {
    switch (size) {
      case "small":
        return theme.spacing.md;
      case "medium":
        return theme.spacing.lg;
      case "large":
        return theme.spacing.xl;
      default:
        return theme.spacing.lg;
    }
  }}px;
  align-items: center;
  justify-content: center;
  opacity: ${({ disabled }: StyledButtonProps) => (disabled ? 0.6 : 1)};
`;

interface ButtonTextProps {
  variant: "primary" | "secondary" | "outline";
  size: "small" | "medium" | "large";
  disabled: boolean;
}

const ButtonText = styled.Text<ButtonTextProps>`
  color: ${({ variant, disabled }: ButtonTextProps) => {
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
  font-size: ${({ size }: ButtonTextProps) => {
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
      <ButtonText
        variant={variant}
        size={size}
        disabled={disabled}
      >
        {title}
      </ButtonText>
    </StyledButton>
  );
};
