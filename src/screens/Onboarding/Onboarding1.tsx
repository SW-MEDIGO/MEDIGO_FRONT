import React from "react";
import { Image, Dimensions } from "react-native";
import styled from "styled-components/native";
import { theme } from "../../styles";
// import { ProgressBar } from "../../components";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.background};
  justify-content: center;
  align-items: center;
  padding: 0 24px;
`;

const ImageContainer = styled.View`
  flex: 0.75;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  padding-bottom: 15px;
`;

const OnboardingImage = styled.Image`
  width: ${screenWidth - 48}px;
  height: ${screenHeight * 0.55}px;
  resize-mode: contain;
`;

const TextContainer = styled.View`
  flex: 0.25;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: 0;
`;

const MainTitle = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: ${theme.colors.text.primary};
  text-align: center;
  margin-bottom: 4px;
  line-height: 36px;
`;

const SubTitle = styled.Text`
  font-size: 18px;
  font-weight: 400;
  color: #4a4a4a;
  text-align: center;
  margin-bottom: 16px;
  line-height: 24px;
`;

// const ProgressContainer = styled.View`
//   align-items: center;
// `;

interface Onboarding1Props {
  onComplete?: () => void;
}

export const Onboarding1 = ({ onComplete }: Onboarding1Props) => {
  return (
    <Container>
      <ImageContainer>
        <OnboardingImage source={require("../../../assets/onboarding/onboarding1.png")} />
      </ImageContainer>

      <TextContainer>
        <MainTitle>당신의 병원길</MainTitle>
        <SubTitle>메디고가 함께합니다</SubTitle>
      </TextContainer>
    </Container>
  );
};
