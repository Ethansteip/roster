import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUp from "../../screens/auth/sign-up";
import SignIn from "../../screens/auth/sign-in";

const Authstack = createNativeStackNavigator();

const AuthNavigation = ({ session }) => {
  return (
    <Authstack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Authstack.Screen name="Onboarding" component={Onboarding} /> */}
      <Authstack.Screen name="SignIn" component={SignIn} />
      <Authstack.Screen name="SignUp" component={SignUp} />
    </Authstack.Navigator>
  );
};

export default AuthNavigation;
