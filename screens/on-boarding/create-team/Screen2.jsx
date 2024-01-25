import React, { useState, useEffect } from "react";
import { View, Alert, Text, SafeAreaView, TouchableOpacity, FlatList } from "react-native";
import { supabase } from "../../../lib/supbase/supabase";
import DropDownPicker from "react-native-dropdown-picker";
DropDownPicker.setListMode("MODAL");

import BackArrow from "../../../components/icons/general/BackArrow";
import SelectSport from "../../../components/on-boarding/select-sport";
import Loading from "../../../components/icons/general/loading";

const Screen2 = ({ route, navigation }) => {
  const { teamName, country, state, city } = route.params;

  const [availableSports, setAvailableSports] = useState([]);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
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
    setLoadingSubmit(true);
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
      setLoadingSubmit(false);
      return Alert.alert(error.message);
    } else {
      setLoadingSubmit(false);
      navigation.navigate("Screen3", data);
      return;
    }
  };

  useEffect(() => {
    fetchSports();
  }, []);

  const renderSelectSport = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => setActiveSelection(item.id)}
        className={`flex justify-center items-center border-4 border-roster-offwhite bg-roster-gray w-[33%] py-3 rounded-xl ${
          activeSelection === item.id ? "border-roster-green" : "bg-roster-gray"
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
          <Text className="text-3xl font-bold text-roster-gray">Choose your sport</Text>
        </View>
        {loading ? (
          <View className="flex flex-col items-center justify-center h-3/4 w-full">
            <Loading dotColor="#363D4F" />
          </View>
        ) : (
          <SportSelectionList />
        )}
      </View>
      <View className="flex flex-col justify-end items-center mx-6 pb-5">
        <TouchableOpacity
          disabled={!activeSelection}
          onPress={handleSubmit}
          className={`w-full flex items-center justify-center h-14 rounded-lg ${
            activeSelection ? "bg-roster-gray" : "bg-[#d1d5db]"
          }`}>
          {loadingSubmit ? (
            <Loading dotColor="#FAFAFA" />
          ) : (
            <Text className="text-lg font-bold text-roster-offwhite">Next</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Screen2;
