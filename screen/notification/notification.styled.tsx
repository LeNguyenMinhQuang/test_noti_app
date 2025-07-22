import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #f0f2f5; /* Nền xám nhạt */
  margin-top: 40px;
`;

export const NotiCard = styled.View<{type?: string, viewed?: number}>`
  background-color: ${(props:any) => props.viewed === 1 ? "#e1e1e1" : "#fff"};
  margin-bottom: 20px; /* Khoảng cách từ mép màn hình */
  margin-inline: 20px;
  border-radius: 12px;
  padding: 24px;
  align-items: center;
  /* Đổ bóng */
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.05;
  shadow-radius: 8px;
  elevation: 5; /* Cho Android */

  border-right-width: 8px;
  border-right-style: solid;
  border-right-color: ${(props:any) => props.type === "bg-warning" ? "#FFF9BD" : "#FFD6BA"};
`

export const NotiTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
  text-align: left;
  width: 100%;
`;

export const NotiContent = styled.Text<{type:string}>`
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
  width: 100%;
`;

export const NotiDate = styled.Text`
  font-size: 10px;
  color: #999;
  text-align: left;
  width: 100%;
`;