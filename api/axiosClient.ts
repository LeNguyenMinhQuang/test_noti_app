import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const axiosClient: AxiosInstance = axios.create({
  baseURL: "http://10.10.99.10:8105/api/",
  // baseURL: "http://localhost:5176/api/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  // withCredentials: true,
});

axiosClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const access_token = await AsyncStorage.getItem("access_token");
    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }
    return config;
  },
  function (error: AxiosError) {
    // Do something with request error
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response.data;
  },
  (error: AxiosError) => {
    console.log("error", error);
    return Promise.reject(error.response?.data);
  }
);

export default axiosClient;
