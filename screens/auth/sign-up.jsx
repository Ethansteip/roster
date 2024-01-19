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
  TextInput,
} from "react-native";
import { supabase } from "../../lib/supbase/supabase";

import GoogleIcon from "../../components/icons/general/google";
import Apple from "../../components/icons/general/apple";
import Facebook from "../../components/icons/general/facebook";
import Loading from "../../components/icons/general/loading";
import styles from "../../styles/forms";
import { MaterialIcons } from "@expo/vector-icons";

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);
  const [loading, setLoading] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmationPasswordRef = useRef();

  const validatePasswords = (password, confirmationPassword) => {
    return password === confirmationPassword;
  };

  /**
   * Signs up a user with email and password.
   */

  async function signUpWithEmail() {
    setLoading(true);

    // Validate passwords
    if (!validatePasswords(password, confirmationPassword)) {
      setLoading(false);
      return Alert.alert("Passwords do not match - please try again");
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (error) {
        throw error;
      }

      if (data) {
        navigation.navigate("Start", { screen: "CreateProfile" });
      }
    } catch (error) {
      Alert.alert(error.message);
    } finally {
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
            <Text className="text-3xl font-bold text-[#363D4F]">Sign Up For Roster</Text>
            <Text className="text-lg text-[#363D4F]">Your Recreational Sports Hub</Text>
          </View>
          <View style={{ flexDirection: "column", gap: 10 }}>
            {/* Email Input */}
            <View style={styles.input.inputContainer}>
              <MaterialIcons
                name="email" // Assuming the icon is always an email icon, change as needed
                size={24}
                color="#363D4F"
                style={styles.input.icon}
              />
              <TextInput
                ref={emailRef}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                placeholderTextColor="#363D4F"
                style={styles.input.input}
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
            </View>
            {/* Password input */}
            <View style={styles.input.inputContainer}>
              <MaterialIcons
                name="lock" // Assuming the icon is always an email icon, change as needed
                size={24}
                color={passwordFocused || password ? "#363D4F" : "lightgray"}
                style={styles.input.icon}
              />
              <TextInput
                style={styles.input.input}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
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
            </View>
            {/* Confirm Password Input */}
            <View style={styles.input.inputContainer}>
              <MaterialIcons
                name="lock" // Assuming the icon is always an email icon, change as needed
                size={24}
                color={confirmPasswordFocused || confirmationPassword ? "black" : "lightgray"}
                style={styles.input.icon}
              />
              <TextInput
                style={styles.input.input}
                onFocus={() => setConfirmPasswordFocused(true)}
                onBlur={() => setConfirmPasswordFocused(false)}
                placeholder="Confirm Password"
                value={confirmationPassword}
                onChangeText={(text) => setConfirmationPassword(text)}
                autoCapitalize={"none"}
                secureTextEntry={true}
                ref={confirmationPasswordRef}
              />
            </View>
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
