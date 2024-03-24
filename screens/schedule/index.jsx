import React, { useEffect, useState } from "react";
import { Text, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import Calendar from "../../components/schedule/calendar";
import moment from "moment";
import getEvents from "../../lib/supbase/Schedule";
import EventCard from "./EventCard";

export default function Index({ navigation }) {
  const [selectedDate, setSelectedDate] = useState("");
  const [rawDate, setRawDate] = useState(null);
  const [eventData, setEventData] = useState([]);

  const updateDate = (newDate) => {
    setRawDate(new Date(Date.parse(newDate)));
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
        // console.log("Events: ", events);
        setEventData(events);
      }
    };

    fetchEvents();
  }, []);

  return (
    <SafeAreaView className="flex flex-col h-full relative items-center justify-center w-full">
      <Calendar onValueChange={updateDate} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}>
        {eventData.length ? (
          eventData.map((event, index) => <EventCard key={index} />)
        ) : (
          <Text className="text-md text-gray-400 font-light">No Events Scheduled</Text>
        )}
      </ScrollView>
      <TouchableOpacity onPress={() => navigation.navigate("Show")}>
        <Text>View Page</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="mb-10 mr-5 w-16 h-16 absolute bottom-0 right-0 flex items-center justify-center rounded-full bg-roster-green"
        onPress={() => navigation.navigate("Create", { selectedDate: rawDate })}>
        <Text className="text-white text-3xl font-semibold">+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
