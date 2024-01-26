import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "../../screens/account/Profile";
import AccountPage from "../../screens/account/Account";

const AccountStack = createNativeStackNavigator();

const AccountNavigation = ({ route }) => {
  const { ...session } = route.params;
  return (
    <AccountStack.Navigator screenOptions={{ headerShown: false }}>
      <AccountStack.Screen
        name="AccountPage"
        component={AccountPage}
        initialParams={{ session: session }}
      />
      <AccountStack.Screen
        name="Profile"
        component={Profile}
        initialParams={{ session: session }}
      />
    </AccountStack.Navigator>
  );
};

export default AccountNavigation;
