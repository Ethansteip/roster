import React from "react";
import { View, Text, TouchableOpacity, SafeAreaView, ImageBackground } from "react-native";

const GetStarted = ({ navigation }) => {
  //console.log("Session: ", session);
  console.log("Navigation: ", navigation);
  return (
    <SafeAreaView className="flex-1 flex-col justify-end bg-roster-offwhite">
      <View className="flex-1 items-center justify-center bg-roster-gray">
        <ImageBackground
          source={require("roster/assets/general/placeholder.png")}
          resizeMode="contain"
          style={{ width: 250, height: 275 }}
        />
      </View>
      <View className="flex flex-col p-8 space-y-4 bg-roster-offwhite h-[60%] justify-between">
        <View className="w-full flex flex-col">
          <Text className="text-2xl font-bold text-roster-gray text-center">
            Welcome To Roster 👋🏻 🏀
          </Text>
          <Text className=" text-gray-500 text-center">Just a few more steps to get you setup</Text>
        </View>
        <View className="flex flex-col space-y-3 justify-center items-center">
          <TouchableOpacity
            onPress={() => navigation.navigate("JoinTeam")}
            className="flex w-full items-center justify-center p-3 bg-roster-gray rounded-lg">
            <Text className="text-lg font-bold text-roster-offwhite">Join a team</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex w-full items-center justify-center p-3 bg-roster-gray rounded-lg"
            onPress={() => navigation.navigate("CreateTeam")}>
            <Text className="text-lg font-bold text-roster-offwhite">Create a team</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Text className="text-lg text-gray">Skip</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default GetStarted;
