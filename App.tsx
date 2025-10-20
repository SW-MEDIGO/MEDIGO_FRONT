import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components/native";
import { MyPageScreen, HomeScreen } from "./src/screens";
import { BottomNavigation, Header } from "./src/components";
import { theme } from "./src/styles";
import { View } from "react-native";

export default function App() {
  const [activeTab, setActiveTab] = useState("profile");

  const renderScreen = () => {
    switch (activeTab) {
      case "home":
        return <HomeScreen />;
      case "usage":
        return <MyPageScreen />;
      case "records":
        return <MyPageScreen />;
      case "profile":
        return <MyPageScreen />;
      default:
        return <MyPageScreen />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <View style={{ flex: 1 }}>
        <Header />
        {renderScreen()}
        <BottomNavigation
          activeTab={activeTab}
          onTabPress={setActiveTab}
        />
        <StatusBar style="auto" />
      </View>
    </ThemeProvider>
  );
}
