import React from "react";
import { View, Text, Button } from "react-native";

export default function Home({ navigation }) {
  return (
    <View>
      <Text className="text-green-500 text-3xl">Home Screen</Text>
      <Button title="Go to Schedule" onPress={() => navigation.navigate("Schedule")} />
    </View>
  );
}
