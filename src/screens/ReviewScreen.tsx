import React, { useState } from "react";
import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Modal, TextInput, Pressable } from "react-native";
import { Text } from "../components";
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
  background-color: ${theme.colors.surface};
  padding-top: ${theme.spacing.md + 36}px;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${theme.spacing.md}px;
`;

const BackBtn = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
  align-items: center;
  justify-content: center;
`;

const BackArrow = styled.View`
  width: 8px;
  height: 8px;
  border-left-width: 2px;
  border-bottom-width: 2px;
  transform: rotate(45deg);
  border-color: ${theme.colors.black};
`;

const Title = styled(Text)`
  flex: 1;
  text-align: center;
  font-size: ${theme.fontSize.lg}px;
  font-weight: ${theme.fontWeight.semibold};
  margin-right: 24px;
`;

const List = styled.ScrollView`
  flex: 1;
`;

const Card = styled.View`
  background-color: ${theme.colors.background};
  padding: ${theme.spacing.md}px;
  border-bottom-width: 1px;
  border-color: ${theme.colors.surface};
`;

const Row = styled.View`
  flex-direction: row;
`;

const Avatar = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  margin-right: ${theme.spacing.md}px;
`;

const Heart = styled.TouchableOpacity`
  width: 18px;
  height: 18px;
  border-right-width: 2px;
  border-top-width: 2px;
  transform: rotate(45deg);
  border-color: #ff6b9a;
`;

const Fab = styled.TouchableOpacity`
  position: absolute;
  right: ${theme.spacing.lg}px;
  bottom: ${theme.spacing.lg}px;
  width: 56px;
  height: 56px;
  border-radius: 28px;
  background-color: ${theme.colors.primary};
  align-items: center;
  justify-content: center;
  shadow-color: #000;
  shadow-opacity: 0.2;
  shadow-radius: 8px;
  shadow-offset: 0px 2px;
  elevation: 4;
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
      time: "이용시간 | 09:00 - 17:50",
      content: "마음껏 질문도 할 수 있었고 의사도 자세하게 해주셔서 좋았습니다.",
      liked: true,
    },
    {
      id: "2",
      name: "강윤서 동행자",
      time: "이용시간 | 10:00 - 16:50",
      content: "친절하고 제가 요청드린 내용도 빠르게 처리해주셨어요.",
    },
  ]);
  const [show, setShow] = useState(false);
  const [newName, setNewName] = useState("");
  const [newTime, setNewTime] = useState("");
  const [newContent, setNewContent] = useState("");

  const addReview = () => {
    if (!newName || !newContent) return;
    setItems(prev => [
      { id: Date.now().toString(), name: newName, time: newTime || "", content: newContent },
      ...prev,
    ]);
    setShow(false);
    setNewName("");
    setNewTime("");
    setNewContent("");
  };

  return (
    <Screen>
      <Header>
        <BackBtn onPress={onBack}>
          <BackArrow />
        </BackBtn>
        <Title>내 후기</Title>
      </Header>

      <List>
        {items.map(item => (
          <Card key={item.id}>
            <Row>
              <Avatar />
              <View style={{ flex: 1 }}>
                <Text weight="semibold">{item.name}</Text>
                {!!item.time && (
                  <Text size="sm" color={theme.colors.textSecondary}>{item.time}</Text>
                )}
              </View>
              <View style={{ width: 24, alignItems: "center", justifyContent: "center" }}>
                <View style={{ width: 18, height: 18, borderRadius: 9, backgroundColor: item.liked ? "#ff6b9a" : theme.colors.surface }} />
              </View>
            </Row>
            <View style={{ height: theme.spacing.sm }} />
            <Text size="sm">{item.content}</Text>
          </Card>
        ))}
      </List>

      <Fab onPress={() => setShow(true)} activeOpacity={0.85}>
        <FabPlus />
      </Fab>

      <Modal visible={show} transparent animationType="fade" onRequestClose={() => setShow(false)}>
        <View style={{ flex: 1, backgroundColor: "#00000055", justifyContent: "center" }}>
          <ModalCard>
            <Text weight="semibold">후기 작성</Text>
            <Input placeholder="이름 (예: 장은성 동행자)" value={newName} onChangeText={setNewName} />
            <Input placeholder="이용시간 (선택)" value={newTime} onChangeText={setNewTime} />
            <Input placeholder="후기 내용" value={newContent} onChangeText={setNewContent} multiline numberOfLines={4} />
            <ModalButtons>
              <ModalBtn onPress={() => setShow(false)}><Text color={theme.colors.textSecondary}>취소</Text></ModalBtn>
              <ModalBtn onPress={addReview}><Text color={theme.colors.primary}>등록</Text></ModalBtn>
            </ModalButtons>
          </ModalCard>
        </View>
      </Modal>
    </Screen>
  );
};

export default ReviewScreen;
