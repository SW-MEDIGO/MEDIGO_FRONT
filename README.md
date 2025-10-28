# Medigo

의료 동행 서비스 앱

## 설치 및 실행

### 1. 프로젝트 클론

```bash
git clone [repository-url]
cd Medigo
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 추가 의존성 설치

이 프로젝트는 다음 추가 패키지들을 사용합니다:

```bash
# 이미지 선택 기능을 위한 패키지
npm install expo-image-picker

# 또는 expo CLI 사용
expo install expo-image-picker
```

### 4. 앱 실행

```bash
# 개발 서버 시작
npm start

# iOS 시뮬레이터에서 실행
npm run ios

# Android 에뮬레이터에서 실행
npm run android

# 웹 브라우저에서 실행
npm run web
```

## 주요 기능

### 회원가입 플로우

- 계정 생성
- 사용자 정보 입력
- 약관 동의
- 역할 선택 (사용자/동행자)

### 동행자 인증 플로우

- 프로필 사진 등록
- 개인정보 입력 (이름, 주민등록번호, 휴대폰번호, 활동지역)
- 활동 정보 선택 (가능 요일, 동행 유형, 활동 시간)
- 계좌 인증 (은행, 계좌번호, 신분증 사진)
- 약관 동의

### 주요 화면

- 온보딩
- 로그인
- 홈
- 의료 기록
- 알림
- 마이페이지

## 사용된 주요 라이브러리

- **React Native** - 크로스 플랫폼 모바일 앱 개발
- **Expo** - React Native 개발 도구
- **styled-components** - CSS-in-JS 스타일링
- **expo-image-picker** - 이미지 선택 및 업로드
- **@react-native-async-storage/async-storage** - 로컬 데이터 저장
- **react-native-svg** - SVG 아이콘 지원

### Button 컴포넌트

```tsx
import { Button } from "./src/components";

<Button
  title="클릭하세요"
  onPress={() => console.log("버튼 클릭")}
  variant="primary"
  size="large"
/>;
```

### Text 컴포넌트

```tsx
import { Text } from "./src/components";

<Text
  size="lg"
  weight="bold"
  color="#007AFF"
>
  안녕하세요!
</Text>;
```

### Container 컴포넌트

```tsx
import { Container } from "./src/components";

<Container
  padding="lg"
  backgroundColor="#F2F2F7"
  justifyContent="center"
  alignItems="center"
>
  <Text>컨테이너 내용</Text>
</Container>;
```

## 테마 커스터마이징

`src/styles/theme.ts` 파일에서 색상, 간격, 폰트 크기 등을 커스터마이징할 수 있습니다.

```typescript
export const theme = {
  colors: {
    primary: "#007AFF",
    secondary: "#5856D6",
    // ... 다른 색상들
  },
  spacing: {
    xs: 4,
    sm: 8,
    // ... 다른 간격들
  },
  // ... 다른 테마 속성들
};
```

## 지원 플랫폼

- iOS
- Android
