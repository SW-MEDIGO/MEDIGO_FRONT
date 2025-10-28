import React from "react";
import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
import { Text } from "../components";
import { theme } from "../styles";

interface DoctorProps {
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
  border-bottom-width: 1px;
  border-color: ${theme.colors.surface};
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

const Row = styled.View`
  background-color: ${theme.colors.background};
  padding: ${theme.spacing.md}px;
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-color: ${theme.colors.surface};
`;

const Left = styled.View`
  flex: 1;
`;

const Hospital = styled(Text)`
  color: ${theme.colors.textSecondary};
  font-size: ${theme.fontSize.sm}px;
`;

const Subtitle = styled(Text)`
  color: ${theme.colors.success};
  font-size: ${theme.fontSize.sm}px;
`;

const DoctorAvatar = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
`;

export const DoctorScreen: React.FC<DoctorProps> = ({ onBack }) => {
  return (
    <Screen>
      <Header>
        <BackBtn onPress={onBack}>
          <BackArrow />
        </BackBtn>
        <Title>단골 의사</Title>
      </Header>

      <Row>
        <Left>
          <Hospital>한별병원</Hospital>
          <Text weight="semibold">장은성 의사</Text>
          <Subtitle>오늘예약 | (일) 09:00 - 17:50</Subtitle>
        </Left>
        <DoctorAvatar />
      </Row>

      <Row>
        <Left>
          <Hospital>대진서울의료원</Hospital>
          <Text weight="semibold">강윤서 의사</Text>
          <Subtitle>오늘예약 | (일) 10:00 - 16:50</Subtitle>
        </Left>
        <DoctorAvatar />
      </Row>
    </Screen>
  );
};

export default DoctorScreen;
