import React, { use, useEffect, useState } from "react";
import { View, Text, Image, StatusBar } from "react-native";
import { IUser } from "../../datatypes/user";
import { useAuth } from "../../context/auth.context";
import { getLocalAvatarImage } from "../../utils/getImage";
import { logout } from "../../api/auth/auth";
import { ClickedButton } from "../../components/buttons/clicked.button.styled";
import { Avatar, ButtonSection, Container, InfoSection, InfoText, InfoTitle, InfoValue, NameText, ProfileCard } from "./profile.styled";
import Button from "../../components/buttons/clicked.button";

export default function ProfileScreen({ navigation }: { navigation: any }) {
  // context
  // @ts-ignore
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
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="#f0f2f5" />
      
      <ProfileCard>
        <Avatar source={avatar} />
        {/* Thay URL avatar bằng hình ảnh bạn muốn, đây chỉ là placeholder */}
        
        <NameText>{userData.name_user}</NameText>

        <InfoSection>
          <InfoText><InfoTitle>Mã nhân viên:</InfoTitle> <InfoValue>{userData.svn_number}</InfoValue></InfoText>
          <InfoText><InfoTitle>Bộ phận:</InfoTitle> <InfoValue>{userData.name_department}</InfoValue></InfoText>
        </InfoSection>

        <ButtonSection>
          <Button width="100%" title="Logout" onPress={handleLogout} />
        </ButtonSection>
      </ProfileCard>
    </Container>
  );
}
