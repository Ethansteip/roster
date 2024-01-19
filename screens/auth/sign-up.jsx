import React, { useState, useRef } from "react";
import {
  Alert,
  ImageBackground,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { supabase } from "../../lib/supbase/supabase";
import { InputField } from "../../components/forms/Input";

import GoogleIcon from "../../components/icons/general/google";
import Apple from "../../components/icons/general/apple";
import Facebook from "../../components/icons/general/facebook";
import Loading from "../../components/icons/general/loading";

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const passwordRef = useRef();
  const confirmationPasswordRef = useRef();

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
      navigation.navigate("Start", { screen: "CreateProfile" });
    } else {
      Alert.alert("Passwords do not match - please try again");
      setLoading(false);
    }
  }

  return (
    <SafeAreaView className="flex-1 flex-col justify-end">
      {/* Sign-in Image */}
      <KeyboardAvoidingView
        keyboardVerticalOffset={20}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1">
        <View className="flex-1 bg-white items-center justify-center bg-gray3">
          <View className="flex h-full w-full justify-center items-center">
            <ImageBackground
              source={require("roster/assets/general/placeholder.png")}
              resizeMode="contain"
              style={{ width: "100%", height: "100%" }}
            />
          </View>
        </View>
        {/* Sign-in Form */}
        <View className="flex flex-col p-8 space-y-4 bg-white">
          <View className="w-full flex flex-col mb-2">
            <Text className="text-4xl font-bold text-indigo-900">Sign Up For Roster</Text>
            <Text className="text-lg text-gray-500">Your Recreational Sports Hub</Text>
          </View>
          <View style={{ flexDirection: "column", gap: 10 }}>
            <InputField
              style={{ marginBottom: 10 }}
              showIcon={true}
              iconColour="#363D4F"
              placeholder="Enter your email"
              keyboardType="email-address"
              value={email}
              onChangeText={(text) => setEmail(text)}
              autoCapitalize={"none"}
              returnKeyType="next"
              onSubmitEditing={() => {
                passwordRef.current.focus();
              }}
            />
            <InputField
              showIcon={true}
              icon="lock"
              iconColour="#363D4F"
              placeholder="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              autoCapitalize={"none"}
              secureTextEntry={true}
              ref={passwordRef}
              returnKeyType="next"
              onSubmitEditing={() => {
                confirmationPasswordRef.current.focus();
              }}
            />
            <InputField
              showIcon={true}
              icon="lock"
              iconColour="#363D4F"
              placeholder="Confirm Password"
              className="bg-gray-50 h-12 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-green focus:border-opacity-50 focus:border-2 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={confirmationPassword}
              onChangeText={(text) => setConfirmationPassword(text)}
              autoCapitalize={"none"}
              secureTextEntry={true}
              ref={confirmationPasswordRef}
            />
          </View>
          <TouchableOpacity
            disabled={loading}
            onPress={() => signUpWithEmail()}
            className="flex items-center justify-center h-14 bg-gray rounded-lg">
            {loading ? (
              <Loading dotColor="#FAFAFA" />
            ) : (
              <Text className="text-offwhite text-lg font-bold">Sign Up</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            className="flex items-center justify-center p-3"
            onPress={() => navigation.navigate("SignIn")}>
            <Text className="text-gray-500 tracking-wide">
              Already have an account?{" "}
              <Text className="text-blue font-semibold tracking-wide">Sign In</Text>
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
