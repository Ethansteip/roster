import React from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";

const Screen2 = ({ navigation, route }) => {
  const { team_name } = route.params[0];
  return (
    <SafeAreaView className="flex-1 w-full flex-col bg-roster-offwhite">
      <View className="flex h-1/2 flex-col justify-center items-center">
        {/* Celebreate icon */}
        <View className="bg-roster-green h-[100px] w-[100px] rounded-full flex items-center justify-center mb-3">
          <View className="bg-roster-gray border-[4px] border-roster-offwhite h-[90px] w-[90px] rounded-full flex items-center justify-center">
            <Text className="text-[40px]">🎉</Text>
          </View>
        </View>
        <Text className="text-3xl font-bold text-center text-roster-green">Success!</Text>
        <Text className=" w-5/6 text-center text-roster-gray3">
          You have officially joined <Text className="font-bold">{team_name}</Text>
        </Text>
        {/* Team Code */}
        <View className="flex flex-col space-y-2 items-center w-full h-auto p-5 bg-roster-offwhite rounded-xl"></View>
      </View>
      <View className="flex h-1/2 flex-col justify-end items-center mx-8 space-y-3 pb-16">
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          className="p-3 flex justify-center items-center bg-roster-gray border-roster-gray rounded-lg w-full">
          <Text className="text-lg font-bold text-roster-offwhite">Finish</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Screen2;
