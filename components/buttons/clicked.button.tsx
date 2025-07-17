import React from "react";
import { Pressable, Text } from "react-native";
import { ClickedButton, Title } from "./clicked.button.styled";

interface IProps {
  isLoading?: boolean;
  title?: string;
  onPress?: () => void;
  disabled?: boolean;
  width?: string;
}

function Button({ title, onPress, disabled, width }: IProps) {
  return (
    <ClickedButton onPress={onPress} disabled={disabled} width={width}>
      <Title>{title}</Title>
    </ClickedButton>
  );
}

export default Button;
