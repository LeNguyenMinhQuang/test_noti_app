const localAvatars = {
  default: require("../assets/images/avatar/default.png"),
  // Thêm các ảnh khác nếu có
};

export const getLocalAvatarImage = (imageName: string | null | undefined) => {
  return localAvatars.default;
};
