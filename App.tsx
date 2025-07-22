import RootNavigator from "./navigation/root.navigation";
import { AuthProvider } from "./context/auth.context";

import { NavigationContainer } from "@react-navigation/native";

import "./app.css";
import { NotiProvider } from "./context/noti.context";

import { registerBackgroundNotificationTask } from './context/background.noti';
import * as Notifications from 'expo-notifications';
import { useEffect } from "react";

// Cấu hình thông báo (như bạn đã làm)
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function App() {
  useEffect(()=>{
    // Đăng ký tác vụ nền khi ứng dụng khởi động
    registerBackgroundNotificationTask();

    // Bạn có thể thêm logic để xử lý khi nhận thông báo (foreground, background, killed state)
    // Ví dụ:
    const subscription = Notifications.addNotificationReceivedListener(notification => {
      console.log('Thông báo đã nhận:', notification);
      // Xử lý thông báo khi ứng dụng đang chạy foreground
    });

    const responseSubscription = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Người dùng tương tác với thông báo:', response);
      // Xử lý khi người dùng nhấn vào thông báo
    });

    return () => {
      Notifications.removeNotificationSubscription(subscription);
      Notifications.removeNotificationSubscription(responseSubscription);
    };
  },[])
  return (
    <AuthProvider>
      <NotiProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </NotiProvider>
    </AuthProvider>
  );
}
