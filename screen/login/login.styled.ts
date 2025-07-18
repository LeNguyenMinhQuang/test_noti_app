import { StatusBar } from "react-native";
import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #000; /* Màu nền đen cho phần trên */
  padding-top: ${StatusBar.currentHeight
    ? StatusBar.currentHeight + "px"
    : "0px"}; /* Đảm bảo nội dung không bị che bởi status bar */
`;

export const HeaderSection = styled.View`
  flex: 0.4; /* Chiếm khoảng 40% chiều cao */
  justify-content: center;
  align-items: center;
  background-color: #333; /* Màu xám đậm để giả lập hình nền */
  /* Bạn có thể thêm ImageBackground ở đây nếu muốn dùng ảnh thật */
`;

export const HeaderText = styled.Text`
  font-size: 32px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 8px;
`;

export const SubHeaderText = styled.Text`
  font-size: 16px;
  color: #ccc;
`;

export const FormContainer = styled.View`
  flex: 0.6; /* Chiếm khoảng 60% chiều cao */
  background-color: #fff;
  border-top-left-radius: 30px; /* Bo tròn góc trên trái */
  border-top-right-radius: 30px; /* Bo tròn góc trên phải */
  padding: 60px 24px;
  position: absolute; /* Đặt chồng lên HeaderSection một chút */
  top: 35%; /* Điều chỉnh để phần bo tròn khớp với ảnh */
  left: 0;
  right: 0;
  bottom: 0;
`;

export const Title = styled.Text`
  font-size: 32px;
  font-weight: bold;
  color: #222;
  margin-bottom: 12px;
`;

export const SubTitle = styled.Text`
  font-size: 16px;
  color: #666;
  margin-bottom: 24px;
`;








