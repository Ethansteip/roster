import React, { useEffect, useState } from "react";
import { Text, SafeAreaView, ScrollView, Button, TouchableOpacity } from "react-native";
import Calendar from "../../components/schedule/calendar";
import moment from "moment";
import getEvents from "../../lib/supbase/Schedule";
import EventCard from "./EventCard";

export default function Index({ navigation }) {
  const [selectedDate, setSelectedDate] = useState("");
  const [eventData, setEventData] = useState([]);

  const updateDate = (newDate) => {
    const date = moment(newDate, "ddd MMM DD YYYY");
    const formattedDate = date.format("ddd MMM DD");
    setSelectedDate(formattedDate);
    navigation.setOptions({ headerTitle: formattedDate });
  };

  useEffect(() => {
    updateDate(new Date());
    const fetchEvents = async () => {
      const events = await getEvents(960);
      if (events) {
        console.log("Events: ", events);
        setEventData(events);
      }
    };

    fetchEvents();
  }, []);

  return (
    <>
      <Calendar onValueChange={updateDate} />
      <SafeAreaView className="flex flex-col items-center justify-center bg-green-200 w-full">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flex: 0,
          }}>
          {eventData.map((event, index) => (
            <EventCard key={index} />
          ))}
          <Text>ETHAN ETHAN</Text>
        </ScrollView>
        <TouchableOpacity
          className="w-16 h-16 flex items-center justify-center rounded-full bg-roster-green"
          onPress={() => navigation.navigate("Create")}>
          <Text className="text-white text-3xl font-semibold">+</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}
