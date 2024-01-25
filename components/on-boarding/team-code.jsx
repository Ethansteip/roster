import React from "react";
import { Text, View } from "react-native";

export default function TeamCode({ teamName }) {
  const teamNameSplit = teamName.split("");

  return (
    <View className="w-full flex flex-row h-auto items-center justify-center space-x-2">
      {teamNameSplit.map((digit, index) => {
        return (
          <View
            key={index}
            className="flex items-center justify-center p-3 rounded-lg w-[45px] bg-roster-green">
            <Text className="font-bold text-2xl text-roster-offwhite">{digit}</Text>
          </View>
        );
      })}
    </View>
  );
}
