import { Alert, StatusBar, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { login } from "../../api/auth/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import {
  Container,
  FormContainer,
  HeaderSection,
  HeaderText,
  SubHeaderText,
  SubTitle,
  Title,
} from "./login.styled";
import Input from "../../components/input/input";
import Button from "../../components/buttons/clicked.button";

const LoginScreen = ({ navigation }: { navigation: any }) => {
  // const navigation = useNavigation();
  // state
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  // function
  const handleChangeUserName = (value: string) => {
    setUserName(value);
  };

  const handleChangePassword = (value: string) => {
    setPassword(value);
  };

  const handleLogin = async () => {
    if (!userName || !password) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ tên người dùng và mật khẩu.");
      return;
    }
    setIsLoading(true);

    try {
      const response = await login(userName, password);
      // @ts-ignore
      const accessToken = response.access_token;
      if (accessToken) {
        // Lưu accessToken vào AsyncStorage hoặc Context API
        await AsyncStorage.setItem("access_token", accessToken);
        navigation.reset({
          index: 0,
          routes: [{ name: "CheckAccess" }],
        });
      } else {
        Alert.alert(
          "Lỗi",
          "Đăng nhập không thành công. Vui lòng thử lại. Do Access Token"
        );
      }
    } catch (error) {
      Alert.alert(
        "Lỗi",
        `Đăng nhập không thành công. Vui lòng thử lại. Do Server`
      );
    } finally {
      setIsLoading(false);
      handleChangeUserName("");
      handleChangePassword(""); // Reset input fields after login attempt
    }
  };

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {/* Header Section */}
      <HeaderSection>
        <HeaderText>Sigma</HeaderText>
        <SubHeaderText>Hello, welcome to Sigma!</SubHeaderText>
      </HeaderSection>

      {/* Form Container */}
      <FormContainer>
        <Title>Sign In</Title>
        <SubTitle>Enter your information</SubTitle>

        <Input
          placeholder="Username"
          value={userName}
          onchange={handleChangeUserName}
          width="100%"
        />
        <Input
          placeholder="Password"
          value={password}
          onchange={handleChangePassword}
          width="100%"
          secureTextEntry={true}
        />

        <Button
          width="100%"
          title={`${isLoading ? "Loging in..." : "Login"}`}
          onPress={handleLogin}
          disabled={isLoading}
        />
      </FormContainer>
    </Container>
  );
};

export default LoginScreen;
