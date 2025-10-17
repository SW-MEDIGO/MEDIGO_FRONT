import React from 'react';
import styled from 'styled-components/native';
import { theme } from '../styles';

interface ContainerProps {
  children: React.ReactNode;
  padding?: keyof typeof theme.spacing;
  margin?: keyof typeof theme.spacing;
  backgroundColor?: string;
  flex?: number;
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
}

const StyledContainer = styled.View<{
  padding: keyof typeof theme.spacing;
  margin: keyof typeof theme.spacing;
  backgroundColor: string;
  flex: number;
  justifyContent: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  alignItems: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  flexDirection: 'row' | 'column' | 'row-reverse' | 'column-reverse';
}>`
  padding: ${({ padding }) => theme.spacing[padding]}px;
  margin: ${({ margin }) => theme.spacing[margin]}px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  flex: ${({ flex }) => flex};
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: ${({ alignItems }) => alignItems};
  flex-direction: ${({ flexDirection }) => flexDirection};
`;

export const Container: React.FC<ContainerProps> = ({
  children,
  padding = 'md',
  margin = 'xs',
  backgroundColor = theme.colors.background,
  flex = 0,
  justifyContent = 'flex-start',
  alignItems = 'flex-start',
  flexDirection = 'column',
}) => {
  return (
    <StyledContainer
      padding={padding}
      margin={margin}
      backgroundColor={backgroundColor}
      flex={flex}
      justifyContent={justifyContent}
      alignItems={alignItems}
      flexDirection={flexDirection}
    >
      {children}
    </StyledContainer>
  );
};
