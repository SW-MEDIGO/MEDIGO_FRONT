import React, { useState } from "react";
import styled from "styled-components/native";
import { SafeAreaView, TouchableOpacity, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { Text, Button } from "../../components";
import { BackIcon } from "../../components/icons";
import { theme } from "../../styles";

interface VerifyPolicyProps {
  onComplete: (data: {
    privacyProtection: boolean;
    confidentiality: boolean;
    dataSecurity: boolean;
    serviceTerms: boolean;
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

export const VerifyPolicy = ({ onComplete, onBack }: VerifyPolicyProps) => {
  const [privacyProtection, setPrivacyProtection] = useState(false);
  const [confidentiality, setConfidentiality] = useState(false);
  const [dataSecurity, setDataSecurity] = useState(false);
  const [serviceTerms, setServiceTerms] = useState(false);

  // 모두 동의 상태 계산
  const allAgreed = privacyProtection && confidentiality && dataSecurity && serviceTerms;

  // 필수 항목 모두 체크되었는지 확인
  const requiredAgreed = privacyProtection && confidentiality && dataSecurity && serviceTerms;

  // 모두 동의 토글
  const toggleAllAgreed = () => {
    const newValue = !allAgreed;
    setPrivacyProtection(newValue);
    setConfidentiality(newValue);
    setDataSecurity(newValue);
    setServiceTerms(newValue);
  };

  return (
    <ScreenContainer>
      <HeaderWrapper>
        <BackButton onPress={onBack}>
          <BackIcon />
        </BackButton>
        <Text
          size="lg"
          weight="semibold"
          color={theme.colors.text.primary}
        >
          약관 동의
        </Text>
        <View style={{ width: 40 }} />
      </HeaderWrapper>

      <ContentContainer>
        <TitleWrapper>
          <Text
            size="xxl"
            weight="bold"
            color={theme.colors.text.primary}
          >
            동행자로서
          </Text>
          <Text
            size="xxl"
            weight="bold"
            color={theme.colors.text.primary}
          >
            약관에 동의해주세요
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

          <CheckboxItem onPress={() => setPrivacyProtection(!privacyProtection)}>
            <CheckboxIconWrapper checked={privacyProtection}>
              <CheckIcon checked={privacyProtection} />
            </CheckboxIconWrapper>
            <CheckboxLabel>
              <Text
                size="md"
                weight="normal"
                color={theme.colors.text.primary}
              >
                (필수) 개인정보 보호 및 처리방침에 동의합니다.
              </Text>
            </CheckboxLabel>
          </CheckboxItem>

          <CheckboxItem onPress={() => setConfidentiality(!confidentiality)}>
            <CheckboxIconWrapper checked={confidentiality}>
              <CheckIcon checked={confidentiality} />
            </CheckboxIconWrapper>
            <CheckboxLabel>
              <Text
                size="md"
                weight="normal"
                color={theme.colors.text.primary}
              >
                (필수) 사용자 정보 기밀유지 및 비밀보장에 동의합니다.
              </Text>
            </CheckboxLabel>
          </CheckboxItem>

          <CheckboxItem onPress={() => setDataSecurity(!dataSecurity)}>
            <CheckboxIconWrapper checked={dataSecurity}>
              <CheckIcon checked={dataSecurity} />
            </CheckboxIconWrapper>
            <CheckboxLabel>
              <Text
                size="md"
                weight="normal"
                color={theme.colors.text.primary}
              >
                (필수) 개인정보 무단 유출 금지 및 데이터 보안에 동의합니다.
              </Text>
            </CheckboxLabel>
          </CheckboxItem>

          <CheckboxItem onPress={() => setServiceTerms(!serviceTerms)}>
            <CheckboxIconWrapper checked={serviceTerms}>
              <CheckIcon checked={serviceTerms} />
            </CheckboxIconWrapper>
            <CheckboxLabel>
              <Text
                size="md"
                weight="normal"
                color={theme.colors.text.primary}
              >
                (필수) 동행자 서비스 이용약관에 동의합니다.
              </Text>
            </CheckboxLabel>
          </CheckboxItem>
        </CheckboxList>
      </ContentContainer>

      <ButtonWrapper>
        <Button
          title="동행자 등록 완료"
          onPress={() =>
            onComplete({
              privacyProtection,
              confidentiality,
              dataSecurity,
              serviceTerms,
            })
          }
          disabled={!requiredAgreed}
        />
      </ButtonWrapper>
    </ScreenContainer>
  );
};
