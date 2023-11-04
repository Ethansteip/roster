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
import AsyncStorage from "@react-native-async-storage/async-storage";

import Home from "./screens/Home";
import Schedule from "./screens/Schedule";
import Messages from "./screens/Messages";
import Onboarding from "./screens/onboarding/Onboarding";
import SignIn from "./screens/auth/SignIn";
import SignUp from "./screens/auth/SignUp";
import Account from "./screens/Account";
import Start from "./screens/GetStarted/Start";

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

function MyDrawer({ ...session }) {
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

function Main({ ...session }) {
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      <MainStack.Screen name="MyDrawer">{() => <MyDrawer {...session} />}</MainStack.Screen>
      <MainStack.Screen name="StartTeam">{() => <Start {...session} />}</MainStack.Screen>
    </MainStack.Navigator>
  );
}

const Authstack = createNativeStackNavigator();

function Auth({ session }) {
  const [showOnboarding, setShowOnboarding] = useState(null);

  const hasLaunched = async () => {
    const value = await AsyncStorage.getItem("alreadyLaunched");
    console.log("Value: ", value);
    if (value === null) {
      await AsyncStorage.setItem("alreadyLaunched", "true");
      setShowOnboarding(true);
    } else {
      setShowOnboarding(false);
    }
  };

  useEffect(() => {
    hasLaunched();
  }, []);

  return (
    <Authstack.Navigator screenOptions={{ headerShown: false }}>
      {showOnboarding ? (
        <>
          <Authstack.Screen name="Onboarding" component={Onboarding} />
          <Authstack.Screen name="SignIn" component={SignIn} />
          <Authstack.Screen name="Account" component={Account} initialParams={session} />
          <Authstack.Screen name="SignUp" component={SignUp} />
        </>
      ) : (
        <>
          <Authstack.Screen name="SignIn" component={SignIn} />
          <Authstack.Screen name="SignUp" component={SignUp} />
          <Authstack.Screen name="Account" component={Account} initialParams={session} />
        </>
      )}
    </Authstack.Navigator>
  );
}

const Appstack = createNativeStackNavigator();

export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  // return <NavigationContainer>{session ? <Main {...session} /> : <Auth />}</NavigationContainer>;
  return (
    <NavigationContainer>
      <Appstack.Navigator headerMode="none" screenOptions={{ headerShown: false }}>
        {session ? (
          <Appstack.Screen name="Main">{() => <Main {...session} />}</Appstack.Screen>
        ) : (
          <Appstack.Screen name="Auth" component={Auth} />
        )}
      </Appstack.Navigator>
    </NavigationContainer>
  );
}
