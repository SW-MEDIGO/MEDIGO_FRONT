import React, { useState } from "react";
import styled from "styled-components/native";
import { SafeAreaView, TouchableOpacity, View, Modal, TextInput, Pressable } from "react-native";
import { Text } from "../components";
import { BackIcon, HeartIcon } from "../components/icons";
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

const PharmacyCard = styled.View`
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg}px;
  padding: 20px;
  margin-bottom: 12px;
  flex-direction: row;
  align-items: center;
`;

const Left = styled.View`
  flex: 1;
`;

const StatusRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 4px;
`;

const StatusDot = styled.View`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  margin-right: ${theme.spacing.xs}px;
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

const IconRight = styled.View`
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

export const PharmacyScreen: React.FC<PharmacyProps> = ({ onBack }) => {
  const [items, setItems] = useState<Pharmacy[]>([
    { id: "1", name: "늘봄약국", info: "영업중 | 19:00에 영업 종료 | 34명 방문" },
    { id: "2", name: "다솜약국", info: "영업중 | 20:00에 영업 종료 | 52명 방문" },
  ]);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
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
      <HeaderWrapper>
        <BackButton onPress={onBack}>
          <BackIcon />
        </BackButton>
        <Text
          size="lg"
          weight="semibold"
          color={theme.colors.text.primary}
        >
          단골 약국
        </Text>
        <View style={{ width: 40 }} />
      </HeaderWrapper>

      <ContentContainer showsVerticalScrollIndicator={false}>
        {items.map(ph => {
          const infoWithoutVisitors = ph.info.replace(/\s*\|\s*\d+명\s*방문/g, "").trim();
          const isClosed = /영업종료/.test(infoWithoutVisitors);
          const isOpen = /영업중/.test(infoWithoutVisitors);
          const statusColor = isClosed
            ? theme.colors.error
            : isOpen
            ? theme.colors.success
            : theme.colors.text.secondary;

          // 종료 시간 추출
          const timeMatch = infoWithoutVisitors.match(/(\d{2}:\d{2})/);
          const closeTime = timeMatch ? timeMatch[1] : null;
          const statusText = isOpen ? "영업중" : isClosed ? "영업종료" : infoWithoutVisitors;

          return (
            <PharmacyCard
              key={ph.id}
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 2,
              }}
            >
              <Left>
                <Text
                  size="lg"
                  weight="bold"
                  color={theme.colors.text.primary}
                >
                  {ph.name}
                </Text>
                {!!infoWithoutVisitors && (
                  <StatusRow>
                    <StatusDot style={{ backgroundColor: statusColor }} />
                    <Text
                      size="sm"
                      color={statusColor}
                    >
                      {statusText}
                    </Text>
                    {closeTime && <Text size="sm">{` | ${closeTime}까지 영업`}</Text>}
                  </StatusRow>
                )}
                <CallRow>
                  <PhoneDot />
                  <Text
                    size="sm"
                    color={theme.colors.text.secondary}
                  >
                    전화로 접수
                  </Text>
                </CallRow>
              </Left>
              <IconRight>
                <Pressable
                  onPress={() => setFavorites(prev => ({ ...prev, [ph.id]: !prev[ph.id] }))}
                  hitSlop={8}
                >
                  <HeartIcon
                    width={28}
                    height={28}
                    fill={favorites[ph.id] ? theme.colors.error : "none"}
                    stroke={favorites[ph.id] ? theme.colors.error : theme.colors.text.primary}
                  />
                </Pressable>
              </IconRight>
            </PharmacyCard>
          );
        })}
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
            <Text weight="semibold">단골 약국 추가</Text>
            <Input
              placeholder="약국명"
              value={name}
              onChangeText={setName}
            />
            <Input
              placeholder="정보 (예: 영업중 | 19:00 종료)"
              value={info}
              onChangeText={setInfo}
            />
            <ModalButtons>
              <ModalBtn onPress={() => setShow(false)}>
                <Text color={theme.colors.text.secondary}>취소</Text>
              </ModalBtn>
              <ModalBtn onPress={addPharmacy}>
                <Text color={theme.colors.primary}>추가</Text>
              </ModalBtn>
            </ModalButtons>
          </ModalCard>
        </View>
      </Modal>
    </Screen>
  );
};

export default PharmacyScreen;
