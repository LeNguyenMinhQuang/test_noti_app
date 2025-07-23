import React, {useEffect, useState} from "react";
import { ButtonView, Container, NotiCard, NotiContent, NotiDate, NotiTitle } from "./notification.styled";
import { ScrollView, StatusBar, Text } from "react-native";
import { useNoti } from "../../context/noti.context";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import { getNotifications, markAsRead } from "../../api/noti/noti";
import Button from "../../components/buttons/clicked.button";




export default function NotificationScreen() {
  // store
  const {listNoti, updateListNoti} = useNoti();
  const [notis, setNotis] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false)


  // // useEffect
  const getAllNotifications = async () => {
        setIsLoading(true);
        const res = await getNotifications();
        if (res){
          updateListNoti(res.data);
          setNotis(res.data);
        } 
        setIsLoading(false);
  }
  
  useEffect(() => {
    setNotis(listNoti);
  },[])

  // useEffect(() => {
  //   console.log("Mount")
  //   return ()=>{
  //     console.log("Unmount")
  //   }
  // },[])

  // function
  const showTime = (time: string) => {
    dayjs.extend(relativeTime);
    dayjs.locale('en'); // Thiết lập ngôn ngữ tiếng Việt
    const date = dayjs(time);
    return date.fromNow(); // Trả về thời gian tương đối
  }

  const Seen = async (id: number) => {
    const res = await markAsRead(id);
    // console.log(id)
  }



  return <Container>
      <StatusBar barStyle="dark-content" backgroundColor="#f0f2f5" />
      <ScrollView>
        {!isLoading && notis.map((noti: any) => (
        <NotiCard key={noti.id}  type={noti.type_message} viewed={noti.viewed}>
          <NotiTitle>{noti.content.split("] ")[0]+"]"}</NotiTitle>
          <NotiContent>{noti.content.split("] ")[1]}</NotiContent>
          <NotiDate>{showTime(noti.create_at)}</NotiDate>
          {noti.viewed == 0 && <Button title="Đánh dấu đã đọc" onPress={() => Seen(noti.id)} width="50%"/>}
        </NotiCard>
      ))}
        <ButtonView>
          <Button title="Refresh" onPress={()=>getAllNotifications()} disabled={isLoading} width="100%"/>
        </ButtonView>
      </ScrollView>
    </Container>;
}

