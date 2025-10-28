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
  margin-bottom: 15px;
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
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
`;

const ReservationContent = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ReservationInfo = styled.View`
  flex: 1;
`;

const HospitalName = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #333333;
  margin-bottom: 8px;
`;

const ReservationDate = styled.Text`
  font-size: 14px;
  color: #666666;
  margin-bottom: 8px;
`;

const MatchStatusContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const MatchStatusText = styled.Text`
  font-size: 14px;
  color: #00d4aa;
  font-weight: 600;
`;

const HeartIcon = styled.View`
  margin-left: 8px;
`;

const ReservationImageContainer = styled.View`
  width: 80px;
  height: 80px;
  align-items: center;
  justify-content: center;
`;

const HospitalCard = styled.TouchableOpacity`
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
  font-size: 14px;
  color: #666666;
`;
interface HomeScreenProps {
  activeTab: string;
  onTabPress: (tab: string) => void;
  onHospitalPharmacyPress?: () => void;
  onNavigateToCompanionMatching?: () => void;
}

export const HomeScreen = ({
  activeTab,
  onTabPress,
  onHospitalPharmacyPress,
  onNavigateToCompanionMatching,
}: HomeScreenProps) => {
  return (
    <ScreenContainer>
      {/* Main Content */}
      <ScrollContainer showsVerticalScrollIndicator={false}>
        {/* 동행자 매칭 배너 */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onNavigateToCompanionMatching}
        >
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
              <BannerDescription>메디고와 함께 검증된 동행자를 찾아보세요</BannerDescription>
            </BannerContent>
            <Image
              source={require("../../assets/main/connect.png")}
              style={{
                width: 60,
                height: 60,
              }}
            />
          </LinearGradient>
        </TouchableOpacity>

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
            <ResponseButton isOnline={false}>평균 15분 이내 응답</ResponseButton>
          </CompanionCard>
        </ScrollView>

        {/* 예약 현황 섹션 */}
        <SectionTitle>예약 현황</SectionTitle>
        <ReservationCard
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 2,
            elevation: 2,
          }}
        >
          <ReservationContent>
            <ReservationInfo>
              <HospitalName>한밭병원</HospitalName>
              <ReservationDate>2025-10-27 (월)</ReservationDate>
              <MatchStatusContainer>
                <MatchStatusText>매칭완료</MatchStatusText>
              </MatchStatusContainer>
            </ReservationInfo>
            <ReservationImageContainer>
              <Image
                source={require("../../assets/Heart_rate_perspective_matte.png")}
                style={{
                  width: 50,
                  height: 50,
                }}
                resizeMode="contain"
              />
            </ReservationImageContainer>
          </ReservationContent>
        </ReservationCard>

        {/* 열린 병원/약국 찾기 섹션 */}
        <HospitalCard
          onPress={onHospitalPharmacyPress}
          activeOpacity={0.7}
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
            <HospitalDescription>주변에 있는 병원 / 약국이 열려있는지 확인하세요</HospitalDescription>
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
      <BottomNavigation
        activeTab={activeTab}
        onTabPress={onTabPress}
      />
    </ScreenContainer>
  );
};
