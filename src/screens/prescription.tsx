import React from "react";
import styled from "styled-components/native";
import { ScrollView, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Path } from "react-native-svg";
import { theme } from "../styles";

interface PrescriptionDetail {
  id: string;
  userName: string;
  companion: string;
  hospital: string;
  pharmacy: string;
  date: string;
  symptoms: string;
  prescriptionNotes: string;
  medicines: Medicine[];
  receiptImage?: string;
  paymentAmount: string;
}

interface Medicine {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
}

interface PrescriptionScreenProps {
  record: PrescriptionDetail;
  navigation: {
    goBack: () => void;
  };
}

const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.background};
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  padding-top: 60px;
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
  background-color: ${theme.colors.white};
`;

const BackButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
`;

const BackIcon = () => (
  <Svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <Path
      d="M15 18L9 12L15 6"
      stroke="#000"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const HeaderTitle = styled.Text`
  font-size: ${theme.fontSize.xl}px;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.text.primary};
  font-family: "Apple SD Gothic Neo";
  flex: 1;
  text-align: center;
  margin-right: 40px;
`;

const ContentContainer = styled.ScrollView`
  flex: 1;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
`;

const InfoCard = styled.View`
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg}px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
  margin-bottom: 16px;
`;

const SectionTitle = styled.Text`
  font-size: ${theme.fontSize.md}px;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.text.primary};
  font-family: "Apple SD Gothic Neo";
  margin-bottom: 16px;
`;

const InfoRow = styled.View`
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: 12px;
`;

const Label = styled.Text`
  font-size: ${theme.fontSize.sm}px;
  font-weight: ${theme.fontWeight.medium};
  color: ${theme.colors.text.secondary};
  font-family: "Apple SD Gothic Neo";
  width: 80px;
`;

const Value = styled.Text`
  font-size: ${theme.fontSize.sm}px;
  font-weight: ${theme.fontWeight.normal};
  color: ${theme.colors.text.primary};
  font-family: "Apple SD Gothic Neo";
  flex: 1;
`;

const MedicineCard = styled.View`
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg}px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
  margin-bottom: 16px;
`;

const MedicineItem = styled.View`
  padding-bottom: 12px;
  margin-bottom: 12px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.border};
`;

const MedicineName = styled.Text`
  font-size: ${theme.fontSize.md}px;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.text.primary};
  font-family: "Apple SD Gothic Neo";
  margin-bottom: 8px;
`;

const MedicineDetail = styled.Text`
  font-size: ${theme.fontSize.sm}px;
  font-weight: ${theme.fontWeight.normal};
  color: ${theme.colors.text.secondary};
  font-family: "Apple SD Gothic Neo";
  margin-bottom: 4px;
`;

const ReceiptContainer = styled.View`
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg}px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
  margin-bottom: 16px;
`;

const ReceiptImage = styled.Image`
  width: 100%;
  height: 200px;
  border-radius: ${theme.borderRadius.md}px;
  margin-bottom: 12px;
`;

const NoImageText = styled.Text`
  font-size: ${theme.fontSize.sm}px;
  color: ${theme.colors.text.secondary};
  font-family: "Apple SD Gothic Neo";
  text-align: center;
  padding-top: 80px;
  padding-bottom: 80px;
`;

const PaymentCard = styled(LinearGradient)`
  border-radius: ${theme.borderRadius.lg}px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
  margin-bottom: 100px;
`;

const PaymentTitle = styled.Text`
  font-size: ${theme.fontSize.sm}px;
  font-weight: ${theme.fontWeight.medium};
  color: ${theme.colors.white};
  font-family: "Apple SD Gothic Neo";
  margin-bottom: 8px;
`;

const PaymentAmount = styled.Text`
  font-size: ${theme.fontSize.xxl}px;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.white};
  font-family: "Apple SD Gothic Neo";
`;

// 샘플 데이터
const mockPrescriptionDetail: PrescriptionDetail = {
  id: "1",
  userName: "홍길동",
  companion: "김태원",
  hospital: "우은식병원",
  pharmacy: "건강약국",
  date: "2025.10.10",
  symptoms: "감기, 콧물, 인후통",
  prescriptionNotes: "감기 증상 완화를 위한 처방입니다. 약물을 규칙적으로 복용하시기 바랍니다.",
  medicines: [
    {
      name: "아목시실린캡슐",
      dosage: "500mg",
      frequency: "하루 3회, 식후",
      duration: "5일",
    },
    {
      name: "타이레놀",
      dosage: "500mg",
      frequency: "하루 3회, 식전",
      duration: "3일",
    },
    {
      name: "가비린정",
      dosage: "1정",
      frequency: "하루 3회, 식후",
      duration: "5일",
    },
  ],
  receiptImage: undefined,
  paymentAmount: "35,000원",
};

export const PrescriptionScreen = ({ record, navigation }: PrescriptionScreenProps) => {
  return (
    <Container>
      <Header>
        <BackButton onPress={navigation.goBack}>
          <BackIcon />
        </BackButton>
        <HeaderTitle>처방전 상세</HeaderTitle>
      </Header>

      <ContentContainer showsVerticalScrollIndicator={false}>
        {/* 기본 정보 */}
        <InfoCard
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 2,
          }}
        >
          <SectionTitle>진료 정보</SectionTitle>
          <InfoRow>
            <Label>환자</Label>
            <Value>{record.userName}</Value>
          </InfoRow>
          <InfoRow>
            <Label>동행자</Label>
            <Value>{record.companion}</Value>
          </InfoRow>
          <InfoRow>
            <Label>병원</Label>
            <Value>{record.hospital}</Value>
          </InfoRow>
          <InfoRow>
            <Label>약국</Label>
            <Value>{record.pharmacy}</Value>
          </InfoRow>
          <InfoRow>
            <Label>일자</Label>
            <Value>{record.date}</Value>
          </InfoRow>
          <InfoRow>
            <Label>증상</Label>
            <Value>{record.symptoms}</Value>
          </InfoRow>
        </InfoCard>

        {/* 처방 기록 */}
        <InfoCard
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 2,
          }}
        >
          <SectionTitle>처방 기록</SectionTitle>
          <Value>{record.prescriptionNotes}</Value>
        </InfoCard>

        {/* 처방약 */}
        <MedicineCard
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 2,
          }}
        >
          <SectionTitle>처방약</SectionTitle>
          {record.medicines.map((medicine, index) => (
            <MedicineItem key={index}>
              <MedicineName>{medicine.name}</MedicineName>
              <MedicineDetail>용량: {medicine.dosage}</MedicineDetail>
              <MedicineDetail>복용: {medicine.frequency}</MedicineDetail>
              <MedicineDetail>기간: {medicine.duration}</MedicineDetail>
            </MedicineItem>
          ))}
        </MedicineCard>

        {/* 영수증 첨부 */}
        <ReceiptContainer
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 2,
          }}
        >
          <SectionTitle>영수증</SectionTitle>
          {record.receiptImage ? (
            <ReceiptImage
              source={{ uri: record.receiptImage }}
              resizeMode="contain"
            />
          ) : (
            <NoImageText>영수증이 첨부되지 않았습니다.</NoImageText>
          )}
        </ReceiptContainer>

        {/* 결제 금액 */}
        <PaymentCard
          colors={["#00A6D8", "#0BC1BF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            shadowColor: "rgba(11, 193, 191, 0.05)",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 1,
            shadowRadius: 1,
            elevation: 2,
          }}
        >
          <PaymentTitle>결제 금액</PaymentTitle>
          <PaymentAmount>{record.paymentAmount}</PaymentAmount>
        </PaymentCard>
      </ContentContainer>
    </Container>
  );
};
