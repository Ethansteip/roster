import React, { useState, useRef } from "react";
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function CreateModal({ route, navigation }) {
  const { selectedDate } = route.params;

  const [eventName, setEventName] = useState(null);
  const [notes, setNotes] = useState(null);
  const [date, setDate] = useState(new Date(selectedDate));
  const [startTime, setStartTime] = useState(new Date(selectedDate + " 17:00:00"));
  const [endTime, setEndTime] = useState(new Date(selectedDate + " 18:00:00"));
  const [teamId, setTeamId] = useState(null);
  const [location, setLocation] = useState(null);

  const notesRef = useRef();

  return (
    <SafeAreaView className="flex flex-col h-full content-between">
      {/* Header - cancel and done */}
      <View className="flex flex-row w-full items-center justify-between bg-roster-offwhite border-b border-gray-200 px-3 py-4">
        <TouchableOpacity className="w-1/3" onPress={() => navigation.goBack()}>
          <Text className="text-red-400 text-lg">Cancel</Text>
        </TouchableOpacity>
        <Text className="text-lg font-bold w-1/3">Create Event</Text>
        <View className="w-1/3" />
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
            <DateTimePicker mode="date" display="compact" value={date} />
          </View>
          <View className="flex flex-row justify-between items-center">
            <Text className="text-md ml-1 text-gray-500">Start Time</Text>
            <DateTimePicker mode="time" display="compact" value={startTime} />
          </View>
          <View className="flex flex-row justify-between items-center">
            <Text className="text-md ml-1 text-gray-500">End Time</Text>
            <DateTimePicker mode="time" display="compact" value={endTime} />
          </View>
        </View>
      </ScrollView>
      <View className="m-8 bg-roster-offwhite">
        <TouchableOpacity className="flex items-center justify-center h-14 bg-roster-gray rounded-lg">
          <Text className="text-roster-offwhite text-lg font-bold">Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
