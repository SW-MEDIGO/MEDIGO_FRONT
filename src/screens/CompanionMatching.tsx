import React, { useState } from "react";
import styled from "styled-components/native";
import {
  ScrollView,
  SafeAreaView,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  BackHandler,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { theme } from "../styles";
import { BackIcon } from "../components/icons/BackIcon";
import { Text } from "../components";

interface CompanionMatchingProps {
  navigation?: any;
  currentCoordinates?: { lat: number; lng: number };
}

interface Facility {
  id: string;
  name: string;
  address: string;
  distance: string;
  isOpen: boolean;
  hours?: string;
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

const BackButton = styled.TouchableOpacity`
  padding-top: ${theme.spacing.sm}px;
  padding-bottom: ${theme.spacing.sm}px;
  padding-left: ${theme.spacing.sm}px;
  padding-right: ${theme.spacing.sm}px;
`;

const ScrollableContent = styled(ScrollView)`
  flex: 1;
  padding: 20px;
  padding-bottom: 20px;
`;

const Section = styled.View`
  margin-bottom: ${theme.spacing.xl}px;
`;

const SectionTitle = styled.Text`
  font-size: ${theme.fontSize.md}px;
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.md}px;
`;

const Card = styled.View`
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg}px;
  padding: ${theme.spacing.lg}px;
`;

const InputRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

const StyledTextInput = styled.TextInput`
  flex: 1;
  font-size: ${theme.fontSize.md}px;
  color: ${theme.colors.text.primary};
  min-height: 40px;
`;

const ActionButton = styled.TouchableOpacity`
  padding: 8px 12px;
  background-color: ${theme.colors.background};
  border-radius: 8px;
  margin-left: 8px;
`;

const ActionButtonText = styled.Text`
  font-size: ${theme.fontSize.sm}px;
  color: ${theme.colors.primary};
  font-weight: ${theme.fontWeight.semibold};
`;

const HelperText = styled.Text`
  font-size: ${theme.fontSize.xs}px;
  color: ${theme.colors.text.secondary};
  margin-top: 8px;
`;

const GenderToggleContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${theme.spacing.sm}px;
`;

interface GenderToggleProps {
  active: boolean;
}

const GenderToggle = styled.TouchableOpacity<GenderToggleProps>`
  width: 30%;
  min-width: 90px;
  height: 52px;
  border-radius: 16px;
  background-color: ${({ active }: GenderToggleProps) => (active ? "#4B5858" : "#F8F9FA")};
  border-width: ${({ active }: GenderToggleProps) => (active ? 0 : 1)}px;
  border-color: ${({ active }: GenderToggleProps) => (active ? "transparent" : "#E9ECEF")};
  align-items: center;
  justify-content: center;
`;

const GenderText = styled.Text<GenderToggleProps>`
  font-size: ${theme.fontSize.md}px;
  color: ${({ active }: GenderToggleProps) => (active ? theme.colors.white : theme.colors.text.primary)};
  font-weight: ${theme.fontWeight.medium};
`;

const MultiSelectInput = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.border};
`;

const MultiSelectText = styled.Text<{ isEmpty?: boolean }>`
  font-size: ${theme.fontSize.md}px;
  color: ${(props: { isEmpty?: boolean }) => (props.isEmpty ? theme.colors.text.secondary : theme.colors.text.primary)};
`;

const Chip = styled.View`
  background-color: ${theme.colors.background};
  padding: 6px 12px;
  border-radius: 16px;
  flex-direction: row;
  align-items: center;
  margin-right: 8px;
  margin-bottom: 8px;
`;

const ChipText = styled.Text`
  font-size: ${theme.fontSize.sm}px;
  color: ${theme.colors.text.primary};
  margin-right: 8px;
`;

const RemoveChipButton = styled.TouchableOpacity`
  width: 16px;
  height: 16px;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.text.secondary};
  border-radius: 8px;
`;

const ChipContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const SummaryBox = styled.View`
  background-color: ${theme.colors.background};
  border-radius: ${theme.borderRadius.md}px;
  padding: ${theme.spacing.md}px;
`;

const SummaryRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const SummaryLabel = styled.Text`
  font-size: ${theme.fontSize.sm}px;
  color: ${theme.colors.text.secondary};
`;

const SummaryValue = styled.Text`
  font-size: ${theme.fontSize.sm}px;
  color: ${theme.colors.text.primary};
  font-weight: ${theme.fontWeight.semibold};
`;

const InfoText = styled.Text`
  font-size: ${theme.fontSize.xs}px;
  color: ${theme.colors.text.secondary};
  margin-top: 12px;
  line-height: 16px;
`;

const CheckboxRow = styled.View`
  flex-direction: row;
  align-items: flex-start;
  margin-top: 12px;
`;

const Checkbox = styled.TouchableOpacity`
  width: 20px;
  height: 20px;
  border-width: 2px;
  border-color: ${theme.colors.border};
  border-radius: 4px;
  margin-right: 8px;
  align-items: center;
  justify-content: center;
`;

const CheckboxLabel = styled.Text`
  font-size: ${theme.fontSize.xs}px;
  color: ${theme.colors.text.secondary};
  flex: 1;
  line-height: 20px;
`;

const FixedBar = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${theme.colors.white};
  padding: ${theme.spacing.xl}px ${theme.spacing.lg}px;
  padding-bottom: 0;
  border-top-width: 1px;
  border-top-color: ${theme.colors.border};
`;

const FixedBarNotice = styled.Text`
  font-size: ${theme.fontSize.xs}px;
  color: ${theme.colors.text.secondary};
  text-align: center;
  margin-bottom: ${theme.spacing.sm}px;
`;

const SubmitButton = styled.TouchableOpacity<{ disabled: boolean }>`
  width: 100%;
  height: 54px;
  border-radius: 10px;
  background-color: ${(props: { disabled: boolean }) => (props.disabled ? theme.colors.border : "#0BC1BF")};
  align-items: center;
  justify-content: center;
  opacity: ${(props: { disabled: boolean }) => (props.disabled ? 0.6 : 1)};
`;

const SubmitButtonText = styled.Text`
  font-size: ${theme.fontSize.md}px;
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.white};
`;

// Bottom Sheet Components
const BottomSheetOverlay = styled.TouchableOpacity`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: flex-end;
`;

const BottomSheet = styled.View`
  background-color: ${theme.colors.white};
  border-top-left-radius: ${theme.borderRadius.xl}px;
  border-top-right-radius: ${theme.borderRadius.xl}px;
  max-height: 80%;
  padding: ${theme.spacing.lg}px;
`;

const BottomSheetHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.lg}px;
`;

const BottomSheetTitle = styled.Text`
  font-size: ${theme.fontSize.lg}px;
  font-weight: ${theme.fontWeight.bold};
`;

const CloseButton = styled.Text`
  font-size: 24px;
  color: ${theme.colors.text.secondary};
`;

const FacilityList = styled.ScrollView`
  max-height: 400px;
`;

const FacilityItem = styled.TouchableOpacity`
  padding: ${theme.spacing.md}px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.border};
`;

const FacilityName = styled.Text`
  font-size: ${theme.fontSize.md}px;
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.text.primary};
  margin-bottom: 4px;
`;

const FacilityAddress = styled.Text`
  font-size: ${theme.fontSize.sm}px;
  color: ${theme.colors.text.secondary};
`;

const FacilityDetails = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 4px;
`;

const Badge = styled.View<{ isOpen: boolean }>`
  padding: 2px 8px;
  border-radius: 4px;
  background-color: ${(props: { isOpen: boolean }) => (props.isOpen ? "#7ddb69" : "#ff3b30")};
`;

const BadgeText = styled.Text`
  font-size: ${theme.fontSize.xs}px;
  color: white;
  font-weight: ${theme.fontWeight.semibold};
`;

const DistanceText = styled.Text`
  font-size: ${theme.fontSize.xs}px;
  color: ${theme.colors.text.secondary};
  margin-right: 8px;
`;

const DateTimeContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.border};
`;

const DateTimeText = styled.Text`
  font-size: ${theme.fontSize.md}px;
  color: ${theme.colors.text.primary};
`;

// 카카오 REST API 키
const KAKAO_REST_KEY = "eaacbe68b85bb0c87cb09c51b94a6c2e";

export const CompanionMatching = ({
  navigation,
  currentCoordinates = { lat: 36.3504119, lng: 127.3845475 },
}: CompanionMatchingProps) => {
  const [locationType, setLocationType] = useState<"home" | "current">("home");
  const [hospitalName, setHospitalName] = useState("");
  const [hospitalAddress, setHospitalAddress] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [pickerMode, setPickerMode] = useState<"date" | "time">("date");
  const [requestContent, setRequestContent] = useState("");
  const [companionGender, setCompanionGender] = useState<"MALE" | "FEMALE" | "ANY">("ANY");

  // Bottom sheets
  const [showFacilitiesSheet, setShowFacilitiesSheet] = useState(false);
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [facilitiesLoading, setFacilitiesLoading] = useState(false);

  // Checkboxes
  const [agreePersonalInfo, setAgreePersonalInfo] = useState(false);
  const [agreeNotification, setAgreeNotification] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    hospitalName: "",
    date: "",
    requestContent: "",
  });

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }
    if (selectedDate) {
      setSelectedDate(selectedDate);
    }
  };

  // 뒤로가기 버튼 핸들러
  React.useEffect(() => {
    const backAction = () => {
      navigation?.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => backHandler.remove();
  }, [navigation]);

  // 병원 검색 함수
  const searchHospitals = async () => {
    setFacilitiesLoading(true);
    try {
      const radius = 5000; // 5km 반경

      const response = await fetch(
        `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent("병원")}&x=${
          currentCoordinates.lng
        }&y=${currentCoordinates.lat}&radius=${radius}&size=15&sort=distance`,
        {
          method: "GET",
          headers: {
            Authorization: `KakaoAK ${KAKAO_REST_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.documents && data.documents.length > 0) {
        const medicalFacilities: Facility[] = data.documents.map((place: any, index: number) => {
          const distance = place.distance ? `${(parseInt(place.distance) / 1000).toFixed(1)}km` : "거리 정보 없음";

          return {
            id: place.id || `hospital_${index}`,
            name: place.place_name,
            address: place.address_name,
            distance: distance,
            isOpen: true,
          };
        });

        setFacilities(medicalFacilities);
        return medicalFacilities;
      } else {
        setFacilities([]);
        return [];
      }
    } catch (error) {
      Alert.alert("오류", "병원 정보를 가져올 수 없습니다. 다시 시도해주세요.");
      setFacilities([]);
      return [];
    } finally {
      setFacilitiesLoading(false);
    }
  };

  // 바텀시트 열릴 때 병원 검색
  const handleShowFacilitiesSheet = () => {
    setShowFacilitiesSheet(true);
    searchHospitals();
  };

  const isFormValid = hospitalName && selectedDate && agreePersonalInfo;

  const handleSubmit = async () => {
    if (!isFormValid) return;

    setLoading(true);
    try {
      // TODO: API call
      // const response = await fetch('POST /reservations', {
      //   hospital_name: hospitalName,
      //   reservation_datetime: selectedDate.toISOString(),
      //   content: requestContent,
      //   companion_gender: companionGender,
      // });
      // navigation.navigate('ReservationWaiting', { reservationId: response.id });

      // 임시로 바로 완료 페이지로 이동
      navigation?.navigate("CompanionMatchingDone", {
        hospitalName,
        hospitalAddress,
        selectedDate,
        requestContent,
        companionGender,
      });
    } catch (error) {
      // Error handling
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = () => {
    const dateStr = selectedDate.toLocaleDateString("ko-KR");
    const timeStr = selectedDate.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" });
    return `${dateStr} ${timeStr}`;
  };

  return (
    <ScreenContainer>
      <HeaderWrapper>
        <BackButton onPress={() => navigation?.goBack()}>
          <BackIcon />
        </BackButton>
        <Text
          size="lg"
          weight="semibold"
          color={theme.colors.text.primary}
        >
          동행자 매칭
        </Text>
        <View style={{ width: 40 }} />
      </HeaderWrapper>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollableContent
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
        >
          {/* 병원 선택 카드 */}
          <Section>
            <SectionTitle>병원 선택</SectionTitle>
            <Card
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 4,
                elevation: 2,
              }}
            >
              <InputRow>
                <StyledTextInput
                  placeholder="병원명을 입력하세요"
                  value={hospitalName}
                  onChangeText={setHospitalName}
                  placeholderTextColor={theme.colors.text.secondary}
                />
                <ActionButton onPress={handleShowFacilitiesSheet}>
                  <ActionButtonText>근처 병원/약국 찾기</ActionButtonText>
                </ActionButton>
              </InputRow>
              {hospitalAddress ? <HelperText>{hospitalAddress}</HelperText> : null}
              {errors.hospitalName ? (
                <HelperText style={{ color: theme.colors.error }}>{errors.hospitalName}</HelperText>
              ) : null}
            </Card>
          </Section>

          {/* 예약 일시 */}
          <Section>
            <SectionTitle>예약 일시</SectionTitle>
            <Card
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 4,
                elevation: 2,
              }}
            >
              <DateTimeContainer
                onPress={() => {
                  setPickerMode("date");
                  setShowDatePicker(true);
                }}
              >
                <DateTimeText>{formatDateTime()}</DateTimeText>
              </DateTimeContainer>

              {showDatePicker && (
                <View style={{ marginTop: 16, gap: 12 }}>
                  <View>
                    <HelperText style={{ marginBottom: 8 }}>날짜 선택</HelperText>
                    <DateTimePicker
                      value={selectedDate}
                      mode="date"
                      display={Platform.OS === "ios" ? "spinner" : "default"}
                      onChange={handleDateChange}
                      minimumDate={new Date()}
                    />
                  </View>
                  <View>
                    <HelperText style={{ marginBottom: 8 }}>시간 선택</HelperText>
                    <DateTimePicker
                      value={selectedDate}
                      mode="time"
                      display={Platform.OS === "ios" ? "spinner" : "default"}
                      is24Hour={true}
                      onChange={handleDateChange}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={() => setShowDatePicker(false)}
                    style={{
                      backgroundColor: "#0BC1BF",
                      padding: 12,
                      borderRadius: 8,
                      alignItems: "center",
                      marginTop: 8,
                    }}
                  >
                    <Text
                      size="md"
                      weight="semibold"
                      color={theme.colors.white}
                    >
                      확인
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </Card>
          </Section>

          {/* 요청사항 */}
          <Section>
            <SectionTitle>요청사항</SectionTitle>
            <Card
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 4,
                elevation: 2,
              }}
            >
              <StyledTextInput
                placeholder="요청사항을 입력하세요 (최대 500자)"
                value={requestContent}
                onChangeText={(text: string) => {
                  if (text.length <= 500) setRequestContent(text);
                }}
                multiline
                numberOfLines={2}
                placeholderTextColor={theme.colors.text.secondary}
                style={{ minHeight: 60, textAlignVertical: "top", paddingBottom: 8 }}
              />
              <HelperText style={{ textAlign: "right", marginTop: 0 }}>{requestContent.length}/500</HelperText>
            </Card>
          </Section>

          {/* 동행자 조건 */}
          <Section>
            <SectionTitle>동행자 조건</SectionTitle>
            <Card
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 4,
                elevation: 2,
              }}
            >
              <GenderToggleContainer>
                <GenderToggle
                  active={companionGender === "FEMALE"}
                  onPress={() => setCompanionGender("FEMALE")}
                  activeOpacity={0.7}
                >
                  <GenderText active={companionGender === "FEMALE"}>여성</GenderText>
                </GenderToggle>
                <GenderToggle
                  active={companionGender === "MALE"}
                  onPress={() => setCompanionGender("MALE")}
                  activeOpacity={0.7}
                >
                  <GenderText active={companionGender === "MALE"}>남성</GenderText>
                </GenderToggle>
                <GenderToggle
                  active={companionGender === "ANY"}
                  onPress={() => setCompanionGender("ANY")}
                  activeOpacity={0.7}
                >
                  <GenderText active={companionGender === "ANY"}>무관</GenderText>
                </GenderToggle>
              </GenderToggleContainer>
            </Card>
          </Section>

          {/* 요청 요약 */}
          <Section>
            <SectionTitle>요청 요약</SectionTitle>
            <SummaryBox
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 2,
                elevation: 1,
              }}
            >
              <SummaryRow>
                <SummaryLabel>병원명</SummaryLabel>
                <SummaryValue>{hospitalName || "-"}</SummaryValue>
              </SummaryRow>
              <SummaryRow>
                <SummaryLabel>예약 일시</SummaryLabel>
                <SummaryValue>{formatDateTime()}</SummaryValue>
              </SummaryRow>
              <SummaryRow>
                <SummaryLabel>성별 조건</SummaryLabel>
                <SummaryValue>
                  {companionGender === "MALE" ? "남성" : companionGender === "FEMALE" ? "여성" : "무관"}
                </SummaryValue>
              </SummaryRow>

              <InfoText>
                매칭이 완료되면 푸시 알림을 보내드립니다.{"\n"}
                예약 시간 전에 동행자와 함께 병원에 도착해 주세요.
              </InfoText>

              <CheckboxRow>
                <Checkbox onPress={() => setAgreePersonalInfo(!agreePersonalInfo)}>
                  {agreePersonalInfo && <SummaryValue style={{ fontSize: 12 }}>✓</SummaryValue>}
                </Checkbox>
                <CheckboxLabel>개인정보 활용 동의 (필수)</CheckboxLabel>
              </CheckboxRow>

              <CheckboxRow>
                <Checkbox onPress={() => setAgreeNotification(!agreeNotification)}>
                  {agreeNotification && <SummaryValue style={{ fontSize: 12 }}>✓</SummaryValue>}
                </Checkbox>
                <CheckboxLabel>매칭 알림 수신 동의 (선택)</CheckboxLabel>
              </CheckboxRow>
            </SummaryBox>
          </Section>
        </ScrollableContent>

        {/* 고정 CTA 바 */}
        <FixedBar
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 8,
          }}
        >
          <FixedBarNotice>매칭 요청 후 동행자에게 알림이 전송돼요</FixedBarNotice>
          <SubmitButton
            disabled={!isFormValid || loading}
            onPress={handleSubmit}
            activeOpacity={0.8}
          >
            {loading ? <ActivityIndicator color="white" /> : <SubmitButtonText>매칭 요청하기</SubmitButtonText>}
          </SubmitButton>
        </FixedBar>
      </KeyboardAvoidingView>

      {/* 병원/약국 찾기 바텀시트 */}
      <Modal
        visible={showFacilitiesSheet}
        transparent
        animationType="slide"
        onRequestClose={() => setShowFacilitiesSheet(false)}
      >
        <BottomSheetOverlay onPress={() => setShowFacilitiesSheet(false)}>
          <BottomSheet
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: -2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 16,
            }}
          >
            <BottomSheetHeader>
              <BottomSheetTitle>근처 병원/약국 찾기</BottomSheetTitle>
              <CloseButton onPress={() => setShowFacilitiesSheet(false)}>×</CloseButton>
            </BottomSheetHeader>
            {facilitiesLoading ? (
              <View style={{ alignItems: "center", justifyContent: "center", padding: 40 }}>
                <ActivityIndicator
                  size="large"
                  color={theme.colors.primary}
                />
                <HelperText style={{ marginTop: 16 }}>병원을 검색하고 있습니다...</HelperText>
              </View>
            ) : facilities.length === 0 ? (
              <View style={{ alignItems: "center", justifyContent: "center", padding: 40 }}>
                <HelperText>근처 병원을 찾을 수 없습니다.</HelperText>
              </View>
            ) : (
              <FacilityList>
                {facilities.map(facility => (
                  <FacilityItem
                    key={facility.id}
                    onPress={() => {
                      setHospitalName(facility.name);
                      setHospitalAddress(facility.address);
                      setShowFacilitiesSheet(false);
                    }}
                  >
                    <FacilityName>{facility.name}</FacilityName>
                    <FacilityAddress>{facility.address}</FacilityAddress>
                    <FacilityDetails>
                      <DistanceText>{facility.distance}</DistanceText>
                      <Badge isOpen={facility.isOpen}>
                        <BadgeText>{facility.isOpen ? "영업중" : "영업 종료"}</BadgeText>
                      </Badge>
                    </FacilityDetails>
                  </FacilityItem>
                ))}
              </FacilityList>
            )}
          </BottomSheet>
        </BottomSheetOverlay>
      </Modal>
    </ScreenContainer>
  );
};
