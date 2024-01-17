import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";

function OnBoardingScreen1({ navigation }) {
  return (
    <SafeAreaView className="bg-offwhite flex-1 justify-between">
      <View className="flex flex-col space-y-10">
        <View className="flex flex-row justify-between space-x-3 px-5 py-3">
          <View className="w-[30%] h-2 rounded-full bg-green" />
          <View className="w-[30%] h-2 rounded-full bg-green opacity-20" />
          <View className="w-[30%] h-2 rounded-full bg-green opacity-20" />
        </View>
        <View className="px-5">
          <Text className="text-gray-2 text-5xl font-black">Welcome To Roster</Text>
          <Text className="text-gray-2 text-xl font-extralight">
            The Easiest Way To Manage Your Intermural And Beer League Sports
          </Text>
        </View>
      </View>
      <View className="flex flex-col justify-center items-center px-5">
        <TouchableOpacity
          className="bg-gray py-3 w-full flex justify-center items-center rounded-xl"
          onPress={() => navigation.navigate("OnboardingScreen2")}>
          <Text className="font-semibold text-lg text-offwhite">Next</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Auth", { screen: "SignUp" })}>
          <Text className="text-lg text-gray mt-3">Skip</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function OnBoardingScreen2({ navigation }) {
  return (
    <SafeAreaView className="bg-offwhite flex-1 justify-between">
      <View className="flex flex-col space-y-10">
        <View className="flex flex-row justify-between space-x-3 px-5 py-3">
          <View className="w-[30%] h-2 rounded-full bg-green" />
          <View className="w-[30%] h-2 rounded-full bg-green" />
          <View className="w-[30%] h-2 rounded-full bg-green opacity-20" />
        </View>
        <View className="px-5">
          <Text className="text-gray-2 text-5xl font-black">Team Management Made Easy</Text>
          <Text className="text-gray-2 text-xl font-extralight">
            Group chat, scheduling, league fees management - weve got your covered.
          </Text>
        </View>
      </View>
      <View className="flex flex-col justify-center items-center px-5">
        <TouchableOpacity
          className="bg-gray py-3 w-full flex justify-center items-center rounded-xl"
          onPress={() => navigation.navigate("OnboardingScreen3")}>
          <Text className="font-semibold text-lg text-offwhite">Next</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Auth", { screen: "SignUp" })}>
          <Text className="text-lg text-gray mt-3">Skip</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function OnBoardingScreen3({ navigation }) {
  return (
    <SafeAreaView className="bg-offwhite flex-1 justify-between">
      <View className="flex flex-col space-y-10">
        <View className="flex flex-row justify-between space-x-3 px-5 py-3">
          <View className="w-[30%] h-2 rounded-full bg-green" />
          <View className="w-[30%] h-2 rounded-full bg-green" />
          <View className="w-[30%] h-2 rounded-full bg-green" />
        </View>
        <View className="px-5">
          <Text className="text-gray-2 text-5xl font-black">Game On!</Text>
          <Text className="text-gray-2 text-xl font-extralight">
            Well take care of managing the team while you focus on crushing it. See you on the
            court!
          </Text>
        </View>
      </View>
      <View className="flex flex-col justify-center items-center px-5 mb-5">
        <TouchableOpacity
          className="bg-gray py-3 w-full flex justify-center items-center rounded-xl"
          onPress={() => navigation.navigate("SignUp")}>
          <Text className="font-semibold text-lg text-offwhite">Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const Onboard = createNativeStackNavigator();

export default function Onboarding() {
  return (
    <Onboard.Navigator screenOptions={{ headerShown: false }} initialRouteName="OnboardingScreen1">
      <Onboard.Screen name="OnboardingScreen1" component={OnBoardingScreen1} />
      <Onboard.Screen name="OnboardingScreen2" component={OnBoardingScreen2} />
      <Onboard.Screen name="OnboardingScreen3" component={OnBoardingScreen3} />
    </Onboard.Navigator>
  );
}
