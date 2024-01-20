import React, { useState, useRef } from "react";
import {
  Alert,
  ImageBackground,
  TextInput,
  SafeAreaView,
  Platform,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { supabase } from "../../lib/supbase/supabase";
import styles from "../../styles/forms";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import GoogleIcon from "../../components/icons/general/google";
import Facebook from "../../components/icons/general/facebook";
import Apple from "../../components/icons/general/apple";
import Loading from "../../components/icons/general/loading";

export default function SignIn({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const passwordRef = useRef();

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
      <KeyboardAwareScrollView
        keyboardVerticalOffset={100}
        behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View className="flex h-1/2 items-center justify-center bg-gray3">
          <View className="flex h-full w-full justify-center items-center">
            <ImageBackground
              source={require("roster/assets/general/placeholder.png")}
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
          <View style={styles.input.inputContainer}>
            <MaterialIcons
              name="email" // Assuming the icon is always an email icon, change as needed
              size={24}
              color="#363D4F"
              style={styles.input.icon}
            />
            <TextInput
              placeholderTextColor="#363D4F"
              style={styles.input.input}
              placeholder="Email"
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
          <View style={styles.input.inputContainer}>
            <Entypo
              name={showPassword ? "lock-open" : "lock"}
              size={24}
              color={passwordFocused || password ? "#363D4F" : "lightgray"}
              style={styles.input.icon}
              onPress={() => setShowPassword(!showPassword)}
            />
            <TextInput
              style={styles.input.input}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
              placeholder="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              autoCapitalize={"none"}
              returnKeyType="done"
              secureTextEntry={showPassword ? false : true}
              ref={passwordRef}
            />
          </View>
          <TouchableOpacity
            className="flex items-center justify-center h-14 bg-gray rounded-lg"
            disabled={!email || !password || loading}
            onPress={() => signInWithEmail()}>
            <Text className="text-offwhite text-lg font-bold">
              {loading ? <Loading dotColor="#FAFAFA" /> : "Sign In"}
            </Text>
          </TouchableOpacity>
          <View className="flex flex-row items-center justify-center p-3">
            <Text className="text-gray-500 tracking-wide">Dont have an account?</Text>
            <TouchableOpacity className="" onPress={() => navigation.navigate("SignUp")}>
              <Text className="text-blue font-semibold tracking-wide"> Sign Up</Text>
            </TouchableOpacity>
          </View>
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
      </KeyboardAwareScrollView>
      {/* </KeyboardAvoidingView> */}
    </SafeAreaView>
  );
}
