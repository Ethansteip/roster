import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const AccountListItem = ({ title, icon }) => {
  return (
    <View className="flex flex-row items-center w-full justify-between p-3 border-b border-gray-300">
      <View className="flex flex-row items-center space-x-2">
        <Feather name={icon} size={24} color="black" />
        <Text className="font-medium tracking-wider text-black text-lg">{title}</Text>
      </View>
      <Ionicons name="arrow-forward" size={24} color="black" />
    </View>
  );
};

export default AccountListItem;
