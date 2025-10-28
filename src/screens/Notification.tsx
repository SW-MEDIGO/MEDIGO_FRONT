import React, { useState } from "react";
import styled from "styled-components/native";
import { ScrollView, Image } from "react-native";
import { BottomNavigation } from "../components/BottomNavigation";
import { theme } from "../styles";

interface NotificationItem {
  id: string;
  title: string;
  content: string;
  date: string;
  time: string;
  category: "all" | "matching" | "schedule" | "etc";
}

const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.background};
`;

const ContentContainer = styled.View`
  flex: 1;
  padding: ${theme.spacing.lg}px ${theme.spacing.md}px;
`;

const CategoryContainer = styled.View`
  flex-direction: row;
  margin-bottom: ${theme.spacing.lg}px;
  justify-content: center;
  flex-wrap: wrap;
`;

const CategoryButton = styled.TouchableOpacity<{ isSelected: boolean }>`
  display: flex;
  padding: ${theme.spacing.sm}px ${theme.spacing.md}px;
  height: 41px;
  justify-content: center;
  align-items: center;
  border-radius: ${theme.borderRadius.full}px;
  background: ${(props: { isSelected: boolean }) =>
    props.isSelected ? "#063E66" : "#F5F5F5"};
  border: 1px solid
    ${(props: { isSelected: boolean }) =>
      props.isSelected ? "#063E66" : "#E0E0E0"};
  margin-right: ${theme.spacing.sm}px;
  margin-bottom: ${theme.spacing.sm}px;
`;

const CategoryButtonText = styled.Text<{ isSelected: boolean }>`
  font-size: ${theme.fontSize.md}px;
  font-weight: ${theme.fontWeight.medium};
  color: ${(props: { isSelected: boolean }) =>
    props.isSelected ? theme.colors.white : theme.colors.text.primary};
`;

const NotificationList = styled.View``;

const NotificationItem = styled.View`
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg}px;
  padding: ${theme.spacing.md}px;
  flex-direction: row;
  margin-bottom: ${theme.spacing.md}px;
`;

const IconContainer = styled.View`
  width: 56px;
  height: 56px;
  align-items: center;
  justify-content: center;
  margin-right: ${theme.spacing.md}px;
`;

const NotificationIcon = styled.Image`
  width: 48px;
  height: 48px;
`;

const NotificationContentContainer = styled.View`
  flex: 1;
`;

const NotificationHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0px;
`;

const NotificationTitle = styled.Text`
  font-size: ${theme.fontSize.lg}px;
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.text.primary};
  flex: 1;
  margin-right: ${theme.spacing.sm}px;
  margin-top: 4px;
`;

const NotificationDateTime = styled.Text`
  font-size: ${theme.fontSize.xs}px;
  color: ${theme.colors.text.secondary};
  text-align: right;
`;

const NotificationContent = styled.Text`
  font-size: ${theme.fontSize.sm}px;
  color: ${theme.colors.text.secondary};
  line-height: 20px;
`;

// 아이콘 선택 헬퍼 함수
const getIconSource = (category: string) => {
  switch (category) {
    case "matching":
      return require("../../assets/notification/sheild-dynamic-color.png");
    case "schedule":
      return require("../../assets/notification/calender-dynamic-color.png");
    case "etc":
      return require("../../assets/notification/pin-dynamic-color.png");
    default:
      return require("../../assets/notification/pin-dynamic-color.png");
  }
};

const categories = [
  { id: "all", label: "전체" },
  { id: "matching", label: "동행자 매칭" },
  { id: "schedule", label: "일정" },
  { id: "etc", label: "기타" },
];

const dummyNotifications: NotificationItem[] = [
  {
    id: "1",
    title: "동행 요청이 접수되었어요",
    content: "매칭이 완료되면 알려드릴게요",
    date: "2024.01.15",
    time: "14:30",
    category: "matching",
  },
  {
    id: "2",
    title: "동행자가 출발했어요",
    content: "실시간 위치를 확인할 수 있어요",
    date: "2024.01.15",
    time: "09:15",
    category: "matching",
  },
  {
    id: "3",
    title: "일정이 있어요",
    content: "다음 예약이 오후 2시에 예정되어 있어요",
    date: "2024.01.14",
    time: "18:45",
    category: "schedule",
  },
  {
    id: "4",
    title: "알림 설정을 확인해주세요",
    content: "새로운 기능이 추가되었습니다",
    date: "2024.01.13",
    time: "11:20",
    category: "etc",
  },
  {
    id: "5",
    title: "동행자가 도착했어요",
    content: "현재 위치에서 대기 중입니다",
    date: "2024.01.12",
    time: "16:45",
    category: "matching",
  },
  {
    id: "6",
    title: "예약이 취소되었습니다",
    content: "내일 오후 3시 예약이 취소되었습니다",
    date: "2024.01.12",
    time: "10:30",
    category: "schedule",
  },
  {
    id: "7",
    title: "결제가 완료되었습니다",
    content: "결제 내역을 확인해주세요",
    date: "2024.01.11",
    time: "14:15",
    category: "etc",
  },
  {
    id: "8",
    title: "동행 예약이 확정되었어요",
    content: "1월 20일 일정으로 확정되었습니다",
    date: "2024.01.11",
    time: "09:00",
    category: "matching",
  },
  {
    id: "9",
    title: "병원 예약 리마인더",
    content: "내일 오전 11시 병원 방문 일정입니다",
    date: "2024.01.10",
    time: "20:00",
    category: "schedule",
  },
  {
    id: "10",
    title: "약국 픽업 준비가 완료되었어요",
    content: "처방전을 가져가주세요",
    date: "2024.01.10",
    time: "13:20",
    category: "etc",
  },
];

interface NotificationProps {
  onTabPress?: (tab: string) => void;
}

export const Notification = ({ onTabPress }: NotificationProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredNotifications =
    selectedCategory === "all"
      ? dummyNotifications
      : dummyNotifications.filter(
          (notification) => notification.category === selectedCategory
        );

  return (
    <Container>
      <ContentContainer>
        <CategoryContainer>
          {categories.map((category) => {
            const isSelected = selectedCategory === category.id;
            return (
              <CategoryButton
                key={category.id}
                isSelected={isSelected}
                onPress={() => setSelectedCategory(category.id)}
                activeOpacity={0.7}
                style={
                  !isSelected
                    ? {
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.05,
                        shadowRadius: 2,
                        elevation: 1,
                      }
                    : undefined
                }
              >
                <CategoryButtonText isSelected={isSelected}>
                  {category.label}
                </CategoryButtonText>
              </CategoryButton>
            );
          })}
        </CategoryContainer>

        <ScrollView showsVerticalScrollIndicator={false}>
          <NotificationList>
            {filteredNotifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 2,
                }}
              >
                <IconContainer>
                  <NotificationIcon
                    source={getIconSource(notification.category)}
                  />
                </IconContainer>
                <NotificationContentContainer>
                  <NotificationHeader>
                    <NotificationTitle>{notification.title}</NotificationTitle>
                    <NotificationDateTime>
                      {notification.date}
                      {"\n"}
                      {notification.time}
                    </NotificationDateTime>
                  </NotificationHeader>
                  <NotificationContent>
                    {notification.content}
                  </NotificationContent>
                </NotificationContentContainer>
              </NotificationItem>
            ))}
          </NotificationList>
        </ScrollView>
      </ContentContainer>

      <BottomNavigation
        activeTab="usage"
        onTabPress={onTabPress || (() => {})}
      />
    </Container>
  );
};
