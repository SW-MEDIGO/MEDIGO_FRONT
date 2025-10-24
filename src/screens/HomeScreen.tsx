import React from "react";
import styled from "styled-components/native";
import { SafeAreaView } from "react-native";
import { Container, Text, Button } from "../components";
import { theme } from "../styles";

const ScreenContainer = styled(SafeAreaView)`
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
            />
          </ButtonWrapper>

          <ButtonWrapper>
            <Button
              title="Button 2"
              onPress={handleSecondaryPress}
            />
          </ButtonWrapper>

          <ButtonWrapper>
            <Button
              title="Button 3"
              onPress={handleOutlinePress}
            />
          </ButtonWrapper>

          <ButtonWrapper>
            <Button
              title="Disabled Button"
              onPress={() => {}}
              disabled
            />
          </ButtonWrapper>
        </ButtonContainer>
      </ContentContainer>
    </ScreenContainer>
  );
};
