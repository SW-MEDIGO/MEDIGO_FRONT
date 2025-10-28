import React, { useState } from "react";
import styled from "styled-components/native";
import { ScrollView } from "react-native";
import { BackIcon } from "../components/icons";
import Svg, { Path } from "react-native-svg";

interface MedicalFacilityListScreenProps {
  onBackPress?: () => void;
  onFacilitySelect?: (facility: MedicalFacility) => void;
  onTabChange?: (tab: "hospital" | "pharmacy") => void;
  initialTab?: "hospital" | "pharmacy";
  hospitalFacilities: MedicalFacility[];
  pharmacyFacilities: MedicalFacility[];
  loading?: boolean;
}

interface MedicalFacility {
  id: string;
  name: string;
  type: "hospital" | "pharmacy";
  address: string;
  phone?: string;
  isOpen: boolean;
  distance: string;
  coordinates: { lat: number; lng: number };
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
  justify-content: space-between;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: #f0f0f0;
`;

const BackButton = styled.TouchableOpacity`
  padding: 8px;
`;

const HeaderTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: #333333;
  flex: 1;
  text-align: center;
`;

const TabContainer = styled.View`
  flex-direction: row;
  background-color: white;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 16px;
  padding-bottom: 16px;
  border-bottom-width: 1px;
  border-bottom-color: #f0f0f0;
`;

const TabButton = styled.TouchableOpacity<{ isActive: boolean }>`
  flex: 1;
  padding: 12px;
  align-items: center;
  border-bottom-width: 2px;
  border-bottom-color: ${(props: { isActive: boolean }) =>
    props.isActive ? "#00a6d8" : "transparent"};
`;

const TabText = styled.Text<{ isActive: boolean }>`
  font-size: 16px;
  font-weight: 600;
  color: ${(props: { isActive: boolean }) =>
    props.isActive ? "#00a6d8" : "#666666"};
`;

const ListContainer = styled(ScrollView)`
  flex: 1;
  padding: 20px;
`;

const FacilityItem = styled.TouchableOpacity`
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 12px;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

const FacilityContent = styled.View`
  flex: 1;
  margin-right: 16px;
`;

const FacilityHeader = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;

const FacilityName = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: #333333;
  margin-bottom: 4px;
`;

const DistanceContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;

const LocationIcon = () => (
  <Svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <Path
      d="M6 1C4.067 1 2.5 2.567 2.5 4.5C2.5 7.5 6 11 6 11S9.5 7.5 9.5 4.5C9.5 2.567 7.933 1 6 1Z"
      stroke="#666666"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M6 5.5C6.552 5.5 7 5.052 7 4.5C7 3.948 6.552 3.5 6 3.5C5.448 3.5 5 3.948 5 4.5C5 5.052 5.448 5.5 6 5.5Z"
      stroke="#666666"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const DistanceText = styled.Text`
  font-size: 14px;
  color: #666666;
  margin-left: 4px;
  margin-right: 8px;
`;

const AddressText = styled.Text`
  font-size: 14px;
  color: #999999;
`;

const DropdownIcon = () => (
  <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <Path
      d="M4 6L8 10L12 6"
      stroke="#999999"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const StatusContainer = styled.View`
  align-items: flex-end;
`;

const StatusBadge = styled.View<{ isOpen: boolean }>`
  flex-direction: row;
  align-items: center;
  padding: 4px 8px;
  border-radius: 12px;
  background-color: ${(props: { isOpen: boolean }) =>
    props.isOpen ? "#E8F5E8" : "#FFE8E8"};
`;

const StatusDot = styled.View<{ isOpen: boolean }>`
  width: 6px;
  height: 6px;
  border-radius: 3px;
  background-color: ${(props: { isOpen: boolean }) =>
    props.isOpen ? "#22C55E" : "#FF6B6B"};
  margin-right: 4px;
`;

const StatusText = styled.Text<{ isOpen: boolean }>`
  font-size: 12px;
  font-weight: 500;
  color: ${(props: { isOpen: boolean }) =>
    props.isOpen ? "#22C55E" : "#FF6B6B"};
`;

const EmptyContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 40px;
`;

const EmptyText = styled.Text`
  font-size: 16px;
  color: #666666;
  text-align: center;
`;

export const MedicalFacilityListScreen = ({
  onBackPress,
  onFacilitySelect,
  onTabChange,
  initialTab = "hospital",
  hospitalFacilities = [],
  pharmacyFacilities = [],
  loading = false,
}: MedicalFacilityListScreenProps) => {
  const [activeTab, setActiveTab] = useState<"hospital" | "pharmacy">(
    initialTab
  );

  const currentFacilities =
    activeTab === "hospital" ? hospitalFacilities : pharmacyFacilities;

  const handleTabPress = (tab: "hospital" | "pharmacy") => {
    setActiveTab(tab);
    onTabChange?.(tab);
  };

  const handleFacilityPress = (facility: MedicalFacility) => {
    onFacilitySelect?.(facility);
  };

  const getStatusText = (facility: MedicalFacility) => {
    if (facility.type === "hospital") {
      return facility.isOpen ? "진료중" : "진료종료";
    } else {
      return facility.isOpen ? "영업중" : "영업종료";
    }
  };

  return (
    <ScreenContainer>
      {/* Header */}
      <HeaderContainer>
        <BackButton onPress={onBackPress} activeOpacity={0.7}>
          <BackIcon width={24} height={24} />
        </BackButton>
        <HeaderTitle>열린 약국/병원 찾기</HeaderTitle>
        <BackButton style={{ opacity: 0 }}>
          <BackIcon width={24} height={24} />
        </BackButton>
      </HeaderContainer>

      {/* Tabs */}
      <TabContainer>
        <TabButton
          isActive={activeTab === "hospital"}
          onPress={() => handleTabPress("hospital")}
          activeOpacity={0.7}
        >
          <TabText isActive={activeTab === "hospital"}>병원</TabText>
        </TabButton>
        <TabButton
          isActive={activeTab === "pharmacy"}
          onPress={() => handleTabPress("pharmacy")}
          activeOpacity={0.7}
        >
          <TabText isActive={activeTab === "pharmacy"}>약국</TabText>
        </TabButton>
      </TabContainer>

      {/* Facility List */}
      {loading ? (
        <EmptyContainer>
          <EmptyText>
            {activeTab === "hospital" ? "병원" : "약국"} 정보를 가져오는 중...
          </EmptyText>
        </EmptyContainer>
      ) : currentFacilities.length === 0 ? (
        <EmptyContainer>
          <EmptyText>
            주변에 {activeTab === "hospital" ? "병원" : "약국"}이 없습니다.
          </EmptyText>
        </EmptyContainer>
      ) : (
        <ListContainer showsVerticalScrollIndicator={false}>
          {currentFacilities.map((facility) => (
            <FacilityItem
              key={facility.id}
              onPress={() => handleFacilityPress(facility)}
              activeOpacity={0.7}
            >
              <FacilityContent>
                <FacilityName>{facility.name}</FacilityName>
                <DistanceContainer>
                  <LocationIcon />
                  <DistanceText>{facility.distance}</DistanceText>
                  <AddressText>{facility.address}</AddressText>
                  <DropdownIcon />
                </DistanceContainer>
              </FacilityContent>

              <StatusContainer>
                <StatusBadge isOpen={facility.isOpen}>
                  <StatusDot isOpen={facility.isOpen} />
                  <StatusText isOpen={facility.isOpen}>
                    {getStatusText(facility)}
                  </StatusText>
                </StatusBadge>
              </StatusContainer>
            </FacilityItem>
          ))}
        </ListContainer>
      )}
    </ScreenContainer>
  );
};
