import React, { useState } from "react";
import styled from "styled-components/native";
import { ScrollView, TouchableOpacity, RefreshControl } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Path } from "react-native-svg";
import { BottomNavigation } from "../components/BottomNavigation";
import { theme } from "../styles";
interface MedicalRecord {
  id: string;
  companion: string;
  hospital: string;
  date: string;
}

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

interface MedicalRecordsScreenProps {
  activeTab: string;
  onTabPress: (tab: string) => void;
  onNavigateToPrescription?: (record: PrescriptionDetail) => void;
}

const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.background};
`;

const ContentContainer = styled.View`
  flex: 1;
  padding-left: 20px;
  padding-right: 20px;
`;

const CheckButton = styled(LinearGradient)`
  border-radius: ${theme.borderRadius.lg}px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 16px;
  padding-bottom: 16px;
  margin-top: 30px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const CheckButtonText = styled.Text`
  font-size: ${theme.fontSize.lg}px;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.white};
`;

const RefreshIcon = styled.Text`
  font-size: 20px;
  color: ${theme.colors.white};
`;

const RecordsList = styled.View`
  flex: 1;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const RecordCard = styled.View`
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg}px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 16px;
  padding-bottom: 16px;
  margin-bottom: 12px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const RecordInfo = styled.View`
  flex: 1;
`;

const CompanionContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 4px;
`;

const CompanionLabel = styled.Text`
  font-size: 13px;
  font-weight: 700;
  color: #0bc1bf;
  font-family: "Apple SD Gothic Neo";
`;

const CompanionName = styled.Text`
  font-size: 13px;
  font-weight: 700;
  color: #a2a2a2;
  font-family: "Apple SD Gothic Neo";
`;

const HospitalText = styled.Text`
  font-size: 17px;
  font-weight: 900;
  color: #4a4a4a;
  font-family: "Apple SD Gothic Neo";
  margin-bottom: 4px;
`;

const DateText = styled.Text`
  color: #a2a2a2;
  font-family: "Apple SD Gothic Neo";
  font-size: 11px;
  font-weight: 500;
`;

const RecordIcon = styled.View`
  width: 60px;
  height: 60px;
  border-radius: 50px;
  background-color: #f0f2f5;
  align-items: center;
  justify-content: center;
`;

const DocumentIcon = () => (
  <Svg
    width="24"
    height="28"
    viewBox="0 0 24 28"
    fill="none"
  >
    <Path
      d="M3 1.59499e-06C2.20435 1.59499e-06 1.44129 0.316072 0.87868 0.878681C0.316071 1.44129 0 2.20435 0 3V25C0 25.7957 0.316071 26.5587 0.87868 27.1213C1.44129 27.6839 2.20435 28 3 28H21C21.7956 28 22.5587 27.6839 23.1213 27.1213C23.6839 26.5587 24 25.7957 24 25V9C24.0002 8.86859 23.9746 8.73842 23.9245 8.61694C23.8744 8.49546 23.8008 8.38504 23.708 8.292L15.708 0.292002C15.615 0.199198 15.5045 0.125642 15.3831 0.0755384C15.2616 0.025435 15.1314 -0.000233099 15 1.59499e-06H3Z"
      fill="#3EB5C5"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.96 5.8542C9.96 6.39763 9.74412 6.9188 9.35986 7.30306C8.9756 7.68732 8.45443 7.9032 7.911 7.9032C7.36757 7.9032 6.8464 7.68732 6.46214 7.30306C6.07788 6.9188 5.862 6.39763 5.862 5.8542C5.862 5.31051 6.07798 4.78908 6.46243 4.40463C6.84688 4.02018 7.36831 3.8042 7.912 3.8042C8.45569 3.8042 8.97712 4.02018 9.36157 4.40463C9.74602 4.78908 9.96 5.31051 9.96 5.8542ZM5 15.7502C4.83585 15.7505 4.67336 15.7831 4.5218 15.8461C4.37024 15.9092 4.23259 16.0015 4.1167 16.1177C4.00082 16.234 3.90896 16.3719 3.84639 16.5237C3.78381 16.6754 3.75174 16.838 3.752 17.0022C3.75226 17.1664 3.78486 17.3288 3.84792 17.4804C3.91098 17.632 4.00327 17.7696 4.11953 17.8855C4.23579 18.0014 4.37374 18.0932 4.52549 18.1558C4.67725 18.2184 4.83985 18.2505 5.004 18.2502H19.004C19.1682 18.2499 19.3306 18.2173 19.4822 18.1543C19.6338 18.0912 19.7714 17.9989 19.8873 17.8827C20.0032 17.7664 20.095 17.6285 20.1576 17.4767C20.2202 17.3249 20.2523 17.1624 20.252 16.9982C20.2517 16.834 20.2191 16.6716 20.1561 16.52C20.093 16.3684 20.0007 16.2308 19.8845 16.1149C19.7682 15.999 19.6303 15.9072 19.4785 15.8446C19.3268 15.782 19.1642 15.7499 19 15.7502H5ZM5 21.7502C4.83585 21.7505 4.67336 21.7831 4.5218 21.8461C4.37024 21.9092 4.23259 22.0015 4.1167 22.1177C4.00082 22.234 3.90896 22.3719 3.84639 22.5237C3.78381 22.6755 3.75174 22.838 3.752 23.0022C3.75226 23.1664 3.78486 23.3288 3.84792 23.4804C3.91098 23.632 4.00327 23.7696 4.11953 23.8855C4.23579 24.0014 4.37374 24.0932 4.52549 24.1558C4.67725 24.2184 4.83985 24.2505 5.004 24.2502H13.004C13.1682 24.2499 13.3306 24.2173 13.4822 24.1543C13.6338 24.0912 13.7714 23.9989 13.8873 23.8827C14.0032 23.7664 14.095 23.6285 14.1576 23.4767C14.2202 23.3249 14.2523 23.1624 14.252 22.9982C14.2517 22.834 14.2191 22.6716 14.1561 22.52C14.093 22.3684 14.0007 22.2308 13.8845 22.1149C13.7682 21.999 13.6303 21.9072 13.4785 21.8446C13.3268 21.782 13.1642 21.7499 13 21.7502H5ZM4.268 10.6602C5.26831 9.76215 6.56571 9.26627 7.91 9.2682C9.31 9.2682 10.586 9.7942 11.554 10.6602C12.128 11.1742 11.68 12.0002 10.908 12.0002H4.912C4.142 12.0002 3.692 11.1742 4.268 10.6602Z"
      fill="white"
    />
  </Svg>
);

const PaginationContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 15px;
  margin-left: 0px;
  margin-right: 0px;
  margin-bottom: 130px;
`;

interface PaginationButtonProps {
  isActive?: boolean;
}

const PaginationButton = styled.TouchableOpacity<PaginationButtonProps>`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background-color: ${(props: PaginationButtonProps) => (props.isActive ? "#0BC1BF" : "transparent")};
  align-items: center;
  justify-content: center;
  margin-left: 4px;
  margin-right: 4px;
`;

interface PaginationTextProps {
  isActive?: boolean;
}

const PaginationText = styled.Text<PaginationTextProps>`
  font-size: ${theme.fontSize.md}px;
  font-weight: 300;
  color: ${(props: PaginationTextProps) => (props.isActive ? theme.colors.white : "#063E66")};
`;

const ArrowButton = styled.TouchableOpacity`
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
  margin-right: 8px;
`;

const ArrowText = styled.Text`
  font-size: 18px;
  color: #063e66;
`;

// 샘플데이터 .. 이후 api 연동 시 삭제
const mockRecords: MedicalRecord[] = [
  {
    id: "1",
    companion: "동행자 • 김태원",
    hospital: "서울대학교병원",
    date: "2025.12.15",
  },
  {
    id: "2",
    companion: "동행자 • 이지은",
    hospital: "세브란스병원",
    date: "2025.11.28",
  },
  {
    id: "3",
    companion: "동행자 • 박민수",
    hospital: "삼성서울병원",
    date: "2025.11.15",
  },
  {
    id: "4",
    companion: "동행자 • 정수진",
    hospital: "아산병원",
    date: "2025.10.30",
  },
  {
    id: "5",
    companion: "동행자 • 김태원",
    hospital: "강남세브란스병원",
    date: "2025.10.12",
  },
  {
    id: "6",
    companion: "동행자 • 최영수",
    hospital: "고대안암병원",
    date: "2025.09.25",
  },
  {
    id: "7",
    companion: "동행자 • 이지은",
    hospital: "분당서울대병원",
    date: "2025.09.10",
  },
  {
    id: "8",
    companion: "동행자 • 장미희",
    hospital: "일산백병원",
    date: "2025.08.28",
  },
  {
    id: "9",
    companion: "동행자 • 박민수",
    hospital: "경희대병원",
    date: "2025.08.15",
  },
  {
    id: "10",
    companion: "동행자 • 김태원",
    hospital: "한양대병원",
    date: "2025.07.30",
  },
  {
    id: "11",
    companion: "동행자 • 정수진",
    hospital: "이화여대병원",
    date: "2025.07.18",
  },
  {
    id: "12",
    companion: "동행자 • 최영수",
    hospital: "건국대병원",
    date: "2025.07.05",
  },
  {
    id: "13",
    companion: "동행자 • 이지은",
    hospital: "아산서울병원",
    date: "2025.06.20",
  },
  {
    id: "14",
    companion: "동행자 • 장미희",
    hospital: "성모병원",
    date: "2025.06.10",
  },
  {
    id: "15",
    companion: "동행자 • 박민수",
    hospital: "보라매병원",
    date: "2025.05.28",
  },
  {
    id: "16",
    companion: "동행자 • 김태원",
    hospital: "가톨릭의대병원",
    date: "2025.05.15",
  },
  {
    id: "17",
    companion: "동행자 • 정수진",
    hospital: "한양대구리병원",
    date: "2025.04.30",
  },
  {
    id: "18",
    companion: "동행자 • 최영수",
    hospital: "서울적십자병원",
    date: "2025.04.18",
  },
  {
    id: "19",
    companion: "동행자 • 이지은",
    hospital: "을지대병원",
    date: "2025.04.05",
  },
  {
    id: "20",
    companion: "동행자 • 장미희",
    hospital: "순천향대병원",
    date: "2025.03.22",
  },
];

const ITEMS_PER_PAGE = 4;

// record id에 따른 다양한 prescription 데이터 생성 함수
const getPrescriptionData = (record: MedicalRecord): PrescriptionDetail => {
  const prescriptionDataMap: { [key: string]: Partial<PrescriptionDetail> } = {
    "1": {
      pharmacy: "건강약국",
      symptoms: "감기, 콧물, 인후통",
      prescriptionNotes: "감기 증상 완화를 위한 처방입니다. 약물을 규칙적으로 복용하시기 바랍니다.",
      medicines: [
        { name: "아목시실린캡슐", dosage: "500mg", frequency: "하루 3회, 식후", duration: "5일" },
        { name: "타이레놀", dosage: "500mg", frequency: "하루 3회, 식전", duration: "3일" },
        { name: "가비린정", dosage: "1정", frequency: "하루 3회, 식후", duration: "5일" },
      ],
      paymentAmount: "35,000원",
    },
    "2": {
      pharmacy: "온누리약국",
      symptoms: "두통, 어지러움",
      prescriptionNotes: "두통 완화를 위한 처방입니다. 충분한 휴식과 함께 약물을 복용하세요.",
      medicines: [
        { name: "판콜에이내복액", dosage: "100ml", frequency: "하루 3회, 식후", duration: "3일" },
        { name: "부루펜", dosage: "400mg", frequency: "하루 2회, 식후", duration: "5일" },
      ],
      paymentAmount: "28,000원",
    },
    "3": {
      pharmacy: "하나로약국",
      symptoms: "알레르기성 비염",
      prescriptionNotes: "알레르기 비염 치료를 위한 처방입니다. 계절 변동 시 주의하세요.",
      medicines: [
        { name: "지르텍정", dosage: "10mg", frequency: "하루 1회, 취침 전", duration: "7일" },
        { name: "비포닥신나잘스프레이", dosage: "50mcg", frequency: "하루 2회, 양쪽 콧속", duration: "14일" },
      ],
      paymentAmount: "42,000원",
    },
    "4": {
      pharmacy: "메디케어약국",
      symptoms: "소화불량, 복통",
      prescriptionNotes: "소화불량 치료를 위한 처방입니다. 기름진 음식을 피하고 소량씩 자주 드세요.",
      medicines: [
        { name: "판크리놀정", dosage: "2정", frequency: "하루 3회, 식후", duration: "5일" },
        { name: "가스모틴정", dosage: "1정", frequency: "하루 3회, 식후", duration: "5일" },
      ],
      paymentAmount: "18,500원",
    },
    "5": {
      pharmacy: "본약국",
      symptoms: "비염, 축농증",
      prescriptionNotes: "축농증 치료를 위한 처방입니다. 충분한 수분 섭취와 함께 약물을 복용하세요.",
      medicines: [
        { name: "시레스돈정", dosage: "37.5mg", frequency: "하루 2회, 식후", duration: "10일" },
        { name: "닥터코드로스", dosage: "1정", frequency: "하루 3회, 식후", duration: "7일" },
      ],
      paymentAmount: "39,000원",
    },
    "6": {
      pharmacy: "365약국",
      symptoms: "근육통, 어깨 통증",
      prescriptionNotes: "근육통 완화를 위한 처방입니다. 주기적인 스트레칭과 함께 약물을 복용하세요.",
      medicines: [
        { name: "부루펜정", dosage: "400mg", frequency: "하루 3회, 식후", duration: "5일" },
        { name: "미오스타딘연고", dosage: "적당량", frequency: "하루 2-3회, 해당 부위", duration: "7일" },
      ],
      paymentAmount: "26,000원",
    },
    "7": {
      pharmacy: "웰빙약국",
      symptoms: "설사, 복통",
      prescriptionNotes: "설사 및 복통 치료를 위한 처방입니다. 충분한 수분 섭취가 필요합니다.",
      medicines: [
        { name: "스미엑틴", dosage: "1정", frequency: "하루 3회, 식후", duration: "3일" },
        { name: "프로바이오틱스", dosage: "1캡슐", frequency: "하루 1회, 식전", duration: "7일" },
      ],
      paymentAmount: "22,000원",
    },
    "8": {
      pharmacy: "신세계약국",
      symptoms: "눈 충혈, 안구 건조",
      prescriptionNotes: "안구 건조 및 충혈 치료를 위한 처방입니다. 장시간 화면 사용을 줄이세요.",
      medicines: [
        { name: "크림아이", dosage: "1알", frequency: "하루 1회, 취침 전", duration: "7일" },
        { name: "아이윤 안약", dosage: "1-2방울", frequency: "하루 3-4회", duration: "10일" },
      ],
      paymentAmount: "31,000원",
    },
    "9": {
      pharmacy: "래미안약국",
      symptoms: "가슴 쓰림, 역류성 식도염",
      prescriptionNotes: "역류성 식도염 치료를 위한 처방입니다. 식사 후 2시간은 누우지 마세요.",
      medicines: [
        { name: "라니티딘정", dosage: "150mg", frequency: "하루 2회, 식전", duration: "14일" },
        { name: "가스모틴", dosage: "1정", frequency: "하루 3회, 식후", duration: "7일" },
      ],
      paymentAmount: "25,500원",
    },
    "10": {
      pharmacy: "대학약국",
      symptoms: "피부염, 습진",
      prescriptionNotes: "피부염 치료를 위한 처방입니다. 자극적인 비누나 화학물질을 피하세요.",
      medicines: [
        { name: "비오디움연고", dosage: "적당량", frequency: "하루 2회, 발진 부위", duration: "7일" },
        { name: "레보켄", dosage: "0.1%", frequency: "하루 1회, 취침 전", duration: "10일" },
      ],
      paymentAmount: "28,000원",
    },
    "11": {
      pharmacy: "종합약국",
      symptoms: "인후염, 편도염",
      prescriptionNotes: "인후염 치료를 위한 처방입니다. 충분한 수분 섭취와 휴식이 필요합니다.",
      medicines: [
        { name: "아목시실린", dosage: "500mg", frequency: "하루 3회, 식후", duration: "7일" },
        { name: "가글린치", dosage: "적당량", frequency: "하루 3회", duration: "7일" },
      ],
      paymentAmount: "33,000원",
    },
    "12": {
      pharmacy: "스마트약국",
      symptoms: "불면증, 긴장",
      prescriptionNotes: "불면증 및 긴장 완화를 위한 처방입니다. 규칙적인 수면 패턴을 유지하세요.",
      medicines: [
        { name: "조용한밤", dosage: "1정", frequency: "취침 30분 전", duration: "10일" },
        { name: "마그네슘", dosage: "250mg", frequency: "하루 1회, 취침 전", duration: "14일" },
      ],
      paymentAmount: "36,500원",
    },
    "13": {
      pharmacy: "건강플러스약국",
      symptoms: "관절염, 무릎 통증",
      prescriptionNotes: "관절염 완화를 위한 처방입니다. 무리한 운동을 피하고 적절한 휴식이 필요합니다.",
      medicines: [
        { name: "아세트아미노펜", dosage: "500mg", frequency: "하루 3회, 식후", duration: "10일" },
        { name: "동화약품 보조개미", dosage: "적당량", frequency: "하루 2회", duration: "14일" },
      ],
      paymentAmount: "41,000원",
    },
    "14": {
      pharmacy: "핀케어약국",
      symptoms: "헤르페스, 구내염",
      prescriptionNotes: "구내염 및 헤르페스 치료를 위한 처방입니다. 면역력 향상에 도움이 됩니다.",
      medicines: [
        { name: "아시클로버크림", dosage: "적당량", frequency: "하루 3회", duration: "7일" },
        { name: "멀티비타민", dosage: "1정", frequency: "하루 1회, 식후", duration: "30일" },
      ],
      paymentAmount: "38,500원",
    },
    "15": {
      pharmacy: "녹십자약국",
      symptoms: "방광염, 요로감염",
      prescriptionNotes: "방광염 치료를 위한 처방입니다. 충분한 수분 섭취가 필요합니다.",
      medicines: [
        { name: "시프로플록사신", dosage: "250mg", frequency: "하루 2회, 식후", duration: "5일" },
        { name: "프로폴리스", dosage: "1캡슐", frequency: "하루 2회, 식후", duration: "7일" },
      ],
      paymentAmount: "29,000원",
    },
    "16": {
      pharmacy: "약바로약국",
      symptoms: "코감기, 비염",
      prescriptionNotes: "코감기 및 비염 치료를 위한 처방입니다. 따뜻한 물을 자주 드세요.",
      medicines: [
        { name: "콜미신", dosage: "1정", frequency: "하루 3회, 식후", duration: "5일" },
        { name: "디엔에이원", dosage: "1정", frequency: "하루 3회, 식후", duration: "7일" },
      ],
      paymentAmount: "20,500원",
    },
    "17": {
      pharmacy: "파미스타약국",
      symptoms: "입맛 상실, 식욕 부진",
      prescriptionNotes: "식욕 부진 치료를 위한 처방입니다. 규칙적인 식사를 권장합니다.",
      medicines: [
        { name: "비오펠텐", dosage: "1정", frequency: "하루 3회, 식후", duration: "7일" },
        { name: "비타민B복합체", dosage: "1정", frequency: "하루 1회, 식후", duration: "14일" },
      ],
      paymentAmount: "27,500원",
    },
    "18": {
      pharmacy: "메디웰약국",
      symptoms: "어지러움, 이명",
      prescriptionNotes: "어지러움 및 이명 치료를 위한 처방입니다. 충분한 휴식과 스트레스 관리가 필요합니다.",
      medicines: [
        { name: "베타히스틴", dosage: "8mg", frequency: "하루 3회, 식후", duration: "14일" },
        { name: "진안환", dosage: "1정", frequency: "하루 3회, 식후", duration: "7일" },
      ],
      paymentAmount: "44,000원",
    },
    "19": {
      pharmacy: "석세스약국",
      symptoms: "저혈압, 어지러움",
      prescriptionNotes: "저혈압 및 어지러움 치료를 위한 처방입니다. 충분한 수분 섭취가 필요합니다.",
      medicines: [
        { name: "인삼정", dosage: "1정", frequency: "하루 2회, 식후", duration: "10일" },
        { name: "비타민C", dosage: "1000mg", frequency: "하루 1회, 식후", duration: "14일" },
      ],
      paymentAmount: "23,000원",
    },
    "20": {
      pharmacy: "헬스케어약국",
      symptoms: "습진, 건선",
      prescriptionNotes: "습진 및 건선 치료를 위한 처방입니다. 피부를 건조하게 유지하지 마세요.",
      medicines: [
        { name: "엘리델크림", dosage: "적당량", frequency: "하루 2회", duration: "14일" },
        { name: "케토티펜정", dosage: "1mg", frequency: "하루 2회, 식후", duration: "10일" },
      ],
      paymentAmount: "47,000원",
    },
  };

  const baseData = prescriptionDataMap[record.id] || prescriptionDataMap["1"];

  return {
    id: record.id,
    userName: "홍길동",
    companion: record.companion.split("• ")[1] || "김태원",
    hospital: record.hospital,
    pharmacy: baseData.pharmacy || "건강약국",
    date: record.date,
    symptoms: baseData.symptoms || "감기",
    prescriptionNotes: baseData.prescriptionNotes || "처방전입니다.",
    medicines: baseData.medicines || [],
    receiptImage: undefined,
    paymentAmount: baseData.paymentAmount || "35,000원",
  };
};

export const MedicalRecordsScreen: React.FC<MedicalRecordsScreenProps> = ({
  activeTab,
  onTabPress,
  onNavigateToPrescription,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  const totalPages = Math.ceil(mockRecords.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentRecords = mockRecords.slice(startIndex, endIndex);

  const handleRefresh = () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PaginationButton
          key={i}
          isActive={i === currentPage}
          onPress={() => handlePageChange(i)}
        >
          <PaginationText isActive={i === currentPage}>{i}</PaginationText>
        </PaginationButton>
      );
    }

    return (
      <PaginationContainer
        style={{
          shadowColor: "rgba(11, 193, 191, 0.05)",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 1,
          shadowRadius: 1,
          elevation: 2,
        }}
      >
        <ArrowButton onPress={() => handlePageChange(currentPage - 1)}>
          <ArrowText>←</ArrowText>
        </ArrowButton>
        {pages}
        <ArrowButton onPress={() => handlePageChange(currentPage + 1)}>
          <ArrowText>→</ArrowText>
        </ArrowButton>
      </PaginationContainer>
    );
  };

  return (
    <Container>
      <ContentContainer>
        <CheckButton
          colors={["#00A6D8", "#0BC1BF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <CheckButtonText>진료 내역 확인</CheckButtonText>
          <RefreshIcon>↻</RefreshIcon>
        </CheckButton>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
            />
          }
        >
          <RecordsList>
            {currentRecords.map(record => (
              <TouchableOpacity
                key={record.id}
                activeOpacity={0.7}
                onPress={() => {
                  if (onNavigateToPrescription) {
                    const prescriptionData = getPrescriptionData(record);
                    onNavigateToPrescription(prescriptionData);
                  }
                }}
              >
                <RecordCard
                  style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 2,
                  }}
                >
                  <RecordInfo>
                    <CompanionContainer>
                      <CompanionLabel>동행자</CompanionLabel>
                      <CompanionName> • {record.companion.split("• ")[1]}</CompanionName>
                    </CompanionContainer>
                    <HospitalText>{record.hospital}</HospitalText>
                    <DateText>{record.date}</DateText>
                  </RecordInfo>
                  <RecordIcon>
                    <DocumentIcon />
                  </RecordIcon>
                </RecordCard>
              </TouchableOpacity>
            ))}
          </RecordsList>
        </ScrollView>

        {renderPagination()}
      </ContentContainer>

      <BottomNavigation
        activeTab="records"
        onTabPress={onTabPress}
      />
    </Container>
  );
};
