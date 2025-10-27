import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  MyPageScreen,
  HomeScreen,
  MedicalRecordsScreen,
  Login,
  SignUpAccount,
  SignUpUserInfo,
  SignUpPolicy,
  SignUpRole,
  OnboardingContainer,
  Notification,
  VerifyContainer,
} from "./src/screens";
import { BottomNavigation, Header } from "./src/components";
import { theme } from "./src/styles";
import { View } from "react-native";

export default function App() {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [isVerifyingManager, setIsVerifyingManager] = useState(false);
  const [signUpStep, setSignUpStep] = useState(1);
  const [activeTab, setActiveTab] = useState("home");

  // 회원가입 정보 state
  const [signUpData, setSignUpData] = useState({
    userId: "",
    email: "",
    password: "",
    passwordConfirm: "",
    name: "",
    phoneNumber: "",
    termsOfService: false,
    privacyPolicy: false,
    locationService: false,
    ageLimit: false,
    marketingConsent: false,
  });

  // 앱 시작 시 온보딩 완료 상태 확인
  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const onboardingCompleted = await AsyncStorage.getItem("onboardingCompleted");
        setHasCompletedOnboarding(onboardingCompleted === "true");
      } catch (error) {
        console.log("온보딩 상태 확인 중 오류:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkOnboardingStatus();
  }, []);

  // 온보딩 완료 처리
  const handleOnboardingComplete = async () => {
    try {
      await AsyncStorage.setItem("onboardingCompleted", "true");
      setHasCompletedOnboarding(true);
    } catch (error) {
      console.log("온보딩 완료 상태 저장 중 오류:", error);
      setHasCompletedOnboarding(true);
    }
  };

  const renderScreen = () => {
    switch (activeTab) {
      case "home":
        return (
          <HomeScreen
            activeTab={activeTab}
            onTabPress={setActiveTab}
          />
        );
      case "usage":
        return <Notification onTabPress={setActiveTab} />;
      case "records":
        return <MedicalRecordsScreen onTabPress={setActiveTab} />;
      case "profile":
        return <MyPageScreen onTabPress={setActiveTab} />;
      default:
        return (
          <HomeScreen
            activeTab={activeTab}
            onTabPress={setActiveTab}
          />
        );
    }
  };

  if (!hasCompletedOnboarding) {
    return (
      <ThemeProvider theme={theme}>
        <OnboardingContainer onComplete={handleOnboardingComplete} />
        <StatusBar style="auto" />
      </ThemeProvider>
    );
  }

  if (!isLoggedIn) {
    return (
      <ThemeProvider theme={theme}>
        {!isSigningUp ? (
          <Login
            onLoginSuccess={() => setIsLoggedIn(true)}
            onSignUpPress={() => setIsSigningUp(true)}
            onFindIdPress={() => {
              console.log("아이디 찾기");
            }}
            onFindPasswordPress={() => {
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
                onComplete={data => {
                  setSignUpData(prev => ({ ...prev, ...data }));
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
                onComplete={data => {
                  setSignUpData(prev => ({ ...prev, ...data }));
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
                onComplete={data => {
                  setSignUpData(prev => ({ ...prev, ...data }));
                  setSignUpStep(4);
                }}
                onBack={() => setSignUpStep(2)}
              />
            )}
            {signUpStep === 4 && !isVerifyingManager && (
              <SignUpRole
                userName={signUpData.name}
                onComplete={role => {
                  if (role === "USER") {
                    setIsSigningUp(false);
                    setIsLoggedIn(true);
                    setSignUpStep(1); // 다음 회원가입을 위해 초기화
                  }
                }}
                onVerifyManager={() => {
                  setIsVerifyingManager(true);
                }}
                onBack={() => setSignUpStep(3)}
              />
            )}
            {isVerifyingManager && (
              <VerifyContainer
                onComplete={() => {
                  setIsVerifyingManager(false);
                  setIsSigningUp(false);
                  setIsLoggedIn(true);
                  setSignUpStep(1); // 다음 회원가입을 위해 초기화
                }}
                onBack={() => {
                  setIsVerifyingManager(false);
                }}
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
        {renderScreen()}
        <StatusBar style="auto" />
      </View>
    </ThemeProvider>
  );
}
