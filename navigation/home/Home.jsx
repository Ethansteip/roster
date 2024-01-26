import React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerToggleButton,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import Home from "../../screens/home/Home";
import AccountNavigation from "../account/AccountNavigation";
import Schedule from "../../screens/schedule/Schedule";
import Messages from "../../screens/chat/Messages";

import { supabase } from "../../lib/supbase/supabase";

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Sign Out" onPress={() => supabase.auth.signOut()} />
    </DrawerContentScrollView>
  );
};

export const HomeNavigation = ({ ...session }) => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerPosition: "right",
        headerLeft: false,
        headerRight: () => <DrawerToggleButton />,
        headerShown: false,
      }}
      initialParamsdrawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Schedule" component={Schedule} />
      <Drawer.Screen name="Messages" component={Messages} />
      <Drawer.Screen name="Account" component={AccountNavigation} initialParams={{ ...session }} />
    </Drawer.Navigator>
  );
};

export default HomeNavigation;
