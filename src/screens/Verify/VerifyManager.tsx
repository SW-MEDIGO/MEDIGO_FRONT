import React, { useState } from "react";
import styled from "styled-components/native";
import { SafeAreaView, TouchableOpacity, Image, Alert, ScrollView, View, Modal } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Text, Button } from "../../components";
import { BackIcon } from "../../components/icons";
import { theme } from "../../styles";

interface VerifyManagerProps {
  onComplete: (data: {
    profileImage: string | null;
    name: string;
    residentNumber: string;
    phoneCarrier: string;
    phoneNumber: string;
    activityRegion: string;
  }) => void;
  onBack: () => void;
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

const BackButton = styled(TouchableOpacity)`
  padding-top: ${theme.spacing.sm}px;
  padding-bottom: ${theme.spacing.sm}px;
  padding-left: ${theme.spacing.sm}px;
  padding-right: ${theme.spacing.sm}px;
`;

const ContentContainer = styled(ScrollView)`
  flex: 1;
  padding-left: ${theme.spacing.lg}px;
  padding-right: ${theme.spacing.lg}px;
`;

const TitleWrapper = styled.View`
  margin-top: ${theme.spacing.xl}px;
  margin-bottom: ${theme.spacing.xxl}px;
`;

const ProfileImageContainer = styled.View`
  align-items: center;
  margin-bottom: ${theme.spacing.xl}px;
`;

const ProfileImageWrapper = styled(TouchableOpacity)`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  background-color: ${theme.colors.border};
  align-items: center;
  justify-content: center;
  border-width: 2px;
  border-color: ${theme.colors.border};
  border-style: dashed;
`;

const ProfileImage = styled(Image)`
  width: 120px;
  height: 120px;
  border-radius: 60px;
`;

const ProfileImageText = styled.View`
  align-items: center;
`;

const InputContainer = styled.View`
  background-color: ${theme.colors.white};
  border-radius: 20px;
  padding-top: ${theme.spacing.xl}px;
  padding-bottom: ${theme.spacing.xl}px;
  padding-left: ${theme.spacing.lg}px;
  padding-right: ${theme.spacing.lg}px;
  margin-bottom: ${theme.spacing.lg}px;
`;

const InputField = styled.View`
  margin-bottom: ${theme.spacing.lg}px;
`;

const RowContainer = styled.View`
  flex-direction: row;
  gap: ${theme.spacing.md}px;
`;

const CarrierField = styled.View`
  width: 35%;
  margin-bottom: ${theme.spacing.lg}px;
`;

const PhoneField = styled.View`
  flex: 1;
  margin-bottom: ${theme.spacing.lg}px;
`;

const InputLabel = styled.View`
  margin-bottom: ${theme.spacing.sm}px;
`;

const TextInput = styled.TextInput`
  height: 50px;
  border-radius: 10px;
  background-color: ${theme.colors.background};
  padding-left: ${theme.spacing.md}px;
  padding-right: ${theme.spacing.md}px;
  font-family: ${theme.fonts.primary};
  font-size: ${theme.fontSize.md}px;
  color: ${theme.colors.text.primary};
`;

const DropdownContainer = styled.View`
  position: relative;
`;

const DropdownButton = styled(TouchableOpacity)`
  height: 50px;
  border-radius: 10px;
  background-color: ${theme.colors.background};
  padding-left: ${theme.spacing.md}px;
  padding-right: ${theme.spacing.md}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const DropdownText = styled.Text`
  font-family: ${theme.fonts.primary};
  font-size: ${theme.fontSize.md}px;
  color: ${theme.colors.text.primary};
`;

const DropdownList = styled.ScrollView<{ visible: boolean }>`
  position: absolute;
  top: 55px;
  left: 0;
  right: 0;
  background-color: ${theme.colors.white};
  border-radius: 10px;
  border-width: 1px;
  border-color: ${theme.colors.border};
  z-index: 9999;
  max-height: 150px;
  elevation: 10;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.2;
  shadow-radius: 8px;
  display: ${({ visible }: { visible: boolean }) => (visible ? "flex" : "none")};
`;

const DropdownItem = styled(TouchableOpacity)`
  padding-top: ${theme.spacing.md}px;
  padding-bottom: ${theme.spacing.md}px;
  padding-left: ${theme.spacing.md}px;
  padding-right: ${theme.spacing.md}px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.border};
`;

const DropdownItemText = styled.Text`
  font-family: ${theme.fonts.primary};
  font-size: ${theme.fontSize.md}px;
  color: ${theme.colors.text.primary};
`;

const ButtonWrapper = styled.View`
  padding-left: ${theme.spacing.lg}px;
  padding-right: ${theme.spacing.lg}px;
  padding-bottom: ${theme.spacing.xl}px;
  padding-top: ${theme.spacing.md}px;
  background-color: ${theme.colors.background};
`;

const ModalOverlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.View`
  background-color: ${theme.colors.white};
  border-radius: 20px;
  width: 90%;
  max-width: 400px;
`;

const ModalHeader = styled.View`
  padding-top: ${theme.spacing.xxl}px;
  padding-bottom: ${theme.spacing.lg}px;
  padding-left: ${theme.spacing.xl}px;
  padding-right: ${theme.spacing.xl}px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.border};
`;

const ModalContent = styled.View`
  padding-left: ${theme.spacing.xl}px;
  padding-right: ${theme.spacing.xl}px;
`;

const ModalOptionGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${theme.spacing.sm}px;
  margin-top: ${theme.spacing.lg}px;
  margin-bottom: ${theme.spacing.lg}px;
`;

interface ModalOptionButtonProps {
  selected: boolean;
}

const ModalOptionButton = styled(TouchableOpacity)<ModalOptionButtonProps>`
  width: 30%;
  min-width: 90px;
  height: 52px;
  border-radius: 16px;
  background-color: ${({ selected }: ModalOptionButtonProps) => (selected ? "#4B5858" : "#F8F9FA")};
  border-width: ${({ selected }: ModalOptionButtonProps) => (selected ? 0 : 1)}px;
  border-color: ${({ selected }: ModalOptionButtonProps) => (selected ? "transparent" : "#E9ECEF")};
  align-items: center;
  justify-content: center;
`;

const ModalButtonContainer = styled.View`
  padding-top: ${theme.spacing.lg}px;
  padding-bottom: ${theme.spacing.xl}px;
  padding-left: ${theme.spacing.xl}px;
  padding-right: ${theme.spacing.xl}px;
  flex-direction: row;
  gap: ${theme.spacing.md}px;
`;

const carriers = ["SKT", "KT", "LG U+", "SKT 알뜰폰", "KT 알뜰폰", "LG U+ 알뜰폰"];
const regions = ["대전 동구", "대전 중구", "대전 서구", "대전 유성구", "대전 대덕구"];

export const VerifyManager = ({ onComplete, onBack }: VerifyManagerProps) => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [residentNumber, setResidentNumber] = useState("");
  const [phoneCarrier, setPhoneCarrier] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [activityRegion, setActivityRegion] = useState("");
  const [showCarrierDropdown, setShowCarrierDropdown] = useState(false);
  const [showRegionModal, setShowRegionModal] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("");

  const pickImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        Alert.alert("권한 필요", "사진을 선택하려면 갤러리 접근 권한이 필요합니다.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setProfileImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("오류", "이미지를 선택하는 중 오류가 발생했습니다.");
    }
  };

  const formatResidentNumber = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, "");
    if (cleaned.length <= 7) {
      if (cleaned.length <= 6) {
        return cleaned;
      } else {
        return `${cleaned.slice(0, 6)}-${cleaned.slice(6)}`;
      }
    }
    return cleaned.slice(0, 7);
  };

  const formatPhoneNumber = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, "");
    if (cleaned.length <= 11) {
      if (cleaned.length <= 3) {
        return cleaned;
      } else if (cleaned.length <= 7) {
        return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
      } else {
        return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7)}`;
      }
    }
    return cleaned.slice(0, 11);
  };

  const handleComplete = () => {
    if (!name.trim()) {
      Alert.alert("입력 오류", "이름을 입력해주세요.");
      return;
    }
    if (residentNumber.length !== 8) {
      Alert.alert("입력 오류", "주민등록번호를 올바르게 입력해주세요.");
      return;
    }
    if (!phoneCarrier) {
      Alert.alert("입력 오류", "통신사를 선택해주세요.");
      return;
    }
    if (phoneNumber.length < 10) {
      Alert.alert("입력 오류", "휴대폰 번호를 올바르게 입력해주세요.");
      return;
    }
    if (!activityRegion) {
      Alert.alert("입력 오류", "활동 지역을 선택해주세요.");
      return;
    }

    onComplete({
      profileImage,
      name: name.trim(),
      residentNumber: residentNumber.replace("-", ""),
      phoneCarrier,
      phoneNumber: phoneNumber.replace(/-/g, ""),
      activityRegion,
    });
  };

  const isFormValid =
    name.trim() && residentNumber.length === 8 && phoneCarrier && phoneNumber.length >= 10 && activityRegion;

  return (
    <ScreenContainer>
      <HeaderWrapper>
        <BackButton onPress={onBack}>
          <BackIcon />
        </BackButton>
        <Text
          size="lg"
          weight="semibold"
          color={theme.colors.text.primary}
        >
          동행자 등록
        </Text>
        <View style={{ width: 40 }} />
      </HeaderWrapper>

      <ContentContainer showsVerticalScrollIndicator={false}>
        <ProfileImageContainer>
          <ProfileImageWrapper onPress={pickImage}>
            {profileImage ? (
              <ProfileImage source={{ uri: profileImage }} />
            ) : (
              <ProfileImageText>
                <Text
                  size="md"
                  weight="medium"
                  color={theme.colors.text.secondary}
                >
                  프로필 사진
                </Text>
                <Text
                  size="sm"
                  weight="normal"
                  color={theme.colors.text.secondary}
                >
                  업로드
                </Text>
              </ProfileImageText>
            )}
          </ProfileImageWrapper>
        </ProfileImageContainer>

        <InputContainer
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.05,
            shadowRadius: 2,
            elevation: 1,
          }}
        >
          <InputField>
            <InputLabel>
              <Text
                size="md"
                weight="semibold"
                color={theme.colors.text.primary}
              >
                이름
              </Text>
            </InputLabel>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="이름을 입력해주세요"
              placeholderTextColor={theme.colors.text.secondary}
            />
          </InputField>

          <InputField>
            <InputLabel>
              <Text
                size="md"
                weight="semibold"
                color={theme.colors.text.primary}
              >
                주민등록번호
              </Text>
            </InputLabel>
            <TextInput
              value={residentNumber}
              onChangeText={(text: string) => setResidentNumber(formatResidentNumber(text))}
              placeholder="123456-7"
              placeholderTextColor={theme.colors.text.secondary}
              keyboardType="numeric"
              maxLength={8}
            />
          </InputField>

          <RowContainer>
            <CarrierField>
              <InputLabel>
                <Text
                  size="md"
                  weight="semibold"
                  color={theme.colors.text.primary}
                >
                  통신사
                </Text>
              </InputLabel>
              <DropdownContainer>
                <DropdownButton onPress={() => setShowCarrierDropdown(!showCarrierDropdown)}>
                  <DropdownText>{phoneCarrier || "통신사"}</DropdownText>
                  <Text
                    size="md"
                    weight="normal"
                    color={theme.colors.text.secondary}
                  >
                    ▼
                  </Text>
                </DropdownButton>
                <DropdownList
                  visible={showCarrierDropdown}
                  showsVerticalScrollIndicator={true}
                  nestedScrollEnabled={true}
                >
                  {carriers.map(carrier => (
                    <DropdownItem
                      key={carrier}
                      onPress={() => {
                        setPhoneCarrier(carrier);
                        setShowCarrierDropdown(false);
                      }}
                    >
                      <DropdownItemText>{carrier}</DropdownItemText>
                    </DropdownItem>
                  ))}
                </DropdownList>
              </DropdownContainer>
            </CarrierField>

            <PhoneField>
              <InputLabel>
                <Text
                  size="md"
                  weight="semibold"
                  color={theme.colors.text.primary}
                >
                  휴대폰 번호
                </Text>
              </InputLabel>
              <TextInput
                value={phoneNumber}
                onChangeText={(text: string) => setPhoneNumber(formatPhoneNumber(text))}
                placeholder="010-1234-5678"
                placeholderTextColor={theme.colors.text.secondary}
                keyboardType="numeric"
                maxLength={13}
              />
            </PhoneField>
          </RowContainer>

          <InputField>
            <InputLabel>
              <Text
                size="md"
                weight="semibold"
                color={theme.colors.text.primary}
              >
                활동 지역
              </Text>
            </InputLabel>
            <DropdownButton
              onPress={() => {
                setSelectedRegion(activityRegion);
                setShowRegionModal(true);
              }}
            >
              <DropdownText>{activityRegion || "활동 지역을 선택해주세요"}</DropdownText>
              <Text
                size="md"
                weight="normal"
                color={theme.colors.text.secondary}
              >
                ▼
              </Text>
            </DropdownButton>
          </InputField>
        </InputContainer>
      </ContentContainer>

      <ButtonWrapper>
        <Button
          title="다음"
          onPress={handleComplete}
          disabled={!isFormValid}
        />
      </ButtonWrapper>

      <Modal
        visible={showRegionModal}
        transparent
        animationType="fade"
        onRequestClose={() => {
          setShowRegionModal(false);
          setSelectedRegion("");
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            setShowRegionModal(false);
            setSelectedRegion("");
          }}
          style={{ flex: 1 }}
        >
          <ModalOverlay>
            <TouchableOpacity
              activeOpacity={1}
              onPress={e => e.stopPropagation()}
            >
              <ModalContainer
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.25,
                  shadowRadius: 8,
                  elevation: 10,
                }}
              >
                <ModalHeader>
                  <Text
                    size="lg"
                    weight="semibold"
                    color={theme.colors.text.primary}
                  >
                    활동 지역 선택
                  </Text>
                </ModalHeader>
                <ModalContent>
                  <ModalOptionGrid>
                    {regions.map(region => {
                      const isSelected = region === (selectedRegion || activityRegion);
                      return (
                        <ModalOptionButton
                          key={region}
                          selected={isSelected}
                          onPress={() => setSelectedRegion(region)}
                          activeOpacity={0.7}
                        >
                          <Text
                            size="md"
                            weight="medium"
                            color={isSelected ? theme.colors.white : theme.colors.text.primary}
                          >
                            {region}
                          </Text>
                        </ModalOptionButton>
                      );
                    })}
                  </ModalOptionGrid>
                </ModalContent>
                <ModalButtonContainer>
                  <TouchableOpacity
                    onPress={() => {
                      setShowRegionModal(false);
                      setSelectedRegion("");
                    }}
                    style={{
                      flex: 1,
                      height: 50,
                      borderRadius: 12,
                      backgroundColor: theme.colors.background,
                      justifyContent: "center",
                      alignItems: "center",
                      borderWidth: 1,
                      borderColor: theme.colors.border,
                    }}
                  >
                    <Text
                      size="md"
                      weight="semibold"
                      color={theme.colors.text.primary}
                    >
                      취소
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      if (selectedRegion) {
                        setActivityRegion(selectedRegion);
                      }
                      setShowRegionModal(false);
                      setSelectedRegion("");
                    }}
                    style={{
                      flex: 1,
                      height: 50,
                      borderRadius: 12,
                      backgroundColor: selectedRegion || activityRegion ? "#4B5858" : theme.colors.border,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    disabled={!selectedRegion && !activityRegion}
                  >
                    <Text
                      size="md"
                      weight="semibold"
                      color={theme.colors.white}
                    >
                      확인
                    </Text>
                  </TouchableOpacity>
                </ModalButtonContainer>
              </ModalContainer>
            </TouchableOpacity>
          </ModalOverlay>
        </TouchableOpacity>
      </Modal>
    </ScreenContainer>
  );
};
