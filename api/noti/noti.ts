import axiosClient from "../axiosClient";
import { PATH_GET_NOTIFICATIONS, PATH_MARK_AS_READ } from "./path";

const getNotifications = async () => {
  const res = await axiosClient.get(PATH_GET_NOTIFICATIONS);
  console.log("getNotifications response in api:", res);
  return res;
};

const markAsRead = async (id: number) => {
  const res = await axiosClient.post(`${PATH_MARK_AS_READ}?id=${id}`);
  console.log("markAsRead response in api:", res);
  return res;
};

const registerExpoPushTokenWithBackend = async (id:string, expoPushToken:string) => {
  // const backendUrl = 'YOUR_BACKEND_2_API_URL/api/register-device'; // Endpoint API Backend 2
  // try {
  //   const response = await axiosClient.post(backendUrl,{userId: userId,expoPushToken: expoPushToken});
  //   console.log('Backend registration response:', response);
  //   return response;
  // } catch (error) {
  //   console.error('Error registering Expo Push Token with backend:', error);
  //   throw error;
  // }
  console.log(id,expoPushToken)
};


export { getNotifications, markAsRead, registerExpoPushTokenWithBackend };
