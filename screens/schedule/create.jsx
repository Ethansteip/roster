import React, { useState, useRef } from "react";
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function CreateModal({ route, navigation }) {
  const { selectedDate } = route.params;

  console.log("SELECTED DATE: ", selectedDate);

  const [eventName, setEventName] = useState(null);
  const [notes, setNotes] = useState(null);
  const [date, setDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [teamId, setTeamId] = useState(null);
  const [location, setLocation] = useState(null);

  const notesRef = useRef();

  return (
    <SafeAreaView className="flex flex-col h-auto">
      {/* Header - cancel and done */}
      <View className="flex flex-row w-full items-center justify-between border-b border-gray-400 px-3 py-4">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text className="text-red-400 text-lg">Cancel</Text>
        </TouchableOpacity>
        <Text className="text-lg font-bold">Create Event</Text>
        <TouchableOpacity>
          <Text className="font-semibold text-lg text-gray-400">Done</Text>
        </TouchableOpacity>
      </View>
      {/* Create Form */}
      <ScrollView className="flex flex-col w-full h-auto bg-gray-200 px-3 py-5">
        <View className="space-y-3">
          <TextInput
            className="bg-white px-3 py-4 rounded-lg placeholder-gray-200 text-black"
            placeholder="Event Name"
            value={eventName}
            onChangeText={(text) => setEventName(text)}
            autoCapitalize="sentences"
            keyboardType="default"
            returnKeyType="next"
            onSubmitEditing={() => {
              notesRef.current.focus();
            }}
          />
          <TextInput
            className="bg-white px-3 py-4 rounded-lg placeholder-gray-200 text-black"
            placeholder="Notes"
            value={notes}
            onChangeText={(text) => setNotes(text)}
            autoCapitalize="sentences"
            keyboardType="default"
            returnKeyType="next"
            ref={notesRef}
            onSubmitEditing={() => {
              notesRef.current.focus();
            }}
          />
          <View className="flex flex-row justify-between items-center">
            <Text className="text-md ml-1 text-gray-500">Event Date</Text>
            <DateTimePicker mode="date" display="compact" value={date || new Date()} />
          </View>
          {/* <View className="flex flex-row justify-between items-center">
            <Text className="text-md ml-1 text-gray-500">Start Time</Text>
            <DateTimePicker mode="time" display="compact" value={date || new Date()} />
          </View>
          <View className="flex flex-row justify-between items-center">
            <Text className="text-md ml-1 text-gray-500">End Time</Text>
            <DateTimePicker mode="time" display="compact" value={date || new Date()} />
          </View> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
