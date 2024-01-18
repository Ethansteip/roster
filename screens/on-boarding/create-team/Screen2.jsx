import React, { useState, useEffect } from "react";
import {
  View,
  Alert,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { supabase } from "../../../lib/supbase/supabase";
import DropDownPicker from "react-native-dropdown-picker";
DropDownPicker.setListMode("MODAL");

import BackArrow from "../../../components/icons/general/BackArrow";
import SelectSport from "../../../components/on-boarding/select-sport";

const Screen2 = ({ route, navigation }) => {
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

    const { data, error } = await supabase
      .from("teams")
      .insert({
        name: teamName,
        country,
        state,
        city,
        sport_id: activeSelection,
        sport: sportName,
        captain_id: user?.id,
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
};

export default Screen2;
