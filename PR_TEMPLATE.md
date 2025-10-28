## 💡 Issue Number

<!-- 관련된 이슈가 있다면 작성해주세요. 없다면 "None" 이라고 작성해주세요.-->

None

## Description

<!-- 변경 사항을 간단하게 작성해주세요. -->

- BottomNavigation 컴포넌트 구현 및 추가
- 네비게이션 아이콘 컴포넌트들 (AlertIcon, DocumentIcon, HomeIcon, ProfileIcon) 생성
- App.tsx에 BottomNavigation 컴포넌트 통합
- 네비게이션 및 메인 화면용 에셋 파일들 추가
- 관련 의존성 패키지 업데이트

## 💬 Comment

<!-- 리뷰어가 알아야 할 추가 정보가 있다면 작성해주세요 -->

- BottomNavigation은 styled-components를 사용하여 구현했습니다
- 네비게이션 아이콘들은 SVG 형태로 assets/navBar/ 폴더에 저장되어 있습니다
- 각 아이콘 컴포넌트는 React.ComponentType<SvgProps> 타입을 사용합니다
- 현재 4개의 탭(홈, 알림, 문서, 프로필)이 구현되어 있습니다
