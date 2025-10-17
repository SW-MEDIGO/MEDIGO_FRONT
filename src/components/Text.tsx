import React from 'react';
import styled from 'styled-components/native';
import { theme } from '../styles';

interface TextProps {
  children: React.ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  color?: string;
  align?: 'left' | 'center' | 'right';
  numberOfLines?: number;
}

const StyledText = styled.Text<{
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';
  weight: 'normal' | 'medium' | 'semibold' | 'bold';
  color: string;
  align: 'left' | 'center' | 'right';
}>`
  font-size: ${({ size }) => theme.fontSize[size]}px;
  font-weight: ${({ weight }) => theme.fontWeight[weight]};
  color: ${({ color }) => color};
  text-align: ${({ align }) => align};
`;

export const Text: React.FC<TextProps> = ({
  children,
  size = 'md',
  weight = 'normal',
  color = theme.colors.text,
  align = 'left',
  numberOfLines,
}) => {
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
