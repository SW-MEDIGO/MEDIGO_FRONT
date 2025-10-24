import React from "react";
import styled from "styled-components/native";
import { SafeAreaView, View } from "react-native";
import { Container, Text } from "../components";
import { theme } from "../styles";

const ScreenContainer = styled(SafeAreaView)`
  flex: 1;
  background-color: ${theme.colors.background};
`;

const Scroll = styled.ScrollView`
  flex: 1;
`;

const Card = styled.View`
  background-color: ${theme.colors.background};
  border-radius: ${theme.borderRadius.lg}px;
  padding: ${theme.spacing.lg}px;
  margin: ${theme.spacing.md}px;
  ${"" /* subtle shadow */}
  shadow-color: #000;
  shadow-opacity: 0.08;
  shadow-radius: 8px;
  shadow-offset: 0px 2px;
  elevation: 2;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Avatar = styled.View`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  background-color: ${theme.colors.primary};
  align-items: center;
  justify-content: center;
  margin-right: ${theme.spacing.md}px;
`;

const IconCircle = styled.View`
  width: 36px;
  height: 36px;
  border-radius: 18px;
  background-color: ${theme.colors.background};
  align-items: center;
  justify-content: center;
`;

const Menu = styled.View`
  background-color: ${theme.colors.background};
  border-radius: ${theme.borderRadius.lg}px;
  margin: 0 ${theme.spacing.md}px ${theme.spacing.md}px;
  overflow: hidden;
`;

const Divider = styled.View`
  height: 1px;
  background-color: ${theme.colors.background};
  margin-left: ${theme.spacing.lg}px;
`;

const ItemRow = styled.TouchableOpacity`
  padding: ${theme.spacing.lg}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const RightArrow = () => (
  <View
    style={{
      width: 16,
      height: 16,
      borderRightWidth: 2,
      borderTopWidth: 2,
      transform: [{ rotate: "45deg" }],
      borderColor: theme.colors.text.secondary,
    }}
  />
);

const SmallGap = styled.View`
  width: ${theme.spacing.lg}px;
`;

const QuickActions = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const QuickAction = ({ label }: { label: string }) => (
  <View style={{ alignItems: "center", flex: 1 }}>
    <IconCircle />
    <View style={{ height: theme.spacing.sm }} />
    <Text
      size="sm"
      color={theme.colors.text.secondary}
    >
      {label}
    </Text>
  </View>
);

const MenuItem = ({ title }: { title: string }) => (
  <ItemRow
    activeOpacity={0.7}
    onPress={() => {}}
  >
    <Text size="md">{title}</Text>
    <RightArrow />
  </ItemRow>
);

export const MyPageScreen: React.FC = () => {
  return (
    <ScreenContainer>
      <Scroll>
        <Card>
          <Row>
            <Avatar>
              <Text
                weight="bold"
                color={theme.colors.white}
              >
                장
              </Text>
            </Avatar>
            <View>
              <Text
                size="lg"
                weight="bold"
              >
                장은성
              </Text>
              <Text
                size="sm"
                color={theme.colors.text.secondary}
              >
                마이페이지
              </Text>
            </View>
          </Row>

          <View style={{ height: theme.spacing.xl }} />
          <QuickActions>
            <QuickAction label="가족관리" />
            <SmallGap />
            <QuickAction label="결제수단 관리" />
            <SmallGap />
            <QuickAction label="설정" />
          </QuickActions>
        </Card>

        <Menu>
          <MenuItem title="내 후기" />
          <Divider />
          <MenuItem title="단골 의사" />
          <Divider />
          <MenuItem title="단골 약국" />
        </Menu>

        <Menu>
          <MenuItem title="고객센터" />
          <Divider />
          <MenuItem title="공지사항" />
          <Divider />
          <MenuItem title="자주하는 질문" />
        </Menu>
      </Scroll>
    </ScreenContainer>
  );
};
