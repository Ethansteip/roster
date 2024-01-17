import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { View, Text, TouchableOpacity, SafeAreaView, ImageBackground } from "react-native";

import CreateProfile from "./create-profile";
import CreateTeam from "./create-team";
import JoinTeam from "./join-team";

function Start({ navigation }) {
  //console.log("Session: ", session);
  return (
    <SafeAreaView className="flex-1 flex-col justify-end bg-offwhite">
      {/* Sign-in Image */}
      <View className="flex-1 items-center justify-center bg-gray3">
        <ImageBackground
          source={require("roster/assets/general/placeholder.png")}
          resizeMode="contain"
          style={{ width: 250, height: 275 }}
        />
      </View>
      {/* Sign-in Form */}
      <View className="flex flex-col p-8 space-y-4 bg-white h-[60%] justify-between">
        <View className="w-full flex flex-col">
          <Text className="text-2xl font-bold text-gray3 text-center">Welcome To Roster 👋🏻 🏀</Text>
          <Text className=" text-gray-500 text-center">Just a few more steps to get you setup</Text>
        </View>
        <View className="flex flex-col space-y-3 justify-center items-center">
          <TouchableOpacity
            onPress={() => navigation.navigate("JoinTeam")}
            className="flex w-full items-center justify-center p-3 bg-gray rounded-lg">
            <Text className="text-lg font-bold text-offwhite">Join a team</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex w-full items-center justify-center p-3 bg-gray rounded-lg"
            onPress={() => navigation.navigate("CreateTeam")}>
            <Text className="text-lg font-bold text-offwhite">Create a team</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("MyDrawer")}>
            <Text className="text-lg text-gray">Skip</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const Screen = createNativeStackNavigator();

export default function Onboarding({ ...session }) {
  return (
    <Screen.Navigator screenOptions={{ headerShown: false }} initialRouteName="OnboardingScreen1">
      <Screen.Screen name="CreateProfile">{() => <CreateProfile {...session} />}</Screen.Screen>
      <Screen.Screen name="GetStarted" component={Start} />
      <Screen.Screen name="CreateTeam">{() => <CreateTeam {...session} />}</Screen.Screen>
      <Screen.Screen name="JoinTeam" component={JoinTeam} />
    </Screen.Navigator>
  );
}
