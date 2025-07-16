import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useRef, useState } from "react";
import { View, Text } from "react-native";
import Button from "../components/buttons/Button";
import { useRoute } from "@react-navigation/native";
import { useAuth } from "../context/auth.context";
import { IUser } from "../datatypes/user";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";

export default function HomeScreen() {
  // context
  const { userData }: { userData: IUser } = useAuth();

  return (
    <View className="flex-1 justify-center items-center bg-blue-100 p-4">
      <Text className="text-3xl font-bold text-blue-800 text-center">
        Chào mừng {userData?.name_user} đến với Home!
      </Text>
      <Text className="text-lg mt-2 text-blue-600">
        Department: {userData?.name_department}
      </Text>
      <Button title="Test Thông Báo" onPress={() => {}} />
    </View>
  );
}
