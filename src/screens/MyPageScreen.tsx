// src/screens/MyPageScreen.tsx
import React from "react";
import styled from "styled-components/native";
import { View, Alert, Image, TouchableOpacity, Pressable } from "react-native"; // ← Pressable 추가
import { SafeAreaView } from "react-native-safe-area-context";
import { Container, Text } from "../components";
import { BottomNavigation } from "../components/BottomNavigation";
import { theme } from "../styles";

interface MyPageProps {
  onOpenFamily?: () => void;
  onOpenWallet?: () => void;
  onOpenSettings?: () => void;
  onOpenReview?: () => void;
  onOpenDoctor?: () => void;
  onOpenPharmacy?: () => void;
}

const ScreenContainer = styled(SafeAreaView)`
  flex: 1;
  background-color: ${theme.colors.background};
`;

const Scroll = styled.ScrollView`
  flex: 1;
`;

const Card = styled.View`
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg}px;
  padding: ${theme.spacing.lg}px;
  margin: ${theme.spacing.md}px;
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
  background-color: ${theme.colors.background};
  align-items: center;
  justify-content: center;
`;

const Menu = styled.View`
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg}px;
  margin: 0 ${theme.spacing.md}px ${theme.spacing.md}px;
  overflow: hidden;
`;

const Divider = styled.View`
  height: 1px;
  background-color: ${theme.colors.border};
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
      borderColor: theme.colors.text.secondary,
    }}
  />
);

const QuickActions = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
`;

const IC_FAMILY = require("../../assets/family.png");
const IC_WALLET = require("../../assets/wallet.png");
const IC_GEAR = require("../../assets/setting.png");

/* ✅ QuickAction: 아이콘 + 터치 가능 */
const QuickAction = ({ label, icon, onPress }: { label: string; icon: any; onPress?: () => void }) => (
  <Pressable
    onPress={() => {
      onPress?.();
    }}
    android_ripple={{ color: "#00000011", borderless: false }}
    style={{ alignItems: "center", flex: 1, paddingVertical: theme.spacing.sm }}
    hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
  >
    <IconCircle>
      <Image
        source={icon}
        style={{ width: 24, height: 24, resizeMode: "contain" }}
      />
    </IconCircle>
    <View style={{ height: theme.spacing.sm }} />
    <Text
      size="sm"
      color={theme.colors.text.secondary}
    >
      {label}
    </Text>
  </Pressable>
);

/* ✅ MenuItem: onPress 받도록 */
const MenuItem = ({ title, onPress }: { title: string; onPress?: () => void }) => (
  <ItemRow
    activeOpacity={0.7}
    onPress={onPress}
  >
    <Text size="md">{title}</Text>
    <RightArrow />
  </ItemRow>
);

interface MyPageScreenProps {
  activeTab?: string;
  onTabPress?: (tab: string) => void;
  onOpenFamily?: () => void;
  onOpenWallet?: () => void;
  onOpenSettings?: () => void;
  onOpenReview?: () => void;
  onOpenDoctor?: () => void;
  onOpenPharmacy?: () => void;
  userName?: string;
}

export const MyPageScreen = ({
  activeTab,
  onTabPress,
  onOpenFamily,
  onOpenWallet,
  onOpenSettings,
  onOpenReview,
  onOpenDoctor,
  onOpenPharmacy,
  userName = "사용자",
}: MyPageScreenProps) => {
  return (
    <ScreenContainer>
      <Scroll
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{ paddingBottom: theme.spacing.xxl }}
      >
        <Card
          style={{
            shadowColor: "#000",
            shadowOpacity: 0.08,
            shadowRadius: 8,
            shadowOffset: { width: 0, height: 2 },
            elevation: 2,
          }}
        >
          <Row>
            <Avatar>
              <Text
                weight="bold"
                color={theme.colors.white}
              >
                {userName.charAt(0)}
              </Text>
            </Avatar>
            <View>
              <Text
                size="lg"
                weight="bold"
              >
                {userName}
              </Text>
              <Text
                size="sm"
                color={theme.colors.text.secondary}
              >
                마이페이지
              </Text>
            </View>
          </Row>

          <View style={{ height: theme.spacing.xl }} />
          <QuickActions>
            <QuickAction
              label="가족관리"
              icon={IC_FAMILY}
              onPress={onOpenFamily}
            />
            <View style={{ width: theme.spacing.lg }} />
            <QuickAction
              label="결제수단 관리"
              icon={IC_WALLET}
              onPress={onOpenWallet}
            />
            <View style={{ width: theme.spacing.lg }} />
            <QuickAction
              label="설정"
              icon={IC_GEAR}
              onPress={onOpenSettings}
            />
          </QuickActions>
        </Card>

        <Menu>
          <MenuItem
            title="내 후기"
            onPress={onOpenReview}
          />
          <Divider />
          <MenuItem
            title="단골 의사"
            onPress={onOpenDoctor}
          />
          <Divider />
          <MenuItem
            title="단골 약국"
            onPress={onOpenPharmacy}
          />
        </Menu>

        <Menu>
          <MenuItem
            title="고객센터"
            onPress={() => Alert.alert("고객센터")}
          />
          <Divider />
          <MenuItem
            title="공지사항"
            onPress={() => Alert.alert("공지사항")}
          />
          <Divider />
          <MenuItem
            title="자주하는 질문"
            onPress={() => Alert.alert("자주하는 질문")}
          />
        </Menu>
      </Scroll>

      <BottomNavigation
        activeTab="profile"
        onTabPress={onTabPress || (() => {})}
      />
    </ScreenContainer>
  );
};
