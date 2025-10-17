import React from "react";
import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";

interface HeaderProps {
  children?: React.ReactNode;
}

const HeaderContainer = styled(LinearGradient)`
  width: 100%;
  height: 128px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.07;
  shadow-radius: 4px;
  elevation: 3;
`;

export const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <HeaderContainer
      colors={["#466BEE", "#1B4E4D"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      {children}
    </HeaderContainer>
  );
};
