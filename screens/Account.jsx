import React from "react";
import { useState, useEffect, useRef } from "react";
import { supabase } from "../lib/supabase";
import { useDebounce } from "../lib/hooks/hooks";
import {
  SafeAreaView,
  Text,
  TextInput,
  View,
  Alert,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Button,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SuccessModal from "../components/modal";
import Checkmark from "../icons/checkmark";
import Cancel from "../icons/cancel";
import Avatar from "../components/Account/Avatar";
import Upload from "../icons/upload";

export default function Account(session) {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [usernameTaken, setUsernameTaken] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [showUsernameMessage, setShowUsernameMessage] = useState(false);
  const [originalUsername, setOriginalUsername] = useState("");
  const [modalText, setmodalText] = useState("");
  const [modalSuccess, setModalSuccess] = useState(null);

  const debouncedSearch = useDebounce(username);

  const usernameInput = useRef();
  const firstnameInput = useRef();
  const lastnameInput = useRef();

  useEffect(() => {
    if (username === originalUsername) {
      setUsernameError("");
      setUsernameTaken(false);
      setShowUsernameMessage(false);
    }
    searchUsername();
  }, [debouncedSearch]);

  useEffect(() => {
    getProfile();
    if (username === originalUsername) {
      setUsernameError("");
      setUsernameTaken(false);
      setShowUsernameMessage(false);
    }
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
        setOriginalUsername(data.username);
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

      if (usernameTaken) {
        setmodalText(`The username ${username} is unavailable. Please use another name.`);
        setModalSuccess(false);
        setModalVisible(true);
        setTimeout(() => {
          setModalVisible(false);
        }, 2000);
        return;
      }

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
        setmodalText(`Username must be greater than or equal to 3 characters.`);
        setModalSuccess(false);
        setModalVisible(true);
        setTimeout(() => {
          setModalVisible(false);
        }, 1500);
      }
      if (data) {
        setShowUsernameMessage(false);
        setmodalText("Successfully saved profile.");
        setModalSuccess(true);
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

  async function searchUsername() {
    if (username.length < 3) {
      setUsernameTaken(true);
      setUsernameError("Username must be atleast 3 characaters long.");
      setShowUsernameMessage(true);
      return;
    }
    try {
      const { data } = await supabase.from("profiles").select().eq("username", debouncedSearch);

      console.log("SESSION: ", session?.user.id);

      if (data.length > 0) {
        // if we find the existing users username, do nothing / show nothing
        if (session?.user.id === data[0].id) {
          setUsernameError("");
          setUsernameTaken(false);
          setShowUsernameMessage(false);
          return;
          // else, let the user know the name is already taken
        } else {
          setUsernameTaken(true);
          setUsernameError("User name is already taken.");
          setShowUsernameMessage(true);
          return;
        }
        // else, let the user know the name is available
      } else {
        setUsernameTaken(false);
        setUsernameError("Username available!");
        setShowUsernameMessage(true);
        return;
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    }
  }

  return (
    <SafeAreaView className="flex-1 h-[100%] w-full flex-col bg-offwhite">
      {/* Success modal */}
      <SuccessModal text={modalText} success={modalSuccess} visible={modalVisible} />
      <View className="w-full flex-1 flex-col justify-between px-5">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "space-between",
          }}>
          <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
            {/* Profile Picture */}
            <View className="relative w-full h-auto flex items-center justify-center mt-5">
              <Avatar width="w-24" height="h-24" />
              <Pressable className="fixed bottom-7 left-7 h-8 w-8 rounded-full flex items-center justify-center bg-offwhite shadow">
                <Upload fill="gray" width={20} height={20} />
              </Pressable>
            </View>
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
                  onChangeText={(value) => setUsername(value)}
                  ref={usernameInput}
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    firstnameInput.current.focus();
                  }}
                />
                {showUsernameMessage && (
                  <View className="flex flex-row items-center space-x-1">
                    {usernameTaken ? (
                      <Cancel width={16} height={16} />
                    ) : (
                      <Checkmark width={16} height={16} />
                    )}
                    <Text className="ml-1 text-xs">{usernameError}</Text>
                  </View>
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
          disabled={loading || usernameTaken}
          className={` w-full items-center justify-end p-3 rounded-lg mb-2 ${
            !usernameTaken
              ? "bg-offwhite border-2 border-blue"
              : "bg-offwhite border-2 border-[#cacaca]"
          }`}
          onPress={() => updateProfile({ username, firstName, lastName })}>
          <Text className={`text-lg font-bold ${!usernameTaken ? "text-gray" : "text-[#cacaca]"}`}>
            Update Profile
          </Text>
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
