import React, { useState } from "react";
import {
  Alert,
  ImageBackground,
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
      <View className="flex-1 bg-white items-center justify-center">
        <ImageBackground
          source={require("roster/screens/illustrations/hockey-scene.png")}
          resizeMode="cover"
          style={{ width: 400, height: 330, flex: 1 }}
        />
      </View>
      {/* Sign-in Form */}
      <View className="flex flex-col p-8 space-y-4 bg-white">
        <View className="w-full flex flex-col">
          <Text className="text-2xl font-bold text-indigo-900">Sign into Roster</Text>
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
        <TouchableOpacity
          className="flex items-center justify-center p-4 bg-gray rounded-lg"
          disabled={loading}
          onPress={() => signInWithEmail()}>
          <Text className="text-white font-semibold">{loading ? <Loading /> : "Sign In"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex items-center justify-center p-3"
          onPress={() => navigation.navigate("SignUp")}>
          <Text>
            Dont have an account? <Text className="text-blue font-semibold">Sign Up</Text>
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
