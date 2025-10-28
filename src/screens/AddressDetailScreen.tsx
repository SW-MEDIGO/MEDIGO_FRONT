import React, { useState } from "react";
import styled from "styled-components/native";
import { ScrollView, Alert } from "react-native";
import {
  BackIcon,
  HomeAddressIcon,
  OfficeIcon,
  LocationPinIcon,
} from "../components/icons";

interface AddressDetailScreenProps {
  onBackPress?: () => void;
  onAddressConfirm?: (addressData: AddressData) => void;
  initialAddress?: string;
  initialDetailAddress?: string;
  initialCoordinates?: { lat: number; lng: number };
  editingAddress?: any; // 편집 중인 주소 정보
}

interface AddressData {
  type: "home" | "office" | "custom";
  typeName: string;
  address: string;
  detailAddress: string;
  coordinates: { lat: number; lng: number };
}

const ScreenContainer = styled.View`
  flex: 1;
  background-color: #f5f5f5;
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

const ContentContainer = styled(ScrollView)`
  flex: 1;
`;

const MapSection = styled.View`
  height: 200px;
  background-color: #e0e0e0;
  margin: 20px;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
`;

const MapPlaceholder = styled.Text`
  color: #666666;
  font-size: 16px;
`;

const AddressSection = styled.View`
  background-color: white;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 20px;
  border-radius: 12px;
  padding: 20px;
`;

const MainAddressText = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: #333333;
  margin-bottom: 8px;
`;

const SubAddressText = styled.Text`
  font-size: 14px;
  color: #666666;
`;

const DetailInputSection = styled.View`
  background-color: white;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 20px;
  border-radius: 12px;
  padding: 20px;
`;

const InputLabel = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #333333;
  margin-bottom: 8px;
`;

const DetailInput = styled.TextInput<{ hasValue: boolean }>`
  border-width: ${(props: { hasValue: boolean }) =>
    props.hasValue ? "2px" : "1px"};
  border-color: ${(props: { hasValue: boolean }) =>
    props.hasValue ? "#333333" : "#ff6b6b"};
  border-radius: 8px;
  padding: 16px;
  font-size: 16px;
  color: #333333;
  margin-bottom: 12px;
`;

const NoticeText = styled.Text`
  font-size: 12px;
  color: #ff6b6b;
  text-align: center;
  margin-bottom: 16px;
`;

const TypeSelectionSection = styled.View`
  background-color: white;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 20px;
  border-radius: 12px;
  padding: 20px;
`;

const TypeButtonContainer = styled.View`
  flex-direction: row;
  gap: 12px;
`;

const TypeButton = styled.TouchableOpacity<{ isSelected: boolean }>`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 16px;
  border-radius: 8px;
  border-width: 1px;
  border-color: ${(props: { isSelected: boolean }) =>
    props.isSelected ? "#333333" : "#e0e0e0"};
  background-color: ${(props: { isSelected: boolean }) =>
    props.isSelected ? "#f8f8f8" : "white"};
`;

const TypeIcon = styled.View`
  margin-right: 8px;
`;

const TypeText = styled.Text<{ isSelected: boolean }>`
  font-size: 14px;
  font-weight: 500;
  color: ${(props: { isSelected: boolean }) =>
    props.isSelected ? "#333333" : "#666666"};
`;

const CustomTypeInput = styled.TextInput`
  border-width: 1px;
  border-color: #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  font-size: 16px;
  color: #333333;
  margin-top: 12px;
`;

const ConfirmButton = styled.TouchableOpacity<{ disabled: boolean }>`
  background-color: ${(props: { disabled: boolean }) =>
    props.disabled ? "#e0e0e0" : "#333333"};
  border-radius: 12px;
  padding: 16px;
  margin: 20px;
  align-items: center;
`;

const ConfirmButtonText = styled.Text<{ disabled: boolean }>`
  color: ${(props: { disabled: boolean }) =>
    props.disabled ? "#999999" : "white"};
  font-size: 16px;
  font-weight: 600;
`;

export const AddressDetailScreen = ({
  onBackPress,
  onAddressConfirm,
  initialAddress = "",
  initialDetailAddress = "",
  initialCoordinates = { lat: 36.3504119, lng: 127.3845475 },
  editingAddress,
}: AddressDetailScreenProps) => {
  // 편집 모드일 때 기존 값으로 초기화
  const [detailAddress, setDetailAddress] = useState(
    editingAddress ? editingAddress.address.split(" ").slice(-2).join(" ") : ""
  );
  const [selectedType, setSelectedType] = useState<
    "home" | "office" | "custom"
  >(
    editingAddress
      ? editingAddress.type === "school"
        ? "custom"
        : editingAddress.type
      : "home"
  );
  const [customTypeName, setCustomTypeName] = useState(
    editingAddress && editingAddress.type === "school"
      ? editingAddress.name
      : ""
  );

  const addressTypes = [
    { id: "home" as const, label: "우리집", icon: HomeAddressIcon },
    { id: "office" as const, label: "회사", icon: OfficeIcon },
    { id: "custom" as const, label: "직접입력", icon: LocationPinIcon },
  ];

  const getTypeName = () => {
    if (selectedType === "custom") {
      return customTypeName || "기타";
    }
    return (
      addressTypes.find((type) => type.id === selectedType)?.label || "우리집"
    );
  };

  const isFormValid = () => {
    return (
      detailAddress.trim() !== "" &&
      (selectedType !== "custom" || customTypeName.trim() !== "")
    );
  };

  const handleConfirm = () => {
    if (!isFormValid()) {
      Alert.alert("알림", "모든 정보를 입력해주세요.");
      return;
    }

    const addressData: AddressData = {
      type: selectedType,
      typeName: getTypeName(),
      address: initialAddress,
      detailAddress: detailAddress,
      coordinates: initialCoordinates,
    };

    onAddressConfirm?.(addressData);
  };

  return (
    <ScreenContainer>
      {/* Header */}
      <HeaderContainer>
        <BackButton onPress={onBackPress} activeOpacity={0.7}>
          <BackIcon width={24} height={24} />
        </BackButton>
        <HeaderTitle>{editingAddress ? "주소 수정" : "주소 상세"}</HeaderTitle>
        <BackButton style={{ opacity: 0 }}>
          <BackIcon width={24} height={24} />
        </BackButton>
      </HeaderContainer>

      <ContentContainer showsVerticalScrollIndicator={false}>
        {/* Map Preview */}
        <MapSection>
          <MapPlaceholder>지도에서 위치 확인</MapPlaceholder>
        </MapSection>

        {/* Address Info */}
        <AddressSection>
          <MainAddressText>{initialAddress}</MainAddressText>
          <SubAddressText>{initialDetailAddress}</SubAddressText>
        </AddressSection>

        {/* Detail Address Input */}
        <DetailInputSection>
          <InputLabel>건물명, 동/호수 등의 상세주소 입력</InputLabel>
          <DetailInput
            hasValue={detailAddress.trim() !== ""}
            placeholder="예) 건물명, 동/호수 등 상세주소"
            placeholderTextColor="#999999"
            value={detailAddress}
            onChangeText={setDetailAddress}
          />
          {detailAddress.trim() === "" && (
            <NoticeText>
              상세주소를 입력해야 매니저님이 찾아올 수 있어요
            </NoticeText>
          )}
        </DetailInputSection>

        {/* Address Type Selection */}
        <TypeSelectionSection>
          <TypeButtonContainer>
            {addressTypes.map((type) => {
              const IconComponent = type.icon;
              const isSelected = selectedType === type.id;

              return (
                <TypeButton
                  key={type.id}
                  isSelected={isSelected}
                  onPress={() => setSelectedType(type.id)}
                  activeOpacity={0.7}
                >
                  <TypeIcon>
                    <IconComponent width={18} height={18} />
                  </TypeIcon>
                  <TypeText isSelected={isSelected}>{type.label}</TypeText>
                </TypeButton>
              );
            })}
          </TypeButtonContainer>

          {selectedType === "custom" && (
            <CustomTypeInput
              placeholder="주소 이름을 입력하세요"
              placeholderTextColor="#999999"
              value={customTypeName}
              onChangeText={setCustomTypeName}
            />
          )}
        </TypeSelectionSection>
      </ContentContainer>

      {/* Confirm Button */}
      <ConfirmButton
        disabled={!isFormValid()}
        onPress={handleConfirm}
        activeOpacity={0.8}
      >
        <ConfirmButtonText disabled={!isFormValid()}>
          {editingAddress ? "수정 완료" : "주소 등록"}
        </ConfirmButtonText>
      </ConfirmButton>
    </ScreenContainer>
  );
};
