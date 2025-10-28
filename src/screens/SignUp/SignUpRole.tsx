import React, { useState } from "react";
import styled from "styled-components/native";
import { SafeAreaView, TouchableOpacity, Image } from "react-native";
import { Text, Button, ProgressBar } from "../../components";
import { BackIcon } from "../../components/icons";
import { theme } from "../../styles";

interface SignUpRoleProps {
  userName: string;
  onComplete: (role: "USER" | "MANAGER") => void;
  onVerifyManager: () => void;
  onBack: () => void;
}

type RoleType = "USER" | "MANAGER" | null;

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

const RoleOptionsContainer = styled.View`
  flex-direction: row;
`;

interface RoleCardProps {
  selected: boolean;
}

const RoleCard = styled(TouchableOpacity)<RoleCardProps>`
  flex: 1;
  background-color: ${theme.colors.background};
  border-radius: ${theme.borderRadius.lg}px;
  padding-top: ${theme.spacing.xl}px;
  padding-bottom: ${theme.spacing.xl}px;
  padding-left: ${theme.spacing.lg}px;
  padding-right: ${theme.spacing.lg}px;
  border-width: 2px;
  border-color: ${({ selected }: RoleCardProps) =>
    selected ? "#0BC1BF" : theme.colors.border};
  align-items: center;
  justify-content: space-between;
  margin-right: ${theme.spacing.md}px;
`;

const RoleImage = styled(Image)`
  width: 120px;
  height: 120px;
`;

const TextContainer = styled.View`
  align-items: center;
`;

const RoleTitle = styled.View`
  margin-bottom: 2px;
`;

const ButtonWrapper = styled.View`
  padding-left: ${theme.spacing.lg}px;
  padding-right: ${theme.spacing.lg}px;
  padding-bottom: ${theme.spacing.xl}px;
  padding-top: ${theme.spacing.md}px;
  background-color: ${theme.colors.background};
`;

export const SignUpRole = ({
  userName,
  onComplete,
  onVerifyManager,
  onBack,
}: SignUpRoleProps) => {
  const [selectedRole, setSelectedRole] = useState<RoleType>(null);

  const handleRoleSelect = (role: RoleType) => {
    setSelectedRole(role);
  };

  const handleComplete = () => {
    if (selectedRole === "USER") {
      onComplete(selectedRole);
    } else if (selectedRole === "MANAGER") {
      onVerifyManager();
    }
  };

  const getButtonTitle = () => {
    if (selectedRole === "USER") {
      return "시작하기";
    } else if (selectedRole === "MANAGER") {
      return "인증하기";
    }
    return "시작하기";
  };

  return (
    <ScreenContainer>
      <HeaderWrapper>
        <BackButton onPress={onBack}>
          <BackIcon />
        </BackButton>
        <ProgressBarWrapper>
          <ProgressBar currentStep={4} totalSteps={4} />
        </ProgressBarWrapper>
        <PlaceholderView />
      </HeaderWrapper>

      <ContentContainer>
        <TitleWrapper>
          <Text size="xxl" weight="bold" color={theme.colors.text.primary}>
            <Text size="xxl" weight="bold" color="#0BC1BF">
              {userName}
            </Text>
            님 반가워요!
          </Text>
          <Text size="xl" weight="medium" color={theme.colors.text.primary}>
            당신의 역할을 선택해주세요.
          </Text>
        </TitleWrapper>

        <RoleOptionsContainer>
          <RoleCard
            selected={selectedRole === "USER"}
            onPress={() => handleRoleSelect("USER")}
            activeOpacity={0.7}
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.08,
              shadowRadius: 2,
              elevation: 1,
            }}
          >
            <TextContainer>
              <RoleTitle>
                <Text size="xl" weight="bold" color={theme.colors.text.primary}>
                  사용자
                </Text>
              </RoleTitle>
              <Text
                size="md"
                weight="medium"
                color={theme.colors.text.secondary}
              >
                도움이 필요해요!
              </Text>
            </TextContainer>
            <RoleImage
              source={require("../../../assets/roles/user.png")}
              resizeMode="contain"
            />
          </RoleCard>

          <RoleCard
            selected={selectedRole === "MANAGER"}
            onPress={() => handleRoleSelect("MANAGER")}
            activeOpacity={0.7}
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.08,
              shadowRadius: 2,
              elevation: 1,
              marginRight: 0,
            }}
          >
            <TextContainer>
              <RoleTitle>
                <Text size="xl" weight="bold" color={theme.colors.text.primary}>
                  동행자
                </Text>
              </RoleTitle>
              <Text
                size="md"
                weight="medium"
                color={theme.colors.text.secondary}
              >
                도움을 주고싶어요!
              </Text>
            </TextContainer>
            <RoleImage
              source={require("../../../assets/roles/manager.png")}
              resizeMode="contain"
            />
          </RoleCard>
        </RoleOptionsContainer>
      </ContentContainer>

      <ButtonWrapper>
        <Button
          title={getButtonTitle()}
          onPress={handleComplete}
          disabled={selectedRole === null}
        />
      </ButtonWrapper>
    </ScreenContainer>
  );
};
