import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components/native";
import * as Font from "expo-font";
import {
  MyPageScreen,
  HomeScreen,
  MedicalRecordsScreen,
  Login,
  SignUpAccount,
  SignUpUserInfo,
  SignUpPolicy,
  SignUpRole,
} from "./src/screens";
import { BottomNavigation, Header } from "./src/components";
import { theme } from "./src/styles";
import { View } from "react-native";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [signUpStep, setSignUpStep] = useState(1);
  const [activeTab, setActiveTab] = useState("home");
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        KoreanYNSJG5R: require("./assets/fonts/KoreanYNSJG5R.ttf"),
      });
      setFontsLoaded(true);
    };
    loadFonts();
  }, []);

  // 회원가입 정보 state
  const [signUpData, setSignUpData] = useState({
    // Step 1: 계정 정보
    userId: "",
    email: "",
    password: "",
    passwordConfirm: "",
    // Step 2: 개인 정보
    name: "",
    phoneNumber: "",
    // Step 3: 약관 동의
    termsOfService: false,
    privacyPolicy: false,
    locationService: false,
    ageLimit: false,
    marketingConsent: false,
  });

  const renderScreen = () => {
    switch (activeTab) {
      case "home":
        return <HomeScreen activeTab={activeTab} onTabPress={setActiveTab} />;
      case "usage":
        return <MyPageScreen activeTab={activeTab} />;
      case "records":
        return (
          <MedicalRecordsScreen
            activeTab={activeTab}
            onTabPress={setActiveTab}
          />
        );
      case "profile":
        return <MyPageScreen activeTab={activeTab} />;
      default:
        return <HomeScreen activeTab={activeTab} onTabPress={setActiveTab} />;
    }
  };

  // 폰트가 로드되지 않았으면 로딩 화면 표시
  if (!fontsLoaded) {
    return null; // 또는 로딩 스피너 표시
  }

  // 로그인되지 않았으면 로그인 화면 표시
  if (!isLoggedIn) {
    return (
      <ThemeProvider theme={theme}>
        {!isSigningUp ? (
          <Login
            onLoginSuccess={() => setIsLoggedIn(true)}
            onSignUpPress={() => setIsSigningUp(true)}
            onFindIdPress={() => {
              // TODO: 아이디 찾기 기능 구현
              console.log("아이디 찾기");
            }}
            onFindPasswordPress={() => {
              // TODO: 비밀번호 찾기 기능 구현
              console.log("비밀번호 찾기");
            }}
          />
        ) : (
          <>
            {signUpStep === 1 && (
              <SignUpAccount
                initialData={{
                  userId: signUpData.userId,
                  email: signUpData.email,
                  password: signUpData.password,
                  passwordConfirm: signUpData.passwordConfirm,
                }}
                onComplete={(data) => {
                  setSignUpData((prev) => ({ ...prev, ...data }));
                  setSignUpStep(2);
                }}
                onBack={() => setIsSigningUp(false)}
              />
            )}
            {signUpStep === 2 && (
              <SignUpUserInfo
                initialData={{
                  name: signUpData.name,
                  phoneNumber: signUpData.phoneNumber,
                }}
                onComplete={(data) => {
                  setSignUpData((prev) => ({ ...prev, ...data }));
                  setSignUpStep(3);
                }}
                onBack={() => setSignUpStep(1)}
              />
            )}
            {signUpStep === 3 && (
              <SignUpPolicy
                initialData={{
                  termsOfService: signUpData.termsOfService,
                  privacyPolicy: signUpData.privacyPolicy,
                  locationService: signUpData.locationService,
                  ageLimit: signUpData.ageLimit,
                  marketingConsent: signUpData.marketingConsent,
                }}
                onComplete={(data) => {
                  setSignUpData((prev) => ({ ...prev, ...data }));
                  setSignUpStep(4);
                }}
                onBack={() => setSignUpStep(2)}
              />
            )}
            {signUpStep === 4 && (
              <SignUpRole
                userName={signUpData.name}
                onComplete={() => {
                  setIsSigningUp(false);
                  setIsLoggedIn(true);
                  setSignUpStep(1); // 다음 회원가입을 위해 초기화
                }}
                onBack={() => setSignUpStep(3)}
              />
            )}
          </>
        )}
        <StatusBar style="auto" />
      </ThemeProvider>
    );
  }

  // 회원가입 완료 후 메인 앱 화면 표시
  return (
    <ThemeProvider theme={theme}>
      <View style={{ flex: 1 }}>
        <Header activeTab={activeTab} />
        {renderScreen()}
        {activeTab !== "home" && (
          <BottomNavigation activeTab={activeTab} onTabPress={setActiveTab} />
        )}
        <StatusBar style="auto" />
      </View>
    </ThemeProvider>
  );
}
