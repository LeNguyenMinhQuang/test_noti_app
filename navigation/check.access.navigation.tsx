import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { checkAccess } from "../api/auth/auth";
import { useAuth } from "../context/auth.context";

export default function CheckAccess({ navigation }: { navigation: any }) {
  // context
  const { updateUserData }: { updateUserData: (data: any) => void } = useAuth();
  // life cicle
  useEffect(() => {
    const checkLogin = async () => {
      const access_token = await AsyncStorage.getItem("access_token");
      if (access_token) {
        // @ts-ignore
        const res = await checkAccess();
        if (res) {
          await updateUserData(res);
          navigation.reset({
            index: 0,
            routes: [{ name: "Main" }],
          });
        } else {
          navigation.reset({
            index: 0,
            routes: [{ name: "Auth" }],
          });
        }
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: "Auth" }],
        });
      }
    };

    checkLogin();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
