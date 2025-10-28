import React from "react";
import styled from "styled-components/native";
import { View, TouchableOpacity, SafeAreaView } from "react-native";
import { Text } from "../components";
import { BackIcon } from "../components/icons";
import { theme } from "../styles";

interface SettingsProps {
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

const List = styled.View`
  background-color: ${theme.colors.background};
`;

const Row = styled.TouchableOpacity`
  padding: ${theme.spacing.lg}px ${theme.spacing.md}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-color: ${theme.colors.surface};
`;

const ChevronRight = () => (
  <View
    style={{
      width: 14,
      height: 14,
      borderRightWidth: 2,
      borderTopWidth: 2,
      transform: [{ rotate: "45deg" }],
      borderColor: theme.colors.text.secondary,
    }}
  />
);

export const SettingsScreen: React.FC<SettingsProps> = ({ onBack }) => {
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
          설정
        </Text>
        <View style={{ width: 40 }} />
      </HeaderWrapper>

      <List>
        <Row
          activeOpacity={0.7}
          onPress={() => {}}
        >
          <Text>알림 설정</Text>
          <ChevronRight />
        </Row>
        <Row
          activeOpacity={0.7}
          onPress={() => {}}
        >
          <Text>버전 정보</Text>
          <ChevronRight />
        </Row>
      </List>
    </Screen>
  );
};

export default SettingsScreen;
