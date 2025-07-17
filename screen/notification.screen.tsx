import React from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";

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

export default function NotificationScreen() {
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

    // // Lấy push token (tùy chọn)
    // await Notifications.getExpoPushTokenAsync({
    //   projectId: Constants.expoConfig?.extra?.eas?.projectId,
    // });

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
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={sendNotification}>
        <Text style={styles.buttonText}>Gửi Thông Báo</Text>
      </TouchableOpacity>
    </View>
  );
}

// CSS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
