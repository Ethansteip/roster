import React, { useState } from "react";
import {
  Alert,
  ImageBackground,
  SafeAreaView,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { supabase } from "../../lib/supabase";

import GoogleIcon from "../../icons/google";
import Apple from "../../icons/apple";
import Facebook from "../../icons/facebook";
import Loading from "../../icons/loading";

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signUpWithEmail() {
    setLoading(true);

    // check that passwords match
    if (password === confirmationPassword) {
      const { error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (error) Alert.alert(error.message);
      setLoading(false);
    } else {
      Alert.alert("Passwords do not match - please try again");
      setLoading(false);
    }
  }

  return (
    <SafeAreaView className="flex-1 flex-col justify-end">
      {/* Sign-in Image */}
      <View className="flex-1 bg-white items-center justify-center">
        <ImageBackground
          source={require("roster/screens/illustrations/volleyball-scene.png")}
          resizeMode="cover"
          style={{ width: 400, height: 330, flex: 1 }}
        />
      </View>
      {/* Sign-in Form */}
      <View className="flex flex-col p-8 space-y-4 bg-white">
        <View className="w-full flex flex-col">
          <Text className="text-2xl font-bold text-indigo-900">Sign Up For Roster</Text>
          <Text className="text-sm text-gray-500">Your Recreational Sports Hub</Text>
        </View>
        <TextInput
          placeholder="Email Address"
          className="bg-gray-50 h-12 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-900 focus:border-indigo-900 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={email}
          onChangeText={(text) => setEmail(text)}
          autoCapitalize={"none"}
        />
        <TextInput
          placeholder="Password"
          className="bg-gray-50 h-12 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-900 focus:border-indigo-900 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={password}
          onChangeText={(text) => setPassword(text)}
          autoCapitalize={"none"}
          secureTextEntry={true}
        />
        <TextInput
          placeholder="Confirm Password"
          className="bg-gray-50 h-12 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-900 focus:border-indigo-900 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={confirmationPassword}
          onChangeText={(text) => setConfirmationPassword(text)}
          autoCapitalize={"none"}
          secureTextEntry={true}
        />
        <TouchableOpacity
          className="flex items-center justify-center p-4 bg-indigo-900 rounded-lg"
          disabled={loading}
          onPress={() => signUpWithEmail()}>
          <Text className="text-white font-semibold">{loading ? <Loading /> : "Sign Up"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex items-center justify-center p-3"
          onPress={() => navigation.navigate("SignIn")}>
          <Text>
            Already have an account? <Text className="text-indigo-900 font-semibold">Sign In</Text>
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
