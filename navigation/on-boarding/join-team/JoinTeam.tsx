import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Screen1 from "../../../screens/on-boarding/join-team/Screen1";
import Screen2 from "../../../screens/on-boarding/join-team/Screen2";

const Screen = createNativeStackNavigator();

const JoinTeam = () => {
  return (
    <Screen.Navigator screenOptions={{ headerShown: false }} initialRouteName="Screen1">
      <Screen.Screen name="Screen1" component={Screen1} />
      <Screen.Screen name="Screen2" component={Screen2} />
    </Screen.Navigator>
  );
};

export default JoinTeam;
