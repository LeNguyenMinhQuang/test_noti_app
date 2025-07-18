import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useRef, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";

import { useRoute } from "@react-navigation/native";
import { useAuth } from "../../context/auth.context";
import { IUser } from "../../datatypes/user";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";
import { ClickedButton } from "../../components/buttons/clicked.button.styled";
import { Hello, HomeView, NotificationCount } from "./home.styled";
import Button from "../../components/buttons/clicked.button";

// Cấu hình thông báo
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true, // thêm dòng này
    shouldShowList: true, // thêm dòng này
  }),
});

export default function HomeScreen() {
  // Hàm gửi thông báo local
  const sendNotification = async () => {
    if (!Device.isDevice) {
      Alert.alert("Chỉ hoạt động trên thiết bị thật");
      return;
    }

    // Đăng ký quyền
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Không có quyền gửi thông báo");
      return;
    }

    // Gửi thông báo local
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "📢 Xin chào!",
        body: "Đây là một thông báo đơn giản.",
        sound: "default",
      },
      trigger: null, // Gửi ngay lập tức
    });
  };

  return (
    <HomeView>
      <Hello>Chào buổi sáng</Hello>
      <NotificationCount>Bạn có 5 thông báo</NotificationCount>
      <Button title="Fake noti" onPress={sendNotification} />
    </HomeView>
  );
}
