import React from "react";
import styled from "styled-components/native";
import { View, TouchableOpacity, SafeAreaView } from "react-native";
import { Text } from "../components";
import { BackIcon, UserIcon, CheckIcon } from "../components/icons";
import { theme } from "../styles";

interface FamilyProps {
  onBack?: () => void;
}

const Screen = styled(SafeAreaView)`
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

const ContentContainer = styled.ScrollView`
  flex: 1;
  padding-left: ${theme.spacing.lg}px;
  padding-right: ${theme.spacing.lg}px;
`;

const UserCard = styled.View`
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg}px;
  padding: 20px;
  margin-bottom: 12px;
  flex-direction: row;
  align-items: center;
`;

const Avatar = styled.View`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  background-color: ${theme.colors.surface};
  align-items: center;
  justify-content: center;
  margin-right: ${theme.spacing.lg}px;
`;

const UserInfo = styled.View`
  flex: 1;
`;

const UserName = styled(Text)`
  font-size: ${theme.fontSize.md}px;
`;

const HeartContainer = styled.View`
  width: 28px;
  height: 28px;
  align-items: center;
  justify-content: center;
`;

const RegisterButtonContainer = styled.View`
  margin-top: ${theme.spacing.md}px;
`;

const RegisterButton = styled.TouchableOpacity`
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.md}px;
  padding: ${theme.spacing.md}px;
  align-items: center;
  border: 1px solid ${theme.colors.border};
`;

const RegisterButtonText = styled(Text)`
  color: #ff9500;
  font-size: ${theme.fontSize.md}px;
`;

export const FamilyScreen: React.FC<FamilyProps> = ({ onBack }) => {
  return (
    <Screen>
      <HeaderWrapper>
        <BackButton onPress={onBack}>
          <BackIcon />
        </BackButton>
        <Text
          size="lg"
          weight="semibold"
          color={theme.colors.text.primary}
        >
          가족관리
        </Text>
        <View style={{ width: 40 }} />
      </HeaderWrapper>

      <ContentContainer showsVerticalScrollIndicator={false}>
        <UserCard
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 2,
          }}
        >
          <Avatar>
            <UserIcon
              width={28}
              height={28}
              fill={theme.colors.text.secondary}
            />
          </Avatar>
          <UserInfo>
            <UserName>장은성 (본인)</UserName>
          </UserInfo>
          <HeartContainer>
            <CheckIcon
              width={24}
              height={24}
              fill={theme.colors.success}
            />
          </HeartContainer>
        </UserCard>

        <RegisterButtonContainer>
          <RegisterButton
            onPress={() => {}}
            activeOpacity={0.8}
          >
            <RegisterButtonText>가족등록</RegisterButtonText>
          </RegisterButton>
        </RegisterButtonContainer>
      </ContentContainer>
    </Screen>
  );
};

export default FamilyScreen;
