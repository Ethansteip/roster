import React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerToggleButton,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import Home from "../../../screens/home/Home";
import Schedule from "../../../screens/schedule/Schedule";
import Messages from "../../../screens/chat/Messages";
import Account from "../../../screens/account/Account";
import { supabase } from "../../../lib/supbase/supabase";

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Sign Out" onPress={() => supabase.auth.signOut()} />
    </DrawerContentScrollView>
  );
};

export const MainScreen = ({ ...session }) => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerPosition: "right",
        headerLeft: false,
        headerRight: () => <DrawerToggleButton />,
      }}
      initialParamsdrawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Schedule" component={Schedule} />
      <Drawer.Screen name="Messages" component={Messages} />
      <Drawer.Screen name="Account">{() => <Account {...session} />}</Drawer.Screen>
    </Drawer.Navigator>
  );
};

export default MainScreen;
