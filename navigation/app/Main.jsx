import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeNavigation from "../home/Home";
import Start from "../on-boarding/start/Start";

const MainStack = createNativeStackNavigator();

const Main = ({ ...session }) => {
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      <MainStack.Screen name="HomeNavigation">
        {() => <HomeNavigation {...session} />}
      </MainStack.Screen>
      <MainStack.Screen name="Start">{() => <Start {...session} />}</MainStack.Screen>
    </MainStack.Navigator>
  );
};

export default Main;
