import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  TextInput,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { supabase } from "../../lib/supabase";

import GoogleIcon from "../../icons/google";
import Facebook from "../../icons/facebook";
import Apple from "../../icons/apple";
import SoccerPlayer from "../../assets/illustrations/soccer-player";
import Email from "../../icons/email";
import LockClosed from "../../icons/lock-closed";
import LockOpen from "../../icons/lock-closed";

export default function SignIn({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailIconColour, setEmailIconColour] = useState("#c2c3c4");
  const [lockIconColour, setLockIconColour] = useState("#c2c3c4");
  const [secureEntry, setSecureEntry] = useState(true);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    console.log("logging In");

    if (error) Alert.alert(error.message);
    setLoading(false);

    //navigation.navigate("Account");
  }

  return (
    <SafeAreaView className="flex-1 flex-col justify-end">
      {/* Sign-in Image */}
      <View className="flex-1 bg-white items-center justify-center">
        <SoccerPlayer />
      </View>
      {/* Sign-in Form */}
      <View className="flex flex-col p-8 space-y-4 bg-white">
        <View className="w-full flex flex-col">
          <Text className="text-2xl font-bold text-indigo-900">Sign into Roster</Text>
          <Text className="text-sm text-gray-500">Your Recreational Sports Hub</Text>
        </View>
        <View className="w-full flex flex-row items-center justify-between border-2 border-gray-400 focus:border-indigo-900 rounded-lg px-4 py-3">
          <TextInput
            placeholder="Email Address"
            className="text-lg"
            value={email}
            onChangeText={(text) => setEmail(text)}
            autoCapitalize={"none"}
            onFocus={() => setEmailIconColour("#362F78")}
            onBlur={() => setEmailIconColour("#9CA3AF")}
          />
          <Email currentColour={emailIconColour} />
        </View>
        <View className="w-full flex flex-row items-center justify-between border-2 border-gray-400 focus:border-indigo-900 rounded-lg px-4 py-3">
          <TextInput
            placeholder="Password"
            className="text-lg"
            value={password}
            onChangeText={(text) => setPassword(text)}
            autoCapitalize={"none"}
            secureTextEntry={secureEntry}
            onFocus={() => setLockIconColour("#362F78")}
            onBlur={() => setLockIconColour("#9CA3AF")}
          />
          <TouchableOpacity onPress={() => setSecureEntry(!secureEntry)}>
            {/* {secureEntry ? (
              <LockClosed currentColour={lockIconColour} />
            ) : (
              <LockOpen currentColour={lockIconColour} />
            )} */}
            <LockOpen currentColour={lockIconColour} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          className="flex items-center justify-center p-4 bg-indigo-900 rounded-lg"
          disabled={loading}
          onPress={() => signInWithEmail()}>
          <Text className="text-white font-semibold">Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex items-center justify-center p-3"
          onPress={() => navigation.navigate("SignUp")}>
          <Text>
            Dont have an account? <Text className="text-indigo-900 font-semibold">Sign Up</Text>
          </Text>
        </TouchableOpacity>
        <View className="w-full border-b border-gray-300"></View>
        <View className="flex items-center justify-center w-full">
          <Text>Or continue with</Text>
        </View>
        <View className="flex flex-row w-auto items-center justify-center space-x-3">
          <TouchableOpacity className="flex items-center justify-center border border-gray-400 p-3 rounded-full">
            <GoogleIcon />
          </TouchableOpacity>
          <TouchableOpacity className="flex items-center justify-center border border-gray-400 p-3 rounded-full">
            <Apple />
          </TouchableOpacity>
          <TouchableOpacity className="flex items-center justify-center border border-gray-400 p-3 rounded-full">
            <Facebook />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
  signInContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
