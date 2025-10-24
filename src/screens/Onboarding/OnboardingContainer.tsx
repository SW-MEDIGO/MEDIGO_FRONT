import React, { useState, useRef } from "react";
import { Dimensions } from "react-native";
import PagerView from "react-native-pager-view";
import styled from "styled-components/native";
import { theme } from "../../styles";
import { ProgressBar } from "../../components";
import { Onboarding1 } from "./Onboarding1";
import { Onboarding2 } from "./Onboarding2";
import { Onboarding3 } from "./Onboarding3";
import { Onboarding4 } from "./Onboarding4";

const { width: screenWidth } = Dimensions.get("window");

const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.background};
`;

const PagerContainer = styled.View`
  flex: 1;
`;

const BottomContainer = styled.View`
  padding: 16px 24px 24px 24px;
  align-items: center;
  background-color: ${theme.colors.background};
  min-height: 60px;
  justify-content: center;
`;

const ProgressContainer = styled.View`
  align-items: center;
`;

interface OnboardingContainerProps {
  onComplete: () => void;
}

const onboardingPages = [
  {
    id: 1,
    component: Onboarding1,
    title: "당신의 병원길",
    subtitle: "메디고가 함께합니다",
  },
  {
    id: 2,
    component: Onboarding2,
    title: "편리한 예약",
    subtitle: "원하는 시간에 쉽게 예약하세요",
  },
  {
    id: 3,
    component: Onboarding3,
    title: "안전한 진료",
    subtitle: "검증된 의료진과 안전한 진료를 받으세요",
  },
  {
    id: 4,
    component: Onboarding4,
    title: "시작해보세요",
    subtitle: "메디고와 함께 건강한 병원길을 시작하세요",
  },
];

export const OnboardingContainer = ({ onComplete }: OnboardingContainerProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const pagerRef = useRef<PagerView>(null);

  const handlePageSelected = (event: any) => {
    setCurrentPage(event.nativeEvent.position);
  };

  const handlePageChange = () => {
    // 페이지 변경 시에는 아무것도 하지 않음
    // 마지막 페이지에서는 버튼을 눌러야만 완료됨
  };

  return (
    <Container>
      <PagerContainer>
        <PagerView
          ref={pagerRef}
          style={{ flex: 1 }}
          initialPage={0}
          onPageSelected={handlePageSelected}
        >
          {onboardingPages.map((page, index) => {
            const PageComponent = page.component;
            // 마지막 페이지(Onboarding4)에만 onComplete prop 전달
            if (index === onboardingPages.length - 1) {
              return (
                <PageComponent
                  key={page.id}
                  onComplete={onComplete}
                />
              );
            }
            return <PageComponent key={page.id} />;
          })}
        </PagerView>
      </PagerContainer>

      <BottomContainer>
        <ProgressContainer>
          <ProgressBar
            currentStep={currentPage + 1}
            totalSteps={onboardingPages.length}
          />
        </ProgressContainer>
      </BottomContainer>
    </Container>
  );
};
