import "react-native-gesture-handler";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";

import Home from "./screens/Home";
import Schedule from "./screens/Schedule";
import Messages from "./screens/Messages";
//import Onboarding from "./screens/onboarding/Onboarding";
import SignIn from "./screens/auth/SignIn";
import SignUp from "./screens/auth/SignUp";
import Account from "./screens/Account";
import GetStarted from "./screens/GetStarted/GetStarted";

//import { Button } from "react-native-elements";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Sign Out" onPress={() => supabase.auth.signOut()} />
    </DrawerContentScrollView>
  );
}

function MyDrawer({ session }) {
  console.log("DRAWER SESSION: ", session);
  return (
    <Drawer.Navigator initialParamsdrawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Schedule" component={Schedule} />
      <Drawer.Screen name="Messages" component={Messages} />
      <Drawer.Screen name="Account">{() => <Account {...session} />}</Drawer.Screen>
    </Drawer.Navigator>
  );
}

const MainStack = createNativeStackNavigator();

function Main({ session }) {
  return (
    <MainStack.Navigator initialRouteName="GetStarted" screenOptions={{ headerShown: false }}>
      <MainStack.Screen name="GetStarted" component={GetStarted} />
      {/* <MainStack.Screen name="MyDrawer">{() => <MyDrawer {...session} />}</MainStack.Screen> */}
    </MainStack.Navigator>
  );
}

const Authstack = createNativeStackNavigator();

function Auth({ session }) {
  return (
    <Authstack.Navigator screenOptions={{ headerShown: false }}>
      <Authstack.Screen name="SignIn" component={SignIn} />
      <Authstack.Screen name="Account" component={Account} initialParams={session} />
      <Authstack.Screen name="SignUp" component={SignUp} />
    </Authstack.Navigator>
  );
}

//const Appstack = createNativeStackNavigator();

export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    //console.log("SESSION: ", session);

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  return (
    <NavigationContainer>
      {/* <Appstack.Navigator initialRouteName="Onboarding" screenOptions={{ headerShown: false }}>
        <Appstack.Screen name="Onboarding" component={Onboarding} />
        <Appstack.Screen name="MyDrawer" component={MyDrawer} />
        <Appstack.Screen name="Auth" component={Auth} initialParams={session} />
      </Appstack.Navigator> */}
      {session ? <Main session={session} /> : <Auth />}
    </NavigationContainer>
  );
}
