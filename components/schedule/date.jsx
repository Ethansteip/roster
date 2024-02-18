import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import moment from "moment";

const Date = ({ date, onSelectDate, selected }) => {
  /**
   * use moment to compare the date to today
   * if today, show 'Today'
   * if not today, show day of the week e.g 'Mon', 'Tue', 'Wed'
   */
  const day =
    moment(date).format("YYY-MM-DD") === moment().format("YYYY-MM-DD")
      ? "Today"
      : moment(date).format("ddd").charAt(0);
  // get the day number e.g 1, 2, 3, 4, 5, 6, 7
  const dayNumber = moment(date).format("D");
  // get the full date e.g 2021-01-01 - we'll use this to compare the date to the selected date
  const fullDate = moment(date).format("YYYY-MM-DD");
  return (
    <View className="flex flex-col space-y-4 items-center">
      <Text className="text-roster-offwhite font-bold">{day}</Text>
      <TouchableOpacity onPress={() => onSelectDate(fullDate)}>
        <View
          className={`${
            selected === fullDate ? "bg-roster-offwhite" : "bg-none"
          } p-2 rounded-full w-10 h-10 flex items-center justify-center`}>
          <Text
            className={`${selected === fullDate ? "text-roster-gray font-bold" : "text-gray-300"}`}>
            {dayNumber}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Date;
