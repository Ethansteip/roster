import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "../../screens/account/Profile";
import Settings from "../../screens/account/Settings";
import Teams from "../../screens/account/Teams";
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
      <AccountStack.Screen
        name="Settings"
        component={Settings}
        initialParams={{ session: session }}
      />
      <AccountStack.Screen name="Teams" component={Teams} initialParams={{ session: session }} />
    </AccountStack.Navigator>
  );
};

export default AccountNavigation;
