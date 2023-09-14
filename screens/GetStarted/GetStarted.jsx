import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";

import CreateTeam from "roster/screens/GetStarted/CreateTeam/CreateTeam.jsx";

function GetStarted({ navigation }) {
  return (
    <SafeAreaView className="flex-1 w-full flex-col">
      <View className="flex h-1/2  flex-col justify-center items-center">
        <Text className="text-3xl font-bold">Welcome To Roster 👋🏻 🏀</Text>
        <Text className="text-lg text-gray-500">Just a few more steps to get you setup</Text>
      </View>
      <View className="flex h-1/2 flex-col justify-end items-center space-y-3 mx-8 pb-10">
        <TouchableOpacity className="p-3 shadow-lg flex justify-center items-center bg-indigo-500 border-indigo-900 border rounded-lg w-full">
          <Text className="text-lg font-bold text-white">Join a exitsing team</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("CreateTeam")}
          className="p-3 shadow-lg flex justify-center items-center bg-indigo-500 border border-indigo-900 rounded-lg w-full">
          <Text className="text-lg font-bold text-white">Create a team</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const Screen = createNativeStackNavigator();

export default function Onboarding() {
  return (
    <Screen.Navigator screenOptions={{ headerShown: false }} initialRouteName="OnboardingScreen1">
      <Screen.Screen name="GetStarted" component={GetStarted} />
      <Screen.Screen name="CreateTeam" component={CreateTeam} />
    </Screen.Navigator>
  );
}
