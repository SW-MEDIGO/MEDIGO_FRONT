import React from "react";
import styled from "styled-components/native";
import { View } from "react-native";
import { Container, Text, Button, Header } from "../components";
import { theme } from "../styles";

const ScreenContainer = styled(View)`
  flex: 1;
  background-color: ${theme.colors.background};
`;

const ContentContainer = styled(Container)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const TitleContainer = styled(Container)`
  align-items: center;
  margin-bottom: ${theme.spacing.xxl}px;
`;

const ButtonContainer = styled(Container)`
  width: 100%;
  align-items: center;
`;

const ButtonWrapper = styled.View`
  width: 80%;
  margin-bottom: ${theme.spacing.md}px;
`;

export const HomeScreen: React.FC = () => {
  const handlePrimaryPress = () => {
    console.log("Primary button pressed");
  };

  const handleSecondaryPress = () => {
    console.log("Secondary button pressed");
  };

  const handleOutlinePress = () => {
    console.log("Outline button pressed");
  };

  return (
    <ScreenContainer>
      <Header />
      <ContentContainer>
        <TitleContainer>
          <Text
            size="xxxl"
            weight="bold"
            color={theme.colors.primary}
          >
            Medigo
          </Text>
          <Text
            size="lg"
            weight="medium"
            color={theme.colors.textSecondary}
          >
            React Native + TypeScript + Styled Components
          </Text>
        </TitleContainer>

        <ButtonContainer>
          <ButtonWrapper>
            <Button
              title="Primary Button"
              onPress={handlePrimaryPress}
              variant="primary"
              size="large"
            />
          </ButtonWrapper>

          <ButtonWrapper>
            <Button
              title="Secondary Button"
              onPress={handleSecondaryPress}
              variant="secondary"
              size="large"
            />
          </ButtonWrapper>

          <ButtonWrapper>
            <Button
              title="Outline Button"
              onPress={handleOutlinePress}
              variant="outline"
              size="large"
            />
          </ButtonWrapper>

          <ButtonWrapper>
            <Button
              title="Disabled Button"
              onPress={() => {}}
              variant="primary"
              size="large"
              disabled
            />
          </ButtonWrapper>
        </ButtonContainer>
      </ContentContainer>
    </ScreenContainer>
  );
};
