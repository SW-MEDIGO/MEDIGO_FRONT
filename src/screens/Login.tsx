import React, { useState } from "react";
import { View, Alert, TouchableOpacity, ScrollView } from "react-native";
import styled from "styled-components/native";
import { theme } from "../styles";
import { LogoIcon } from "../components/icons";
import { InputField } from "../components/InputField";
import { Button } from "../components/Button";
import { Text } from "../components/Text";

interface LoginProps {
  onLoginSuccess: () => void;
  onSignUpPress: () => void;
  onFindIdPress: () => void;
  onFindPasswordPress: () => void;
}

const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.background};
  padding-left: ${theme.spacing.lg}px;
  padding-right: ${theme.spacing.lg}px;
`;

const ScrollContainer = styled.ScrollView`
  flex: 1;
`;

const Content = styled.View`
  flex: 1;
  justify-content: center;
  padding-top: ${theme.spacing.xl}px;
  padding-bottom: ${theme.spacing.xxxl}px;
`;

const LogoContainer = styled.View`
  align-items: center;
  margin-top: ${theme.spacing.xxxl}px;
  margin-bottom: ${theme.spacing.xxxl}px;
`;

const InputContainer = styled.View`
  margin-bottom: ${theme.spacing.xl}px;
`;

const ButtonContainer = styled.View`
  margin-bottom: ${theme.spacing.xl}px;
`;

const LinkContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: ${theme.spacing.lg}px;
`;

const LinkText = styled.Text`
  font-family: ${theme.fonts.primary};
  font-size: ${theme.fontSize.md}px;
  color: ${theme.colors.text.secondary};
  margin-left: ${theme.spacing.sm}px;
  margin-right: ${theme.spacing.sm}px;
`;

const SignUpLink = styled.TouchableOpacity``;

const SignUpText = styled.Text`
  font-family: ${theme.fonts.primary};
  font-size: ${theme.fontSize.md}px;
  color: #0bc1bf;
  font-weight: ${theme.fontWeight.medium};
`;

const FindIdLink = styled.TouchableOpacity``;

const FindIdText = styled.Text`
  font-family: ${theme.fonts.primary};
  font-size: ${theme.fontSize.md}px;
  color: #999999;
`;

const FindPasswordLink = styled.TouchableOpacity``;

const FindPasswordText = styled.Text`
  font-family: ${theme.fonts.primary};
  font-size: ${theme.fontSize.md}px;
  color: #999999;
`;

const DividerContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${theme.spacing.xl}px;
`;

const DividerLine = styled.View`
  flex: 1;
  height: 1px;
  background-color: ${theme.colors.border};
`;

const DividerText = styled.Text`
  font-family: ${theme.fonts.primary};
  font-size: ${theme.fontSize.sm}px;
  color: ${theme.colors.text.secondary};
  margin-left: ${theme.spacing.md}px;
  margin-right: ${theme.spacing.md}px;
`;

const SnsContainer = styled.View`
  align-items: center;
`;

const SnsText = styled.Text`
  font-family: ${theme.fonts.primary};
  font-size: ${theme.fontSize.sm}px;
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.spacing.md}px;
`;

const SnsButtonContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  gap: ${theme.spacing.md}px;
`;

const SnsButton = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const SnsButtonImage = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

export const Login = ({ onLoginSuccess, onSignUpPress, onFindIdPress, onFindPasswordPress }: LoginProps) => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // 간단한 유효성 검사
    if (!userId.trim() || !password.trim()) {
      Alert.alert("알림", "아이디와 비밀번호를 입력해주세요.");
      return;
    }

    // 임시 로그인 로직 (실제로는 API 호출)
    if (userId === "test" && password === "1234") {
      onLoginSuccess();
    } else {
      Alert.alert("알림", "아이디 또는 비밀번호가 일치하지 않습니다.");
    }
  };

  const handleSnsLogin = (provider: string) => {
    Alert.alert("알림", `${provider} 로그인 기능은 준비 중입니다.`);
  };

  return (
    <Container>
      <ScrollContainer contentContainerStyle={{ flexGrow: 1 }}>
        <Content>
          <LogoContainer>
            <LogoIcon
              width={220}
              height={68}
            />
          </LogoContainer>

          <InputContainer>
            <InputField
              label="아이디"
              placeholder="아이디를 입력하세요"
              value={userId}
              onChangeText={setUserId}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </InputContainer>

          <InputContainer>
            <InputField
              label="비밀번호"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              containerStyle={{ marginBottom: theme.spacing.lg }}
            />
          </InputContainer>

          <ButtonContainer>
            <Button
              title="로그인"
              onPress={handleLogin}
            />
          </ButtonContainer>

          <LinkContainer>
            <SignUpLink onPress={onSignUpPress}>
              <SignUpText>회원가입</SignUpText>
            </SignUpLink>
            <LinkText>|</LinkText>
            <FindIdLink onPress={onFindIdPress}>
              <FindIdText>아이디 찾기</FindIdText>
            </FindIdLink>
            <LinkText>|</LinkText>
            <FindPasswordLink onPress={onFindPasswordPress}>
              <FindPasswordText>비밀번호 찾기</FindPasswordText>
            </FindPasswordLink>
          </LinkContainer>

          <DividerContainer>
            <DividerLine />
            <DividerText>SNS 간편 로그인</DividerText>
            <DividerLine />
          </DividerContainer>

          <SnsContainer>
            <SnsButtonContainer>
              <SnsButton onPress={() => handleSnsLogin("카카오")}>
                <SnsButtonImage source={require("../../assets/login/KakaoLogin.png")} />
              </SnsButton>
              <SnsButton onPress={() => handleSnsLogin("네이버")}>
                <SnsButtonImage source={require("../../assets/login/NaverLogin.png")} />
              </SnsButton>
              <SnsButton onPress={() => handleSnsLogin("구글")}>
                <SnsButtonImage source={require("../../assets/login/GoogleLogin.png")} />
              </SnsButton>
              <SnsButton onPress={() => handleSnsLogin("애플")}>
                <SnsButtonImage source={require("../../assets/login/AppleLogin.png")} />
              </SnsButton>
            </SnsButtonContainer>
          </SnsContainer>
        </Content>
      </ScrollContainer>
    </Container>
  );
};
