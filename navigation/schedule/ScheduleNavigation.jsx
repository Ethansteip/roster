import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Index from "../../screens/schedule/index";
import CreateModal from "../../screens/schedule/create";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import BackArrow from "../../components/icons/general/BackArrow";
import { TouchableOpacity } from "react-native";
import Show from "../../screens/schedule/show";

const ScheduleStack = createNativeStackNavigator();

export default function ScheduleNavigation({ route }) {
  const { ...session } = route.params;
  const navigation = useNavigation();

  return (
    <ScheduleStack.Navigator
      screenOptions={{
        drawerPosition: "right",
        headerRight: () => <DrawerToggleButton tintColor="#FAFAFA" />,
        headerShown: true,
        headerTitleStyle: {
          fontSize: 22,
          paddingBottom: 5,
        },
        headerStyle: {
          backgroundColor: "#363D4F",
          shadowColor: "transparent",
        },
        headerLeft: () => {
          navigation.canGoBack() ? (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <BackArrow />
            </TouchableOpacity>
          ) : (
            false
          );
        },
        headerTintColor: "#FAFAFA",
      }}>
      <ScheduleStack.Group>
        <ScheduleStack.Screen name="Index" component={Index} initialParams={{ session: session }} />
        <ScheduleStack.Screen name="Show" component={Show} initialParams={{ session: session }} />
      </ScheduleStack.Group>
      <ScheduleStack.Group screenOptions={{ presentation: "modal", headerShown: false }}>
        <ScheduleStack.Screen
          name="Create"
          component={CreateModal}
          initialParams={{ session: session }}
        />
      </ScheduleStack.Group>
    </ScheduleStack.Navigator>
  );
}
