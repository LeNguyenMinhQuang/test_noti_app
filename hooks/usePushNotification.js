import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import axiosClient from '../api/axiosClient';

export default function usePushNotifications(userAccessToken) {
  const [expoPushToken, setExpoPushToken] = useState('');
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => {
      if (token) {
        setExpoPushToken(token);
        sendTokenToBackend(token, userAccessToken);
      }
    });

    // Lắng nghe noti khi app đang mở
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log('Received notification:', notification);
    });

    // Lắng nghe khi người dùng ấn vào noti
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('User interacted with notification:', response);
      // Navigate đến màn hình chi tiết nếu cần
    });

    return () => {
     notificationListener.current.remove();
     responseListener.current.remove();
    };
  }, []);
}

async function registerForPushNotificationsAsync() {
  if (!Device.isDevice) {
    alert('Chỉ hoạt động trên thiết bị thật');
    return;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    alert('Không được cấp quyền thông báo!');
    return;
  }

  const token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log('Expo Push Token:', token);

  return token;
}

async function sendTokenToBackend(token, accessToken) {
  try {
    await axiosClient.post("url",{expoPushToken: token})
  } catch (error) {
    console.error('Gửi token lên server thất bại:', error);
  }
}
