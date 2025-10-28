import React, { useState } from "react";
import styled from "styled-components/native";
import { SafeAreaView, TouchableOpacity, Image, Alert, ScrollView, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Text, Button } from "../../components";
import { BackIcon } from "../../components/icons";
import { theme } from "../../styles";

interface VerifyAccountProps {
  onComplete: (data: { bank: string; accountNumber: string; idCardImage: string | null }) => void;
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

const ImageUploadContainer = styled.View`
  margin-bottom: ${theme.spacing.lg}px;
`;

const ImageUploadWrapper = styled(TouchableOpacity)`
  height: 200px;
  border-radius: 10px;
  background-color: ${theme.colors.background};
  border-width: 2px;
  border-color: ${theme.colors.border};
  border-style: dashed;
  align-items: center;
  justify-content: center;
`;

const UploadedImage = styled(Image)`
  width: 100%;
  height: 200px;
  border-radius: 10px;
`;

const UploadText = styled.View`
  align-items: center;
`;

const ButtonWrapper = styled.View`
  padding-left: ${theme.spacing.lg}px;
  padding-right: ${theme.spacing.lg}px;
  padding-bottom: ${theme.spacing.xl}px;
  padding-top: ${theme.spacing.md}px;
  background-color: ${theme.colors.background};
`;

const banks = [
  "국민은행",
  "신한은행",
  "우리은행",
  "하나은행",
  "농협은행",
  "기업은행",
  "새마을금고",
  "신협",
  "우체국",
  "카카오뱅크",
  "토스뱅크",
  "케이뱅크",
  "SC제일은행",
  "한국씨티은행",
  "대구은행",
  "부산은행",
  "경남은행",
  "광주은행",
  "전북은행",
  "제주은행",
];

export const VerifyAccount = ({ onComplete, onBack }: VerifyAccountProps) => {
  const [bank, setBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [idCardImage, setIdCardImage] = useState<string | null>(null);
  const [showBankDropdown, setShowBankDropdown] = useState(false);

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
        aspect: [16, 10],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setIdCardImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("오류", "이미지를 선택하는 중 오류가 발생했습니다.");
    }
  };

  const formatAccountNumber = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, "");
    return cleaned;
  };

  const handleComplete = () => {
    if (!bank) {
      Alert.alert("입력 오류", "은행을 선택해주세요.");
      return;
    }
    if (!accountNumber.trim()) {
      Alert.alert("입력 오류", "계좌번호를 입력해주세요.");
      return;
    }
    if (!idCardImage) {
      Alert.alert("입력 오류", "신분증 사진을 업로드해주세요.");
      return;
    }

    onComplete({
      bank,
      accountNumber: accountNumber.trim(),
      idCardImage,
    });
  };

  const isFormValid = bank && accountNumber.trim() && idCardImage;

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
          계좌 인증
        </Text>
        <View style={{ width: 40 }} />
      </HeaderWrapper>

      <ContentContainer showsVerticalScrollIndicator={false}>
        <TitleWrapper>
          <Text
            size="xxl"
            weight="bold"
            color={theme.colors.text.primary}
          >
            계좌 인증을 위해
          </Text>
          <Text
            size="xxl"
            weight="bold"
            color={theme.colors.text.primary}
          >
            정보를 입력해주세요
          </Text>
        </TitleWrapper>

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
                은행
              </Text>
            </InputLabel>
            <DropdownContainer>
              <DropdownButton onPress={() => setShowBankDropdown(!showBankDropdown)}>
                <DropdownText>{bank || "은행을 선택해주세요"}</DropdownText>
                <Text
                  size="md"
                  weight="normal"
                  color={theme.colors.text.secondary}
                >
                  ▼
                </Text>
              </DropdownButton>
              <DropdownList
                visible={showBankDropdown}
                showsVerticalScrollIndicator={true}
                nestedScrollEnabled={true}
              >
                {banks.map(bankName => (
                  <DropdownItem
                    key={bankName}
                    onPress={() => {
                      setBank(bankName);
                      setShowBankDropdown(false);
                    }}
                  >
                    <DropdownItemText>{bankName}</DropdownItemText>
                  </DropdownItem>
                ))}
              </DropdownList>
            </DropdownContainer>
          </InputField>

          <InputField>
            <InputLabel>
              <Text
                size="md"
                weight="semibold"
                color={theme.colors.text.primary}
              >
                계좌번호
              </Text>
            </InputLabel>
            <TextInput
              value={accountNumber}
              onChangeText={(text: string) => setAccountNumber(formatAccountNumber(text))}
              placeholder="계좌번호를 입력해주세요"
              placeholderTextColor={theme.colors.text.secondary}
              keyboardType="numeric"
            />
          </InputField>
        </InputContainer>

        <ImageUploadContainer>
          <InputLabel>
            <Text
              size="md"
              weight="semibold"
              color={theme.colors.text.primary}
            >
              신분증 사진
            </Text>
          </InputLabel>
          <ImageUploadWrapper onPress={pickImage}>
            {idCardImage ? (
              <UploadedImage source={{ uri: idCardImage }} />
            ) : (
              <UploadText>
                <Text
                  size="md"
                  weight="medium"
                  color={theme.colors.text.secondary}
                >
                  신분증 사진을 업로드해주세요
                </Text>
                <Text
                  size="sm"
                  weight="normal"
                  color={theme.colors.text.secondary}
                >
                  (주민등록증, 운전면허증 등)
                </Text>
              </UploadText>
            )}
          </ImageUploadWrapper>
        </ImageUploadContainer>
      </ContentContainer>

      <ButtonWrapper>
        <Button
          title="다음"
          onPress={handleComplete}
          disabled={!isFormValid}
        />
      </ButtonWrapper>
    </ScreenContainer>
  );
};
