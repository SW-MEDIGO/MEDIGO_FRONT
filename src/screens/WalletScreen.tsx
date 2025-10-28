import React from "react";
import styled from "styled-components/native";
import { View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "../components";
import { theme } from "../styles";

interface WalletProps {
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

const Section = styled.View`
  background-color: ${theme.colors.background};
  border-top-width: 1px;
  border-bottom-width: 1px;
  border-color: ${theme.colors.surface};
  padding: ${theme.spacing.md}px ${theme.spacing.md}px ${theme.spacing.lg}px;
`;

const SectionTitle = styled(Text)`
  color: ${theme.colors.textSecondary};
  font-size: ${theme.fontSize.sm}px;
`;

const EmptyArea = styled.View`
  align-items: center;
  padding: ${theme.spacing.xl}px 0 ${theme.spacing.md}px;
`;

const EmptyIcon = styled.View`
  width: 64px;
  height: 44px;
  border-radius: 8px;
  background-color: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
`;

const EmptyText = styled(Text)`
  color: ${theme.colors.textSecondary};
  margin-top: ${theme.spacing.md}px;
`;

const Button = styled.TouchableOpacity`
  margin: 0 ${theme.spacing.md}px;
  margin-top: ${theme.spacing.md}px;
  padding: ${theme.spacing.md}px;
  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md}px;
  align-items: center;
`;

const ButtonLabel = styled(Text)`
  color: ${theme.colors.warning};
  font-weight: ${theme.fontWeight.medium};
`;

export const WalletScreen: React.FC<WalletProps> = ({ onBack }) => {
  return (
    <Screen>
      <Header>
        <BackBtn onPress={onBack}>
          <BackArrow />
        </BackBtn>
        <Title>결제수단 관리</Title>
      </Header>

      <Section>
        <SectionTitle>신용/체크카드</SectionTitle>
        <EmptyArea>
          <EmptyIcon />
          <EmptyText>등록된 결제수단이 없어요</EmptyText>
        </EmptyArea>
        <Button>
          <ButtonLabel>신용/체크카드 등록</ButtonLabel>
        </Button>
      </Section>

      <View style={{ height: 1, backgroundColor: theme.colors.surface }} />

      <Section>
        <SectionTitle>카카오페이</SectionTitle>
        <EmptyArea>
          <EmptyIcon />
          <EmptyText>등록된 결제수단이 없어요</EmptyText>
        </EmptyArea>
        <Button>
          <ButtonLabel>카카오페이 등록</ButtonLabel>
        </Button>
      </Section>
    </Screen>
  );
};

export default WalletScreen;
