import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { getNotifications } from "../api/noti/noti";


// Tạo context với default value
const NotiContext = createContext({
  listNoti: [],
  updateListNoti: async (data) => {},
  isLoading: false,
});

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true, // thêm dòng này
    shouldShowList: true, // thêm dòng này
  }),
});

export const NotiProvider= ({ children }) => {
  const [listNoti, setListNoti] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const updateListNoti = async (data) => {
    setListNoti(data);
  };

  const contextValue = {
    listNoti,
    updateListNoti,
    isLoading,
  };

  // Hàm gửi thông báo local
  const sendNotification = async (title, body) => {
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
        title: title || "Thông báo mới",
        body: body || "Bạn có một thông báo mới",
        sound: "default",
      },
      trigger: null, // Gửi ngay lập tức
    });
  };

  const getAllNotifications = async () => {
      const res = await getNotifications();
      if (res){
        updateListNoti(res.data);
        const newNoti = res.data.filter((noti) => noti.viewed === 0);
        if (newNoti.length > 0){
          newNoti.forEach((noti) => {
          sendNotification(`${noti.content.split("] ")[0]+"]"}`, `${noti.content.split("] ")[1]}`);
        });
        }
      }
    }

  useEffect(() => {
    getAllNotifications();
    let timerId = setInterval(() => {
      getAllNotifications();
    }, 1000*60); // Lấy dữ liệu mỗi 10p

    return () => clearInterval(timerId);
  },[])

  return (
    <NotiContext.Provider value={contextValue}>
      {children}
    </NotiContext.Provider>
  );
};



export const useNoti = () => {
  const context = useContext(NotiContext);
  return context;
};