import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components/native";
import * as Font from "expo-font";
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
  AddressSettingScreen,
  LocationMapScreen,
  AddressDetailScreen,
  HospitalPharmacyScreen,
  MedicalFacilityDetailScreen,
  MedicalFacilityListScreen,
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
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [showAddressSetting, setShowAddressSetting] = useState(false);
  const [showLocationMap, setShowLocationMap] = useState(false);
  const [showAddressDetail, setShowAddressDetail] = useState(false);
  const [showHospitalPharmacy, setShowHospitalPharmacy] = useState(false);
  const [showMedicalFacilityDetail, setShowMedicalFacilityDetail] =
    useState(false);
  const [showMedicalFacilityList, setShowMedicalFacilityList] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("우리집");
  const [selectedLocation, setSelectedLocation] = useState({
    address: "",
    detailAddress: "",
    coordinates: { lat: 36.3504119, lng: 127.3845475 },
  });
  const [selectedFacility, setSelectedFacility] = useState<any>(null);
  const [hospitalFacilities, setHospitalFacilities] = useState<any[]>([]);
  const [pharmacyFacilities, setPharmacyFacilities] = useState<any[]>([]);
  const [currentTab, setCurrentTab] = useState<"hospital" | "pharmacy">(
    "hospital"
  );
  const [facilityLoading, setFacilityLoading] = useState(false);
  const [addressList, setAddressList] = useState<any[]>([]);
  const [editingAddress, setEditingAddress] = useState<any>(null);

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
        const onboardingCompleted = await AsyncStorage.getItem(
          "onboardingCompleted"
        );
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

  // 주소 설정 페이지 열기
  const handleLocationPress = () => {
    setShowAddressSetting(true);
  };

  // 병원/약국 찾기 페이지 열기
  const handleHospitalPharmacyPress = () => {
    setShowHospitalPharmacy(true);
  };

  // 병원/약국 찾기 페이지에서 뒤로가기
  const handleHospitalPharmacyBack = () => {
    setShowHospitalPharmacy(false);
  };

  // 의료시설 상세 정보 보기
  const handleFacilitySelect = (facility: any) => {
    console.log("의료시설 선택:", facility);
    setSelectedFacility(facility);
    setShowMedicalFacilityDetail(true);
  };

  // 의료시설 상세 화면에서 뒤로가기
  const handleMedicalFacilityDetailBack = () => {
    setShowMedicalFacilityDetail(false);
    setSelectedFacility(null);
  };

  // 의료시설 목록 보기
  const handleShowFacilityList = (
    hospitals: any[],
    pharmacies: any[],
    activeTab: "hospital" | "pharmacy"
  ) => {
    console.log("목록 보기:", {
      hospitals: hospitals.length,
      pharmacies: pharmacies.length,
      activeTab,
    });
    setHospitalFacilities(hospitals);
    setPharmacyFacilities(pharmacies);
    setCurrentTab(activeTab);
    setShowMedicalFacilityList(true);
  };

  // 의료시설 목록 화면에서 뒤로가기
  const handleMedicalFacilityListBack = () => {
    setShowMedicalFacilityList(false);
  };

  // 카카오 로컬 API로 병원/약국 검색 (HospitalPharmacyScreen과 공통 사용)
  const searchMedicalFacilities = async (
    type: "hospital" | "pharmacy",
    coordinates: { lat: number; lng: number }
  ) => {
    setFacilityLoading(true);
    try {
      const keyword = type === "hospital" ? "병원" : "약국";
      const radius = 5000; // 5km 반경
      const KAKAO_REST_KEY = "eaacbe68b85bb0c87cb09c51b94a6c2e"; // API 키

      console.log(`${keyword} 검색 시작:`, coordinates);

      const response = await fetch(
        `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(
          keyword
        )}&x=${coordinates.lng}&y=${
          coordinates.lat
        }&radius=${radius}&size=15&sort=distance`,
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
      console.log(`${keyword} 검색 결과:`, data);

      if (data.documents && data.documents.length > 0) {
        const medicalFacilities = data.documents.map(
          (place: any, index: number) => {
            const distance = place.distance
              ? `${(parseInt(place.distance) / 1000).toFixed(1)}km`
              : "거리 정보 없음";

            return {
              id: place.id || `${type}_${index}`,
              name: place.place_name,
              type: type,
              address: place.address_name,
              phone: place.phone || "",
              isOpen: true,
              distance: distance,
              coordinates: {
                lat: parseFloat(place.y),
                lng: parseFloat(place.x),
              },
            };
          }
        );

        // 검색 결과를 상태에 저장
        if (type === "hospital") {
          setHospitalFacilities(medicalFacilities);
        } else {
          setPharmacyFacilities(medicalFacilities);
        }

        return medicalFacilities;
      } else {
        console.log(`${keyword} 검색 결과 없음`);
        if (type === "hospital") {
          setHospitalFacilities([]);
        } else {
          setPharmacyFacilities([]);
        }
        return [];
      }
    } catch (error) {
      console.error(`${type} 검색 실패:`, error);
      if (type === "hospital") {
        setHospitalFacilities([]);
      } else {
        setPharmacyFacilities([]);
      }
      return [];
    } finally {
      setFacilityLoading(false);
    }
  };

  // 목록 화면에서 탭 변경 시 데이터 검색
  const handleListTabChange = async (tab: "hospital" | "pharmacy") => {
    console.log("목록 탭 변경:", tab);
    setCurrentTab(tab);

    // 해당 탭의 데이터가 없으면 검색
    const targetFacilities =
      tab === "hospital" ? hospitalFacilities : pharmacyFacilities;
    if (targetFacilities.length === 0) {
      await searchMedicalFacilities(tab, selectedLocation.coordinates);
    }
  };

  // 주소 선택 처리
  const handleAddressSelect = (address: any) => {
    setCurrentLocation(address.name);
    setShowAddressSetting(false);
  };

  // 주소 설정 페이지에서 뒤로가기
  const handleAddressBack = () => {
    setShowAddressSetting(false);
  };

  // 지도에서 위치 선택 시 주소 상세 화면으로 이동
  const handleLocationConfirm = (
    address: string,
    coordinates: { lat: number; lng: number }
  ) => {
    setSelectedLocation({
      address,
      detailAddress: address,
      coordinates,
    });
    setShowLocationMap(false);
    setShowAddressDetail(true);
  };

  // 주소 상세 화면에서 뒤로가기
  const handleAddressDetailBack = () => {
    setShowAddressDetail(false);
    if (editingAddress) {
      // 편집 모드에서 뒤로가기면 주소 설정으로
      setEditingAddress(null);
      setShowAddressSetting(true);
    } else {
      // 새 등록 모드에서 뒤로가기면 지도로
      setShowLocationMap(true);
    }
  };

  // 주소 상세 등록 완료
  const handleAddressDetailConfirm = (addressData: any) => {
    console.log("주소 등록 완료:", addressData);

    // AddressData를 AddressInfo 형식으로 변환
    const newAddress = {
      id: editingAddress ? editingAddress.id : Date.now().toString(), // 편집 모드면 기존 ID 사용
      type: addressData.type === "custom" ? "school" : addressData.type, // custom을 school로 매핑
      name: addressData.typeName,
      address: `${addressData.address} ${addressData.detailAddress}`.trim(),
      isSelected: false,
    };

    if (editingAddress) {
      // 편집 모드: 기존 주소 업데이트
      setAddressList((prev) =>
        prev.map((addr) => (addr.id === editingAddress.id ? newAddress : addr))
      );
    } else {
      // 새 주소 추가
      setAddressList((prev) => [...prev, newAddress]);
    }

    setCurrentLocation(addressData.typeName);
    setEditingAddress(null);
    setShowAddressDetail(false);
    setShowAddressSetting(false);
  };

  // 주소 삭제
  const handleAddressDelete = (addressId: string) => {
    setAddressList((prev) => prev.filter((addr) => addr.id !== addressId));
  };

  // 주소 수정
  const handleAddressEdit = (address: any) => {
    console.log("주소 수정 시작:", address);
    setEditingAddress(address);

    // 기존 주소 정보를 파싱해서 selectedLocation에 설정
    const addressParts = address.address.split(" ");
    const detailAddress = addressParts.slice(-2).join(" "); // 마지막 2단어를 상세주소로 가정
    const mainAddress = addressParts.slice(0, -2).join(" "); // 나머지를 메인 주소로 가정

    setSelectedLocation({
      address: mainAddress || address.address,
      detailAddress: detailAddress || "",
      coordinates: { lat: 36.3504119, lng: 127.3845475 }, // 기본 좌표
    });

    setShowAddressDetail(true);
  };

  const renderScreen = () => {
    switch (activeTab) {
      case "home":
        return (
          <HomeScreen
            activeTab={activeTab}
            onTabPress={setActiveTab}
            onHospitalPharmacyPress={handleHospitalPharmacyPress}
          />
        );
      case "usage":
        return <Notification onTabPress={setActiveTab} />;
      case "records":
        return (
          <MedicalRecordsScreen
            activeTab={activeTab}
            onTabPress={setActiveTab}
          />
        );
      case "profile":
        return <MyPageScreen onTabPress={setActiveTab} />;
      default:
        return <HomeScreen activeTab={activeTab} onTabPress={setActiveTab} />;
    }
  };

  // 폰트가 로드되지 않았으면 로딩 화면 표시
  if (!fontsLoaded) {
    return null; // 또는 로딩 스피너 표시
  }

  // 로그인되지 않았으면 로그인 화면 표시
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
            {signUpStep === 4 && !isVerifyingManager && (
              <SignUpRole
                userName={signUpData.name}
                onComplete={(role) => {
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
        {showMedicalFacilityDetail && selectedFacility ? (
          <MedicalFacilityDetailScreen
            onBackPress={handleMedicalFacilityDetailBack}
            facility={selectedFacility}
          />
        ) : showMedicalFacilityList ? (
          <MedicalFacilityListScreen
            onBackPress={handleMedicalFacilityListBack}
            onFacilitySelect={handleFacilitySelect}
            onTabChange={handleListTabChange}
            initialTab={currentTab}
            hospitalFacilities={hospitalFacilities}
            pharmacyFacilities={pharmacyFacilities}
            loading={facilityLoading}
          />
        ) : showHospitalPharmacy ? (
          <HospitalPharmacyScreen
            onBackPress={handleHospitalPharmacyBack}
            onFacilitySelect={handleFacilitySelect}
            onShowFacilityList={handleShowFacilityList}
            currentLocation={currentLocation}
            currentCoordinates={selectedLocation.coordinates}
          />
        ) : showAddressDetail ? (
          <AddressDetailScreen
            onBackPress={handleAddressDetailBack}
            onAddressConfirm={handleAddressDetailConfirm}
            initialAddress={selectedLocation.address}
            initialDetailAddress={selectedLocation.detailAddress}
            initialCoordinates={selectedLocation.coordinates}
            editingAddress={editingAddress}
          />
        ) : showLocationMap ? (
          <LocationMapScreen
            onBackPress={() => setShowLocationMap(false)}
            onLocationConfirm={handleLocationConfirm}
          />
        ) : showAddressSetting ? (
          <AddressSettingScreen
            onBackPress={handleAddressBack}
            onAddressSelect={handleAddressSelect}
            onLocationMapPress={() => setShowLocationMap(true)}
            onAddressEdit={handleAddressEdit}
            onAddressDelete={handleAddressDelete}
            addressList={addressList}
          />
        ) : (
          <>
            <Header
              activeTab={activeTab}
              currentLocation={currentLocation}
              onLocationPress={handleLocationPress}
            />
            {renderScreen()}
          </>
        )}
        <StatusBar style="auto" />
      </View>
    </ThemeProvider>
  );
}
