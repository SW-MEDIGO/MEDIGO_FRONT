import React, { useMemo, forwardRef } from "react";
import styled from "styled-components/native";
import { TextInput, TextInputProps } from "react-native";
import { theme } from "../styles";

interface InputFieldProps extends Omit<TextInputProps, "style"> {
  label?: string;
  helperText?: string;
  errorText?: string;
  successText?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
  containerStyle?: object;
}

interface InputWrapProps {
  borderColor: string;
}

const Container = styled.View`
  width: 100%;
`;

const Label = styled.Text`
  font-family: ${theme.fonts.primary};
  font-size: ${theme.fontSize.md}px;
  font-weight: ${theme.fontWeight.semibold};
  color: #4a4a4a;
  margin-bottom: 4px;
`;

const InputWrap = styled.View<InputWrapProps>`
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: ${({ borderColor }: InputWrapProps) => borderColor};
  padding-top: 10px;
  padding-bottom: 10px;
`;

const Side = styled.View`
  padding-left: 4px;
  padding-right: 4px;
`;

const StyledTextInput = styled.TextInput`
  flex: 1;
  font-family: ${theme.fonts.primary};
  font-size: ${theme.fontSize.sm}px;
  color: #4a4a4a;
  padding-top: 6px;
  padding-bottom: 6px;
`;

const HelperText = styled.Text`
  font-family: ${theme.fonts.primary};
  margin-top: 6px;
  color: ${theme.colors.text.secondary};
  font-size: ${theme.fontSize.xs}px;
`;

const ErrorText = styled.Text`
  font-family: ${theme.fonts.primary};
  margin-top: 6px;
  color: ${theme.colors.error};
  font-size: ${theme.fontSize.xs}px;
`;

const SuccessText = styled.Text`
  font-family: ${theme.fonts.primary};
  margin-top: 6px;
  color: #7ddb69;
  font-size: ${theme.fontSize.xs}px;
`;

export const InputField = forwardRef<TextInput, InputFieldProps>(
  ({ label, helperText, errorText, successText, left, right, containerStyle, secureTextEntry, ...inputProps }, ref) => {
    const borderColor = useMemo(() => {
      if (errorText) return theme.colors.error;
      if (successText) return "#7DDB69";
      return theme.colors.border;
    }, [errorText, successText]);

    return (
      <Container style={containerStyle}>
        {!!label && <Label>{label}</Label>}

        <InputWrap borderColor={borderColor}>
          {!!left && <Side>{left}</Side>}

          <StyledTextInput
            ref={ref}
            placeholderTextColor="#a2a2a2"
            secureTextEntry={secureTextEntry}
            {...inputProps}
          />

          {!!right && <Side>{right}</Side>}
        </InputWrap>

        {!!errorText ? (
          <ErrorText>{errorText}</ErrorText>
        ) : !!successText ? (
          <SuccessText>{successText}</SuccessText>
        ) : !!helperText ? (
          <HelperText>{helperText}</HelperText>
        ) : null}
      </Container>
    );
  }
);
