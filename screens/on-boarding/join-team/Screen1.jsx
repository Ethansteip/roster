import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { supabase } from "../../../lib/supbase/supabase";
import BackArrow from "../../../components/icons/general/BackArrow";

const Screen1 = ({ navigation }) => {
  const first = useRef();
  const second = useRef();
  const third = useRef();
  const fourth = useRef();
  const fifth = useRef();
  const sixth = useRef();

  const [digit1, setdigit1] = useState("");
  const [digit2, setdigit2] = useState("");
  const [digit3, setdigit3] = useState("");
  const [digit4, setdigit4] = useState("");
  const [digit5, setdigit5] = useState("");
  const [digit6, setdigit6] = useState("");

  const teamCode = [digit1, digit2, digit3, digit4, digit5, digit6];
  const teamCodeJoined = teamCode.join("");
  const fullCode = digit1 && digit2 && digit3 && digit4 && digit5 && digit6;

  useEffect(() => {
    const unsubscribe = navigation.addListener("transitionEnd", (e) => {
      first.current?.focus();
    });

    return unsubscribe;
  }, [navigation]);

  const verifyTeamExists = async () => {
    const { data, error } = await supabase.from("teams").select().eq("team_code", teamCodeJoined);

    if (error) {
      Alert.alert("Error:", error.message);
      return false;
    } else {
      if (data.length > 0) {
        // You have found a matching entry
        const team = data[0];
        //Alert.alert(`Team found: ${team.name}`);
        return team;
      } else {
        // No matching entry found
        Alert.alert(
          "No team found with the specified team code. Please double check your team code and try again."
        );
        return false;
      }
    }
  };

  const userAlreadyBelongsToTeam = async (userId) => {
    const { data, error } = await supabase
      .from("rosters")
      .select()
      .eq("team_secret_code", teamCodeJoined)
      .eq("player_id", userId);

    if (error) {
      Alert.alert("Error: ", error.message);
    } else if (data.length > 0) {
      const team = data[0];
      Alert.alert(
        `You have already joined ${team.team_name}. Feel free to skip this section or join another team.`
      );
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = async () => {
    // get user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const teamVerified = await verifyTeamExists();
    const alreadyJoinedTeam = await userAlreadyBelongsToTeam(user?.id);

    if (teamVerified && !alreadyJoinedTeam) {
      // insert user into rosters table
      const { data, error } = await supabase
        .from("rosters")
        .insert({
          player_id: user?.id,
          team_id: teamVerified.id,
          team_name: teamVerified.name,
          team_secret_code: teamVerified.team_code,
        })
        .select();

      if (error) {
        Alert.alert(error.message);
      } else {
        navigation.navigate("Screen2", data);
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView className="flex-1 w-full flex-col bg-offwhite">
        <TouchableOpacity onPress={() => navigation.goBack()} className="w-10">
          <BackArrow />
        </TouchableOpacity>
        <View className="flex h-1/2 flex-col justify-center items-center">
          {/* Join Team */}
          <Text className="text-3xl font-bold text-center text-gray">Join a team</Text>
          <Text className="text-lg w-5/6 text-center text-gray mt-5">
            You can join a team by entering the unique 6-digit team code provided by your team
            captain below.
          </Text>
          {/* Team Code */}
          <View className="h-auto flex flex-row justify-between w-5/6 mt-10">
            <TextInput
              placeholder="-"
              ref={first}
              autoCapitalize="none"
              maxLength={1}
              value={digit1}
              onChangeText={(value) => {
                setdigit1(value);
                //second.current.focus();
              }}
              returnKeyType="next"
              onSubmitEditing={() => {
                second.current.focus();
              }}
              blurOnSubmit={false}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === "Backspace") {
                  setdigit1("");
                  first.current.focus();
                }
              }}
              className={` ${
                digit1
                  ? "font-bold bg-green text-offwhite border-green"
                  : "bg-offwhite border-[#d1d5db]"
              } w-[45px] text-3xl h-16 border-[3px] text-gray-900 rounded-lg focus:border-green focus:border-[3px] focus:border-opacity-50 block p-3`}
            />
            <TextInput
              ref={second}
              placeholder="-"
              autoCapitalize="none"
              maxLength={1}
              value={digit2}
              onChangeText={(value) => {
                setdigit2(value);
                //third.current.focus();
              }}
              returnKeyType="next"
              onSubmitEditing={() => {
                third.current.focus();
              }}
              blurOnSubmit={false}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === "Backspace") {
                  setdigit2("");
                  first.current.focus();
                } else {
                  third.current.focus();
                }
              }}
              className={` ${
                digit2
                  ? "font-bold bg-green text-offwhite border-green"
                  : "bg-offwhite border-[#d1d5db]"
              } w-[45px] text-3xl h-16 border-[3px] text-gray-900 rounded-lg focus:border-green focus:border-[3px] focus:border-opacity-50 block p-3`}
            />
            <TextInput
              ref={third}
              placeholder="-"
              autoCapitalize="none"
              maxLength={1}
              value={digit3}
              onChangeText={(value) => {
                setdigit3(value);
                //fourth.current.focus();
              }}
              returnKeyType="next"
              onSubmitEditing={() => {
                fourth?.current?.focus();
              }}
              blurOnSubmit={false}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === "Backspace") {
                  setdigit3("");
                  second?.current?.focus();
                }
              }}
              className={` ${
                digit3
                  ? "font-bold bg-green text-offwhite border-green"
                  : "bg-offwhite border-[#d1d5db]"
              } w-[45px] text-3xl h-16 border-[3px] text-gray-900 rounded-lg focus:border-green focus:border-[3px] focus:border-opacity-50 block p-3`}
            />
            <TextInput
              ref={fourth}
              placeholder="-"
              autoCapitalize="none"
              maxLength={1}
              value={digit4}
              onChangeText={(value) => {
                setdigit4(value);
                //fifth.current.focus();
              }}
              returnKeyType="next"
              onSubmitEditing={() => {
                fifth.current.focus();
              }}
              blurOnSubmit={false}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === "Backspace") {
                  setdigit4("");
                  third.current.focus();
                }
              }}
              className={` ${
                digit4
                  ? "font-bold bg-green text-offwhite border-green"
                  : "bg-offwhite border-[#d1d5db]"
              } w-[45px] text-3xl h-16 border-[3px] text-gray-900 rounded-lg focus:border-green focus:border-[3px] focus:border-opacity-50 block p-3`}
            />
            <TextInput
              ref={fifth}
              placeholder="-"
              autoCapitalize="none"
              maxLength={1}
              value={digit5}
              onChangeText={(value) => {
                setdigit5(value);
                //sixth.current.focus();
              }}
              returnKeyType="next"
              onSubmitEditing={() => {
                sixth.current.focus();
              }}
              blurOnSubmit={false}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === "Backspace") {
                  setdigit5("");
                  fourth.current.focus();
                }
              }}
              className={` ${
                digit5
                  ? "font-bold bg-green text-offwhite border-green"
                  : "bg-offwhite border-[#d1d5db]"
              } w-[45px] text-3xl h-16 border-[3px] text-gray-900 rounded-lg focus:border-green focus:border-[3px] focus:border-opacity-50 block p-3`}
            />
            <TextInput
              ref={sixth}
              placeholder="-"
              autoCapitalize="none"
              maxLength={1}
              value={digit6}
              onChangeText={(value) => setdigit6(value)}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === "Backspace") {
                  setdigit6("");
                  fifth.current.focus();
                }
              }}
              className={` ${
                digit6
                  ? "font-bold bg-green text-offwhite border-green"
                  : "bg-offwhite border-[#d1d5db]"
              } w-[45px] text-3xl h-16 border-[3px] text-gray-900 rounded-lg focus:border-green focus:border-[3px] focus:border-opacity-50 block p-3`}
            />
          </View>
        </View>
        <View className="flex h-1/2 flex-col justify-end items-center mx-8 space-y-3 pb-16">
          <Text className="text-xs text-gray mb-3 text-center">
            <Text className="text-green">* </Text>If you have not already been given a code, skip
            this section for now and reach out to your team captain.
          </Text>
          <TouchableOpacity
            disabled={!fullCode}
            onPress={handleSubmit}
            className={`${
              fullCode ? "bg-gray" : "bg-[#d1d5db]"
            } p-3 flex justify-center items-center indigo-900 border-black rounded-lg w-full`}>
            <Text className="text-lg font-bold text-offwhite">Join Team</Text>
          </TouchableOpacity>
          <TouchableOpacity className="">
            <Text className="text-lg text-gray">Skip</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Screen1;
