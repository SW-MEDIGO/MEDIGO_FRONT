import React from "react";
import styled from "styled-components/native";
import { ScrollView, Alert } from "react-native";
import { BackIcon } from "../components/icons";
import Svg, { Path } from "react-native-svg";

interface MedicalFacilityDetailScreenProps {
  onBackPress?: () => void;
  facility: {
    id: string;
    name: string;
    type: "hospital" | "pharmacy";
    address: string;
    phone?: string;
    isOpen: boolean;
    distance: string;
    coordinates: { lat: number; lng: number };
  };
}

const ScreenContainer = styled.View`
  flex: 1;
  background-color: #f8f8f8;
`;

const HeaderContainer = styled.View`
  background-color: white;
  padding-top: 60px;
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
  flex-direction: row;
  align-items: center;
`;

const BackButton = styled.TouchableOpacity`
  padding: 8px;
`;

const ContentContainer = styled(ScrollView)`
  flex: 1;
  padding: 20px;
`;

const DistanceContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
`;

const DistanceText = styled.Text`
  font-size: 24px;
  font-weight: 600;
  color: #333333;
  margin-right: 16px;
`;

const WalkTimeText = styled.Text`
  font-size: 16px;
  color: #666666;
`;

const FacilityNameText = styled.Text`
  font-size: 32px;
  font-weight: bold;
  color: #333333;
  margin-bottom: 16px;
`;

const StatusContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 24px;
`;

const StatusText = styled.Text<{ isOpen: boolean }>`
  font-size: 16px;
  font-weight: 600;
  color: ${(props: { isOpen: boolean }) =>
    props.isOpen ? "#22C55E" : "#FF6B6B"};
  margin-right: 16px;
`;

const HoursText = styled.Text`
  font-size: 16px;
  color: #666666;
`;

const SectionContainer = styled.View`
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
`;

const SectionTitle = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: #333333;
  margin-bottom: 16px;
`;

const HoursRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 8px;
  padding-bottom: 8px;
`;

const DayText = styled.Text`
  font-size: 16px;
  color: #333333;
  width: 50px;
`;

const TimeText = styled.Text<{ isClosed?: boolean }>`
  font-size: 16px;
  color: ${(props: { isClosed?: boolean }) =>
    props.isClosed ? "#FF6B6B" : "#333333"};
`;

const AddressText = styled.Text`
  font-size: 16px;
  color: #333333;
  margin-bottom: 16px;
`;

const CopyButton = styled.TouchableOpacity`
  background-color: #f0f0f0;
  border-radius: 8px;
  padding: 8px 16px;
  align-self: flex-end;
`;

const CopyButtonText = styled.Text`
  font-size: 14px;
  color: #666666;
`;

const MapContainer = styled.View`
  height: 200px;
  background-color: #e0e0e0;
  border-radius: 8px;
  margin-top: 16px;
  align-items: center;
  justify-content: center;
`;

const MapPlaceholder = styled.Text`
  color: #666666;
  font-size: 16px;
`;

const ActionButton = styled.TouchableOpacity`
  background-color: #4285f4;
  border-radius: 12px;
  padding: 16px;
  margin: 20px;
  align-items: center;
  flex-direction: row;
  justify-content: center;
`;

const ActionButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 600;
  margin-left: 8px;
`;

const PharmacyIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <Path
      d="M10 2L15 7V18H5V7L10 2Z"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M7 10H13M10 7V13"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// 더미 운영시간 데이터
const getOperatingHours = (type: "hospital" | "pharmacy") => {
  if (type === "pharmacy") {
    return [
      { day: "월요일", time: "09:00 ~ 18:00" },
      { day: "금요일", time: "09:00 ~ 18:00" },
      { day: "화요일", time: "09:00 ~ 18:00" },
      { day: "토요일", time: "09:00 ~ 13:00" },
      { day: "수요일", time: "09:00 ~ 18:00" },
      { day: "일요일", time: "휴무", isClosed: true },
      { day: "목요일", time: "09:00 ~ 18:00" },
    ];
  } else {
    return [
      { day: "월요일", time: "09:00 ~ 17:00" },
      { day: "금요일", time: "09:00 ~ 17:00" },
      { day: "화요일", time: "09:00 ~ 17:00" },
      { day: "토요일", time: "09:00 ~ 12:00" },
      { day: "수요일", time: "09:00 ~ 17:00" },
      { day: "일요일", time: "휴무", isClosed: true },
      { day: "목요일", time: "09:00 ~ 17:00" },
    ];
  }
};

const calculateWalkTime = (distance: string) => {
  const meters = parseFloat(distance.replace("km", "")) * 1000;
  const walkTimeMinutes = Math.ceil(meters / 80); // 평균 도보 속도 80m/min
  return `도보 ${walkTimeMinutes}분`;
};

export const MedicalFacilityDetailScreen = ({
  onBackPress,
  facility,
}: MedicalFacilityDetailScreenProps) => {
  const operatingHours = getOperatingHours(facility.type);
  const walkTime = calculateWalkTime(facility.distance);

  const handleCopyAddress = () => {
    Alert.alert("주소 복사", "주소가 클립보드에 복사되었습니다.");
  };

  const handleActionButton = () => {
    if (facility.type === "pharmacy") {
      Alert.alert("조제받기", "나만의닥터 전용가로 조제받기 기능");
    } else {
      Alert.alert("예약하기", "병원 예약하기 기능");
    }
  };

  const getCurrentTime = () => {
    const now = new Date();
    const day = [
      "일요일",
      "월요일",
      "화요일",
      "수요일",
      "목요일",
      "금요일",
      "토요일",
    ][now.getDay()];
    const currentHours = operatingHours.find((h) => h.day === day);
    return currentHours?.time || "정보 없음";
  };

  return (
    <ScreenContainer>
      {/* Header */}
      <HeaderContainer>
        <BackButton onPress={onBackPress} activeOpacity={0.7}>
          <BackIcon width={24} height={24} />
        </BackButton>
      </HeaderContainer>

      <ContentContainer showsVerticalScrollIndicator={false}>
        {/* Distance and Walk Time */}
        <DistanceContainer>
          <DistanceText>
            {facility.distance.replace("km", "m").replace(".", "")}
          </DistanceText>
          <WalkTimeText>{walkTime}</WalkTimeText>
        </DistanceContainer>

        {/* Facility Name */}
        <FacilityNameText>{facility.name}</FacilityNameText>

        {/* Status */}
        <StatusContainer>
          <StatusText isOpen={facility.isOpen}>
            {facility.isOpen ? "영업중" : "영업종료"}
          </StatusText>
          <HoursText>
            ({new Date().toLocaleDateString("ko-KR", { weekday: "short" })}){" "}
            {getCurrentTime()}
          </HoursText>
        </StatusContainer>

        {/* Operating Hours */}
        <SectionContainer>
          <SectionTitle>운영시간</SectionTitle>
          {operatingHours.map((hours, index) => (
            <HoursRow key={index}>
              <DayText>{hours.day}</DayText>
              <TimeText isClosed={hours.isClosed}>{hours.time}</TimeText>
            </HoursRow>
          ))}
        </SectionContainer>

        {/* Location */}
        <SectionContainer>
          <SectionTitle>
            {facility.type === "pharmacy" ? "약국" : "병원"} 위치
          </SectionTitle>
          <AddressText>{facility.address}</AddressText>
          <CopyButton onPress={handleCopyAddress} activeOpacity={0.7}>
            <CopyButtonText>복사</CopyButtonText>
          </CopyButton>

          <MapContainer>
            <MapPlaceholder>지도 미리보기</MapPlaceholder>
          </MapContainer>
        </SectionContainer>
      </ContentContainer>

      {/* Action Button */}
      <ActionButton onPress={handleActionButton} activeOpacity={0.8}>
        <PharmacyIcon />
        <ActionButtonText>
          {facility.type === "pharmacy"
            ? "나만의닥터 전용가로 조제받기"
            : "병원 예약하기"}
        </ActionButtonText>
      </ActionButton>
    </ScreenContainer>
  );
};
