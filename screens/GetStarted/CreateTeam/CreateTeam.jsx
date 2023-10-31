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
import DropDownPicker from "react-native-dropdown-picker";
DropDownPicker.setListMode("MODAL");
import { usStates } from "../../../lib/States";
import { provinces } from "../../../lib/Provinces";

import BackArrow from "../../../icons/BackArrow";
import SelectSport from "../../../components/GettingStarted/SelectSport";

function Screen1({ navigation }) {
  // Team Name
  const [teamName, setTeamName] = useState("");
  const [openCountry, setOpenCountry] = useState(false);
  const [country, setCountry] = useState(null);
  const [countries, setCountries] = useState([
    { label: "United States", value: "US" },
    { label: "Canada", value: "CAN" },
  ]);

  const [openState, setOpenState] = useState(false);
  const [state, setState] = useState(null);
  const [states, setStates] = useState([]);

  const [city, setCity] = useState("");

  const isFilledOut = !teamName || !country || !state || !city ? false : true;

  const setStateOrProvince = () => {
    if (country === "US") {
      setStates(usStates);
    } else {
      setStates(provinces);
    }
  };

  //console.log("US STATES: ", usStates);

  return (
    <SafeAreaView className="flex-1 w-full flex-col bg-offwhite">
      <View className="flex flex-col space-y-5 px-5">
        <TouchableOpacity onPress={() => navigation.goBack()} className="w-10">
          <BackArrow />
        </TouchableOpacity>
        <Text className="text-3xl font-bold text-gray3">Create your team</Text>
      </View>
      <View className="w-full flex-1 flex-col justify-between p-5">
        <View className="flex flex-col space-y-3 mt-5">
          <View className="flex flex-col space-y-2">
            <Text className="text-gray-100 text-lg">
              Team Name<Text className="text-green"> *</Text>
            </Text>
            <TextInput
              placeholder="Team Name"
              className="bg-gray-500 h-12 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue focus:border-opacity-50 focus:border-2 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={teamName}
              onChangeText={(text) => setTeamName(text)}
              autoCapitalize={"words"}
            />
          </View>
          <View className="flex flex-col space-y-2">
            <Text className="text-gray-100 text-lg">
              Country<Text className="text-green"> *</Text>
            </Text>
            <DropDownPicker
              placeholder="Select a country"
              style={{
                backgroundColor: "transparent",
              }}
              placeholderStyle={{
                color: "#adadad",
              }}
              open={openCountry}
              value={country}
              items={countries}
              onChangeValue={setStateOrProvince}
              setOpen={setOpenCountry}
              setValue={setCountry}
              setItems={setCountries}
            />
          </View>
          <View className="flex flex-col space-y-2 -z-10">
            <Text className="text-gray-100 text-lg">
              Province / State<Text className="text-green"> *</Text>
            </Text>
            <DropDownPicker
              placeholder="Select a state / province"
              style={{
                backgroundColor: "transparent",
              }}
              placeholderStyle={{
                color: "#adadad",
              }}
              open={openState}
              value={state}
              items={states}
              setOpen={setOpenState}
              setValue={setState}
              setItems={setStates}
            />
          </View>
          <View className="flex flex-col space-y-2 -z-20">
            <Text className="text-gray-100 text-lg">
              City<Text className="text-green"> *</Text>
            </Text>
            <TextInput
              placeholder="City"
              className="bg-gray-500 h-12 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue focus:border-opacity-50 focus:border-2 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={city}
              onChangeText={(text) => setCity(text)}
              autoCapitalize={"words"}
            />
          </View>
        </View>
        <TouchableOpacity
          disabled={!isFilledOut}
          className={`flex w-full items-center justify-center p-3 rounded-lg ${
            isFilledOut ? "bg-gray" : "bg-[#d1d5db]"
          }`}
          onPress={() => navigation.navigate("Screen2", { teamName, country, state, city })}>
          <Text className="text-lg font-bold text-offwhite">Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function Screen2({ route, navigation }) {
  const { teamName, country, state, city } = route.params;

  const [availableSports, setAvailableSports] = useState([]);
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
      setAvailableSports(data);
      setLoading(false);
    }
  };

  const fetchSelectedSportName = async () => {
    const { data, error } = await supabase
      .from("sports")
      .select("code")
      .match({ id: activeSelection });

    if (error) {
      Alert.alert(error.message);
    } else {
      console.log(data);
      return data[0].code;
    }
  };

  const handleSubmit = async () => {
    const sportName = await fetchSelectedSportName();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    console.log("USER: ", user.identities?.user_id);

    const { data, error } = await supabase
      .from("teams")
      .insert({
        name: teamName,
        country,
        state,
        city,
        sport_id: activeSelection,
        sport: sportName,
        captain_id: user.id,
      })
      .select();

    if (error) {
      Alert.alert(error.message);
    } else {
      navigation.navigate("Screen3", data);
    }
  };

  useEffect(() => {
    fetchSports();
  }, []);

  const renderSelectSport = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => setActiveSelection(item.id)}
        className={`flex justify-center items-center border-4 border-offwhite bg-gray w-[33%] py-3 rounded-lg ${
          activeSelection === item.id ? "border-green" : "bg-indigo-400"
        }`}>
        <SelectSport name={item.name} active={activeSelection === item.id} />
      </TouchableOpacity>
    );
  };

  function SportSelectionList() {
    return (
      <FlatList
        className="mt-5 flex"
        data={availableSports}
        renderItem={renderSelectSport}
        keyExtractor={(item) => item.id}
        numColumns={3}
      />
    );
  }

  return (
    <SafeAreaView className="flex-1 w-full flex-col justify-between bg-offwhite">
      <View className="flex flex-col space-y-5 p-5">
        <TouchableOpacity onPress={() => navigation.goBack()} className="w-10">
          <BackArrow />
        </TouchableOpacity>
        <View className="flex flex-col">
          <Text className="text-3xl font-bold text-gray3">Choose your sport</Text>
        </View>
        {loading ? <ActivityIndicator size="large" color="#6366f1" /> : <SportSelectionList />}
      </View>
      <View className="flex flex-col justify-end items-center mx-6 pb-5">
        <TouchableOpacity
          disabled={!activeSelection}
          onPress={handleSubmit}
          className={`flex w-full items-center justify-center p-3 rounded-lg ${
            activeSelection ? "bg-gray" : "bg-[#d1d5db]"
          }`}>
          <Text className="text-lg font-bold text-offwhite">Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function Screen3({ navigation, route }) {
  console.log("DATA: ", route.params);

  const { name } = route.params[0];
  return (
    <SafeAreaView className="flex-1 w-full flex-col bg-green">
      <TouchableOpacity onPress={() => navigation.goBack()} className="w-10">
        <BackArrow />
      </TouchableOpacity>
      <View className="flex h-1/2 flex-col justify-center items-center">
        <Text className="text-3xl font-bold text-center text-offwhite">Congratulations!</Text>
        <Text className="text-xl mt-3 text-center text-gray">
          You are now setup as team captain of {name}! Share this code your teammates to invite them
          to your roster!
        </Text>
      </View>
      <View className="flex h-1/2 flex-col justify-end items-center mx-8 space-y-3 pb-16">
        <TouchableOpacity className="p-3 flex justify-center items-center bg-offwhite indigo-900 border-black rounded-lg w-full">
          <Text className="text-lg font-bold text-gray">Invite Teammates</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("MyDrawer")}
          className="p-3 flex justify-center items-center bg-gray indigo-900 border-black rounded-lg w-full">
          <Text className="text-lg font-bold text-offwhite">Finish</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const Screen = createNativeStackNavigator();

export default function CreateTeam() {
  //console.log("Session: ", session);
  return (
    <Screen.Navigator screenOptions={{ headerShown: false }} initialRouteName="Screen1">
      <Screen.Screen name="Screen1" component={Screen1} />
      <Screen.Screen name="Screen2" component={Screen2} />
      {/* <Screen.Screen name="Screen2">{() => <Screen2 {...session} />}</Screen.Screen> */}
      <Screen.Screen name="Screen3" component={Screen3} />
    </Screen.Navigator>
  );
}
