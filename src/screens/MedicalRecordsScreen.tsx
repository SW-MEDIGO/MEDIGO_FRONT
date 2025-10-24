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

interface MedicalRecordsScreenProps {
  onTabPress: (tab: string) => void;
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
  <Svg width="24" height="28" viewBox="0 0 24 28" fill="none">
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
  background-color: ${(props: PaginationButtonProps) =>
    props.isActive ? "#0BC1BF" : "transparent"};
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
  color: ${(props: PaginationTextProps) =>
    props.isActive ? theme.colors.white : "#063E66"};
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
    hospital: "우은식병원",
    date: "2025.10.10",
  },
  {
    id: "2",
    companion: "동행자 • 김태원",
    hospital: "우은식병원",
    date: "2025.10.10",
  },
  {
    id: "3",
    companion: "동행자 • 김태원",
    hospital: "우은식병원",
    date: "2025.10.10",
  },
  {
    id: "4",
    companion: "동행자 • 김태원",
    hospital: "우은식병원",
    date: "2025.10.10",
  },
  {
    id: "5",
    companion: "동행자 • 김태원",
    hospital: "우은식병원",
    date: "2025.10.10",
  },
  {
    id: "6",
    companion: "동행자 • 김태원",
    hospital: "우은식병원",
    date: "2025.10.10",
  },
  {
    id: "7",
    companion: "동행자 • 김태원",
    hospital: "우은식병원",
    date: "2025.10.10",
  },
  {
    id: "8",
    companion: "동행자 • 김태원",
    hospital: "우은식병원",
    date: "2025.10.10",
  },
  {
    id: "9",
    companion: "동행자 • 김태원",
    hospital: "우은식병원",
    date: "2025.10.10",
  },
  {
    id: "10",
    companion: "동행자 • 김태원",
    hospital: "우은식병원",
    date: "2025.10.10",
  },
  {
    id: "11",
    companion: "동행자 • 김태원",
    hospital: "우은식병원",
    date: "2025.10.10",
  },
  {
    id: "12",
    companion: "동행자 • 김태원",
    hospital: "우은식병원",
    date: "2025.10.10",
  },
  {
    id: "13",
    companion: "동행자 • 김태원",
    hospital: "우은식병원",
    date: "2025.10.10",
  },
  {
    id: "14",
    companion: "동행자 • 김태원",
    hospital: "우은식병원",
    date: "2025.10.10",
  },
  {
    id: "15",
    companion: "동행자 • 김태원",
    hospital: "우은식병원",
    date: "2025.10.10",
  },
  {
    id: "16",
    companion: "동행자 • 김태원",
    hospital: "우은식병원",
    date: "2025.10.10",
  },
  {
    id: "17",
    companion: "동행자 • 김태원",
    hospital: "우은식병원",
    date: "2025.10.10",
  },
  {
    id: "18",
    companion: "동행자 • 김태원",
    hospital: "우은식병원",
    date: "2025.10.10",
  },
  {
    id: "19",
    companion: "동행자 • 김태원",
    hospital: "우은식병원",
    date: "2025.10.10",
  },
  {
    id: "20",
    companion: "동행자 • 김태원",
    hospital: "우은식병원",
    date: "2025.10.10",
  },
];

const ITEMS_PER_PAGE = 4;

export const MedicalRecordsScreen: React.FC<MedicalRecordsScreenProps> = ({
  onTabPress,
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
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        >
          <RecordsList>
            {currentRecords.map((record) => (
              <RecordCard
                key={record.id}
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
                    <CompanionName>
                      {" "}
                      • {record.companion.split("• ")[1]}
                    </CompanionName>
                  </CompanionContainer>
                  <HospitalText>{record.hospital}</HospitalText>
                  <DateText>{record.date}</DateText>
                </RecordInfo>
                <RecordIcon>
                  <DocumentIcon />
                </RecordIcon>
              </RecordCard>
            ))}
          </RecordsList>
        </ScrollView>

        {renderPagination()}
      </ContentContainer>

      <BottomNavigation activeTab="records" onTabPress={onTabPress} />
    </Container>
  );
};
