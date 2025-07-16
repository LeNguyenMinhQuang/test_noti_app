import React, { use, useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { useAuth } from "../context/auth.context";
import { IUser } from "../datatypes/user";
import { getLocalAvatarImage } from "../utils/getImage";
import Button from "../components/buttons/Button";
import { logout } from "../api/api/auth/auth";

export default function ProfileScreen({ navigation }: { navigation: any }) {
  // context
  const { userData }: { userData: IUser } = useAuth();

  // state
  const [avatar, setAvatar] = useState<string | null | undefined>(null);

  // life cycle
  useEffect(() => {
    let image = getLocalAvatarImage(userData?.img_user);
    setAvatar(image);
  }, [userData]);

  // functions
  const handleLogout = async () => {
    await logout();
    navigation.reset({
      index: 0,
      routes: [{ name: "CheckAccess" }],
    });
  };

  return (
    <View className="flex-1 justify-center items-center bg-purple-100">
      <Text className="text-3xl font-bold text-purple-800">Profile</Text>
      <Text className="text-lg mt-2 text-purple-600">
        {userData?.svn_number} - {userData?.name_user}!
      </Text>
      {avatar && (
        <Image
          source={avatar as any}
          style={{ width: 50, height: 50, objectFit: "cover" }}
        />
      )}
      <Text className="text-lg mt-2 text-purple-600">
        Department: {userData?.name_department}!
      </Text>
      <Button title="Đăng xuất" onPress={() => handleLogout()} />
    </View>
  );
}
