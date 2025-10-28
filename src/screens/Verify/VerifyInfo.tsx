import React, { useState } from "react";
import styled from "styled-components/native";
import { SafeAreaView, TouchableOpacity, ScrollView, View } from "react-native";
import { Text, Button } from "../../components";
import { BackIcon } from "../../components/icons";
import { theme } from "../../styles";

interface VerifyInfoProps {
  onComplete: (data: { availableDays: string[]; companionTypes: string[]; availableTimes: string[] }) => void;
  onBack: () => void;
}

const ScreenContainer = styled(SafeAreaView)`
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

const ContentContainer = styled(ScrollView)`
  flex: 1;
  padding-left: ${theme.spacing.lg}px;
  padding-right: ${theme.spacing.lg}px;
`;

const CardContainer = styled.View`
  background-color: ${theme.colors.white};
  border-radius: 24px;
  padding-top: ${theme.spacing.xl}px;
  padding-bottom: ${theme.spacing.xl}px;
  padding-left: ${theme.spacing.lg}px;
  padding-right: ${theme.spacing.lg}px;
  margin-bottom: ${theme.spacing.lg}px;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.08;
  shadow-radius: 12px;
  elevation: 4;
`;

const SectionTitle = styled.View`
  margin-bottom: ${theme.spacing.lg}px;
`;

const OptionGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${theme.spacing.sm}px;
`;

interface OptionButtonProps {
  selected: boolean;
}

const OptionButton = styled(TouchableOpacity)<OptionButtonProps>`
  width: 30%;
  min-width: 90px;
  height: 52px;
  border-radius: 16px;
  background-color: ${({ selected }: OptionButtonProps) => (selected ? "#4B5858" : "#F8F9FA")};
  border-width: ${({ selected }: OptionButtonProps) => (selected ? 0 : 1)}px;
  border-color: ${({ selected }: OptionButtonProps) => (selected ? "transparent" : "#E9ECEF")};
  align-items: center;
  justify-content: center;
  margin-bottom: ${theme.spacing.sm}px;
`;

const DayCircleButton = styled(TouchableOpacity)<OptionButtonProps>`
  width: 36px;
  height: 36px;
  border-radius: 18px;
  background-color: ${({ selected }: OptionButtonProps) => (selected ? "#4B5858" : "#F8F9FA")};
  border-width: ${({ selected }: OptionButtonProps) => (selected ? 0 : 1)}px;
  border-color: ${({ selected }: OptionButtonProps) => (selected ? "transparent" : "#E9ECEF")};
  align-items: center;
  justify-content: center;
  margin-right: 6px;
  margin-bottom: 0;
`;

const DayGrid = styled.View`
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
`;

const ButtonWrapper = styled.View`
  padding-left: ${theme.spacing.lg}px;
  padding-right: ${theme.spacing.lg}px;
  padding-bottom: ${theme.spacing.xl}px;
  padding-top: ${theme.spacing.md}px;
  background-color: ${theme.colors.background};
`;

const days = ["월", "화", "수", "목", "금", "토", "일"];
const companionTypeOptions = ["병원", "약국", "진료보조", "이동보조"];
const availableTimeOptions = ["오전", "오후", "야간"];

export const VerifyInfo = ({ onComplete, onBack }: VerifyInfoProps) => {
  const [availableDays, setAvailableDays] = useState<string[]>([]);
  const [companionTypes, setCompanionTypes] = useState<string[]>([]);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);

  const toggleDay = (day: string) => {
    setAvailableDays(prev => (prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]));
  };

  const toggleCompanionType = (type: string) => {
    setCompanionTypes(prev => (prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]));
  };

  const toggleTime = (time: string) => {
    setAvailableTimes(prev => (prev.includes(time) ? prev.filter(t => t !== time) : [...prev, time]));
  };

  const handleComplete = () => {
    if (availableDays.length === 0) {
      alert("가능한 요일을 최소 1개 이상 선택해주세요.");
      return;
    }
    if (companionTypes.length === 0) {
      alert("동행 유형을 최소 1개 이상 선택해주세요.");
      return;
    }
    if (availableTimes.length === 0) {
      alert("활동 가능 시간을 최소 1개 이상 선택해주세요.");
      return;
    }

    onComplete({
      availableDays,
      companionTypes,
      availableTimes,
    });
  };

  const isFormValid = availableDays.length > 0 && companionTypes.length > 0 && availableTimes.length > 0;

  return (
    <ScreenContainer>
      <HeaderWrapper>
        <BackButton onPress={onBack}>
          <BackIcon />
        </BackButton>
        <Text
          size="lg"
          weight="semibold"
          color={theme.colors.text.primary}
        >
          활동 정보
        </Text>
        <View style={{ width: 40 }} />
      </HeaderWrapper>

      <ContentContainer showsVerticalScrollIndicator={false}>
        <CardContainer>
          <SectionTitle>
            <Text
              size="lg"
              weight="semibold"
              color={theme.colors.text.primary}
            >
              가능한 요일
            </Text>
          </SectionTitle>
          <DayGrid>
            {days.map(day => (
              <DayCircleButton
                key={day}
                selected={availableDays.includes(day)}
                onPress={() => toggleDay(day)}
                activeOpacity={0.7}
              >
                <Text
                  size="sm"
                  weight="medium"
                  color={availableDays.includes(day) ? theme.colors.white : theme.colors.text.primary}
                >
                  {day}
                </Text>
              </DayCircleButton>
            ))}
          </DayGrid>
        </CardContainer>

        <CardContainer>
          <SectionTitle>
            <Text
              size="lg"
              weight="semibold"
              color={theme.colors.text.primary}
            >
              동행 유형
            </Text>
          </SectionTitle>
          <OptionGrid>
            {companionTypeOptions.map(type => (
              <OptionButton
                key={type}
                selected={companionTypes.includes(type)}
                onPress={() => toggleCompanionType(type)}
                activeOpacity={0.7}
              >
                <Text
                  size="md"
                  weight="medium"
                  color={companionTypes.includes(type) ? theme.colors.white : theme.colors.text.primary}
                >
                  {type}
                </Text>
              </OptionButton>
            ))}
          </OptionGrid>
        </CardContainer>

        <CardContainer>
          <SectionTitle>
            <Text
              size="lg"
              weight="semibold"
              color={theme.colors.text.primary}
            >
              활동 가능 시간
            </Text>
          </SectionTitle>
          <OptionGrid>
            {availableTimeOptions.map(time => (
              <OptionButton
                key={time}
                selected={availableTimes.includes(time)}
                onPress={() => toggleTime(time)}
                activeOpacity={0.7}
              >
                <Text
                  size="md"
                  weight="medium"
                  color={availableTimes.includes(time) ? theme.colors.white : theme.colors.text.primary}
                >
                  {time}
                </Text>
              </OptionButton>
            ))}
          </OptionGrid>
        </CardContainer>
      </ContentContainer>

      <ButtonWrapper>
        <Button
          title="다음"
          onPress={handleComplete}
          disabled={!isFormValid}
        />
      </ButtonWrapper>
    </ScreenContainer>
  );
};
