import React, { useState } from "react";
import {
  Alert,
  ImageBackground,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { supabase } from "../../lib/supabase";

import GoogleIcon from "../../icons/google";
import Facebook from "../../icons/facebook";
import Apple from "../../icons/apple";
import Loading from "../../icons/loading";

export default function SignIn({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert(error.message);
      console.log("Error: ", error);
    }

    setLoading(false);
  }

  return (
    <SafeAreaView className="flex-1 flex-col justify-end">
      {/* Sign-in Image */}
      <KeyboardAvoidingView
        keyboardVerticalOffset={20}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1">
        <View className="flex h-1/3 items-center justify-center bg-gray3">
          <View className="flex h-full w-full justify-center items-center">
            <ImageBackground
              source={require("roster/screens/illustrations/placeholder.png")}
              resizeMode="contain"
              style={{ width: "100%", height: "100%" }}
            />
          </View>
        </View>
        {/* Sign-in Form */}
        <View className="flex-1 flex-col p-8 space-y-4 bg-white z-5">
          <View className="w-full flex-col">
            <Text className="text-4xl font-bold text-indigo-900">Sign In</Text>
            <Text className="text-lg text-gray-500">Your Recreational Sports Hub</Text>
          </View>
          <TextInput
            placeholder="Email Address"
            keyboardType="email-address"
            className="bg-gray-50 h-12 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-green focus:border-opacity-50 focus:border-2 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={email}
            onChangeText={(text) => setEmail(text)}
            autoCapitalize={"none"}
          />
          <TextInput
            placeholder="Password"
            className="bg-gray-50 h-12 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-green focus:border-opacity-50 focus:border-2 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={password}
            onChangeText={(text) => setPassword(text)}
            autoCapitalize={"none"}
            secureTextEntry={true}
          />
          <TouchableOpacity
            className="flex items-center justify-center p-3 bg-gray rounded-lg"
            disabled={!email || !password || loading}
            onPress={() => signInWithEmail()}>
            <Text className="text-offwhite text-lg font-bold">
              {loading ? <Loading /> : "Sign In"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex items-center justify-center p-3"
            onPress={() => navigation.navigate("SignUp")}>
            <Text className="text-gray-500 tracking-wide">
              Dont have an account?
              <Text className="text-blue font-semibold tracking-wide"> Sign Up</Text>
            </Text>
          </TouchableOpacity>
          <View className="w-full border-b border-gray-300"></View>
          <View className="flex items-center justify-center w-full">
            <Text className="text-gray-500 tracking-wide">Or continue with</Text>
          </View>
          <View className="flex flex-row w-auto items-center justify-center space-x-3">
            <TouchableOpacity className="flex items-center justify-center border-2 border-green p-3 rounded-full">
              <GoogleIcon />
            </TouchableOpacity>
            <TouchableOpacity className="flex items-center justify-center border-2 border-green p-2 rounded-full">
              <Apple />
            </TouchableOpacity>
            <TouchableOpacity className="flex items-center justify-center border-2 border-green p-3 rounded-full">
              <Facebook />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
