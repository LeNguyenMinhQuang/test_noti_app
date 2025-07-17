import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { StyledInput } from "./input.style";

interface IProps {
  value?: string;
  onchange?: (value: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  width?: string;
}

const Input = ({
  value,
  onchange,
  placeholder,
  secureTextEntry,
  width,
}: IProps) => {
  return (
    <StyledInput
      value={value}
      placeholder={placeholder}
      onChangeText={(value: string) => onchange && onchange(value)}
      autoCapitalize="none"
      secureTextEntry={secureTextEntry}
      width={width}
    />
  );
};

export default Input;

const styles = StyleSheet.create({});
