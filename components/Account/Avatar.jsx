import React from "react";
import { Image } from "expo-image";
import { View } from "react-native";

export default function Avatar({ src }) {
  return (
    <View className="p-1 rounded-full bg-blue">
      <View className="p-[2px] rounded-full bg-offwhite">
        <Image source={{ uri: src }} className="w-24 h-24 rounded-full" />
      </View>
    </View>
  );
}
