import React from "react";
import styled from "styled-components/native";
import { ScrollView, SafeAreaView, View, TouchableOpacity } from "react-native";
import { theme } from "../styles";
import { Text } from "../components";
import { BackIcon } from "../components/icons/BackIcon";
import { CheckIcon } from "../components/icons/CheckIcon";

interface CompanionMatchingDoneProps {
  navigation?: any;
  data?: {
    hospitalName?: string;
    hospitalAddress?: string;
    selectedDate?: Date;
    requestContent?: string;
    companionGender?: "MALE" | "FEMALE" | "ANY";
  };
}

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

const BackButton = styled.TouchableOpacity`
  padding-top: ${theme.spacing.sm}px;
  padding-bottom: ${theme.spacing.sm}px;
  padding-left: ${theme.spacing.sm}px;
  padding-right: ${theme.spacing.sm}px;
`;

const ScrollableContent = styled(ScrollView)`
  flex: 1;
  padding: 20px;
  padding-bottom: 20px;
`;

const StatusContainer = styled.View`
  align-items: center;
  padding: ${theme.spacing.xl}px;
  margin-bottom: ${theme.spacing.xl}px;
`;

const StatusIcon = styled.View`
  width: 100px;
  height: 100px;
  border-radius: 60px;
  background-color: ${theme.colors.primary};
  align-items: center;
  justify-content: center;
  margin-bottom: ${theme.spacing.lg}px;
`;

const StatusText = styled.Text`
  font-size: 24px;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.text.primary};
  text-align: center;
  margin-bottom: ${theme.spacing.sm}px;
`;

const StatusDescription = styled.Text`
  font-size: ${theme.fontSize.md}px;
  color: ${theme.colors.text.secondary};
  text-align: center;
`;

const Card = styled.View`
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg}px;
  padding: ${theme.spacing.lg}px;
  margin-bottom: ${theme.spacing.md}px;
`;

const InfoRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.md}px;
`;

const InfoLabel = styled.Text`
  font-size: ${theme.fontSize.sm}px;
  color: ${theme.colors.text.secondary};
`;

const InfoValue = styled.Text`
  font-size: ${theme.fontSize.sm}px;
  color: ${theme.colors.text.primary};
  font-weight: ${theme.fontWeight.semibold};
`;

const Divider = styled.View`
  height: 1px;
  background-color: ${theme.colors.border};
  margin-top: ${theme.spacing.md}px;
  margin-bottom: ${theme.spacing.md}px;
`;

const LoadingContainer = styled.View`
  padding: ${theme.spacing.md}px;
  background-color: ${theme.colors.background};
  border-radius: ${theme.borderRadius.md}px;
  margin-top: ${theme.spacing.md}px;
  align-items: center;
`;

const HomeButton = styled.TouchableOpacity`
  width: 100%;
  height: 54px;
  border-radius: 10px;
  background-color: #0bc1bf;
  align-items: center;
  justify-content: center;
`;

const HomeButtonText = styled.Text`
  font-size: ${theme.fontSize.md}px;
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.white};
`;

export const CompanionMatchingDone = ({ navigation, data }: CompanionMatchingDoneProps) => {
  // 날짜 포맷팅 함수
  const formatDateTime = (date?: Date) => {
    if (!date) return "-";
    const dateStr = date.toLocaleDateString("ko-KR");
    const timeStr = date.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" });
    return `${dateStr} ${timeStr}`;
  };

  // 성별 조건 텍스트 변환
  const getGenderText = (gender?: string) => {
    if (gender === "MALE") return "남성";
    if (gender === "FEMALE") return "여성";
    return "무관";
  };

  return (
    <ScreenContainer>
      <HeaderWrapper>
        <BackButton onPress={() => navigation?.goBack()}>
          <BackIcon />
        </BackButton>
        <Text
          size="lg"
          weight="semibold"
          color={theme.colors.text.primary}
        >
          매칭 신청 완료
        </Text>
        <View style={{ width: 40 }} />
      </HeaderWrapper>

      <ScrollableContent showsVerticalScrollIndicator={false}>
        <StatusContainer>
          <StatusIcon>
            <CheckIcon
              width={50}
              height={40}
              fill="white"
            />
          </StatusIcon>
          <StatusText>동행 요청 중입니다</StatusText>
          <StatusDescription>
            매칭이 완료되면{"\n"}
            알림을 보내드립니다
          </StatusDescription>
        </StatusContainer>

        <Card
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.05,
            shadowRadius: 4,
            elevation: 2,
          }}
        >
          <View style={{ marginBottom: theme.spacing.md }}>
            <Text
              size="lg"
              weight="semibold"
              color={theme.colors.text.primary}
            >
              예약 정보
            </Text>
          </View>

          <InfoRow>
            <InfoLabel>병원명</InfoLabel>
            <InfoValue>{data?.hospitalName || "-"}</InfoValue>
          </InfoRow>

          <InfoRow>
            <InfoLabel>예약 일시</InfoLabel>
            <InfoValue>{formatDateTime(data?.selectedDate)}</InfoValue>
          </InfoRow>

          <InfoRow>
            <InfoLabel>동행자 조건</InfoLabel>
            <InfoValue>{getGenderText(data?.companionGender)}</InfoValue>
          </InfoRow>

          <Divider />

          <InfoRow>
            <InfoLabel>요청 사항</InfoLabel>
            <InfoValue>{data?.requestContent || "-"}</InfoValue>
          </InfoRow>

          <LoadingContainer>
            <Text
              size="md"
              color={theme.colors.text.secondary}
            >
              동행자를 찾고 있습니다
            </Text>
          </LoadingContainer>
        </Card>
      </ScrollableContent>

      <View style={{ padding: theme.spacing.lg, paddingBottom: 40 }}>
        <HomeButton
          onPress={() => {
            navigation?.navigateToHome();
          }}
          activeOpacity={0.8}
        >
          <HomeButtonText>홈으로</HomeButtonText>
        </HomeButton>
      </View>
    </ScreenContainer>
  );
};
