import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { View, Text, Button, TouchableOpacity, SafeAreaView } from "react-native";
import CreateTeam "./screens/Get-Started/Create-Team/CreateTeam";

import Add from "../../icons/add";
import ArrowRight from "../../icons/arrow-right";

function Main({ navigation }) {
  return (
    <SafeAreaView className="flex-1  flex-col items-center justify-between">
      <View className="flex  h-1/2 w-full items-center justify-center">
        <Text className="text-3xl font-semibold">Welcome to Roster 👋🏻</Text>
        <Text className="text-lg text-indigo-500">Lets get started</Text>
        <Button
          title="Go to Account"
          onPress={() => navigation.navigate("MyDrawer", { screen: "Account" })}
        />
      </View>
      <View className="flex flex-col w-full items-center justify-center px-5 gap-y-2 pb-5">
        <TouchableOpacity className="flex flex-row justify-center space-x-3 p-5 w-full bg-indigo-500 shadow-lg border border-black rounded-lg">
          <Text className="text-lg text-center font-semibold text-white">
            Join an existing team
          </Text>
          <ArrowRight />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("CreateTeam", { screen: "Screen1" })} className="flex flex-row justify-center space-x-3 p-5 w-full bg-indigo-500 shadow-lg border border-black rounded-lg">
          <Text className="text-lg text-center font-semibold text-white">Create a new team</Text>
          <Add />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function GetStarted2({ navigation }) {
  return (
    <View className="flex-1 items-center justify-center">
      <Text>Player onboarding screen 2</Text>
    </View>
  );
}

function GetStarted3({ navigation }) {
  return (
    <View className="flex-1 items-center justify-center">
      <Text>Player onboarding screen 3</Text>
    </View>
  );
}

const GetStarted = createNativeStackNavigator();

export default function Onboarding() {
  return (
    <GetStarted.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="OnboardingScreen1">
      <GetStarted.Screen name="Main" component={Main} />
      <GetStarted.Screen name="CreateTeam" component={CreateTeam} />
    </GetStarted.Navigator>
  );
}
