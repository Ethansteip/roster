import React from "react";
import { View } from "react-native";

const Avatar = ({ width, height, src }) => {
  return <View className={`${width} ${height} rounded-full bg-blue`}></View>;
};

export default Avatar;
