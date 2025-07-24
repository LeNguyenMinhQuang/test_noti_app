import RootNavigator from "./navigation/root.navigation";
import { AuthProvider, useAuth } from "./context/auth.context";

import { NavigationContainer } from "@react-navigation/native";

import "./app.css";
import { NotiProvider } from "./context/noti.context";
import NotiWrapper from "./context/background.noti.wrapper";
import useAuthToken from "./hooks/useAccessToken";
import usePushNotifications from "./hooks/usePushNotification";
import { useEffect, useRef } from "react";
import * as Notifications from 'expo-notifications';

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
  const {token} = useAuthToken();
  usePushNotifications(token)

  const notificationListener = useRef<Notifications.EventSubscription | null>(null);
  const responseListener = useRef<Notifications.EventSubscription | null>(null);

   useEffect(() => {
    // Lắng nghe khi app ĐANG MỞ
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log('📥 Nhận thông báo khi app đang mở:', notification);

      // Ví dụ: hiển thị popup, badge, hoặc cập nhật UI
    });

    // Lắng nghe khi user ấn vào noti (app đang ngầm hoặc vừa mở từ noti)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('📲 User ấn vào noti:', response);

      const data = response.notification.request.content.data;
      // Ví dụ: điều hướng đến màn hình chi tiết
      if (data.machineId) {
        // Điều hướng tới màn hình máy cụ thể
        // navigation.navigate("MachineDetail", { id: data.machineId });
      }
    });

    return () => {
      notificationListener.current?.remove();
      responseListener.current?.remove();
    };
  }, []);
 
  return (
    <AuthProvider>
      <NotiProvider>
        {/* <NotiWrapper> */}
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        {/* </NotiWrapper> */}
      </NotiProvider>
    </AuthProvider>
  );
}
