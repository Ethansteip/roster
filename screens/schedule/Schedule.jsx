import React from "react";
import { useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import BackArrow from "./../../components/icons/general/BackArrow";
import Menu from "../../components/icons/general/menu";
import Calendar from "../../components/schedule/calendar";
import moment from "moment";

export default function ScheduleScreen({ navigation }) {
  const [selectedDate, setSelectedDate] = useState("");

  const updateDate = (newDate) => {
    const date = moment(newDate, "ddd MMM DD YYYY");
    const formattedDate = date.format("ddd MMM DD");
    setSelectedDate(formattedDate);
  };

  return (
    <>
      <SafeAreaView className="bg-roster-gray">
        <View className="flex flex-col w-full p-3">
          {/* Top bar - back button & Date */}
          <View className="flex flex-row w-full items-center">
            <View className="w-1/3 flex-row justify-start">
              <TouchableOpacity className="w-10" onPress={() => navigation.goBack()}>
                <BackArrow colour="#FAFAFA" />
              </TouchableOpacity>
            </View>
            <View className="w-1/3 flex-row justify-center">
              <Text className="text-xl font-semibold text-rostergray text-roster-offwhite">
                {selectedDate ? selectedDate : "Today"}
              </Text>
            </View>
            <View className="w-1/3 flex-row justify-end">
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Menu colour="#FAFAFA" />
              </TouchableOpacity>
            </View>
          </View>
          {/* Dates */}
        </View>
      </SafeAreaView>
      <Calendar onValueChange={updateDate} />
    </>
  );
}
