import React from "react";
import styled from "styled-components/native";
import { SafeAreaView, TouchableOpacity, ScrollView, View } from "react-native";
import { Image } from "react-native";
import { Text } from "../components";
import { BackIcon } from "../components/icons";
import { theme } from "../styles";

interface DoctorProps {
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

const DoctorCard = styled.View`
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg}px;
  padding: 20px;
  margin-bottom: 12px;
  flex-direction: row;
  align-items: center;
`;

const Left = styled.View`
  flex: 1;
`;

const Hospital = styled.Text`
  color: ${theme.colors.text.primary};
  font-size: ${theme.fontSize.lg}px;
  font-weight: ${theme.fontWeight.bold};
  font-family: "Apple SD Gothic Neo";
  margin-bottom: 8px;
`;

const DoctorName = styled(Text)`
  font-size: ${theme.fontSize.md}px;
  font-weight: ${theme.fontWeight.semibold};
  color: #4a4a4a;
  font-family: "Apple SD Gothic Neo";
  margin-bottom: 6px;
`;

const DateInfo = styled.Text`
  color: #0bc1bf;
  font-size: ${theme.fontSize.sm}px;
  font-weight: ${theme.fontWeight.normal};
  font-family: "Apple SD Gothic Neo";
`;

const DoctorAvatar = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 30px;
`;

export const DoctorScreen: React.FC<DoctorProps> = ({ onBack }) => {
  // 오늘 날짜를 기준으로 다음 예약 날짜 계산
  const getNextDate = (days: number) => {
    const today = new Date();
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + days);
    return nextDate.toLocaleDateString("ko-KR", {
      month: "long",
      day: "numeric",
    });
  };

  const doctors = [
    {
      hospital: "한밭병원",
      name: "김민철 의사",
      date: `${getNextDate(3)} (일)`,
      time: "09:00 - 17:50",
      avatar: require("../../assets/doctor1.png"),
    },
    {
      hospital: "대진서울의료원",
      name: "박진수 의사",
      date: `${getNextDate(5)} (일)`,
      time: "10:00 - 16:50",
      avatar: require("../../assets/doctor2.png"),
    },
  ];

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
          단골 의사
        </Text>
        <View style={{ width: 40 }} />
      </HeaderWrapper>

      <ContentContainer showsVerticalScrollIndicator={false}>
        {doctors.map((doctor, index) => (
          <DoctorCard
            key={index}
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 2,
            }}
          >
            <Left>
              <Hospital>{doctor.hospital}</Hospital>
              <DoctorName>{doctor.name}</DoctorName>
              <DateInfo>
                {doctor.date} {doctor.time}
              </DateInfo>
            </Left>
            <DoctorAvatar source={doctor.avatar} />
          </DoctorCard>
        ))}
      </ContentContainer>
    </Screen>
  );
};

export default DoctorScreen;
