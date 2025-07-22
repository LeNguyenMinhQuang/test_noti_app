import React, {useEffect} from "react";
import { Container, NotiCard, NotiContent, NotiDate, NotiTitle } from "./notification.styled";
import { ScrollView, StatusBar, Text } from "react-native";
import { useNoti } from "../../context/noti.context";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';




export default function NotificationScreen() {
  // store
  const {listNoti} = useNoti();

  // useEffect
  useEffect(() => {
    console.log("List Noti:", listNoti);
  },[])

  // function
  const showTime = (time: string) => {
    dayjs.extend(relativeTime);
    dayjs.locale('en'); // Thiết lập ngôn ngữ tiếng Việt
    const date = dayjs(time);
    return date.fromNow(); // Trả về thời gian tương đối
  }

  const markAsRead = async (id: number) => {
    const res = await markAsRead(id);
  }



  return <Container>
      <StatusBar barStyle="dark-content" backgroundColor="#f0f2f5" />
      <ScrollView>
        {listNoti.map((noti: any) => (
        <NotiCard key={noti.id}  type={noti.type_message} viewed={noti.viewed} onPress={() => markAsRead(noti.id)}>
          <NotiTitle>{noti.content.split("] ")[0]+"]"}</NotiTitle>
          <NotiContent>{noti.content.split("] ")[1]}</NotiContent>
          <NotiDate>{showTime(noti.create_at)}</NotiDate>
        </NotiCard>
      ))}
      </ScrollView>
    </Container>;
}

