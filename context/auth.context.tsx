import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, use, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const updateUserData = async (data: any) => {
    setUserData(data);
    if (data) {
      await AsyncStorage.setItem("userData", JSON.stringify(data));
    } else {
      await AsyncStorage.removeItem("userData");
    }
  };

  useEffect(() => {
    const loadUserData = async () => {
      setIsLoading(true);
      const storedUserData = await AsyncStorage.getItem("userData");
      if (storedUserData) {
        setUserData(JSON.parse(storedUserData));
      }
      setIsLoading(false);
    };
    loadUserData();
  }, []);

  const contextValue = {
    userData,
    updateUserData,
    isLoading,
  };

  return (
    // @ts-ignore
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    // Đảm bảo hook được gọi bên trong AuthProvider
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
