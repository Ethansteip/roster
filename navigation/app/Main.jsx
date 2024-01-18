import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeNavigation from "../home/Home";
import GetStarted from "../../screens/on-boarding/start";

const MainStack = createNativeStackNavigator();

const Main = ({ ...session }) => {
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      <MainStack.Screen name="HomeNavigation">
        {() => <HomeNavigation {...session} />}
      </MainStack.Screen>
      <MainStack.Screen name="GetStarted">{() => <GetStarted {...session} />}</MainStack.Screen>
    </MainStack.Navigator>
  );
};

export default Main;
