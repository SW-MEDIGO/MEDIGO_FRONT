import React, { useState } from "react";
import styled from "styled-components/native";
import { SafeAreaView, TouchableOpacity, View, Modal, TextInput, Pressable } from "react-native";
import { Text } from "../components";
import { BackIcon, HeartIcon, UserIcon } from "../components/icons";
import { theme } from "../styles";

interface ReviewItem {
  id: string;
  name: string;
  time: string;
  content: string;
  liked?: boolean;
}

interface ReviewProps {
  onBack?: () => void;
}

const Screen = styled(SafeAreaView)`
  flex: 1;
  background-color: ${theme.colors.background};
`;

const HeaderWrapper = styled.View`
  padding-left: ${theme.spacing.lg}px;
  padding-right: ${theme.spacing.lg}px;
  padding-top: ${theme.spacing.xl}px;
  padding-bottom: ${theme.spacing.md}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const BackButton = styled(TouchableOpacity)`
  padding-top: ${theme.spacing.sm}px;
  padding-bottom: ${theme.spacing.sm}px;
  padding-left: ${theme.spacing.sm}px;
  padding-right: ${theme.spacing.sm}px;
`;

const ContentContainer = styled.ScrollView`
  flex: 1;
  padding-left: ${theme.spacing.lg}px;
  padding-right: ${theme.spacing.lg}px;
`;

const ReviewCard = styled.View`
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg}px;
  padding: 20px;
  margin-bottom: 12px;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${theme.spacing.sm}px;
`;

const Avatar = styled.View`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  background-color: ${theme.colors.surface};
  align-items: center;
  justify-content: center;
  margin-right: ${theme.spacing.lg}px;
`;

const ContentLeft = styled.View`
  flex: 1;
`;

const HeartContainer = styled.View`
  width: 28px;
  height: 28px;
  align-items: center;
  justify-content: center;
`;

const Fab = styled.TouchableOpacity`
  position: absolute;
  right: ${theme.spacing.lg}px;
  bottom: ${theme.spacing.lg}px;
  width: 56px;
  height: 56px;
  border-radius: 28px;
  background-color: #34c7b5;
  align-items: center;
  justify-content: center;
`;

const FabPlus = () => (
  <View style={{ width: 20, height: 20 }}>
    <View style={{ position: "absolute", left: 9, top: 2, width: 2, height: 16, backgroundColor: "white" }} />
    <View style={{ position: "absolute", left: 2, top: 9, width: 16, height: 2, backgroundColor: "white" }} />
  </View>
);

const ModalCard = styled.View`
  background-color: ${theme.colors.background};
  margin: ${theme.spacing.lg}px;
  padding: ${theme.spacing.lg}px;
  border-radius: ${theme.borderRadius.md}px;
`;

const Input = styled(TextInput)`
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.sm}px;
  padding: ${theme.spacing.md}px;
  margin-top: ${theme.spacing.sm}px;
`;

const ModalButtons = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  margin-top: ${theme.spacing.md}px;
`;

const ModalBtn = styled(Pressable)`
  padding: ${theme.spacing.sm}px ${theme.spacing.md}px;
`;

export const ReviewScreen: React.FC<ReviewProps> = ({ onBack }) => {
  const [items, setItems] = useState<ReviewItem[]>([
    {
      id: "1",
      name: "장은성 동행자",
      time: "이용시간 | 09:40 - 11:20",
      content: "마음껏 질문도 할 수 있었고, 친절하셔서 좋았습니다.",
      liked: true,
    },
    {
      id: "2",
      name: "강윤서 동행자",
      time: "이용시간 | 14:00 - 15:50",
      content: "친절하고 제가 요청드린 내용도 빠르게 처리해주셨어요.",
    },
  ]);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({
    "1": true,
  });
  const [show, setShow] = useState(false);
  const [newName, setNewName] = useState("");
  const [newTime, setNewTime] = useState("");
  const [newContent, setNewContent] = useState("");

  const addReview = () => {
    if (!newName || !newContent) return;
    setItems(prev => [{ id: Date.now().toString(), name: newName, time: newTime || "", content: newContent }, ...prev]);
    setShow(false);
    setNewName("");
    setNewTime("");
    setNewContent("");
  };

  return (
    <Screen>
      <HeaderWrapper>
        <BackButton onPress={onBack}>
          <BackIcon />
        </BackButton>
        <Text
          size="lg"
          weight="semibold"
          color={theme.colors.text.primary}
        >
          내 후기
        </Text>
        <View style={{ width: 40 }} />
      </HeaderWrapper>

      <ContentContainer showsVerticalScrollIndicator={false}>
        {items.map(item => (
          <ReviewCard
            key={item.id}
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 2,
            }}
          >
            <Row>
              <Avatar>
                <UserIcon
                  width={28}
                  height={28}
                  fill={theme.colors.text.secondary}
                />
              </Avatar>
              <ContentLeft>
                <Text
                  size="md"
                  weight="bold"
                  color={theme.colors.text.primary}
                >
                  {item.name}
                </Text>
                {!!item.time && (
                  <Text
                    size="sm"
                    color={theme.colors.text.secondary}
                  >
                    {item.time}
                  </Text>
                )}
              </ContentLeft>
              <HeartContainer>
                <Pressable
                  onPress={() => setFavorites(prev => ({ ...prev, [item.id]: !prev[item.id] }))}
                  hitSlop={8}
                >
                  <HeartIcon
                    width={28}
                    height={28}
                    fill={favorites[item.id] ? theme.colors.error : "none"}
                    stroke={favorites[item.id] ? theme.colors.error : theme.colors.text.primary}
                  />
                </Pressable>
              </HeartContainer>
            </Row>
            <Text
              size="sm"
              color={theme.colors.text.primary}
            >
              {item.content}
            </Text>
          </ReviewCard>
        ))}
      </ContentContainer>

      <Fab
        onPress={() => setShow(true)}
        activeOpacity={0.85}
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 8,
          elevation: 4,
        }}
      >
        <FabPlus />
      </Fab>

      <Modal
        visible={show}
        transparent
        animationType="fade"
        onRequestClose={() => setShow(false)}
      >
        <View style={{ flex: 1, backgroundColor: "#00000055", justifyContent: "center" }}>
          <ModalCard>
            <Text weight="semibold">후기 작성</Text>
            <Input
              placeholder="이름 (예: 장은성 동행자)"
              value={newName}
              onChangeText={setNewName}
            />
            <Input
              placeholder="이용시간 (선택)"
              value={newTime}
              onChangeText={setNewTime}
            />
            <Input
              placeholder="후기 내용"
              value={newContent}
              onChangeText={setNewContent}
              multiline
              numberOfLines={4}
            />
            <ModalButtons>
              <ModalBtn onPress={() => setShow(false)}>
                <Text color={theme.colors.text.secondary}>취소</Text>
              </ModalBtn>
              <ModalBtn onPress={addReview}>
                <Text color={theme.colors.primary}>등록</Text>
              </ModalBtn>
            </ModalButtons>
          </ModalCard>
        </View>
      </Modal>
    </Screen>
  );
};

export default ReviewScreen;
