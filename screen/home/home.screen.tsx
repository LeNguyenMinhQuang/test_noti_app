
import React, { useRef, useState, useEffect } from "react";
import { Alert } from "react-native";

import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Hello, HomeView, NotificationCount } from "./home.styled";
import Button from "../../components/buttons/clicked.button";
import { getNotifications } from "../../api/noti/noti";
import { useNoti } from "../../context/noti.context";


export default function HomeScreen() {
  // store
  const {listNoti} = useNoti();
  const [countNoti, setCountNoti] = useState<number>(0);

  useEffect(() => {
    if(listNoti &&listNoti?.length > 0) {
      // @ts-ignore
        const newNoti = listNoti?.filter((noti:any) => noti.viewed === 0);
        setCountNoti(newNoti.length);    
    }
  },[listNoti])

  return (
    <HomeView>
      <Hello>Chào buổi sáng</Hello>
      <NotificationCount>Bạn có {countNoti} thông báo mới</NotificationCount>
      {/* <Button title="Fake noti" onPress={() => sendNotification("Thông báo mới", "Bạn có một thông báo mới")} /> */}
    </HomeView>
  );
}
