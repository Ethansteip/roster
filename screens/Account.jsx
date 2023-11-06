import React from "react";
import { useState, useEffect, useRef } from "react";
import { supabase } from "../lib/supabase";
import {
  SafeAreaView,
  Text,
  TextInput,
  View,
  Alert,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SuccessModal from "../components/modal";

export default function Account(session) {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [usernameTaken, setUsernameTaken] = useState(false);

  const usernameInput = useRef();
  const firstnameInput = useRef();
  const lastnameInput = useRef();

  let timer;

  //const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    getProfile();
  }, []);

  async function getProfile() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username, first_name, last_name, avatar_url`)
        .eq("id", session?.user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setfirstName(data.first_name);
        setlastName(data.last_name);
        //setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({ username, firstName, lastName, avatar_url }) {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const updates = {
        id: session?.user.id,
        username,
        first_name: firstName,
        last_name: lastName,
        avatar_url,
        updated_at: new Date(),
      };

      let { data, error } = await supabase.from("profiles").upsert(updates).select();

      if (error) {
        throw error;
      }
      if (data) {
        setModalVisible(true);
        setTimeout(() => {
          setModalVisible(false);
        }, 1500);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  const UserNameAvailable = async (input) => {
    clearTimeout(timer);
    setUsername(input);
    timer = setTimeout(() => {
      const userNameExists = searchUserNames(username);
      if (userNameExists) {
        setUsernameTaken(true);
      }
      setUsernameTaken(false);
    }, 1000);
  };

  const searchUserNames = async (input) => {
    const { data, error } = await supabase.from("profiles").select().eq("username", input);

    if (error) {
      Alert.alert("Error: ", error.message);
    }
    if (data.length > 0) {
      console.log("USER NAME FOUND: ", data);
      return true;
    } else {
      return false;
    }
  };

  return (
    <SafeAreaView className="flex-1 h-[100%] w-full flex-col bg-offwhite">
      {/* Success modal */}
      <SuccessModal text={"Profile saved successfully"} visible={modalVisible} />
      <View className="w-full flex-1 flex-col justify-between p-5">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}>
          <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
            <View className="flex flex-col space-y-3 mt-5">
              <View className="flex flex-col space-y-2">
                <Text className="text-gray-100 text-lg">Email</Text>
                <TextInput
                  editable={false}
                  selectTextOnFocus={false}
                  disabled={true}
                  className="bg-gray-500 h-12 border border-[#c1c1c1] bg-[#f1f1f1] text-gray-900 text-sm rounded-lg block w-full p-3"
                  value={session?.user.email}
                />
              </View>
              <View className="flex flex-col space-y-2">
                <Text className="text-gray-100 text-lg">
                  Username<Text className="text-green"> *</Text>
                </Text>
                <TextInput
                  className="bg-gray-500 h-12 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue focus:border-opacity-50 focus:border-2 block w-full p-3"
                  value={username}
                  onChangeText={(value) => UserNameAvailable(value)}
                  ref={usernameInput}
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    firstnameInput.current.focus();
                  }}
                />
                {usernameTaken ?? (
                  <Text className="text-[#ff4512] text-xs">username is not availaible.</Text>
                )}
              </View>
              <View className="flex flex-col space-y-2">
                <Text className="text-gray-100 text-lg">
                  First Name<Text className="text-green"> *</Text>
                </Text>
                <TextInput
                  className="bg-gray-500 h-12 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue focus:border-opacity-50 focus:border-2 block w-full p-3"
                  value={firstName}
                  onChangeText={(value) => setfirstName(value)}
                  ref={firstnameInput}
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    lastnameInput.current.focus();
                  }}
                />
              </View>
              <View className="flex flex-col space-y-2">
                <Text className="text-gray-100 text-lg">
                  Last Name<Text className="text-green"> *</Text>
                </Text>
                <TextInput
                  className="bg-gray-500 h-12 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue focus:border-opacity-50 focus:border-2 block w-full p-3"
                  value={lastName}
                  onChangeText={(value) => setlastName(value)}
                  ref={lastnameInput}
                />
              </View>
            </View>
          </KeyboardAwareScrollView>
        </ScrollView>
        <TouchableOpacity
          disabled={loading}
          className={` w-full items-center justify-end p-3 rounded-lg mb-2 ${
            !loading ? "bg-offwhite border-2 border-blue" : "bg-[#d1d5db]"
          }`}
          onPress={() => updateProfile({ username, firstName, lastName })}>
          <Text className="text-lg font-bold text-gray">Update Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={loading}
          className="w-full items-center justify-end p-3 rounded-lg bg-gray"
          onPress={() => supabase.auth.signOut()}>
          <Text className="text-lg font-bold text-offwhite">Sign Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
