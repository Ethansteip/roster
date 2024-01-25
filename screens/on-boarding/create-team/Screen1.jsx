import React, { useState } from "react";
import { View, Text, TextInput, SafeAreaView, TouchableOpacity, ScrollView } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
DropDownPicker.setListMode("MODAL");
import { usStates } from "../../../lib/constants/States";
import { provinces } from "../../../lib/constants/Provinces";

import BackArrow from "../../../components/icons/general/BackArrow";
import styles from "../../../styles/forms";

const Screen1 = ({ navigation }) => {
  const [teamName, setTeamName] = useState("");
  const [openCountry, setOpenCountry] = useState(false);
  const [country, setCountry] = useState(null);
  const [countries, setCountries] = useState([
    { label: "🇺🇸 United States", value: "US" },
    { label: "🇨🇦 Canada", value: "CAN" },
  ]);

  const [openState, setOpenState] = useState(false);
  const [state, setState] = useState(null);
  const [states, setStates] = useState([]);

  const [city, setCity] = useState("");
  const [cityFocused, setCityFocused] = useState(false);

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
                <View
                  style={[
                    styles.input.inputContainer,
                    { borderColor: "black", backgroundColor: "#FAFAFA" },
                  ]}>
                  <TextInput
                    style={styles.input.input}
                    placeholder="Team Name"
                    value={teamName}
                    onChangeText={(text) => setTeamName(text)}
                    autoCapitalize={"words"}
                    returnKeyType="done"
                  />
                </View>
              </View>
              <View className="flex flex-col space-y-2">
                <Text className="text-gray-100 text-lg">
                  Country<Text className="text-green"> *</Text>
                </Text>
                <DropDownPicker
                  placeholder="Select a country"
                  style={
                    (styles.input.inputContainer,
                    { backgroundColor: "transparent", padding: 25, paddingVertical: 14 },
                    country ? { borderColor: "black" } : { borderColor: "lightgray" })
                  }
                  placeholderStyle={{
                    color: "#adadad",
                    backgroundColor: "#FAFAFA",
                    paddingHorizontal: 10,
                    paddingVertical: 14,
                    fontSize: 16,
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
                  style={
                    (styles.input.inputContainer,
                    { backgroundColor: "transparent" },
                    state ? { borderColor: "black" } : { borderColor: "lightgray" })
                  }
                  placeholderStyle={{
                    color: "#adadad",
                    backgroundColor: "#FAFAFA",
                    paddingHorizontal: 10,
                    paddingVertical: 14,
                    fontSize: 16,
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
                <View
                  style={[
                    styles.input.inputContainer,
                    { backgroundColor: "#FAFAFA" },
                    cityFocused || city ? { borderColor: "black" } : { borderColor: "lightgray" },
                  ]}>
                  <TextInput
                    style={styles.input.input}
                    onFocus={() => setCityFocused(true)}
                    onBlur={() => setCityFocused(false)}
                    placeholder="City"
                    value={city}
                    onChangeText={(text) => setCity(text)}
                    autoCapitalize={"words"}
                    returnKeyType="done"
                  />
                </View>
              </View>
            </View>
          </KeyboardAwareScrollView>
        </ScrollView>
        <TouchableOpacity
          disabled={!isFilledOut}
          className={`flex items-center justify-center h-14 rounded-lg ${
            isFilledOut ? "bg-roster-gray" : "bg-[#d1d5db]"
          }`}
          onPress={() => navigation.navigate("Screen2", { teamName, country, state, city })}>
          <Text className="text-lg font-bold text-roster-offwhite">Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Screen1;
