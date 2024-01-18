import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateProfile from "../../../screens/on-boarding/create-profile";
import GetStarted from "../../../screens/on-boarding/start";
import CreateTeam from "../create-team/CreateTeam";
import JoinTeam from "../join-team/JoinTeam";

const Screen = createNativeStackNavigator();

const Start = ({ ...session }) => {
  return (
    <Screen.Navigator screenOptions={{ headerShown: false }}>
      <Screen.Screen name="CreateProfile">{() => <CreateProfile {...session} />}</Screen.Screen>
      <Screen.Screen name="GetStarted" component={GetStarted} />
      <Screen.Screen name="CreateTeam">{() => <CreateTeam {...session} />}</Screen.Screen>
      <Screen.Screen name="JoinTeam">{() => <JoinTeam {...session} />}</Screen.Screen>
    </Screen.Navigator>
  );
};

export default Start;
