import React, { useState } from "react";
import styled from "styled-components/native";
import { ScrollView, View, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Container, Text, Header } from "../components";
import { BottomNavigation } from "../components/BottomNavigation";
import { theme } from "../styles";

const ScreenContainer = styled.View`
  flex: 1;
  background-color: #f5f5f5;
`;

const StatusText = styled.Text`
  color: white;
  font-size: 17px;
  font-weight: 600;
`;

const ScrollContainer = styled(ScrollView)`
  flex: 1;
  padding-left: 20px;
  padding-right: 20px;
`;

const BannerContent = styled.View`
  flex: 1;
`;

const BannerTitle = styled.Text`
  color: white;
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const BannerDescription = styled.Text`
  color: white;
  font-size: 14px;
  opacity: 0.9;
`;

const BannerIcon = styled.View`
  width: 60px;
  height: 60px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 30px;
  align-items: center;
  justify-content: center;
`;

const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333333;
  margin-bottom: 15px;
`;

const SectionHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const ViewAllText = styled.Text`
  color: #007aff;
  font-size: 14px;
`;

const CompanionCard = styled.View`
  background-color: white;
  border-radius: 12px;
  padding: 15px;
  margin-right: 10px;
  width: 160px;
  align-items: center;
`;

const ProfileImage = styled.View`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: #e0e0e0;
  margin-bottom: 10px;
  align-items: center;
  justify-content: center;
`;

const CompanionName = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #333333;
  margin-bottom: 5px;
`;

const RatingContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

const StarIcon = styled.Text`
  color: #ffd700;
  font-size: 14px;
  margin-right: 4px;
`;

const RatingText = styled.Text`
  font-size: 14px;
  color: #666666;
`;

const ResponseButton = styled.View<{ isFast: boolean }>`
  background-color: ${(props: { isFast: boolean }) =>
    props.isFast ? "#007AFF" : "#666666"};
  padding-top: 6px;
  padding-bottom: 6px;
  padding-left: 12px;
  padding-right: 12px;
  border-radius: 15px;
`;

const ResponseText = styled.Text`
  color: white;
  font-size: 12px;
`;

const ReservationCard = styled.View`
  background-color: #f8f8f8;
  border-radius: 12px;
  padding: 30px;
  align-items: center;
  justify-content: center;
  height: 120px;
`;

const NoReservationText = styled.Text`
  color: #999999;
  font-size: 16px;
`;

const HospitalCard = styled.View`
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const HospitalContent = styled.View`
  flex: 1;
`;

const HospitalTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333333;
  margin-bottom: 5px;
`;

const HospitalDescription = styled.Text`
  font-size: 14px;
  color: #666666;
`;

const HospitalIcon = styled.View`
  width: 50px;
  height: 50px;
  background-color: #20b2aa;
  border-radius: 25px;
  align-items: center;
  justify-content: center;
`;

interface HomeScreenProps {
  activeTab: string;
  onTabPress: (tab: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  activeTab,
  onTabPress,
}) => {
  return (
    <ScreenContainer>
      {/* Header */}
      <Header></Header>

      {/* Main Content */}
      <ScrollContainer showsVerticalScrollIndicator={false}>
        {/* 동행자 매칭 배너 */}
        <LinearGradient
          colors={["#466BEE", "#00A6D8"]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={{
            borderRadius: 15,
            padding: 25,
            marginTop: 20,
            marginBottom: 25,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.15,
            shadowRadius: 2,
            elevation: 2,
          }}
        >
          <BannerContent>
            <BannerTitle>동행자 매칭</BannerTitle>
            <BannerDescription>
              메디고와 함께 검증된 동행자를 찾아보세요
            </BannerDescription>
          </BannerContent>
          <BannerIcon>
            <StatusText style={{ fontSize: 24 }}>👥</StatusText>
          </BannerIcon>
        </LinearGradient>

        {/* 바로 동행 섹션 */}
        <SectionHeader>
          <SectionTitle>바로 동행</SectionTitle>
          <ViewAllText>전체보기 &gt;</ViewAllText>
        </SectionHeader>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: 25 }}
        >
          <CompanionCard
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}
          >
            <ProfileImage>
              <StatusText style={{ fontSize: 24 }}>🐵</StatusText>
            </ProfileImage>
            <CompanionName>우은식</CompanionName>
            <RatingContainer>
              <StarIcon>⭐</StarIcon>
              <RatingText>4.9</RatingText>
            </RatingContainer>
            <ResponseButton isFast={true}>
              <ResponseText>평균 5분 이내 응답</ResponseText>
            </ResponseButton>
          </CompanionCard>

          <CompanionCard
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}
          >
            <ProfileImage>
              <StatusText style={{ fontSize: 24 }}>🐻</StatusText>
            </ProfileImage>
            <CompanionName>강윤서</CompanionName>
            <RatingContainer>
              <StarIcon>⭐</StarIcon>
              <RatingText>4</RatingText>
            </RatingContainer>
            <ResponseButton isFast={false}>
              <ResponseText>평균 15분 이내 응답</ResponseText>
            </ResponseButton>
          </CompanionCard>
        </ScrollView>

        {/* 예약 현황 섹션 */}
        <SectionTitle>예약 현황</SectionTitle>
        <ReservationCard>
          <NoReservationText>예약 정보가 없습니다</NoReservationText>
        </ReservationCard>

        {/* 열린 병원/약국 찾기 섹션 */}
        <HospitalCard
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 2,
            elevation: 2,
          }}
        >
          <HospitalContent>
            <HospitalTitle>열린 병원/약국 찾기&gt;</HospitalTitle>
            <HospitalDescription>
              주변에 있는 병원 / 약국이 열려있는지 확인하세요
            </HospitalDescription>
          </HospitalContent>
          <HospitalIcon>
            <StatusText style={{ fontSize: 20, color: "white" }}>💊</StatusText>
          </HospitalIcon>
        </HospitalCard>
      </ScrollContainer>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab={activeTab} onTabPress={onTabPress} />
    </ScreenContainer>
  );
};
