import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #f0f2f5; /* Nền xám nhạt */
`;

export const ProfileCard = styled.View`
  background-color: #fff;
  margin: 20px; /* Khoảng cách từ mép màn hình */
  border-radius: 12px;
  padding: 24px;
  align-items: center;
  /* Đổ bóng */
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.05;
  shadow-radius: 8px;
  elevation: 5; /* Cho Android */
`;

export const Avatar = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 60px; /* Để hình tròn */
  margin-bottom: 20px;
  border-width: 3px; /* Viền trắng */
  border-color: #fff;
`;

export const NameText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
`;

export const InfoText = styled.Text`
  font-size: 15px;
  color: #666;
  margin-bottom: 4px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const InfoTitle = styled.Text``
export const InfoValue = styled.Text`font-weight: bold; color: #333;`;

export const InfoSection = styled.View`
  width: 100%;
  margin-bottom: 24px;
`;

export const ButtonSection = styled.View`
  width: 100%;
`;