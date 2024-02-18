import React from "react";
import { View } from "react-native";
import Date from "./date";

const Week = ({ dates, onSelectDate, selected }) => {
  return (
    <View className="flex flex-row w-screen justify-evenly items-center bg-green-300">
      {dates.map((date, index) => (
        <View key={index} className="w-auto items-center">
          <Date date={date} onSelectDate={onSelectDate} selected={selected} />
        </View>
      ))}
    </View>
  );
};

export default Week;
