import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
  Alert,
  StyleSheet,
  SafeAreaView,
} from "react-native";

import { supabase } from "../../../lib/supbase/supabase";
import BackArrow from "../../../components/icons/general/BackArrow";
import Loading from "../../../components/icons/general/loading";

const Screen1 = ({ navigation }) => {
  const fieldsRef = useRef([]);
  const [state, setState] = useState({ code1: "", code2: "", code3: "", code4: "" });
  const [focusedInput, setFocusedInput] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("transitionEnd", () => {
      fieldsRef.current[0].focus();
    });

    return unsubscribe;
  }, [navigation]);

  // const pasteCode = async () => {
  //   const text = await Clipboard.getString();

  //   console.log("CLIPBOARD: ", text);

  //   if (text.length !== 6) {
  //     return Alert.alert(
  //       "The code you are try to paste is not 6 digits long. Make sure you've copied a 6 digit code."
  //     );
  //   }

  //   Object.keys(state).forEach((key, index) => {
  //     state[key] = text[index];
  //   });
  // };

  const verifyTeamExists = async (teamCodeJoined) => {
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
        setLoading(false);
        Alert.alert(
          "No team found with the specified team code. Please double check your team code and try again."
        );
        return false;
      }
    }
  };

  const userAlreadyBelongsToTeam = async (userId, teamCodeJoined) => {
    const { data, error } = await supabase
      .from("rosters")
      .select()
      .eq("team_secret_code", teamCodeJoined)
      .eq("player_id", userId);

    if (error) {
      setLoading(false);
      return Alert.alert("Error: ", error.message);
    } else if (data.length > 0) {
      const team = data[0];
      setLoading(false);
      Alert.alert(
        `You have already joined ${team.team_name}. Feel free to skip this section or join another team.`
      );
      return true;
    } else {
      setLoading(false);
      return false;
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    const teamCodeJoined = Object.values(state).join("");

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const teamVerified = await verifyTeamExists(teamCodeJoined);
      const alreadyJoinedTeam = await userAlreadyBelongsToTeam(user?.id, teamCodeJoined);

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
          setLoading(false);
          Alert.alert(error.message);
          throw error;
        } else {
          setLoading(false);
          navigation.navigate("Screen2", data);
          return;
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Switch to input fields method
  const inputFocus = (index, key) => {
    if (key === "Backspace" || key === "Delete") {
      const next = index - 1;
      if (next > -1) {
        fieldsRef.current[next].focus();
      }
    } else {
      const next = index + 1;
      if (next < fieldsRef.current.length && state[`code${index + 1}`] !== " ") {
        fieldsRef.current[next].focus();
      }
    }
  };

  const handleChange = (text, codeNumber) => {
    setState({ ...state, [codeNumber]: text.slice(text.length - 1) });
  };

  return (
    // neww
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView className="flex-1 w-full flex-col bg-roster-offwhite">
        <TouchableOpacity onPress={() => navigation.goBack()} className="w-10 ml-5 mt-3">
          <BackArrow />
        </TouchableOpacity>
        <View className="flex h-1/2 flex-col justify-center items-center">
          {/* Join Team */}
          <Text className="text-3xl font-bold text-center text-roster-gray">Join a team</Text>
          <Text className="text-lg w-5/6 text-center text-roster-gray3 mt-5">
            You can join a team by entering the unique 6-digit team code provided by your team
            captain below.
          </Text>
          {/* Team Code */}
          <View className="flex flex-row space-x-3 mt-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <TextInput
                key={i}
                style={[styles.inputBox, focusedInput === i && styles.focusedInput]}
                value={state[`code${i}`]}
                autoCapitalize={"none"}
                returnKeyType={i === 6 ? "done" : "next"}
                onChangeText={(text) => handleChange(text, `code${i}`)}
                onKeyPress={({ nativeEvent }) => inputFocus(i - 1, nativeEvent.key)}
                onSubmitEditing={({ nativeEvent }) => inputFocus(i - 1, nativeEvent.key)}
                ref={(el) => (fieldsRef.current[i - 1] = el)}
                onFocus={() => setFocusedInput(i)}
                onBlur={() => setFocusedInput(0)}
              />
            ))}
          </View>
        </View>
        <View className="flex h-1/2 flex-col justify-end items-center mx-8 space-y-3 pb-16">
          <Text className="text-xs text-gray mb-3 text-center">
            <Text className="text-green">* </Text>If you have not already been given a code, skip
            this section for now and reach out to your team captain.
          </Text>
          <TouchableOpacity
            disabled={false}
            onPress={handleSubmit}
            className="flex w-full items-center justify-center h-14 bg-roster-gray rounded-lg">
            {loading ? (
              <Loading dotColor="#FAFAFA" />
            ) : (
              <Text className="text-lg font-bold text-roster-offwhite">Join Team</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity className="">
            <Text className="text-lg text-roster-gray">Skip</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  inputBox: {
    width: 45,
    height: 50,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#666",
    textAlign: "center",
    fontSize: 20,
  },
  focusedInput: {
    borderColor: "#4bad9c", // Change this color as needed
  },
});

export default Screen1;
