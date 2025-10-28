import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components/native";
import { Alert, Platform } from "react-native";
import { WebView } from "react-native-webview";
import { BackIcon } from "../components/icons";
import Svg, { Path } from "react-native-svg";

interface HospitalPharmacyScreenProps {
  onBackPress?: () => void;
  onFacilitySelect?: (facility: MedicalFacility) => void;
  onShowFacilityList?: (
    hospitals: MedicalFacility[],
    pharmacies: MedicalFacility[],
    activeTab: "hospital" | "pharmacy"
  ) => void;
  currentLocation?: string;
  currentCoordinates?: { lat: number; lng: number };
}

interface MedicalFacility {
  id: string;
  name: string;
  type: "hospital" | "pharmacy";
  address: string;
  phone?: string;
  isOpen: boolean;
  distance: string;
  coordinates: { lat: number; lng: number };
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

const TabContainer = styled.View`
  flex-direction: row;
  background-color: white;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 16px;
  padding-bottom: 16px;
  border-bottom-width: 1px;
  border-bottom-color: #f0f0f0;
`;

const TabButton = styled.TouchableOpacity<{ isActive: boolean }>`
  flex: 1;
  padding: 12px;
  align-items: center;
  border-bottom-width: 2px;
  border-bottom-color: ${(props: { isActive: boolean }) =>
    props.isActive ? "#00A6D8" : "transparent"};
`;

const TabText = styled.Text<{ isActive: boolean }>`
  font-size: 16px;
  font-weight: 600;
  color: ${(props: { isActive: boolean }) =>
    props.isActive ? "#00A6D8" : "#666666"};
`;

const MapContainer = styled.View`
  flex: 1;
`;

const BottomContainer = styled.View`
  background-color: white;
  padding: 20px;
  border-top-width: 1px;
  border-top-color: #f0f0f0;
`;

const LocationInfo = styled.View`
  margin-bottom: 16px;
`;

const LocationText = styled.Text`
  font-size: 14px;
  color: #666666;
  margin-bottom: 4px;
`;

const CurrentLocationText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #333333;
`;

const FacilityCountText = styled.Text`
  font-size: 12px;
  color: #00a6d8;
  margin-top: 4px;
`;

const LoadingText = styled.Text`
  font-size: 14px;
  color: #666666;
  text-align: center;
`;

const ListButton = styled.TouchableOpacity`
  background-color: #00a6d8;
  border-radius: 12px;
  padding: 16px;
  align-items: center;
  flex-direction: row;
  justify-content: center;
`;

const ListButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 600;
  margin-right: 8px;
`;

const ListIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <Path
      d="M3 6H17M3 10H17M3 14H17"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// 카카오맵 JavaScript 키
const KAKAO_JS_KEY = "9f545dda265aebc67ed17146a2e8ce38";

// 카카오 REST API 키 (장소 검색용)
const KAKAO_REST_KEY = "eaacbe68b85bb0c87cb09c51b94a6c2e";

export const HospitalPharmacyScreen = ({
  onBackPress,
  onFacilitySelect,
  onShowFacilityList,
  currentLocation = "현재 위치",
  currentCoordinates = { lat: 36.3504119, lng: 127.3845475 },
}: HospitalPharmacyScreenProps) => {
  const [activeTab, setActiveTab] = useState<"hospital" | "pharmacy">(
    "hospital"
  );
  const [facilities, setFacilities] = useState<MedicalFacility[]>([]);
  const [hospitalFacilities, setHospitalFacilities] = useState<
    MedicalFacility[]
  >([]);
  const [pharmacyFacilities, setPharmacyFacilities] = useState<
    MedicalFacility[]
  >([]);
  const [loading, setLoading] = useState(false);
  const webViewRef = useRef<WebView>(null);

  // 카카오 로컬 API로 병원/약국 검색
  const searchMedicalFacilities = async (
    type: "hospital" | "pharmacy",
    coordinates: { lat: number; lng: number }
  ) => {
    setLoading(true);
    try {
      const keyword = type === "hospital" ? "병원" : "약국";
      const radius = 5000; // 5km 반경

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
        const medicalFacilities: MedicalFacility[] = data.documents.map(
          (place: any, index: number) => {
            // 거리 계산 (미터를 km로 변환)
            const distance = place.distance
              ? `${(parseInt(place.distance) / 1000).toFixed(1)}km`
              : "거리 정보 없음";

            return {
              id: place.id || `${type}_${index}`,
              name: place.place_name,
              type: type,
              address: place.address_name,
              phone: place.phone || "",
              isOpen: true, // 실제로는 운영시간 API나 별도 정보가 필요
              distance: distance,
              coordinates: {
                lat: parseFloat(place.y),
                lng: parseFloat(place.x),
              },
            };
          }
        );

        console.log(`${keyword} 파싱된 결과:`, medicalFacilities);
        setFacilities(medicalFacilities);

        // 탭별로 데이터 저장
        if (type === "hospital") {
          setHospitalFacilities(medicalFacilities);
        } else {
          setPharmacyFacilities(medicalFacilities);
        }

        return medicalFacilities;
      } else {
        console.log(`${keyword} 검색 결과 없음`);
        setFacilities([]);

        // 탭별로 빈 데이터 저장
        if (type === "hospital") {
          setHospitalFacilities([]);
        } else {
          setPharmacyFacilities([]);
        }

        return [];
      }
    } catch (error) {
      console.error(`${type} 검색 실패:`, error);
      Alert.alert(
        "오류",
        "의료시설 정보를 가져올 수 없습니다. 다시 시도해주세요."
      );
      setFacilities([]);

      // 탭별로 빈 데이터 저장
      if (type === "hospital") {
        setHospitalFacilities([]);
      } else {
        setPharmacyFacilities([]);
      }

      return [];
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트 마운트 시 및 탭 변경 시 데이터 로드
  useEffect(() => {
    const loadData = async () => {
      const searchResults = await searchMedicalFacilities(
        activeTab,
        currentCoordinates
      );

      // 지도에 마커 표시
      const timer = setTimeout(() => {
        if (webViewRef.current) {
          webViewRef.current.postMessage(
            JSON.stringify({
              type: "showMedicalFacilities",
              facilities: searchResults,
              currentLocation: currentCoordinates,
            })
          );
        }
      }, 1000);

      return () => clearTimeout(timer);
    };

    loadData();
  }, [activeTab, currentCoordinates]);

  const handleTabPress = (tab: "hospital" | "pharmacy") => {
    setActiveTab(tab);
  };

  const handleListPress = () => {
    // 목록 화면으로 이동하는 로직
    console.log(
      "목록보기 클릭, 병원:",
      hospitalFacilities.length,
      "약국:",
      pharmacyFacilities.length
    );

    if (hospitalFacilities.length === 0 && pharmacyFacilities.length === 0) {
      Alert.alert("알림", "표시할 의료시설이 없습니다.");
      return;
    }

    onShowFacilityList?.(hospitalFacilities, pharmacyFacilities, activeTab);
  };

  // 카카오맵 HTML
  const kakaoMapHTML = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>병원/약국 찾기</title>
    <style>
        * { margin: 0; padding: 0; }
        html, body { width: 100%; height: 100%; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
        #map { width: 100%; height: 100vh; }
    </style>
</head>
<body>
    <div id="map"></div>
    <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_JS_KEY}&autoload=false"></script>
    <script>
        let map, markers = [];
        
        kakao.maps.load(function() {
            console.log('카카오맵 로드 완료');
            
            // 지도 생성
            var mapContainer = document.getElementById('map');
            var mapOption = {
                center: new kakao.maps.LatLng(36.3504119, 127.3845475),
                level: 4
            };

            map = new kakao.maps.Map(mapContainer, mapOption);
            console.log('지도 생성 완료');

            // React Native 메시지 리스너
            window.addEventListener('message', function(event) {
                try {
                    var data = JSON.parse(event.data);
                    console.log('WebView 메시지 받음:', data);
                    
                    if (data.type === 'showMedicalFacilities') {
                        clearMarkers();
                        showMedicalFacilities(data.facilities, data.currentLocation);
                    }
                } catch (error) {
                    console.log('메시지 파싱 에러:', error);
                }
            });

            function clearMarkers() {
                for (let i = 0; i < markers.length; i++) {
                    markers[i].setMap(null);
                }
                markers = [];
            }

            function showMedicalFacilities(facilities, currentLocation) {
                console.log('의료시설 마커 표시:', facilities.length);
                
                // 현재 위치 마커 (파란색)
                var currentMarker = new kakao.maps.Marker({
                    map: map,
                    position: new kakao.maps.LatLng(currentLocation.lat, currentLocation.lng),
                    image: new kakao.maps.MarkerImage(
                        'data:image/svg+xml;base64,' + btoa('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8" fill="#007AFF" stroke="white" stroke-width="2"/></svg>'),
                        new kakao.maps.Size(24, 24)
                    )
                });
                markers.push(currentMarker);

                // 의료시설 마커들 (병원: 빨간색, 약국: 초록색)
                facilities.forEach(function(facility) {
                    var markerPosition = new kakao.maps.LatLng(facility.coordinates.lat, facility.coordinates.lng);
                    
                    // 병원과 약국에 따라 다른 색상과 아이콘 사용
                    var markerColor = facility.type === 'hospital' ? '#FF4444' : '#22C55E';
                    var markerIcon = facility.type === 'hospital' ? 'H' : 'P';
                    var markerSize = 28;
                    
                    var marker = new kakao.maps.Marker({
                        map: map,
                        position: markerPosition,
                        image: new kakao.maps.MarkerImage(
                            'data:image/svg+xml;base64,' + btoa(
                                '<svg xmlns="http://www.w3.org/2000/svg" width="' + markerSize + '" height="' + markerSize + '" viewBox="0 0 ' + markerSize + ' ' + markerSize + '" fill="none">' +
                                '<circle cx="' + (markerSize/2) + '" cy="' + (markerSize/2) + '" r="' + (markerSize/2 - 2) + '" fill="' + markerColor + '" stroke="white" stroke-width="2"/>' +
                                '<text x="' + (markerSize/2) + '" y="' + (markerSize/2 + 5) + '" text-anchor="middle" fill="white" font-size="12" font-weight="bold">' + markerIcon + '</text>' +
                                '</svg>'
                            ),
                            new kakao.maps.Size(markerSize, markerSize)
                        )
                    });

                    // 클릭 이벤트
                    kakao.maps.event.addListener(marker, 'click', function() {
                        if (window.ReactNativeWebView) {
                            window.ReactNativeWebView.postMessage(JSON.stringify({
                                type: 'facilityClicked',
                                facility: facility
                            }));
                        }
                    });

                    markers.push(marker);
                });

                // 지도 중심을 현재 위치로 이동
                map.setCenter(new kakao.maps.LatLng(currentLocation.lat, currentLocation.lng));
            }
        });
    </script>
</body>
</html>`;

  const handleMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      console.log("WebView에서 메시지 받음:", data);

      if (data.type === "facilityClicked") {
        // 시설 클릭 시 상세 화면으로 이동
        console.log("시설 클릭됨:", data.facility);
        onFacilitySelect?.(data.facility);
      }
    } catch (error) {
      console.log("메시지 파싱 에러:", error);
    }
  };

  return (
    <ScreenContainer>
      {/* Header */}
      <HeaderContainer>
        <BackButton onPress={onBackPress} activeOpacity={0.7}>
          <BackIcon width={24} height={24} />
        </BackButton>
        <HeaderTitle>열린 약국/병원 찾기</HeaderTitle>
        <BackButton style={{ opacity: 0 }}>
          <BackIcon width={24} height={24} />
        </BackButton>
      </HeaderContainer>

      {/* Tabs */}
      <TabContainer>
        <TabButton
          isActive={activeTab === "hospital"}
          onPress={() => handleTabPress("hospital")}
          activeOpacity={0.7}
        >
          <TabText isActive={activeTab === "hospital"}>병원</TabText>
        </TabButton>
        <TabButton
          isActive={activeTab === "pharmacy"}
          onPress={() => handleTabPress("pharmacy")}
          activeOpacity={0.7}
        >
          <TabText isActive={activeTab === "pharmacy"}>약국</TabText>
        </TabButton>
      </TabContainer>

      {/* Map */}
      <MapContainer>
        <WebView
          ref={webViewRef}
          source={{ html: kakaoMapHTML }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
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
        />
      </MapContainer>

      {/* Bottom Info & List Button */}
      <BottomContainer>
        <LocationInfo>
          <LocationText>현재 위치 기준</LocationText>
          <CurrentLocationText>{currentLocation}</CurrentLocationText>
          {loading ? (
            <LoadingText>의료시설을 검색하고 있습니다...</LoadingText>
          ) : (
            <FacilityCountText>
              {activeTab === "hospital" ? "병원" : "약국"} {facilities.length}개
              찾음
            </FacilityCountText>
          )}
        </LocationInfo>

        <ListButton
          onPress={handleListPress}
          activeOpacity={loading ? 1 : 0.8}
          disabled={loading}
          style={{ opacity: loading ? 0.5 : 1 }}
        >
          <ListIcon />
          <ListButtonText>목록보기</ListButtonText>
        </ListButton>
      </BottomContainer>
    </ScreenContainer>
  );
};
