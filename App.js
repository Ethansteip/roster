import "react-native-gesture-handler";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";

import Home from "./screens/Home";
import Schedule from "./screens/Schedule";
import Messages from "./screens/Messages";
import Onboarding from "./screens/onboarding/Onboarding";
import SignIn from "./screens/auth/SignIn";
import SignUp from "./screens/auth/SignUp";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Schedule" component={Schedule} />
      <Drawer.Screen name="Messages" component={Messages} />
    </Drawer.Navigator>
  );
}

const Authstack = createNativeStackNavigator();

function Auth() {
  return (
    <Authstack.Navigator screenOptions={{ headerShown: false }}>
      <Authstack.Screen name="SignIn" component={SignIn} />
      <Authstack.Screen name="SignUp" component={SignUp} />
    </Authstack.Navigator>
  );
}

const Appstack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Appstack.Navigator initialRouteName="Onboarding" screenOptions={{ headerShown: false }}>
        <Appstack.Screen name="Onboarding" component={Onboarding} />
        <Appstack.Screen name="MyDrawer" component={MyDrawer} />
        <Appstack.Screen name="Auth" component={Auth} />
      </Appstack.Navigator>
    </NavigationContainer>
  );
}
