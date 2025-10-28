import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components/native";
import { Alert, Platform } from "react-native";
import { WebView } from "react-native-webview";
import * as Location from "expo-location";
import { BackIcon } from "../components/icons";
import Svg, { Path } from "react-native-svg";

interface LocationMapScreenProps {
  onBackPress?: () => void;
  onLocationConfirm?: (
    address: string,
    coordinates: { lat: number; lng: number }
  ) => void;
}

const ScreenContainer = styled.View`
  flex: 1;
  background-color: white;
`;

const HeaderContainer = styled.View`
  background-color: white;
  padding-top: 60px;
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: #f0f0f0;
`;

const BackButton = styled.TouchableOpacity`
  padding: 8px;
`;

const HeaderTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: #333333;
  flex: 1;
  text-align: center;
`;

const MapContainer = styled.View`
  flex: 1;
`;

const BottomContainer = styled.View`
  position: absolute;
  bottom: 40px;
  left: 20px;
  right: 20px;
  background-color: white;
  border-radius: 16px;
  padding: 20px;
  border-width: 1px;
  border-color: #e0e0e0;
`;

const LocationButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 260px;
  right: 20px;
  width: 50px;
  height: 50px;
  background-color: white;
  border-radius: 25px;
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-color: #e0e0e0;
`;

// 현재 위치 아이콘 컴포넌트
const LocationIcon = () => (
  <Svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <Path
      d="M1 11H4M18 11H21M11 1V4M11 18V21"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M11 18C14.866 18 18 14.866 18 11C18 7.13401 14.866 4 11 4C7.13401 4 4 7.13401 4 11C4 14.866 7.13401 18 11 18Z"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M11 14C12.6569 14 14 12.6569 14 11C14 9.34315 12.6569 8 11 8C9.34315 8 8 9.34315 8 11C8 12.6569 9.34315 14 11 14Z"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const AddressTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: #333333;
  margin-bottom: 8px;
`;

const AddressText = styled.Text`
  font-size: 14px;
  color: #666666;
  margin-bottom: 16px;
`;

const AddressNotice = styled.Text`
  font-size: 12px;
  color: #ff6b6b;
  text-align: center;
  margin-bottom: 16px;
`;

const LoadingIndicator = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
`;

const LoadingText = styled.Text`
  font-size: 14px;
  color: #666666;
  margin-left: 8px;
`;

const RetryButton = styled.TouchableOpacity`
  background-color: #f8f8f8;
  border-radius: 8px;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 12px;
  padding-right: 12px;
  margin-bottom: 12px;
  align-items: center;
`;

const RetryButtonText = styled.Text`
  color: #666666;
  font-size: 14px;
  font-weight: 500;
`;

const ConfirmButton = styled.TouchableOpacity`
  background-color: #333333;
  border-radius: 12px;
  padding-top: 16px;
  padding-bottom: 16px;
  align-items: center;
`;

const ConfirmButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 600;
`;

// 카카오맵 JavaScript 키 (지도용)
const KAKAO_JS_KEY = "9f545dda265aebc67ed17146a2e8ce38";

// 카카오 REST API 키 (주소변환용) - 카카오 디벨로퍼스에서 발급받으세요
const KAKAO_REST_KEY = "eaacbe68b85bb0c87cb09c51b94a6c2e"; // 임시로 같은 키 사용, 실제로는 REST 키가 필요

export const LocationMapScreen = ({
  onBackPress,
  onLocationConfirm,
}: LocationMapScreenProps) => {
  const [currentAddress, setCurrentAddress] = useState("주소를 가져오는 중...");
  const [detailAddress, setDetailAddress] = useState("위치를 확인해주세요");
  const [currentCoordinates, setCurrentCoordinates] = useState({
    lat: 36.3504119,
    lng: 127.3845475,
  });
  const webViewRef = useRef<WebView>(null);

  // 개선된 좌표→주소 변환 함수 (다중 API 지원)
  const convertCoordinatesToAddress = async (
    latitude: number,
    longitude: number,
    maxRetries = 3
  ) => {
    let lastError;

    // 로딩 상태 표시
    setCurrentAddress("주소를 찾고 있습니다...");
    setDetailAddress("잠시만 기다려주세요");

    // 1차 시도: Expo Location API (가장 안정적)
    try {
      console.log("🌍 Expo Location으로 주소 변환 시도:", latitude, longitude);

      const geocodeResult = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (geocodeResult && geocodeResult.length > 0) {
        const result = geocodeResult[0];
        console.log("✅ Expo Location 주소 변환 성공:", result);

        // 한국어 주소 포맷팅 (중복 제거)
        let roadAddress = "";
        let detailAddress = "";

        if (result.country === "South Korea" || result.country === "대한민국") {
          // 한국 주소 포맷 - 중복 제거 개선
          const allParts = [
            result.region, // 시/도
            result.city, // 시/군/구
            result.district, // 동/면/읍
            result.subregion, // 세부지역
            result.street, // 도로명
            result.name, // 상세주소
          ].filter((part): part is string => Boolean(part));

          // 중복 제거: 같은 내용이나 포함 관계인 경우 제거
          const uniqueParts: string[] = [];

          for (const part of allParts) {
            // 이미 추가된 부분과 중복되거나 포함되는지 확인
            const isDuplicate = uniqueParts.some((existing) => {
              // 완전히 같은 경우
              if (existing === part) return true;

              // 한쪽이 다른 쪽을 포함하는 경우
              if (existing.includes(part) || part.includes(existing))
                return true;

              // 도로명/번지 중복 체크 (예: "문정로89번길"과 "문정로89")
              const existingNumbers = existing.match(/\d+/g);
              const partNumbers = part.match(/\d+/g);
              if (existingNumbers && partNumbers) {
                const existingBase = existing
                  .replace(/\d+/g, "")
                  .replace(/[길번지]/g, "");
                const partBase = part
                  .replace(/\d+/g, "")
                  .replace(/[길번지]/g, "");
                if (
                  existingBase === partBase &&
                  existingNumbers[0] === partNumbers[0]
                ) {
                  return true;
                }
              }

              return false;
            });

            if (!isDuplicate) {
              uniqueParts.push(part);
            }
          }

          roadAddress = uniqueParts.join(" ");

          // 상세 주소는 시/도만 표시 (중복 방지)
          detailAddress = result.region || "";
        } else {
          // 기본 포맷
          const parts = [
            result.street,
            result.city,
            result.region,
            result.country,
          ].filter(Boolean);

          roadAddress = parts.join(", ");
          detailAddress = `${result.postalCode || ""} ${
            result.timezone || ""
          }`.trim();
        }

        if (roadAddress) {
          setCurrentAddress(roadAddress || "주소 정보 없음");
          setDetailAddress(detailAddress || "상세 주소 없음");
          setCurrentCoordinates({ lat: latitude, lng: longitude });

          // WebView에 주소 정보 전달
          webViewRef.current?.postMessage(
            JSON.stringify({
              type: "updateLocation",
              lat: latitude,
              lng: longitude,
              roadAddress: roadAddress,
              jibunAddress: detailAddress,
            })
          );

          return { roadAddress, jibunAddress: detailAddress };
        }
      }
    } catch (error) {
      console.warn("⚠️ Expo Location 실패, 카카오 API로 대체:", error);
      lastError = error;
    }

    // 2차 시도: 카카오 API (Expo가 실패한 경우)
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(
          `🗺️ 카카오 API 주소 변환 시도 #${attempt}:`,
          latitude,
          longitude
        );

        const response = await fetch(
          `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}&input_coord=WGS84`,
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
        console.log(`카카오 API 응답 #${attempt}:`, data);

        if (data.documents && data.documents.length > 0) {
          const result = data.documents[0];

          // 도로명주소 우선, 없으면 지번주소
          const roadAddress =
            result.road_address?.address_name ||
            result.address?.address_name ||
            "주소 정보 없음";
          const jibunAddress = result.address?.address_name || "상세 주소 없음";

          console.log(
            "✅ 카카오 API 주소 변환 성공:",
            roadAddress,
            jibunAddress
          );

          setCurrentAddress(roadAddress);
          setDetailAddress(jibunAddress);
          setCurrentCoordinates({ lat: latitude, lng: longitude });

          // WebView에 성공한 주소 정보 전달
          webViewRef.current?.postMessage(
            JSON.stringify({
              type: "updateLocation",
              lat: latitude,
              lng: longitude,
              roadAddress: roadAddress,
              jibunAddress: jibunAddress,
            })
          );

          return { roadAddress, jibunAddress };
        } else if (data.meta && data.meta.total_count === 0) {
          throw new Error("해당 좌표에 대한 주소 정보가 없습니다");
        } else {
          throw new Error("응답 데이터가 올바르지 않습니다");
        }
      } catch (error) {
        console.error(`카카오 API 실패 #${attempt}:`, error);
        lastError = error;

        // 마지막 시도가 아니면 잠시 대기
        if (attempt < maxRetries) {
          console.log(`${1000 * attempt}ms 후 재시도...`);
          await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
        }
      }
    }

    // 3차 시도: 대안 주소 서비스
    console.error("🔄 모든 API 실패, 대안 시도");
    try {
      const alternativeAddress = await getAddressFromAlternativeAPI(
        latitude,
        longitude
      );
      if (alternativeAddress) {
        setCurrentAddress(alternativeAddress.roadAddress);
        setDetailAddress(alternativeAddress.jibunAddress);
        setCurrentCoordinates({ lat: latitude, lng: longitude });

        webViewRef.current?.postMessage(
          JSON.stringify({
            type: "updateLocation",
            lat: latitude,
            lng: longitude,
            roadAddress: alternativeAddress.roadAddress,
            jibunAddress: alternativeAddress.jibunAddress,
          })
        );

        return alternativeAddress;
      }
    } catch (altError) {
      console.error("대안 주소 서비스도 실패:", altError);
    }

    // 최종 실패 시 좌표 표시
    console.error("❌ 모든 주소 변환 방법 실패:", lastError);
    const fallbackMessage = "주소를 찾을 수 없는 위치입니다";
    const coordInfo = `위도 ${latitude.toFixed(6)}, 경도 ${longitude.toFixed(
      6
    )}`;

    setCurrentAddress(fallbackMessage);
    setDetailAddress(coordInfo);
    setCurrentCoordinates({ lat: latitude, lng: longitude });

    // 사용자에게 재시도 옵션 제공
    Alert.alert(
      "주소 변환 실패",
      "주소를 찾을 수 없습니다. 다시 시도하시겠습니까?",
      [
        { text: "취소", style: "cancel" },
        {
          text: "다시 시도",
          onPress: () => convertCoordinatesToAddress(latitude, longitude, 1),
        },
      ]
    );

    webViewRef.current?.postMessage(
      JSON.stringify({
        type: "updateLocation",
        lat: latitude,
        lng: longitude,
        roadAddress: fallbackMessage,
        jibunAddress: coordInfo,
      })
    );

    return { roadAddress: fallbackMessage, jibunAddress: coordInfo };
  };

  // 개선된 대안 주소 API (한국 지역 기반 추정)
  const getAddressFromAlternativeAPI = async (
    latitude: number,
    longitude: number
  ) => {
    try {
      console.log("🏢 대안 주소 서비스 사용:", latitude, longitude);

      // 한국의 주요 도시/지역 기반 추정
      const region = getDetailedRegionFromCoordinates(latitude, longitude);

      if (region) {
        return {
          roadAddress: region.mainAddress,
          jibunAddress: region.detailAddress,
        };
      }

      // 기본 fallback
      return {
        roadAddress: "대한민국 내 위치",
        jibunAddress: `위도 ${latitude.toFixed(4)}, 경도 ${longitude.toFixed(
          4
        )}`,
      };
    } catch (error) {
      console.error("대안 주소 서비스 오류:", error);
      return null;
    }
  };

  // 개선된 좌표 기반 지역 추정 (더 상세한 지역 정보)
  const getDetailedRegionFromCoordinates = (lat: number, lng: number) => {
    // 서울특별시
    if (lat >= 37.413 && lat <= 37.715 && lng >= 126.734 && lng <= 127.269) {
      let district = "서울특별시";

      // 서울 구별 세분화
      if (lat >= 37.5 && lat <= 37.6 && lng >= 126.9 && lng <= 127.1) {
        district = "서울특별시 중구/종로구 일대";
      } else if (
        lat >= 37.45 &&
        lat <= 37.55 &&
        lng >= 126.8 &&
        lng <= 126.95
      ) {
        district = "서울특별시 영등포구/마포구 일대";
      } else if (lat >= 37.5 && lat <= 37.65 && lng >= 127.0 && lng <= 127.15) {
        district = "서울특별시 성동구/광진구 일대";
      }

      return {
        mainAddress: district,
        detailAddress: "",
      };
    }

    // 경기도
    else if (lat >= 36.8 && lat <= 38.3 && lng >= 126.3 && lng <= 127.9) {
      let city = "경기도";

      // 경기도 주요 도시 세분화
      if (lat >= 37.2 && lat <= 37.35 && lng >= 126.95 && lng <= 127.15) {
        city = "경기도 성남시";
      } else if (lat >= 37.25 && lat <= 37.35 && lng >= 126.8 && lng <= 127.0) {
        city = "경기도 안양시";
      } else if (lat >= 37.45 && lat <= 37.65 && lng >= 126.6 && lng <= 126.8) {
        city = "경기도 고양시";
      } else if (lat >= 37.2 && lat <= 37.4 && lng >= 127.0 && lng <= 127.2) {
        city = "경기도 용인시";
      }

      return {
        mainAddress: city,
        detailAddress: "",
      };
    }

    // 인천광역시
    else if (lat >= 37.2 && lat <= 37.65 && lng >= 126.3 && lng <= 126.8) {
      return {
        mainAddress: "인천광역시",
        detailAddress: "",
      };
    }

    // 대전광역시
    else if (lat >= 36.2 && lat <= 36.5 && lng >= 127.2 && lng <= 127.6) {
      return {
        mainAddress: "대전광역시",
        detailAddress: "",
      };
    }

    // 광주광역시
    else if (lat >= 35.05 && lat <= 35.25 && lng >= 126.7 && lng <= 127.0) {
      return {
        mainAddress: "광주광역시",
        detailAddress: "",
      };
    }

    // 대구광역시
    else if (lat >= 35.7 && lat <= 36.0 && lng >= 128.3 && lng <= 128.8) {
      return {
        mainAddress: "대구광역시",
        detailAddress: "",
      };
    }

    // 부산광역시
    else if (lat >= 34.9 && lat <= 35.4 && lng >= 128.8 && lng <= 129.3) {
      return {
        mainAddress: "부산광역시",
        detailAddress: "",
      };
    }

    // 울산광역시
    else if (lat >= 35.4 && lat <= 35.7 && lng >= 129.0 && lng <= 129.5) {
      return {
        mainAddress: "울산광역시",
        detailAddress: "",
      };
    }

    // 세종특별자치시
    else if (lat >= 36.4 && lat <= 36.65 && lng >= 127.1 && lng <= 127.35) {
      return {
        mainAddress: "세종특별자치시",
        detailAddress: "",
      };
    }

    // 강원도
    else if (lat >= 37.0 && lat <= 38.6 && lng >= 127.1 && lng <= 129.4) {
      return {
        mainAddress: "강원도",
        detailAddress: "",
      };
    }

    // 충청북도
    else if (lat >= 36.0 && lat <= 37.2 && lng >= 127.4 && lng <= 129.0) {
      return {
        mainAddress: "충청북도",
        detailAddress: "",
      };
    }

    // 충청남도
    else if (lat >= 35.9 && lat <= 37.0 && lng >= 126.3 && lng <= 127.8) {
      return {
        mainAddress: "충청남도",
        detailAddress: "",
      };
    }

    // 전라북도
    else if (lat >= 35.0 && lat <= 36.0 && lng >= 126.4 && lng <= 127.8) {
      return {
        mainAddress: "전라북도",
        detailAddress: "",
      };
    }

    // 전라남도
    else if (lat >= 33.9 && lat <= 35.5 && lng >= 125.9 && lng <= 127.6) {
      return {
        mainAddress: "전라남도",
        detailAddress: "",
      };
    }

    // 경상북도
    else if (lat >= 35.4 && lat <= 37.5 && lng >= 127.9 && lng <= 129.6) {
      return {
        mainAddress: "경상북도",
        detailAddress: "",
      };
    }

    // 경상남도
    else if (lat >= 34.7 && lat <= 36.0 && lng >= 127.4 && lng <= 129.2) {
      return {
        mainAddress: "경상남도",
        detailAddress: "",
      };
    }

    // 제주특별자치도
    else if (lat >= 33.1 && lat <= 33.6 && lng >= 126.1 && lng <= 126.9) {
      return {
        mainAddress: "제주특별자치도",
        detailAddress: "",
      };
    }

    // 한국 내 기타 지역
    else if (lat >= 33.0 && lat <= 38.7 && lng >= 125.0 && lng <= 130.0) {
      return {
        mainAddress: "대한민국",
        detailAddress: "",
      };
    }

    return null; // 한국 밖의 위치
  };

  // React Native에서 현재 위치 가져오기
  const getCurrentLocation = async () => {
    try {
      console.log("위치 권한 요청 시작");

      // 위치 권한 요청
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "위치 권한 필요",
          "현재 위치를 사용하려면 위치 권한이 필요합니다."
        );
        return;
      }

      console.log("현재 위치 가져오기 시작");
      setCurrentAddress("현재 위치를 가져오는 중...");
      setDetailAddress("잠시만 기다려주세요");

      // 현재 위치 가져오기
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const { latitude, longitude } = location.coords;
      console.log("현재 위치 가져오기 성공:", latitude, longitude);

      // 주소 변환
      await convertCoordinatesToAddress(latitude, longitude);
    } catch (error) {
      console.error("위치 가져오기 실패:", error);
      Alert.alert("오류", "현재 위치를 가져올 수 없습니다. 다시 시도해주세요.");

      // 기본 위치로 fallback
      await convertCoordinatesToAddress(36.3504119, 127.3845475);
    }
  };

  const handleLocationButtonPress = () => {
    console.log("현재 위치 버튼 클릭");
    getCurrentLocation();
  };

  // 컴포넌트 마운트 시 기본 위치 설정
  useEffect(() => {
    convertCoordinatesToAddress(36.3504119, 127.3845475);
  }, []);

  // 간소화된 지도 HTML (React Native에서 좌표 관리)
  const kakaoMapHTML = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>지도에서 위치 확인</title>
    <style>
        * { margin: 0; padding: 0; }
        html, body { width: 100%; height: 100%; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
        #map { width: 100%; height: 100vh; }
        
        .custom-overlay {
            position: relative;
            bottom: 85px;
            border-radius: 20px;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(10px);
            padding: 12px 16px;
            color: white;
            font-size: 14px;
            font-weight: 500;
            white-space: nowrap;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }
        
        .custom-overlay:after {
            content: '';
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 0;
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            border-top: 8px solid rgba(0, 0, 0, 0.8);
        }
    </style>
</head>
<body>
    <div id="map"></div>

    <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_JS_KEY}&autoload=false"></script>
    <script>
        let map, marker, infowindow;
        
        kakao.maps.load(function() {
            console.log('카카오맵 로드 완료');
            
            // 지도 생성
            var mapContainer = document.getElementById('map');
            var mapOption = {
                center: new kakao.maps.LatLng(36.3504119, 127.3845475),
                level: 3
            };

            map = new kakao.maps.Map(mapContainer, mapOption);
            console.log('지도 생성 완료');

            // React Native 메시지 리스너
            window.addEventListener('message', function(event) {
                try {
                    var data = JSON.parse(event.data);
                    console.log('WebView 메시지 받음:', data);
                    
                    if (data.type === 'updateLocation') {
                        // React Native에서 받은 좌표로 마커 업데이트
                        displayMarker(data.lat, data.lng, '표시된 위치가 맞나요?');
                    }
                } catch (error) {
                    console.log('메시지 파싱 에러:', error);
                }
            });

            function displayMarker(lat, lng, message) {
                console.log('마커 표시:', lat, lng);
                
                // 기존 마커와 인포윈도우 제거
                if (marker) marker.setMap(null);
                if (infowindow) infowindow.setMap(null);

                var position = new kakao.maps.LatLng(lat, lng);

                // 새 마커 생성
                marker = new kakao.maps.Marker({
                    map: map,
                    position: position
                });

                // 커스텀 오버레이 생성
                var content = '<div class="custom-overlay">' + message + '</div>';
                
                infowindow = new kakao.maps.CustomOverlay({
                    map: map,
                    position: position,
                    content: content,
                    yAnchor: 1
                });

                // 지도 중심을 마커 위치로 이동
                map.setCenter(position);
            }

            // 기본 마커 표시
            displayMarker(36.3504119, 127.3845475, '표시된 위치가 맞나요?');

            // 지도 클릭 이벤트 (React Native로 좌표 전송)
            kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
                var latlng = mouseEvent.latLng;
                var lat = latlng.getLat();
                var lng = latlng.getLng();
                
                console.log('지도 클릭:', lat, lng);
                
                // React Native로 클릭한 좌표 전송
                if (window.ReactNativeWebView) {
                    window.ReactNativeWebView.postMessage(JSON.stringify({
                        type: 'mapClicked',
                        lat: lat,
                        lng: lng
                    }));
                }
            });
        });
    </script>
</body>
</html>`;

  const handleMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      console.log("WebView에서 메시지 받음:", data);

      if (data.type === "mapClicked") {
        // 지도 클릭 시 React Native에서 주소 변환
        console.log("지도 클릭됨, 주소 변환 시작:", data.lat, data.lng);
        convertCoordinatesToAddress(data.lat, data.lng);
      }
    } catch (error) {
      console.log("메시지 파싱 에러:", error);
    }
  };

  const handleConfirm = () => {
    onLocationConfirm?.(currentAddress, currentCoordinates);
    onBackPress?.();
  };

  return (
    <ScreenContainer>
      {/* Header */}
      <HeaderContainer>
        <BackButton onPress={onBackPress} activeOpacity={0.7}>
          <BackIcon width={24} height={24} />
        </BackButton>
        <HeaderTitle>지도에서 위치 확인</HeaderTitle>
        <BackButton style={{ opacity: 0 }}>
          <BackIcon width={24} height={24} />
        </BackButton>
      </HeaderContainer>

      {/* Map */}
      <MapContainer>
        <WebView
          ref={webViewRef}
          source={{ html: kakaoMapHTML }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          geolocationEnabled={true}
          onMessage={handleMessage}
          style={{ flex: 1 }}
          originWhitelist={["*"]}
          allowsInlineMediaPlayback={true}
          mediaPlaybackRequiresUserAction={false}
          mixedContentMode="compatibility"
          onLoadStart={() => console.log("WebView 로딩 시작")}
          onLoadEnd={() => console.log("WebView 로딩 완료")}
          onError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.error("WebView 에러:", nativeEvent);
          }}
          onHttpError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.error("WebView HTTP 에러:", nativeEvent);
          }}
        />
      </MapContainer>

      {/* Current Location Button */}
      <LocationButton onPress={handleLocationButtonPress} activeOpacity={0.7}>
        <LocationIcon />
      </LocationButton>

      {/* Bottom Info */}
      <BottomContainer>
        <AddressTitle>{currentAddress}</AddressTitle>
        <AddressText>{detailAddress}</AddressText>
        <AddressNotice>
          지도의 표시와 실제 주소가 맞는지 확인해주세요.
        </AddressNotice>
        <ConfirmButton onPress={handleConfirm} activeOpacity={0.8}>
          <ConfirmButtonText>이 위치로 주소 등록</ConfirmButtonText>
        </ConfirmButton>
      </BottomContainer>
    </ScreenContainer>
  );
};
