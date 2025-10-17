# Medigo

## 설치 및 실행

### 1. 의존성 설치

```bash
npm install
```

### 2. 앱 실행

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

<Text size="lg" weight="bold" color="#007AFF">
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
