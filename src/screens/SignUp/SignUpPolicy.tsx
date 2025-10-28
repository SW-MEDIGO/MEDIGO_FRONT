import React, { useState } from "react";
import styled from "styled-components/native";
import { SafeAreaView, TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";
import { Text, Button, ProgressBar } from "../../components";
import { BackIcon } from "../../components/icons";
import { theme } from "../../styles";

interface SignUpPolicyProps {
  initialData: {
    termsOfService: boolean;
    privacyPolicy: boolean;
    locationService: boolean;
    ageLimit: boolean;
    marketingConsent: boolean;
  };
  onComplete: (data: {
    termsOfService: boolean;
    privacyPolicy: boolean;
    locationService: boolean;
    ageLimit: boolean;
    marketingConsent: boolean;
  }) => void;
  onBack: () => void;
}

interface CheckIconProps {
  checked: boolean;
  size?: number;
}

const CheckIcon = ({ checked, size = 20 }: CheckIconProps) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
  >
    <Path
      d="M7.95831 15.0001L3.20831 10.2501L4.39581 9.06258L7.95831 12.6251L15.6041 4.97925L16.7916 6.16675L7.95831 15.0001Z"
      fill={checked ? "#0BC1BF" : "#797979"}
    />
  </Svg>
);

const ScreenContainer = styled(SafeAreaView)`
  flex: 1;
  background-color: ${theme.colors.background};
`;

const HeaderWrapper = styled.View`
  padding-left: ${theme.spacing.lg}px;
  padding-right: ${theme.spacing.lg}px;
  padding-top: ${theme.spacing.xl}px;
  padding-bottom: ${theme.spacing.md}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const BackButton = styled(TouchableOpacity)`
  padding-top: ${theme.spacing.sm}px;
  padding-bottom: ${theme.spacing.sm}px;
  padding-left: ${theme.spacing.sm}px;
  padding-right: ${theme.spacing.sm}px;
`;

const ProgressBarWrapper = styled.View`
  flex: 1;
  align-items: center;
`;

const PlaceholderView = styled.View`
  width: 30px;
`;

const ContentContainer = styled.View`
  flex: 1;
  padding-left: ${theme.spacing.lg}px;
  padding-right: ${theme.spacing.lg}px;
`;

const TitleWrapper = styled.View`
  margin-top: ${theme.spacing.xl}px;
  margin-bottom: ${theme.spacing.xxl}px;
`;

const CheckboxList = styled.View`
  gap: ${theme.spacing.sm}px;
`;

const CheckboxItem = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  padding-top: ${theme.spacing.md}px;
  padding-bottom: ${theme.spacing.md}px;
  padding-left: ${theme.spacing.sm}px;
  padding-right: ${theme.spacing.sm}px;
`;

interface CheckboxIconWrapperProps {
  checked: boolean;
  size?: number;
}

const CheckboxIconWrapper = styled.View<CheckboxIconWrapperProps>`
  width: ${({ size = 24 }: CheckboxIconWrapperProps) => size}px;
  height: ${({ size = 24 }: CheckboxIconWrapperProps) => size}px;
  align-items: center;
  justify-content: center;
  margin-right: ${theme.spacing.sm}px;
`;

const CheckboxLabel = styled.View`
  flex: 1;
`;

const Divider = styled.View`
  height: 1px;
  background-color: ${theme.colors.border};
  margin-top: ${theme.spacing.md}px;
  margin-bottom: ${theme.spacing.md}px;
`;

const ButtonWrapper = styled.View`
  padding-left: ${theme.spacing.lg}px;
  padding-right: ${theme.spacing.lg}px;
  padding-bottom: ${theme.spacing.xl}px;
  padding-top: ${theme.spacing.md}px;
  background-color: ${theme.colors.background};
`;

export const SignUpPolicy = ({ initialData, onComplete, onBack }: SignUpPolicyProps) => {
  const [termsOfService, setTermsOfService] = useState(initialData.termsOfService);
  const [privacyPolicy, setPrivacyPolicy] = useState(initialData.privacyPolicy);
  const [locationService, setLocationService] = useState(initialData.locationService);
  const [ageLimit, setAgeLimit] = useState(initialData.ageLimit);
  const [marketingConsent, setMarketingConsent] = useState(initialData.marketingConsent);

  // 모두 동의 상태 계산
  const allAgreed = termsOfService && privacyPolicy && locationService && ageLimit && marketingConsent;

  // 필수 항목 모두 체크되었는지 확인
  const requiredAgreed = termsOfService && privacyPolicy && locationService && ageLimit;

  // 모두 동의 토글
  const toggleAllAgreed = () => {
    const newValue = !allAgreed;
    setTermsOfService(newValue);
    setPrivacyPolicy(newValue);
    setLocationService(newValue);
    setAgeLimit(newValue);
    setMarketingConsent(newValue);
  };

  return (
    <ScreenContainer>
      <HeaderWrapper>
        <BackButton onPress={onBack}>
          <BackIcon />
        </BackButton>
        <ProgressBarWrapper>
          <ProgressBar
            currentStep={3}
            totalSteps={4}
          />
        </ProgressBarWrapper>
        <PlaceholderView />
      </HeaderWrapper>

      <ContentContainer>
        <TitleWrapper>
          <Text
            size="xxl"
            weight="bold"
            color={theme.colors.text.primary}
          >
            원활한 서비스 이용을 위해
          </Text>
          <Text
            size="xxl"
            weight="bold"
            color={theme.colors.text.primary}
          >
            필수 약관 동의가 필요해요
          </Text>
        </TitleWrapper>

        <CheckboxList>
          {/* 모두 동의합니다 */}
          <CheckboxItem onPress={toggleAllAgreed}>
            <CheckboxIconWrapper
              checked={allAgreed}
              size={32}
            >
              <CheckIcon
                checked={allAgreed}
                size={28}
              />
            </CheckboxIconWrapper>
            <CheckboxLabel>
              <Text
                size="xl"
                weight="semibold"
                color={theme.colors.text.primary}
              >
                모두 동의합니다.
              </Text>
            </CheckboxLabel>
          </CheckboxItem>

          <CheckboxItem onPress={() => setTermsOfService(!termsOfService)}>
            <CheckboxIconWrapper checked={termsOfService}>
              <CheckIcon checked={termsOfService} />
            </CheckboxIconWrapper>
            <CheckboxLabel>
              <Text
                size="md"
                weight="normal"
                color={theme.colors.text.primary}
              >
                (필수) 서비스 이용약관에 동의합니다.
              </Text>
            </CheckboxLabel>
          </CheckboxItem>

          <CheckboxItem onPress={() => setPrivacyPolicy(!privacyPolicy)}>
            <CheckboxIconWrapper checked={privacyPolicy}>
              <CheckIcon checked={privacyPolicy} />
            </CheckboxIconWrapper>
            <CheckboxLabel>
              <Text
                size="md"
                weight="normal"
                color={theme.colors.text.primary}
              >
                (필수) 개인정보 처리방침에 동의합니다.
              </Text>
            </CheckboxLabel>
          </CheckboxItem>

          <CheckboxItem onPress={() => setLocationService(!locationService)}>
            <CheckboxIconWrapper checked={locationService}>
              <CheckIcon checked={locationService} />
            </CheckboxIconWrapper>
            <CheckboxLabel>
              <Text
                size="md"
                weight="normal"
                color={theme.colors.text.primary}
              >
                (필수) 위치기반 서비스 이용약관에 동의합니다.
              </Text>
            </CheckboxLabel>
          </CheckboxItem>

          <CheckboxItem onPress={() => setAgeLimit(!ageLimit)}>
            <CheckboxIconWrapper checked={ageLimit}>
              <CheckIcon checked={ageLimit} />
            </CheckboxIconWrapper>
            <CheckboxLabel>
              <Text
                size="md"
                weight="normal"
                color={theme.colors.text.primary}
              >
                (필수) 만 14세 이상입니다.
              </Text>
            </CheckboxLabel>
          </CheckboxItem>

          <CheckboxItem onPress={() => setMarketingConsent(!marketingConsent)}>
            <CheckboxIconWrapper checked={marketingConsent}>
              <CheckIcon checked={marketingConsent} />
            </CheckboxIconWrapper>
            <CheckboxLabel>
              <Text
                size="md"
                weight="normal"
                color={theme.colors.text.primary}
              >
                (선택) 마케팅 정보 수신에 동의합니다.
              </Text>
            </CheckboxLabel>
          </CheckboxItem>
        </CheckboxList>
      </ContentContainer>

      <ButtonWrapper>
        <Button
          title="다음"
          onPress={() =>
            onComplete({
              termsOfService,
              privacyPolicy,
              locationService,
              ageLimit,
              marketingConsent,
            })
          }
          disabled={!requiredAgreed}
        />
      </ButtonWrapper>
    </ScreenContainer>
  );
};
