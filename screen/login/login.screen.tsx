import { Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { login } from "../../api/auth/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { LoginTitle, LoginView } from "./login.styled";
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

  useEffect(() => {
    Alert.alert("Test");
  }, []);

  return (
    <LoginView>
      <LoginTitle>Đăng nhập</LoginTitle>
      <Input
        placeholder="Tên người dùng"
        value={userName}
        onchange={(value: string) => handleChangeUserName(value)}
      />
      <Input
        placeholder="Mật khẩu"
        value={password}
        onchange={(value: string) => handleChangePassword(value)}
        secureTextEntry
      />
      <Button
        title={isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
        onPress={handleLogin}
        disabled={isLoading}
      />
    </LoginView>
  );
};

export default LoginScreen;
