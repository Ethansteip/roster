import React from "react";
import { Image } from "expo-image";
import { View } from "react-native";
import { Octicons } from "@expo/vector-icons";

export default function Avatar({ src, size = 24, editable = false }) {
  const EditButton = () => {
    return (
      <View className="rounded-full p-2 border-roster-offwhite border-2 bg-roster-green absolute bottom-0 right-2">
        <Octicons name="pencil" size={16} color="#FAFAFA" />
      </View>
    );
  };
  return (
    <View className={`p-1 rounded-full shadow-sm ${editable ? "" : "bg-roster-blue"}`}>
      <View className="p-[2px] rounded-full bg-roster-offwhite relative">
        <Image
          source={{ uri: src }}
          className="rounded-full"
          style={{ width: size, height: size }}
        />
        {editable && <EditButton />}
      </View>
    </View>
  );
}
