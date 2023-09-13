import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { View, Text, Button, TouchableOpacity, SafeAreaView } from "react-native";

function Screen1({ navigation }) {
  return (
    <SafeAreaView className="flex-1  flex-col items-center justify-between">
      <View className="flex  h-1/2 w-full items-center justify-center">
        <Text className="text-3xl font-semibold">Create A Team</Text>
        <Text className="text-lg text-indigo-500">Lets get started</Text>
        <Button
          title="Go to Account"
          onPress={() => navigation.navigate("MyDrawer", { screen: "Account" })}
        />
      </View>
    </SafeAreaView>
  );
}

function Screen2({ navigation }) {
  return (
    <View className="flex-1 items-center justify-center">
      <Text>
        Create Team <Script:module></Script:module>creen 2
      </Text>
    </View>
  );
}

function Screen3({ navigation }) {
  return (
    <View className="flex-1 items-center justify-center">
      <Text>Create Team Screen 3</Text>
    </View>
  );
}

const CreateTeam = createNativeStackNavigator();

export default function Onboarding() {
  return (
    <CreateTeam.Navigator screenOptions={{ headerShown: false }} initialRouteName="Screen1">
      <CreateTeam.Screen name="Screen1" component={Screen1} />
      <CreateTeam.Screen name="Screen2" component={Screen2} />
      <CreateTeam.Screen name="Screen3" component={Screen3} />
    </CreateTeam.Navigator>
  );
}
