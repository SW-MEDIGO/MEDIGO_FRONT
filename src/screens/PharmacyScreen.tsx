import React, { useState } from "react";
import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Modal, TextInput, Pressable } from "react-native";
import { Text } from "../components";
import { theme } from "../styles";

interface Pharmacy {
  id: string;
  name: string;
  info: string;
}

interface PharmacyProps {
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
  border-bottom-width: 1px;
  border-color: ${theme.colors.surface};
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

const Row = styled.View`
  background-color: ${theme.colors.background};
  padding: ${theme.spacing.md}px;
  border-bottom-width: 1px;
  border-color: ${theme.colors.surface};
  flex-direction: row;
  align-items: center;
`;

const Left = styled.View`
  flex: 1;
`;

const Green = styled(Text)`
  color: ${theme.colors.success};
  font-size: ${theme.fontSize.sm}px;
`;

const CallRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${theme.spacing.xs}px;
`;

const PhoneDot = styled.View`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: ${theme.colors.black};
  margin-right: ${theme.spacing.xs}px;
`;

const Heart = styled.View`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: #ff6b9a;
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

export const PharmacyScreen: React.FC<PharmacyProps> = ({ onBack }) => {
  const [items, setItems] = useState<Pharmacy[]>([
    { id: "1", name: "늘봄약국", info: "영업중 | 19:00에 영업 종료 | 34명 방문" },
    { id: "2", name: "다솜약국", info: "영업중 | 20:00에 영업 종료 | 52명 방문" },
  ]);
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [info, setInfo] = useState("");

  const addPharmacy = () => {
    if (!name) return;
    setItems(prev => [{ id: Date.now().toString(), name, info }, ...prev]);
    setShow(false);
    setName("");
    setInfo("");
  };

  return (
    <Screen>
      <Header>
        <BackBtn onPress={onBack}>
          <BackArrow />
        </BackBtn>
        <Title>단골 약국</Title>
      </Header>

      <List>
        {items.map(ph => (
          <Row key={ph.id}>
            <Left>
              <Text weight="semibold">{ph.name}</Text>
              {!!ph.info && <Green>{ph.info}</Green>}
              <CallRow>
                <PhoneDot />
                <Text size="sm">전화로 접수</Text>
              </CallRow>
            </Left>
            <Heart />
          </Row>
        ))}
      </List>

      <Fab onPress={() => setShow(true)} activeOpacity={0.85}>
        <FabPlus />
      </Fab>

      <Modal visible={show} transparent animationType="fade" onRequestClose={() => setShow(false)}>
        <View style={{ flex: 1, backgroundColor: "#00000055", justifyContent: "center" }}>
          <ModalCard>
            <Text weight="semibold">단골 약국 추가</Text>
            <Input placeholder="약국명" value={name} onChangeText={setName} />
            <Input placeholder="정보 (예: 영업중 | 19:00 종료)" value={info} onChangeText={setInfo} />
            <ModalButtons>
              <ModalBtn onPress={() => setShow(false)}><Text color={theme.colors.textSecondary}>취소</Text></ModalBtn>
              <ModalBtn onPress={addPharmacy}><Text color={theme.colors.primary}>추가</Text></ModalBtn>
            </ModalButtons>
          </ModalCard>
        </View>
      </Modal>
    </Screen>
  );
};

export default PharmacyScreen;
