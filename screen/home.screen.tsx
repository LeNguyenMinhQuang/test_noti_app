import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useRef, useState } from "react";
import { View, Text } from "react-native";

import { useRoute } from "@react-navigation/native";
import { useAuth } from "../context/auth.context";
import { IUser } from "../datatypes/user";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";
import { ClickedButton } from "../components/buttons/clicked.button.styled";

export default function HomeScreen() {
  // context
  const { userData }: { userData: IUser } = useAuth();

  return (
    <View>
      <Text>Chào mừng {userData?.name_user} đến với Home!</Text>
      <Text>Department: {userData?.name_department}</Text>
      <ClickedButton title="Test Thông Báo" onPress={() => {}} />
    </View>
  );
}
