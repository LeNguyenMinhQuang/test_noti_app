import React, { use, useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { useAuth } from "../context/auth.context";
import { IUser } from "../datatypes/user";
import { getLocalAvatarImage } from "../utils/getImage";
import { logout } from "../api/auth/auth";
import ClickedButton from "../components/buttons/clicked.button";

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
    <View>
      <Text>Profile</Text>
      <Text>
        {userData?.svn_number} - {userData?.name_user}!
      </Text>
      {avatar && (
        <Image
          source={avatar as any}
          style={{ width: 50, height: 50, objectFit: "cover" }}
        />
      )}
      <Text>Department: {userData?.name_department}!</Text>
      <ClickedButton title="Đăng xuất" onPress={() => handleLogout()} />
    </View>
  );
}
