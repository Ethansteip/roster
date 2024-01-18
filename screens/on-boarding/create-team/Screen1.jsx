import React, { useState } from "react";
import { View, Text, TextInput, SafeAreaView, TouchableOpacity, ScrollView } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
DropDownPicker.setListMode("MODAL");
import { usStates } from "../../../lib/constants/States";
import { provinces } from "../../../lib/constants/Provinces";

import BackArrow from "../../../components/icons/general/BackArrow";

const Screen1 = ({ navigation }) => {
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

  return (
    <SafeAreaView className="flex-1 h-[100%] w-full flex-col bg-offwhite">
      <View className="flex flex-col space-y-5 px-5">
        <TouchableOpacity onPress={() => navigation.goBack()} className="w-10">
          <BackArrow />
        </TouchableOpacity>
        <Text className="text-3xl font-bold text-gray3">Create your team</Text>
      </View>
      <View className="w-full flex-1 flex-col justify-between p-5">
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}>
          <KeyboardAwareScrollView>
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
          </KeyboardAwareScrollView>
        </ScrollView>
        <TouchableOpacity
          disabled={!isFilledOut}
          className={` w-full items-center justify-end p-3 rounded-lg ${
            isFilledOut ? "bg-gray" : "bg-[#d1d5db]"
          }`}
          onPress={() => navigation.navigate("Screen2", { teamName, country, state, city })}>
          <Text className="text-lg font-bold text-offwhite">Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Screen1;
