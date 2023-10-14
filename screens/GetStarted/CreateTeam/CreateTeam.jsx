import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState, useEffect } from "react";
import {
  View,
  Alert,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { supabase } from "../../../lib/supabase";

import BackArrow from "../../../icons/BackArrow";
import SelectSport from "../../../components/GettingStarted/SelectSport";

function Screen1({ navigation }) {
  const [availableSports, setAvailableSports] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeSelection, setActiveSelection] = useState();

  const fetchSports = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("sports").select();

    if (error) {
      Alert.alert(error.message);
      setLoading(false);
    }

    if (data) {
      console.log("DATA: ", data);
      setAvailableSports(data);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSports();
  }, []);

  const renderSelectSport = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => setActiveSelection(item.id)}
        className={`flex justify-center items-center border border-gray-300 w-1/3 px-3 py-3 rounded-lg ${
          activeSelection === item.id ? "bg-indigo-700" : "bg-indigo-400"
        }`}>
        <SelectSport name={item.name} />
      </TouchableOpacity>
    );
  };

  function SportSelectionList() {
    return (
      <FlatList
        className="mt-5"
        data={availableSports}
        renderItem={renderSelectSport}
        keyExtractor={(item) => item.id}
        numColumns={3}
      />
    );
  }

  return (
    <SafeAreaView className="flex-1 w-full flex-col justify-between bg-white">
      <View className="flex flex-col space-y-5 p-5">
        <TouchableOpacity onPress={() => navigation.goBack()} className="">
          <BackArrow />
        </TouchableOpacity>
        <View className="flex flex-col">
          <Text className="text-2xl font-bold">Team Information</Text>
        </View>
        <TextInput
          autoCapitalize={"words"}
          placeholder="Team Name"
          className="bg-gray-50 text-xl pb-3 h-14 border-2 border-gray-300 text-gray-900 rounded-lg focus:ring-indigo-900 focus:border-indigo-900 block p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={teamName}
          onChangeText={(text) => setTeamName(text)}
        />
        {/* <View className="flex flex-row">{SelectSportIcons}</View> */}
        {/* <Text>{availableSports.toString()}</Text> */}
        {loading ? <ActivityIndicator size="large" color="#6366f1" /> : <SportSelectionList />}
      </View>
      <View className="flex flex-col justify-end items-center mx-6 pb-5">
        <TouchableOpacity
          onPress={() => navigation.navigate("Screen2")}
          className="p-3 shadow-lg flex justify-center items-center bg-indigo-500 indigo-900 border-black rounded-lg w-full">
          <Text className="text-lg font-bold text-white">Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function Screen2({ navigation }) {
  return (
    <SafeAreaView className="flex-1 w-full flex-col">
      <TouchableOpacity onPress={() => navigation.goBack()} className="p-5 rounded-full">
        <BackArrow />
      </TouchableOpacity>
      <View className="flex h-1/2  flex-col justify-center items-center">
        <Text className="text-3xl font-bold">Create Screen 2 👋🏻</Text>
      </View>
      <View className="flex h-1/2  flex-col justify-end items-center mx-8 pb-24">
        <TouchableOpacity
          onPress={() => navigation.navigate("Screen3")}
          className="p-3 shadow-lg flex justify-center items-center bg-indigo-500 indigo-900 border-black rounded-lg w-full">
          <Text className="text-lg font-bold text-white">Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function Screen3({ navigation }) {
  return (
    <SafeAreaView className="flex-1 w-full flex-col">
      <TouchableOpacity onPress={() => navigation.goBack()} className="p-5 rounded-full">
        <BackArrow />
      </TouchableOpacity>
      <View className="flex h-1/2 flex-col justify-center items-center">
        <Text className="text-3xl font-bold">Create Screen 3 👋🏻</Text>
      </View>
      <View className="flex h-1/2 flex-col justify-end items-center mx-8 pb-24">
        <TouchableOpacity
          onPress={() => navigation.navigate("Screen3")}
          className="p-3 shadow-lg flex justify-center items-center bg-indigo-500 indigo-900 border-black rounded-lg w-full">
          <Text className="text-lg font-bold text-white">Finish</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const Screen = createNativeStackNavigator();

export default function CreateTeam() {
  return (
    <Screen.Navigator screenOptions={{ headerShown: false }} initialRouteName="Screen1">
      <Screen.Screen name="Screen1" component={Screen1} />
      <Screen.Screen name="Screen2" component={Screen2} />
      <Screen.Screen name="Screen3" component={Screen3} />
    </Screen.Navigator>
  );
}
