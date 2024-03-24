import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Add from "../../components/icons/general/add";

const EventCard = () => {
  return (
    <View className="flex flex-col w-full rounded-xl">
      <View className="flex p-2 flex-row items-center justify-start">
        <View className="flex flex-row items-center justify-center p-3 bg-red-300">
          <Add fill="black" />
        </View>
      </View>
    </View>
  );
};

export default EventCard;
