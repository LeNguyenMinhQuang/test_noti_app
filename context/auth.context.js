import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";



// Tạo context với default value
const AuthContext = createContext({
  userData: null,
  updateUserData: async () => {},
  isLoading: false,
});

export const AuthProvider= ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const updateUserData = async (data) => {
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
      try {
        const storedUserData = await AsyncStorage.getItem("userData");
        if (storedUserData) {
          setUserData(JSON.parse(storedUserData));
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadUserData();
  }, []);

  const contextValue = {
    userData,
    updateUserData,
    isLoading,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};