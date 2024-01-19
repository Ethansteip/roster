import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Screen1 from "../../../screens/on-boarding/create-team/Screen1";
import Screen2 from "../../../screens/on-boarding/create-team/Screen2";
import Screen3 from "../../../screens/on-boarding/create-team/Screen3";

const Screen = createNativeStackNavigator();

export default function CreateTeam() {
  return (
    <Screen.Navigator screenOptions={{ headerShown: false }} initialRouteName="Screen1">
      <Screen.Screen name="Screen1" component={Screen1} />
      <Screen.Screen name="Screen2" component={Screen2} />
      <Screen.Screen name="Screen3" component={Screen3} />
    </Screen.Navigator>
  );
}
