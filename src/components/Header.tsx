import React from "react";
import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar, Platform } from "react-native";
import { theme } from "../styles";

interface HeaderProps {
  children?: React.ReactNode;
}

const STATUS_BAR_HEIGHT = Platform.OS === "ios" ? 44 : StatusBar.currentHeight || 0;

const HeaderContainer = styled(LinearGradient)`
  width: 100%;
  height: ${100 + STATUS_BAR_HEIGHT}px;
  padding-top: ${STATUS_BAR_HEIGHT}px;
  border-bottom-left-radius: ${theme.borderRadius.xl}px;
  border-bottom-right-radius: ${theme.borderRadius.xl}px;
`;

export const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <HeaderContainer
        colors={["#466BEE", "#1B4E4D"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          shadowColor: theme.shadows.sm.shadowColor,
          shadowOffset: theme.shadows.sm.shadowOffset,
          shadowOpacity: theme.shadows.sm.shadowOpacity,
          shadowRadius: theme.shadows.sm.shadowRadius,
          elevation: theme.shadows.sm.elevation,
        }}
      >
        {children}
      </HeaderContainer>
    </>
  );
};
