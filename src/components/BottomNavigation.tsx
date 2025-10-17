import React from "react";
import styled from "styled-components/native";
import { HomeIcon, AlertIcon, DocumentIcon, ProfileIcon } from "./icons";

interface BottomNavigationProps {
  activeTab: string;
  onTabPress: (tab: string) => void;
}

const NavigationContainer = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.8);
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  padding-top: 8px;
  padding-bottom: 34px;
  padding-left: 20px;
  padding-right: 20px;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const TabButton = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  padding-top: 8px;
  padding-bottom: 8px;
`;

const TabIcon = styled.View`
  margin-bottom: 4px;
`;

const TabText = styled.Text<{ isActive: boolean }>`
  font-size: 12px;
  font-weight: 500;
  color: ${(props: { isActive: boolean }) =>
    props.isActive ? "#000000" : "#9CA3AF"};
  text-align: center;
`;

const tabs = [
  { id: "home", label: "홈", icon: HomeIcon },
  { id: "usage", label: "이용/알림", icon: AlertIcon },
  { id: "records", label: "진료 기록", icon: DocumentIcon },
  { id: "profile", label: "내 정보", icon: ProfileIcon },
];

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab,
  onTabPress,
}) => {
  return (
    <NavigationContainer
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 4,
      }}
    >
      {tabs.map((tab) => {
        const IconComponent = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <TabButton
            key={tab.id}
            onPress={() => onTabPress(tab.id)}
            activeOpacity={0.7}
          >
            <TabIcon>
              <IconComponent
                size={24}
                color={isActive ? "#000000" : "#9CA3AF"}
              />
            </TabIcon>
            <TabText isActive={isActive}>{tab.label}</TabText>
          </TabButton>
        );
      })}
    </NavigationContainer>
  );
};
