import RootNavigator from "./navigation/root.navigation";
import { AuthProvider } from "./context/auth.context";

import { NavigationContainer } from "@react-navigation/native";

import "./app.css";

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
