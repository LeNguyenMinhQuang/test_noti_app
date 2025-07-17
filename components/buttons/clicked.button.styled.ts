import { Pressable, Text } from "react-native";
import styled from "styled-components/native";

interface IProps {
  isLoading?: boolean;
  disable?: boolean;
  width?: string;
}

export const ClickedButton = styled(Pressable)<IProps>`
  background-color: #648ddc;
  color: #fdfdfd;
  border-radius: 20px;
  height: 42px;
  width: ${(props: any) => props.width || "260px"};
  padding: 8px 12px;
  opacity: ${(props: any) => (props.disable ? 0.5 : 1)};
  align-items: center;
  justify-content: center;
`;

export const Title = styled(Text)`
  color: #fdfdfd;
`;
