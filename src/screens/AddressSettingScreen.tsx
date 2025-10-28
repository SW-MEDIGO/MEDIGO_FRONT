import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components/native";
import { ScrollView, TouchableOpacity } from "react-native";
import { theme } from "../styles";
import { BackIcon, SearchIcon, HomeAddressIcon, OfficeIcon, LocationPinIcon } from "../components/icons";

interface AddressSettingScreenProps {
  onBackPress?: () => void;
  onAddressSelect?: (address: AddressInfo) => void;
  onLocationMapPress?: () => void;
  onAddressEdit?: (address: AddressInfo) => void;
  onAddressDelete?: (addressId: string) => void;
  addressList?: AddressInfo[];
}

interface AddressInfo {
  id: string;
  type: "home" | "office" | "school";
  name: string;
  address: string;
  isSelected: boolean;
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
`;

const BackButton = styled(TouchableOpacity)`
  padding: 8px;
`;

const HeaderTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: #333333;
`;

const HeaderEditButton = styled(TouchableOpacity)`
  padding: 8px;
`;

const EditText = styled.Text`
  font-size: 16px;
  color: #007aff;
`;

const ContentContainer = styled.View`
  flex: 1;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
`;

const SearchContainer = styled.View`
  background-color: white;
  border-radius: 12px;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 16px;
  padding-bottom: 16px;
  margin-bottom: 16px;
  flex-direction: row;
  align-items: center;
`;

const SearchIconContainer = styled.View`
  margin-right: 12px;
`;

const SearchInput = styled.TextInput`
  flex: 1;
  font-size: 16px;
  color: #333333;
`;

const CurrentLocationButton = styled(TouchableOpacity)`
  background-color: white;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 24px;
  align-items: center;
`;

const CurrentLocationText = styled.Text`
  font-size: 16px;
  color: #333333;
  font-weight: 500;
`;

const AddressListContainer = styled.View`
  flex: 1;
`;

const AddressItem = styled(TouchableOpacity)`
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 12px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const AddressContent = styled.View`
  flex: 1;
  margin-right: 16px;
`;

const AddressHeader = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;

const AddressTypeIcon = styled.View`
  width: 24px;
  height: 24px;
  margin-right: 12px;
  align-items: center;
  justify-content: center;
`;

const AddressTypeName = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #333333;
`;

const AddressText = styled.Text`
  font-size: 14px;
  color: #666666;
  line-height: 20px;
`;

const CurrentAddressIndicator = styled.Text`
  font-size: 12px;
  color: #007aff;
  margin-top: 4px;
`;

const EditButtonsContainer = styled.View`
  flex-direction: row;
  gap: 8px;
`;

const EditButton = styled(TouchableOpacity)`
  padding-top: 6px;
  padding-bottom: 6px;
  padding-left: 12px;
  padding-right: 12px;
  border-radius: 16px;
  border-width: 1px;
`;

const ModifyButton = styled(EditButton)`
  border-color: rgba(74, 74, 74, 0.3);
  background-color: transparent;
`;

const DeleteButton = styled(EditButton)`
  border-color: rgba(74, 74, 74, 0.3);
  background-color: transparent;
`;

const ModifyButtonText = styled.Text`
  font-size: 12px;
  color: #4a4a4a;
  font-weight: 500;
`;

const DeleteButtonText = styled.Text`
  font-size: 12px;
  color: #4a4a4a;
  font-weight: 500;
`;

export const AddressSettingScreen = ({
  onBackPress,
  onAddressSelect,
  onLocationMapPress,
  onAddressEdit,
  onAddressDelete,
  addressList = [],
}: AddressSettingScreenProps) => {
  const [addresses, setAddresses] = useState<AddressInfo[]>([...addressList]);
  const [searchText, setSearchText] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);

  // addressList가 변경될 때 addresses 상태 업데이트
  useEffect(() => {
    setAddresses([...addressList]);
  }, [addressList]);

  const handleAddressSelect = useCallback(
    (selectedAddress: AddressInfo) => {
      setAddresses(prevAddresses =>
        prevAddresses.map(address => ({
          ...address,
          isSelected: address.id === selectedAddress.id,
        }))
      );
      onAddressSelect?.(selectedAddress);
    },
    [onAddressSelect]
  );

  const handleCurrentLocationPress = () => {
    onLocationMapPress?.();
  };

  const handleEditModeToggle = () => {
    setIsEditMode(!isEditMode);
  };

  const handleAddressEditInternal = (addressId: string) => {
    const addressToEdit = addresses.find(address => address.id === addressId);
    if (addressToEdit) {
      onAddressEdit?.(addressToEdit);
    }
  };

  const handleAddressDeleteInternal = (addressId: string) => {
    onAddressDelete?.(addressId);
  };

  const renderAddressIcon = (type: AddressInfo["type"]) => {
    switch (type) {
      case "home":
        return (
          <HomeAddressIcon
            width={20}
            height={20}
          />
        );
      case "office":
        return (
          <OfficeIcon
            width={20}
            height={20}
          />
        );
      case "school":
        return (
          <LocationPinIcon
            width={20}
            height={20}
          />
        );
      default:
        return (
          <LocationPinIcon
            width={20}
            height={20}
          />
        );
    }
  };

  return (
    <ScreenContainer>
      {/* Header */}
      <HeaderContainer>
        <BackButton
          onPress={onBackPress}
          activeOpacity={0.7}
        >
          <BackIcon
            width={24}
            height={24}
          />
        </BackButton>

        <HeaderTitle>{isEditMode ? "주소 편집" : "주소 설정"}</HeaderTitle>

        <HeaderEditButton
          onPress={handleEditModeToggle}
          activeOpacity={0.7}
        >
          <EditText>{isEditMode ? "완료" : "편집"}</EditText>
        </HeaderEditButton>
      </HeaderContainer>

      <ContentContainer>
        {/* Search Bar */}
        <SearchContainer>
          <SearchIconContainer>
            <SearchIcon
              width={18}
              height={18}
            />
          </SearchIconContainer>
          <SearchInput
            placeholder="지번, 도로명, 건물명으로 검색"
            placeholderTextColor="#999999"
            value={searchText}
            onChangeText={setSearchText}
          />
        </SearchContainer>

        {/* Current Location Button */}
        <CurrentLocationButton
          onPress={handleCurrentLocationPress}
          activeOpacity={0.7}
        >
          <CurrentLocationText>현재 위치로 찾기</CurrentLocationText>
        </CurrentLocationButton>

        {/* Address List */}
        <AddressListContainer>
          <ScrollView showsVerticalScrollIndicator={false}>
            {addresses.map((address, index) => (
              <AddressItem
                key={address.id}
                onPress={isEditMode ? undefined : () => handleAddressSelect(address)}
                activeOpacity={isEditMode ? 1 : 0.7}
              >
                <AddressContent>
                  <AddressHeader>
                    <AddressTypeIcon>{renderAddressIcon(address.type)}</AddressTypeIcon>
                    <AddressTypeName>{address.name}</AddressTypeName>
                  </AddressHeader>
                  <AddressText>{address.address}</AddressText>
                  {address.isSelected && <CurrentAddressIndicator>현재 설정된 주소</CurrentAddressIndicator>}
                </AddressContent>

                {isEditMode && (
                  <EditButtonsContainer>
                    <ModifyButton
                      onPress={() => handleAddressEditInternal(address.id)}
                      activeOpacity={0.7}
                    >
                      <ModifyButtonText>수정</ModifyButtonText>
                    </ModifyButton>
                    <DeleteButton
                      onPress={() => handleAddressDeleteInternal(address.id)}
                      activeOpacity={0.7}
                    >
                      <DeleteButtonText>삭제</DeleteButtonText>
                    </DeleteButton>
                  </EditButtonsContainer>
                )}
              </AddressItem>
            ))}
          </ScrollView>
        </AddressListContainer>
      </ContentContainer>
    </ScreenContainer>
  );
};
