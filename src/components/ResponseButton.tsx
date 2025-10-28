import React from "react";
import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";

interface ResponseButtonProps {
  isOnline: boolean;
  children: React.ReactNode;
}

const ButtonContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

const ResponseText = styled.Text`
  text-align: center;
  color: white;
  font-size: 12px;
  color: #fff;
  font-weight: 700;
  font-family: "Apple SD Gothic Neo";
`;

const OfflineButton = styled.View`
  background-color: #4a4a4a;
  padding-top: 4px;
  padding-bottom: 4px;
  width: 160px;
  border-radius: 10px;
`;

export const ResponseButton = ({ isOnline, children }: ResponseButtonProps) => {
  if (isOnline) {
    return (
      <ButtonContainer>
        <LinearGradient
          colors={["#0BC1BF", "#00A6D8"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            borderRadius: 10,
            paddingTop: 4,
            paddingBottom: 4,
            width: 160,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.15,
            shadowRadius: 1,
            elevation: 1,
          }}
        >
          <ResponseText>{children}</ResponseText>
        </LinearGradient>
      </ButtonContainer>
    );
  }

  return (
    <ButtonContainer>
      <OfflineButton
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.15,
          shadowRadius: 1,
          elevation: 1,
        }}
      >
        <ResponseText>{children}</ResponseText>
      </OfflineButton>
    </ButtonContainer>
  );
};
