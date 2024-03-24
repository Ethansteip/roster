import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Index from "../../screens/schedule/index";
import CreateModal from "../../screens/schedule/create";

const ScheduleStack = createNativeStackNavigator();

export default function ScheduleNavigation({ route }) {
  const { ...session } = route.params;
  return (
    <ScheduleStack.Navigator screenOptions={{ headerShown: false }}>
      <ScheduleStack.Group>
        <ScheduleStack.Screen name="Index" component={Index} initialParams={{ session: session }} />
      </ScheduleStack.Group>
      <ScheduleStack.Group screenOptions={{ presentation: "modal" }}>
        <ScheduleStack.Screen name="Create" component={CreateModal} />
      </ScheduleStack.Group>
    </ScheduleStack.Navigator>
  );
}
