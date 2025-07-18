import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { FontAwesome } from "@expo/vector-icons";
import HomeScreen from "../screen/home/home.screen";
import ProfileScreen from "../screen/profile/profile.screen";
import NotificationScreen from "../screen/notification/notification.screen";

const Tab = createBottomTabNavigator();

export default function MainApp() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "home";
          if (route.name === "Notifications") iconName = "bell";
          if (route.name === "Profile") iconName = "user";
          // @ts-ignore
          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#648ddc",
        tabBarInactiveTintColor: "pink",
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIconStyle: {
          marginTop: 5,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Notifications" component={NotificationScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
