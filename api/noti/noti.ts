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


export { getNotifications, markAsRead };
