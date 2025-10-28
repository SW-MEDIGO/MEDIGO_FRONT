// src/screens/MyPageScreen.tsx
import React from "react";
import styled from "styled-components/native";
import { View, Alert, Image, TouchableOpacity } from "react-native"; // ← 추가
import { SafeAreaView } from "react-native-safe-area-context";
import { Container, Text } from "../components";
import { theme } from "../styles";

const ScreenContainer = styled(SafeAreaView)`
  flex: 1;
  background-color: ${theme.colors.surface};
  padding-top: ${theme.spacing.md + 36}px;
`;

const Scroll = styled.ScrollView`
  flex: 1;
`;

const Card = styled.View`
  background-color: ${theme.colors.background};
  border-radius: ${theme.borderRadius.lg}px;
  padding: ${theme.spacing.lg}px;
  margin: ${theme.spacing.md}px;
  /* subtle shadow */
  shadow-color: #000;
  shadow-opacity: 0.08;
  shadow-radius: 8px;
  shadow-offset: 0px 2px;
  elevation: 2;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Avatar = styled.View`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  background-color: ${theme.colors.primary};
  align-items: center;
  justify-content: center;
  margin-right: ${theme.spacing.md}px;
`;

const IconCircle = styled.View`
  width: 36px;
  height: 36px;
  border-radius: 18px;
  background-color: ${theme.colors.surface};
  align-items: center;
  justify-content: center;
`;

const Menu = styled.View`
  background-color: ${theme.colors.background};
  border-radius: ${theme.borderRadius.lg}px;
  margin: 0 ${theme.spacing.md}px ${theme.spacing.md}px;
  overflow: hidden;
`;

const Divider = styled.View`
  height: 1px;
  background-color: ${theme.colors.surface};
  margin-left: ${theme.spacing.lg}px;
`;

const ItemRow = styled.TouchableOpacity`
  padding: ${theme.spacing.lg}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const RightArrow = () => (
  <View
    style={{
      width: 16,
      height: 16,
      borderRightWidth: 2,
      borderTopWidth: 2,
      transform: [{ rotate: "45deg" }],
      borderColor: theme.colors.textSecondary,
    }}
  />
);

const SmallGap = styled.View`
  width: ${theme.spacing.lg}px;
`;

const QuickActions = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

/* ✅ 아이콘 경로 (src/screens → 루트 /assets) */
const IC_FAMILY = require("../../assets/family.png");
const IC_WALLET = require("../../assets/wallet.png");
const IC_GEAR = require("../../assets/setting.png");

/* ✅ QuickAction: 아이콘 + 터치 가능 */
const QuickAction = ({
  label,
  icon,
  onPress,
}: {
  label: string;
  icon: any;
  onPress?: () => void;
}) => (
  <TouchableOpacity
    activeOpacity={0.8}
    onPress={onPress}
    style={{ alignItems: "center", flex: 1 }}
  >
    <IconCircle>
      <Image
        source={icon}
        style={{ width: 24, height: 24, resizeMode: "contain" }}
      />
    </IconCircle>
    <View style={{ height: theme.spacing.sm }} />
    <Text size="sm" color={theme.colors.textSecondary}>
      {label}
    </Text>
  </TouchableOpacity>
);

/* ✅ MenuItem: onPress 받도록 */
const MenuItem = ({
  title,
  onPress,
}: {
  title: string;
  onPress?: () => void;
}) => (
  <ItemRow activeOpacity={0.7} onPress={onPress}>
    <Text size="md">{title}</Text>
    <RightArrow />
  </ItemRow>
);

interface FamilyProps {
  onBack?: () => void;
}

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${theme.spacing.md}px;
  padding-top: ${theme.spacing.sm}px;
`;

const BackButton = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
  align-items: center;
  justify-content: center;
`;

const BackArrow = styled.View`
  width: 8px;
  height: 8px;
  border-left-width: 2px;
  border-bottom-width: 2px;
  transform: rotate(45deg);
  border-color: ${theme.colors.black};
`;

const HeaderTitle = styled(Text)`
  flex: 1;
  text-align: center;
  font-size: ${theme.fontSize.lg}px;
  font-weight: ${theme.fontWeight.semibold};
  margin-right: 24px;
`;

const Content = styled.View`
  flex: 1;
`;

const UserRow = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${theme.spacing.md}px;
`;

const PersonIconContainer = styled.View`
  width: 24px;
  height: 24px;
  align-items: center;
  justify-content: center;
  margin-right: ${theme.spacing.md}px;
`;

const PersonIconBody = styled.View`
  width: 14px;
  height: 10px;
  border-radius: 7px;
  border: 2px solid ${theme.colors.black};
  margin-top: 2px;
`;

const PersonHead = styled.View`
  width: 6px;
  height: 6px;
  border-radius: 3px;
  border: 2px solid ${theme.colors.black};
  align-self: center;
`;

const UserInfo = styled.View`
  flex: 1;
`;

const UserName = styled(Text)`
  font-size: ${theme.fontSize.md}px;
`;

const Checkmark = styled.View`
  width: 16px;
  height: 16px;
  margin-right: ${theme.spacing.md}px;
`;

const CheckmarkSVG = () => (
  <Checkmark>
    <View
      style={{
        width: 10,
        height: 8,
        borderBottomWidth: 2,
        borderRightWidth: 2,
        transform: [{ rotate: "45deg" }],
        borderColor: theme.colors.success,
        marginBottom: 2,
        marginLeft: 2,
      }}
    />
  </Checkmark>
);

const RegisterButtonContainer = styled.View`
  padding: 0 ${theme.spacing.md}px;
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
    <ScreenContainer>
      <Header>
        <BackButton onPress={onBack}>
          <BackArrow />
        </BackButton>
        <HeaderTitle>가족관리</HeaderTitle>
      </Header>

      <Content>
        <UserRow>
          <PersonIconContainer>
            <View>
              <PersonHead />
              <PersonIconBody />
            </View>
          </PersonIconContainer>
          <UserInfo>
            <UserName>장은성 (본인)</UserName>
          </UserInfo>
          <CheckmarkSVG />
        </UserRow>

        <RegisterButtonContainer>
          <RegisterButton
            onPress={() => console.log("register family pressed")}
            activeOpacity={0.8}
          >
            <RegisterButtonText>가족등록</RegisterButtonText>
          </RegisterButton>
        </RegisterButtonContainer>
      </Content>
    </ScreenContainer>
  );
};

export default FamilyScreen;
