import { registerBackgroundNotificationTask } from './background.noti';
import * as Notifications from 'expo-notifications';
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { registerExpoPushTokenWithBackend } from "../api/noti/noti";
import { Platform } from "react-native";
import { useAuth } from './auth.context';

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


function NotiWrapper({children}) {
    const {userData} = useAuth();

    useEffect(()=>{
        // Đăng ký tác vụ nền khi ứng dụng khởi động
        registerBackgroundNotificationTask();
        // 2. Đăng ký nhận Push Notifications và gửi token lên backend
        const setupPushNotifications = async () => {
        // Hàm này sẽ xin quyền và lấy Expo Push Token
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Cần cấp quyền thông báo để nhận cập nhật trạng thái dây chuyền!');
            return;
        }

        // Chỉ Android: cấu hình kênh thông báo
        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
            });
        }

        // Lấy Expo Push Token
        const { data: token } = await Notifications.getExpoPushTokenAsync();
        console.log('Got Expo Push Token:', token);

        // Gửi token lên backend thứ hai của bạn
        if (token) {
            try {
            await registerExpoPushTokenWithBackend(userData.id_depart, token);
            console.log('Expo Push Token successfully sent to backend.');
            } catch (error) {
            console.error('Failed to send Expo Push Token to backend:', error);
            }
        }
        };

        setupPushNotifications();

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
        subscription.remove();
        responseSubscription.remove();
        };
    },[])
  return (<>{children}</>)
}

export default NotiWrapper