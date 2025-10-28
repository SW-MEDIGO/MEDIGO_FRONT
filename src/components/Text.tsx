import React from "react";
import styled from "styled-components/native";
import { theme } from "../styles";

interface TextProps {
  children: React.ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "xxxl";
  weight?: "normal" | "medium" | "semibold" | "bold";
  color?: string;
  align?: "left" | "center" | "right";
  numberOfLines?: number;
}

const StyledText = styled.Text<{
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "xxxl";
  weight?: "normal" | "medium" | "semibold" | "bold";
  color?: string;
  align?: "left" | "center" | "right";
}>`
  font-family: ${theme.fonts.primary};
  font-size: ${({ size = "md" }) => theme.fontSize[size as keyof typeof theme.fontSize]}px;
  font-weight: ${({ weight = "normal" }) => theme.fontWeight[weight as keyof typeof theme.fontWeight]};
  color: ${({ color = theme.colors.text.primary }) => color};
  text-align: ${({ align = "left" }) => align};
`;

export const Text = ({
  children,
  size = "md",
  weight = "normal",
  color = theme.colors.text.primary,
  align = "left",
  numberOfLines,
}: TextProps) => {
  return (
    <StyledText
      size={size}
      weight={weight}
      color={color}
      align={align}
      numberOfLines={numberOfLines}
    >
      {children}
    </StyledText>
  );
};
