// App.tsx
import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components/native";
import MyPageScreen from "./src/screens/MyPageScreen"; 
import FamilyScreen from "./src/screens/FamilyScreen";
import WalletScreen from "./src/screens/WalletScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import ReviewScreen from "./src/screens/ReviewScreen";
import DoctorScreen from "./src/screens/DoctorScreen";
import PharmacyScreen from "./src/screens/PharmacyScreen";

import { theme } from "./src/styles";

export default function App() {
  const [route, setRoute] = useState<
    "mypage" | "family" | "wallet" | "settings" | "review" | "doctor" | "pharmacy"
  >("mypage");

  useEffect(() => {
    (globalThis as any).__routeToWallet = () => setRoute("wallet");
    (globalThis as any).__routeToFamily = () => setRoute("family");
    (globalThis as any).__routeToSettings = () => setRoute("settings");
    (globalThis as any).__routeToReview = () => setRoute("review");
    (globalThis as any).__routeToDoctor = () => setRoute("doctor");
    (globalThis as any).__routeToPharmacy = () => setRoute("pharmacy");
    (globalThis as any).__routeToMyPage = () => setRoute("mypage");
    return () => {
      delete (globalThis as any).__routeToWallet;
      delete (globalThis as any).__routeToFamily;
      delete (globalThis as any).__routeToSettings;
      delete (globalThis as any).__routeToReview;
      delete (globalThis as any).__routeToDoctor;
      delete (globalThis as any).__routeToPharmacy;
      delete (globalThis as any).__routeToMyPage;
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {route === "mypage" && (
        <MyPageScreen
          onOpenFamily={() => setRoute("family")}
          onOpenWallet={() => setRoute("wallet")}
          onOpenSettings={() => setRoute("settings")}
          onOpenReview={() => setRoute("review")}
          onOpenDoctor={() => setRoute("doctor")}
          onOpenPharmacy={() => setRoute("pharmacy")}
        />
      )}
      {route === "family" && <FamilyScreen onBack={() => setRoute("mypage")} />}
      {route === "wallet" && <WalletScreen onBack={() => setRoute("mypage")} />}
      {route === "settings" && <SettingsScreen onBack={() => setRoute("mypage")} />}
      {route === "review" && <ReviewScreen onBack={() => setRoute("mypage")} />}
      {route === "doctor" && <DoctorScreen onBack={() => setRoute("mypage")} />}
      {route === "pharmacy" && <PharmacyScreen onBack={() => setRoute("mypage")} />}
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
