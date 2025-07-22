import { TextInput } from "react-native";
import styled from "styled-components/native";

interface IProps {
  width?: string;
}

export const StyledInput = styled(TextInput)<IProps>`
  font-size: 16px;
  line-height: 48px;
  width: ${(props: any) => props.width || "260px"};
  border-radius: 12px;
  margin-bottom: 16px;
  padding-inline: 20px;
  border: 1px solid gray;

  &:focus {
    font-size: 16px;
  }

  &::placeholder {
    color: #999; /* Đổi màu chữ placeholder thành xám nhạt */
    font-style: italic; /* Đổi kiểu chữ thành nghiêng */
    font-size: 14px; /* Đổi cỡ chữ */
    opacity: 1; /* Đảm bảo placeholder không bị mờ (mặc định trình duyệt có thể làm mờ) */
  }
`;
