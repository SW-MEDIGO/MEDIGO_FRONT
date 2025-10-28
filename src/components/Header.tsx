import React from "react";
import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar, Platform, TouchableOpacity } from "react-native";
import { theme } from "../styles";
import { MedigoTextIcon, LocationIcon, ChevronDownIcon } from "./icons";

interface HeaderProps {
  children?: React.ReactNode;
  activeTab?: string;
  currentLocation?: string;
  onLocationPress?: () => void;
}

const STATUS_BAR_HEIGHT =
  Platform.OS === "ios" ? 44 : StatusBar.currentHeight || 0;

const HeaderContainer = styled(LinearGradient)`
  width: 100%;
  height: ${100 + STATUS_BAR_HEIGHT}px;
  padding-top: ${STATUS_BAR_HEIGHT}px;
  padding-left: 20px;
  padding-right: 20px;
  border-bottom-left-radius: ${theme.borderRadius.xl}px;
  border-bottom-right-radius: ${theme.borderRadius.xl}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const LogoContainer = styled.View`
  flex: 1;
  margin-top: 20px;
  margin-left: 10px;
  margin-right: 10px;
`;

const TabTitle = styled.Text`
  color: #fff;
  text-align: center;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  font-family: "KoreanYNSJG5R";
  margin-top: 20px;
`;

const LocationContainer = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.2);
  padding-left: 12px;
  padding-right: 12px;
  padding-top: 8px;
  padding-bottom: 8px;
  border-radius: 20px;
  margin-top: 20px;
`;

const LocationText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 500;
  margin-left: 6px;
  margin-right: 4px;
`;

export const Header: React.FC<HeaderProps> = ({
  children,
  activeTab,
  currentLocation = "우리집",
  onLocationPress,
}) => {
  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <HeaderContainer
        colors={["#466BEE", "#1B4E4D"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          shadowColor: theme.shadows.sm.shadowColor,
          shadowOffset: theme.shadows.sm.shadowOffset,
          shadowOpacity: theme.shadows.sm.shadowOpacity,
          shadowRadius: theme.shadows.sm.shadowRadius,
          elevation: theme.shadows.sm.elevation,
        }}
      >
        {activeTab === "home" ? (
          <>
            <LogoContainer>
              <MedigoTextIcon width={77} height={25} />
            </LogoContainer>

            <LocationContainer onPress={onLocationPress} activeOpacity={0.7}>
              <LocationIcon width={15} height={18} />
              <LocationText>{currentLocation}</LocationText>
              <ChevronDownIcon width={18} height={9} />
            </LocationContainer>
          </>
        ) : activeTab === "records" ? (
          <TabTitle>진료 기록</TabTitle>
        ) : activeTab === "usage" ? (
          <TabTitle>이용/알림</TabTitle>
        ) : activeTab === "profile" ? (
          <TabTitle>내 정보</TabTitle>
        ) : (
          children
        )}
      </HeaderContainer>
    </>
  );
};
