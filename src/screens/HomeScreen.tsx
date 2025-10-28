import React, { useState } from "react";
import styled from "styled-components/native";
import { ScrollView, View, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Container, Text, ResponseButton } from "../components";
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
  padding-bottom: 80px;
`;

const BannerContent = styled.View`
  flex: 1;
`;

const BannerTitle = styled.Text`
  color: white;
  font-size: 32px;
  font-weight: ${theme.fontWeight.bold};
`;

const BannerDescription = styled.Text`
  color: white;
  font-size: 14px;
  font-weight: ${theme.fontWeight.semibold};
  opacity: 0.9;
`;

const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333333;
`;

const SectionHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const ViewAllText = styled.Text`
  color: rgba(0, 166, 216, 1);
  font-size: 16px;
`;

const CompanionCard = styled.View`
  background-color: white;
  border-radius: 12px;
  padding: 15px;
  padding-left: 20px;
  padding-right: 20px;
  margin-right: 10px;
  width: 200px;
  align-items: flex-start;
`;

const ProfileSection = styled.View`
  flex-direction: row;
  align-items: flex-start;
`;

const ProfileInfo = styled.View`
  flex: 1;
  align-items: flex-start;
`;

const RatingSection = styled.View`
  flex-direction: row;
  align-items: flex-start;
  margin-left: 10px;
  margin-top: 0px;
`;

const StarIcon = styled.Text`
  color: #ffd700;
  font-size: 20px;
  margin-right: 4px;
`;

const RatingText = styled.Text`
  color: #333333;
  font-size: 18px;
  font-weight: 600;
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
  font-size: 25px;
  font-weight: 700;
  font-family: "Apple SD Gothic Neo";
  color: #4a4a4a;
  margin-bottom: 5px;
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
  font-family: "Apple SD Gothic Neo";
  font-size: 20px;
  font-weight: 700;
  color: #333333;
  margin-bottom: 5px;
`;

const HospitalDescription = styled.Text`
  font-size: 12px;
  color: #666666;
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
      {/* Main Content */}
      <ScrollContainer showsVerticalScrollIndicator={false}>
        {/* 동행자 매칭 배너 */}
        <LinearGradient
          colors={["#466BEE", "#00A6D8"]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={{
            borderRadius: 15,
            padding: 15,
            paddingLeft: 20,
            marginTop: 40,
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
          <Image
            source={require("../../assets/main/connect.png")}
            style={{
              width: 60,
              height: 60,
              marginLeft: 10,
            }}
            resizeMode="contain"
          />
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
            <ProfileSection>
              <ProfileInfo>
                <ProfileImage>
                  <Image
                    source={{
                      uri: "https://i.pinimg.com/736x/43/03/f7/4303f773635c20072109844a616e82c8.jpg",
                    }}
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 25,
                    }}
                    resizeMode="cover"
                  />
                </ProfileImage>
                <CompanionName>우은식</CompanionName>
              </ProfileInfo>
              <RatingSection>
                <StarIcon>★</StarIcon>
                <RatingText>4.9</RatingText>
              </RatingSection>
            </ProfileSection>
            <ResponseButton isOnline={true}>평균 5분 이내 응답</ResponseButton>
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
            <ProfileSection>
              <ProfileInfo>
                <ProfileImage>
                  <Image
                    source={{
                      uri: "https://i.pinimg.com/236x/5a/6a/cd/5a6acd6baf7579bfdb839f169743d83d.jpg",
                    }}
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 25,
                    }}
                    resizeMode="cover"
                  />
                </ProfileImage>
                <CompanionName>강윤서</CompanionName>
              </ProfileInfo>
              <RatingSection>
                <StarIcon>★</StarIcon>
                <RatingText>4.7</RatingText>
              </RatingSection>
            </ProfileSection>
            <ResponseButton isOnline={false}>
              평균 15분 이내 응답
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
          <Image
            source={require("../../assets/main/ping.png")}
            style={{
              width: 50,
              height: 50,
            }}
            resizeMode="contain"
          />
        </HospitalCard>
      </ScrollContainer>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab={activeTab} onTabPress={onTabPress} />
    </ScreenContainer>
  );
};
