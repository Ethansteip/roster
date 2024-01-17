import React from "react";
import { View, Text, Button } from "react-native";

export default function ScheduleScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text className={"text-green-500"}>Details Screen</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
    </View>
  );
}
