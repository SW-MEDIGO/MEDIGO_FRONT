import React, { useState } from "react";
import styled from "styled-components/native";
import { SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";
import { InputField, Text, Container, Button, ProgressBar } from "../../components";
import { BackIcon } from "../../components/icons";
import { theme } from "../../styles";

interface SignUpAccountProps {
  initialData: {
    userId: string;
    email: string;
    password: string;
    passwordConfirm: string;
  };
  onComplete: (data: { userId: string; email: string; password: string; passwordConfirm: string }) => void;
  onBack: () => void;
}

const ScreenContainer = styled(SafeAreaView)`
  flex: 1;
  background-color: ${theme.colors.background};
`;

const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding-left: ${theme.spacing.lg}px;
  padding-right: ${theme.spacing.lg}px;
  padding-top: ${theme.spacing.xl}px;
  padding-bottom: ${theme.spacing.md}px;
`;

const BackButton = styled(TouchableOpacity)`
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
`;

const ProgressBarWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
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

export const SignUpAccount = ({ initialData, onComplete, onBack }: SignUpAccountProps) => {
  const [userId, setUserId] = useState(initialData.userId);
  const [email, setEmail] = useState(initialData.email);
  const [password, setPassword] = useState(initialData.password);
  const [passwordConfirm, setPasswordConfirm] = useState(initialData.passwordConfirm);

  // 아이디 중복 확인 (임시)
  const checkUserIdDuplicate = (id: string): boolean => {
    if (!id) return false;
    const duplicateIds = ["admin", "test", "user"]; // 임시 중복 아이디 목록
    return duplicateIds.includes(id.toLowerCase());
  };

  // 이메일 형식 검증
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // 이메일 중복 확인 (임시)
  const checkEmailDuplicate = (email: string): boolean => {
    if (!email) return false;
    const duplicateEmails = ["test@test.com", "admin@test.com"]; // 임시 중복 이메일 목록
    return duplicateEmails.includes(email.toLowerCase());
  };

  const getUserIdMessage = () => {
    if (!userId) return { type: "helper", text: undefined };
    const isDuplicate = checkUserIdDuplicate(userId);
    if (isDuplicate) {
      return { type: "error", text: "중복된 아이디입니다" };
    }
    return { type: "success", text: "사용 가능한 아이디입니다" };
  };

  const getEmailMessage = () => {
    if (!email) return { type: "helper", text: undefined };
    const isValidFormat = validateEmail(email);
    if (!isValidFormat) {
      return { type: "error", text: "이메일 형식으로 입력해주세요" };
    }
    const isDuplicate = checkEmailDuplicate(email);
    if (isDuplicate) {
      return { type: "error", text: "중복된 이메일입니다" };
    }
    return { type: "success", text: "사용 가능한 이메일입니다" };
  };

  // 비밀번호 유효성 검사
  const validatePassword = (password: string): boolean => {
    if (password.length < 8) return false;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    return specialCharRegex.test(password);
  };

  const getPasswordMessage = () => {
    if (!password) return { type: "helper", text: undefined };
    const isValid = validatePassword(password);
    if (!isValid) {
      return { type: "error", text: "8자 이상, 특수 문자 1개 이상을 포함하는 비밀번호" };
    }
    return { type: "success", text: "사용 가능한 비밀번호입니다" };
  };

  const getPasswordConfirmMessage = () => {
    if (!passwordConfirm) return { type: "helper", text: undefined };
    if (password !== passwordConfirm) {
      return { type: "error", text: "비밀번호가 일치하지 않습니다" };
    }
    return { type: "success", text: "비밀번호가 일치합니다" };
  };

  const userIdMessage = getUserIdMessage();
  const emailMessage = getEmailMessage();
  const passwordMessage = getPasswordMessage();
  const passwordConfirmMessage = getPasswordConfirmMessage();

  // 모든 필드가 유효한지 확인
  const isAllValid =
    userId !== "" &&
    userIdMessage.type === "success" &&
    email !== "" &&
    emailMessage.type === "success" &&
    password !== "" &&
    passwordMessage.type === "success" &&
    passwordConfirm !== "" &&
    passwordConfirmMessage.type === "success";

  return (
    <ScreenContainer>
      <HeaderContainer>
        <BackButton onPress={onBack}>
          <BackIcon />
        </BackButton>
        <ProgressBarWrapper>
          <ProgressBar
            currentStep={1}
            totalSteps={4}
          />
        </ProgressBarWrapper>
        <View style={{ width: 40 }} />
      </HeaderContainer>

      <ContentContainer>
        <TitleWrapper>
          <Text
            size="xxl"
            weight="bold"
            color={theme.colors.text.primary}
          >
            계정 정보를 입력해 주세요
          </Text>
        </TitleWrapper>

        <InputWrapper>
          <InputField
            label="아이디"
            placeholder="아이디를 입력하세요"
            value={userId}
            onChangeText={setUserId}
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect={false}
            textContentType="none"
            importantForAutofill="no"
            errorText={userIdMessage.type === "error" ? userIdMessage.text : undefined}
            successText={userIdMessage.type === "success" ? userIdMessage.text : undefined}
          />
        </InputWrapper>

        <InputWrapper>
          <InputField
            label="이메일"
            placeholder="이메일을 입력하세요"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect={false}
            textContentType="none"
            importantForAutofill="no"
            errorText={emailMessage.type === "error" ? emailMessage.text : undefined}
            successText={emailMessage.type === "success" ? emailMessage.text : undefined}
          />
        </InputWrapper>

        <InputWrapper>
          <InputField
            label="비밀번호"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoComplete="password"
            textContentType="oneTimeCode"
            errorText={passwordMessage.type === "error" ? passwordMessage.text : undefined}
            successText={passwordMessage.type === "success" ? passwordMessage.text : undefined}
          />
        </InputWrapper>

        <InputWrapper>
          <InputField
            label="비밀번호 확인"
            placeholder="비밀번호를 다시 입력하세요"
            value={passwordConfirm}
            onChangeText={setPasswordConfirm}
            secureTextEntry
            autoComplete="password"
            textContentType="oneTimeCode"
            errorText={passwordConfirmMessage.type === "error" ? passwordConfirmMessage.text : undefined}
            successText={passwordConfirmMessage.type === "success" ? passwordConfirmMessage.text : undefined}
          />
        </InputWrapper>
      </ContentContainer>

      <ButtonWrapper>
        <Button
          title="다음"
          onPress={() => onComplete({ userId, email, password, passwordConfirm })}
          disabled={!isAllValid}
        />
      </ButtonWrapper>
    </ScreenContainer>
  );
};
