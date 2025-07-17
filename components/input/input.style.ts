import { TextInput } from "react-native";
import styled from "styled-components/native";

interface IProps {
  width?: string;
}

export const StyledInput = styled(TextInput)<IProps>`
  line-height: 40px;
  width: ${(props: any) => props.width || "260px"};
  border-radius: 20px;
  margin-bottom: 16px;
  padding-inline: 20px;
  border: 1px solid #648ddc;
`;
