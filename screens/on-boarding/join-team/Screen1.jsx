import React, { useState, useRef } from "react";
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

const Screen1 = ({ navigation }) => {
  const fieldsRef = useRef([]);
  const [state, setState] = useState({ code1: "", code2: "", code3: "", code4: "" });
  // useEffect(() => {
  //   const unsubscribe = navigation.addListener("transitionEnd", (e) => {
  //     first.current?.focus();
  //   });

  //   return unsubscribe;
  // }, [navigation]);

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
          <View className="flex flex-row space-x-3 mt-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <TextInput
                key={i}
                style={styles.inputBox}
                value={state[`code${i}`]}
                returnKeyType={i === 6 ? "done" : "next"}
                onChangeText={(text) => handleChange(text, `code${i}`)}
                onKeyPress={({ nativeEvent }) => inputFocus(i - 1, nativeEvent.key)}
                onSubmitEditing={({ nativeEvent }) => inputFocus(i - 1, nativeEvent.key)}
                ref={(el) => (fieldsRef.current[i - 1] = el)}
              />
            ))}
          </View>
        </View>
        <View className="flex h-1/2 flex-col justify-end items-center mx-8 space-y-3 pb-16">
          <Text className="text-xs text-gray mb-3 text-center">
            <Text className="text-green">* </Text>If you have not already been given a code, skip
            this section for now and reach out to your team captain.
          </Text>
          <TouchableOpacity disabled={false} onPress={handleSubmit}>
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
});

export default Screen1;
