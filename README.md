# Medigo - React Native Expo App

React Native Expo 앱을 TypeScript와 styled-components로 개발하기 위한 초기 템플릿입니다.

## 🚀 기술 스택

- **React Native** - 크로스 플랫폼 모바일 앱 개발
- **Expo** - React Native 개발 도구 및 플랫폼
- **TypeScript** - 타입 안전성을 위한 JavaScript 확장
- **Styled Components** - CSS-in-JS 스타일링 라이브러리

## 📁 프로젝트 구조

```
src/
├── components/          # 재사용 가능한 UI 컴포넌트
│   ├── Button.tsx
│   ├── Text.tsx
│   ├── Container.tsx
│   └── index.ts
├── screens/            # 앱의 화면 컴포넌트
│   ├── HomeScreen.tsx
│   └── index.ts
├── styles/             # 스타일 관련 파일
│   ├── theme.ts        # 테마 정의
│   ├── styled.d.ts     # styled-components 타입 정의
│   └── index.ts
├── types/              # TypeScript 타입 정의
└── utils/              # 유틸리티 함수들
```

## 🛠️ 설치 및 실행

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

## 🎨 컴포넌트 사용 예시

### Button 컴포넌트
```tsx
import { Button } from './src/components';

<Button
  title="클릭하세요"
  onPress={() => console.log('버튼 클릭')}
  variant="primary"
  size="large"
/>
```

### Text 컴포넌트
```tsx
import { Text } from './src/components';

<Text size="lg" weight="bold" color="#007AFF">
  안녕하세요!
</Text>
```

### Container 컴포넌트
```tsx
import { Container } from './src/components';

<Container
  padding="lg"
  backgroundColor="#F2F2F7"
  justifyContent="center"
  alignItems="center"
>
  <Text>컨테이너 내용</Text>
</Container>
```

## 🎨 테마 커스터마이징

`src/styles/theme.ts` 파일에서 색상, 간격, 폰트 크기 등을 커스터마이징할 수 있습니다.

```typescript
export const theme = {
  colors: {
    primary: '#007AFF',
    secondary: '#5856D6',
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

## 📱 지원 플랫폼

- iOS
- Android
- Web

## 🔧 개발 도구

- **Expo CLI** - 프로젝트 관리 및 빌드
- **TypeScript** - 타입 체킹
- **ESLint** - 코드 품질 관리 (선택사항)
- **Prettier** - 코드 포맷팅 (선택사항)

## 📄 라이선스

MIT License
