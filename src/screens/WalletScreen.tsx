import React from "react";
import styled from "styled-components/native";
import { View, TouchableOpacity, SafeAreaView } from "react-native";
import { Text } from "../components";
import { BackIcon } from "../components/icons";
import { theme } from "../styles";

interface WalletProps {
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

const Section = styled.View`
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg}px;
  padding: 20px;
  margin-bottom: 12px;
`;

const SectionTitle = styled(Text)`
  color: ${theme.colors.text.secondary};
  font-size: ${theme.fontSize.sm}px;
  margin-bottom: ${theme.spacing.md}px;
`;

const EmptyArea = styled.View`
  align-items: center;
  padding: ${theme.spacing.xl}px 0;
`;

const EmptyIcon = styled.View`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background-color: ${theme.colors.surface};
  align-items: center;
  justify-content: center;
  margin-bottom: ${theme.spacing.md}px;
`;

const EmptyIconInner = styled.View`
  width: 50px;
  height: 36px;
  border-radius: 6px;
  border: 2px solid ${theme.colors.border};
  background-color: ${theme.colors.white};
`;

const EmptyText = styled(Text)`
  color: ${theme.colors.text.secondary};
  font-size: ${theme.fontSize.sm}px;
`;

const Button = styled.TouchableOpacity`
  margin-top: ${theme.spacing.md}px;
  padding: ${theme.spacing.md}px;
  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md}px;
  align-items: center;
`;

const ButtonLabel = styled(Text)`
  color: #ff9500;
`;

export const WalletScreen: React.FC<WalletProps> = ({ onBack }) => {
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
          결제수단 관리
        </Text>
        <View style={{ width: 40 }} />
      </HeaderWrapper>

      <ContentContainer showsVerticalScrollIndicator={false}>
        <Section
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 2,
          }}
        >
          <SectionTitle>신용/체크카드</SectionTitle>
          <EmptyArea>
            <EmptyIcon>
              <EmptyIconInner />
            </EmptyIcon>
            <EmptyText>등록된 결제수단이 없어요</EmptyText>
          </EmptyArea>
          <Button activeOpacity={0.8}>
            <ButtonLabel>신용/체크카드 등록</ButtonLabel>
          </Button>
        </Section>

        <Section
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 2,
          }}
        >
          <SectionTitle>카카오페이</SectionTitle>
          <EmptyArea>
            <EmptyIcon>
              <EmptyIconInner />
            </EmptyIcon>
            <EmptyText>등록된 결제수단이 없어요</EmptyText>
          </EmptyArea>
          <Button activeOpacity={0.8}>
            <ButtonLabel>카카오페이 등록</ButtonLabel>
          </Button>
        </Section>
      </ContentContainer>
    </Screen>
  );
};

export default WalletScreen;
