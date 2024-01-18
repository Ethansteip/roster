import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import { useState, useEffect } from "react";
import { supabase } from "./lib/supbase/supabase";
import AuthNavigation from "./navigation/auth/Auth";
import Main from "./navigation/app/Main";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

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
          <Appstack.Screen name="Auth" component={AuthNavigation} />
        )}
      </Appstack.Navigator>
    </NavigationContainer>
  );
}
