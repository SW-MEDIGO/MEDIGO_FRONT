import React, { useState } from "react";
import styled from "styled-components/native";
import { SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { InputField, Text, Container, Button, ProgressBar } from "../../components";
import { BackIcon } from "../../components/icons";
import { theme } from "../../styles";

interface SignUpUserInfoProps {
  initialData: {
    name: string;
    phoneNumber: string;
  };
  onComplete: (data: { name: string; phoneNumber: string }) => void;
  onBack: () => void;
}

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

const ContentContainer = styled(ScrollView)`
  flex: 1;
  padding-left: ${theme.spacing.lg}px;
  padding-right: ${theme.spacing.lg}px;
`;

const TitleWrapper = styled.View`
  margin-top: ${theme.spacing.xl}px;
  margin-bottom: ${theme.spacing.xxl}px;
`;

const InputWrapper = styled.View`
  margin-bottom: ${theme.spacing.lg}px;
`;

const ButtonWrapper = styled.View`
  padding-left: ${theme.spacing.lg}px;
  padding-right: ${theme.spacing.lg}px;
  padding-bottom: ${theme.spacing.xl}px;
  padding-top: ${theme.spacing.md}px;
  background-color: ${theme.colors.background};
`;

export const SignUpUserInfo = ({ initialData, onComplete, onBack }: SignUpUserInfoProps) => {
  const [name, setName] = useState(initialData.name);
  const [phoneNumber, setPhoneNumber] = useState(initialData.phoneNumber);

  // 전화번호 형식 검증 (010-xxxx-xxxx 또는 01xxxxxxxxx)
  const validatePhoneNumber = (phone: string): boolean => {
    const phoneRegex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
    return phoneRegex.test(phone);
  };

  // 전화번호 자동 포맷팅 (하이픈 추가)
  const formatPhoneNumber = (text: string) => {
    const cleaned = text.replace(/\D/g, "");
    let formatted = cleaned;

    if (cleaned.length <= 3) {
      formatted = cleaned;
    } else if (cleaned.length <= 7) {
      formatted = `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
    } else if (cleaned.length <= 11) {
      formatted = `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7)}`;
    }

    return formatted;
  };

  const handlePhoneNumberChange = (text: string) => {
    const formatted = formatPhoneNumber(text);
    setPhoneNumber(formatted);
  };

  const getPhoneNumberMessage = () => {
    if (!phoneNumber) return { type: "helper", text: undefined };
    const isValid = validatePhoneNumber(phoneNumber);
    if (!isValid) {
      return { type: "error", text: "올바른 전화번호 형식으로 입력해주세요" };
    }
    return { type: "helper", text: undefined };
  };

  const phoneNumberMessage = getPhoneNumberMessage();

  // 모든 필드가 유효한지 확인
  const isAllValid = name.trim() !== "" && phoneNumber !== "" && phoneNumberMessage.type !== "error";

  return (
    <ScreenContainer>
      <HeaderWrapper>
        <BackButton onPress={onBack}>
          <BackIcon />
        </BackButton>
        <ProgressBarWrapper>
          <ProgressBar
            currentStep={2}
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
            개인 정보를 입력해 주세요
          </Text>
        </TitleWrapper>

        <InputWrapper>
          <InputField
            label="이름"
            placeholder="이름을 입력하세요"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />
        </InputWrapper>

        <InputWrapper>
          <InputField
            label="전화번호"
            placeholder="010-1234-5678"
            value={phoneNumber}
            onChangeText={handlePhoneNumberChange}
            keyboardType="phone-pad"
            errorText={phoneNumberMessage.type === "error" ? phoneNumberMessage.text : undefined}
          />
        </InputWrapper>
      </ContentContainer>

      <ButtonWrapper>
        <Button
          title="다음"
          onPress={() => onComplete({ name, phoneNumber })}
          disabled={!isAllValid}
        />
      </ButtonWrapper>
    </ScreenContainer>
  );
};
