import React from "react";
import { View, Text, Button } from "react-native";
import Card from "../../components/home/WelcomeCard";

export default function Home({ navigation }) {
  return (
    <View className="flex-1 justify-center items-center">
      <Button
        className="bg-green-200 rounded-lg"
        title="Open Drawer"
        onPress={() => navigation.openDrawer()}
      />
      <Text className="text-roster-gray text-xl">Home Screen</Text>
      <Button title="Go to Schedule" onPress={() => navigation.navigate("Schedule")} />
      <Card />
    </View>
  );
}
