import React from "react";
import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
import { Text } from "../components";
import { theme } from "../styles";

interface SettingsProps {
  onBack?: () => void;
}

const Screen = styled(SafeAreaView)`
  flex: 1;
  background-color: ${theme.colors.surface};
  padding-top: ${theme.spacing.md + 36}px;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${theme.spacing.md}px;
`;

const BackBtn = styled.TouchableOpacity`
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

const Title = styled(Text)`
  flex: 1;
  text-align: center;
  font-size: ${theme.fontSize.lg}px;
  font-weight: ${theme.fontWeight.semibold};
  margin-right: 24px;
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
      borderColor: theme.colors.textSecondary,
    }}
  />
);

export const SettingsScreen: React.FC<SettingsProps> = ({ onBack }) => {
  return (
    <Screen>
      <Header>
        <BackBtn onPress={onBack}>
          <BackArrow />
        </BackBtn>
        <Title>설정</Title>
      </Header>

      <List>
        <Row activeOpacity={0.7} onPress={() => {}}>
          <Text>알림 설정</Text>
          <ChevronRight />
        </Row>
        <Row activeOpacity={0.7} onPress={() => {}}>
          <Text>버전 정보</Text>
          <ChevronRight />
        </Row>
      </List>
    </Screen>
  );
};

export default SettingsScreen;
