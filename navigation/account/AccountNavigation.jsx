import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Account from "../../screens/account/Account";
import Profile from "../../screens/account/Profile";

const AccountStack = createNativeStackNavigator();

const AccountNavigation = ({ ...session }) => {
  return (
    <AccountStack.Navigator screenOptions={{ headerShown: false }}>
      <AccountStack.Screen name="Account">{() => <Account {...session} />}</AccountStack.Screen>
      <AccountStack.Screen name="Profile">{() => <Profile {...session} />}</AccountStack.Screen>
    </AccountStack.Navigator>
  );
};

export default AccountNavigation;
