import React from "react";
import { View, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const Wins = ({ wins }) => {
  return (
    <View className="mt-1 flex flex-row space-x-1 p-2 rounded-full bg-yellow-500 items-center">
      <FontAwesome5 name="trophy" size={14} color="#ca8a04" />
      {/* <View className="flex flex-row justify-end items-end">
        <Text className="text-yellow-600 font-black">W</Text>
        <Text className="text-yellow-600 text-xs font-black">s</Text>
      </View> */}
      <Text className="text-roster-offwhite font-bold">{wins}</Text>
    </View>
  );
};

export default Wins;
