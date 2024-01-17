import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import { useState, useEffect } from "react";
import { supabase } from "./lib/supbase/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SignIn from "./screens/auth/sign-in";
import SignUp from "./screens/auth/sign-up";
import Start from "./screens/on-boarding/start";
import MainScreen from "./navigation/home/drawer/MainScreen";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const MainStack = createNativeStackNavigator();

function Main({ ...session }) {
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      <MainStack.Screen name="MainScreen">{() => <MainScreen {...session} />}</MainStack.Screen>
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
    ``;
    hasLaunched();
  }, []);

  return (
    <Authstack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Authstack.Screen name="Onboarding" component={Onboarding} /> */}
      <Authstack.Screen name="SignIn" component={SignIn} />
      <Authstack.Screen name="SignUp" component={SignUp} />
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
