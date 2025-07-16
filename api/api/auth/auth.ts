import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosClient from "../../axiosClient";
import { PATH_CHECK_ACCESS, PATH_LOGIN } from "./path";

const login = async (NameUser: string, PassWord: string) => {
  const res = await axiosClient.post(PATH_LOGIN, { NameUser, PassWord });
  console.log("login response in api:", res);
  return res;
};

const checkAccess = async () => {
  const res = await axiosClient.get(PATH_CHECK_ACCESS);
  return res;
};

const logout = async () => {
  await AsyncStorage.removeItem("access_token");
  await AsyncStorage.removeItem("userData");
};

export { login, checkAccess, logout };
