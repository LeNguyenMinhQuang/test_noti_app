import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CheckAccess from "./check.access.navigation";
import AuthNavigation from "./auth.navigation";
import MainNavigation from "./main.navigation";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CheckAccess" component={CheckAccess} />
      <Stack.Screen name="Auth" component={AuthNavigation} />
      <Stack.Screen name="Main" component={MainNavigation} />
    </Stack.Navigator>
  );
}
