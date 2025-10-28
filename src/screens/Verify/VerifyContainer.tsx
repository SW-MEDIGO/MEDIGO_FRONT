import React, { useState } from "react";
import { View, Text } from "react-native";
import { VerifyManager } from "./VerifyManager";
import { VerifyInfo } from "./VerifyInfo";
import { VerifyAccount } from "./VerifyAccount";
import { VerifyPolicy } from "./VerifyPolicy";

interface VerifyContainerProps {
  onComplete: () => void;
  onBack: () => void;
}

type VerifyStep = "manager" | "info" | "account" | "policy";

export const VerifyContainer = ({ onComplete, onBack }: VerifyContainerProps) => {
  const [currentStep, setCurrentStep] = useState<VerifyStep>("manager");
  const [managerData, setManagerData] = useState<any>(null);
  const [infoData, setInfoData] = useState<any>(null);
  const [accountData, setAccountData] = useState<any>(null);

  const handleManagerComplete = (data: any) => {
    setManagerData(data);
    setCurrentStep("info");
  };

  const handleInfoComplete = (data: any) => {
    setInfoData(data);
    setCurrentStep("account");
  };

  const handleAccountComplete = (data: any) => {
    setAccountData(data);
    setCurrentStep("policy");
  };

  const handlePolicyComplete = (data: any) => {
    // 모든 데이터를 수집했으므로 완료 처리
    const allData = {
      manager: managerData,
      info: infoData,
      account: accountData,
      policy: data,
    };
    onComplete();
  };

  const handleBack = () => {
    switch (currentStep) {
      case "manager":
        onBack();
        break;
      case "info":
        setCurrentStep("manager");
        break;
      case "account":
        setCurrentStep("info");
        break;
      case "policy":
        setCurrentStep("account");
        break;
    }
  };

  switch (currentStep) {
    case "manager":
      return (
        <VerifyManager
          onComplete={handleManagerComplete}
          onBack={handleBack}
        />
      );
    case "info":
      return (
        <VerifyInfo
          onComplete={handleInfoComplete}
          onBack={handleBack}
        />
      );
    case "account":
      return (
        <VerifyAccount
          onComplete={handleAccountComplete}
          onBack={handleBack}
        />
      );
    case "policy":
      return (
        <VerifyPolicy
          onComplete={handlePolicyComplete}
          onBack={handleBack}
        />
      );
    default:
      return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text>알 수 없는 단계입니다.</Text>
        </View>
      );
  }
};
