import RootNavigator from "./navigation/root.navigation";
import { AuthProvider, useAuth } from "./context/auth.context";

import { NavigationContainer } from "@react-navigation/native";

import "./app.css";
import { NotiProvider } from "./context/noti.context";


import NotiWrapper from "./context/background.noti.wrapper";



export default function App() {
 
  return (
    <AuthProvider>
      <NotiProvider>
        <NotiWrapper>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </NotiWrapper>
      </NotiProvider>
    </AuthProvider>
  );
}
