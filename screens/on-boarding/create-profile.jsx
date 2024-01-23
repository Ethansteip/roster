import React from "react";
import { useState, useEffect, useRef } from "react";
import { supabase } from "../../lib/supbase/supabase";
import { useDebounce } from "../../lib/hooks/hooks";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { decode } from "base64-arraybuffer";
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
import Checkmark from "../../components/icons/general/checkmark";
import Cancel from "../../components/icons/general/cancel";
import Avatar from "../../components/account/avatar";
import Loading from "../../components/icons/general/loading";
import styles from "../../styles/forms";

export default function CreateProfile(session) {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [firstName, setFirstname] = useState("");
  const [firstnameFocused, setFirstnameFocused] = useState(false);
  const [lastName, setLastname] = useState("");
  const [lastnameFocused, setLastnameFocused] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(
    `https://api.dicebear.com/7.x/thumbs/svg?seed=${Math.floor(100000 + Math.random() * 900000)}`
  );
  const [avatarPayload, setAvatarPayload] = useState(null);
  //const [Image, setImageData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [usernameTaken, setUsernameTaken] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [showUsernameMessage, setShowUsernameMessage] = useState(false);
  const [originalUsername] = useState("");
  const [modalText, setmodalText] = useState("");
  const [modalSuccess, setModalSuccess] = useState(null);

  const debouncedSearch = useDebounce(username);
  const navigation = useNavigation();

  const usernameInput = useRef();
  const firstnameInput = useRef();
  const lastnameInput = useRef();

  const disableButton = usernameTaken || !username || !firstName || !lastName;

  useEffect(() => {
    if (username === originalUsername) {
      setUsernameError("");
      setUsernameTaken(false);
      setShowUsernameMessage(false);
    }
    searchUsername();
  }, [debouncedSearch]);

  useEffect(() => {
    if (username === originalUsername) {
      setUsernameError("");
      setUsernameTaken(false);
      setShowUsernameMessage(false);
    }
  }, []);

  async function updateProfile({ username, firstName, lastName }) {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      // upload avatar and set in variable
      const uploadAvatarResult = await uploadAvatar();

      const { data: publicAvatarUrl } = supabase.storage
        .from("avatars")
        .getPublicUrl(uploadAvatarResult);

      const updates = {
        id: session?.user.id,
        username,
        first_name: firstName,
        last_name: lastName,
        avatar_url: publicAvatarUrl.publicUrl,
        updated_at: new Date(),
      };

      console.log("UPDATES BEFORE UPSERT: ", updates);

      let { data, error } = await supabase.from("profiles").upsert(updates).select();

      console.log("DATA AFTER UPDATE: ", data);

      if (error) {
        console.log("ERROR ON UPSERT: ", error);
      }
      if (data) {
        navigation.navigate("GetStarted");
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

  async function pickImage() {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setAvatarUrl(result.assets[0].uri);
      setAvatarPayload(result.assets[0].base64);
      // const shortBase64 = result.assets[0].base64.slice(0, 100);
      // console.log("AVATAR URL: ", avatarUrl);
      // console.log("AVATAR PAYLOAD: ", shortBase64);
      return result;
    }
  }

  async function uploadAvatar() {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .upload(`${session?.user.email}.png`, decode(avatarPayload), {
          contentType: "image/png",
        });

      if (error) {
        console.log(error.message);
        return Alert.alert(error.message);
      }

      console.log("UPLOAD IMAGE DATA: ", data);
      return data.path;
    } catch (error) {
      console.log("Error: ", error.message);
      throw error;
    }
  }

  return (
    <SafeAreaView className="flex-1 h-[100%] w-full flex-col bg-offwhite">
      <View className="w-full flex-1 flex-col justify-between px-5">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "space-between",
          }}>
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            keyboardVerticalOffset={300}>
            <View className="flex flex-col mt-5">
              <Text className="text-3xl font-bold text-gray3">Create your profile</Text>
            </View>
            <View className="flex flex-col space-y-3 mt-5">
              {/* Profile Picture */}
              <View className="w-full flex h-auto items-center justify-center mt-3">
                <TouchableOpacity onPress={pickImage} className="flex items-center justify-center">
                  <Avatar src={avatarUrl} />
                  <Text className="text-gray mt-2">Edit</Text>
                </TouchableOpacity>
              </View>
              {/*  */}
              <View className="flex flex-col space-y-2">
                <Text className="text-[#cfcfcf] text-lg">Email</Text>
                {/* Email Input */}
                <View style={styles.input.inputContainer}>
                  <TextInput
                    editable={false}
                    style={styles.input.input}
                    placeholder={session?.user.email}
                    disabled={true}
                  />
                </View>
              </View>
              <View className="flex flex-col space-y-2">
                <Text className="text-roster-gray text-lg">
                  Username<Text className="text-green"> *</Text>
                </Text>
                {/* Email Input */}
                <View style={[styles.input.inputContainer, { borderColor: "black" }]}>
                  <TextInput
                    autoCorrect={false}
                    placeholderTextColor="lightgray"
                    onFocus={() => setUsernameFocused(true)}
                    onBlur={() => setUsernameFocused(false)}
                    placeholder="Username"
                    style={styles.input.input}
                    value={username}
                    onChangeText={(value) => setUsername(value)}
                    ref={usernameInput}
                    returnKeyType="next"
                    onSubmitEditing={() => {
                      firstnameInput.current.focus();
                    }}
                  />
                </View>
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
                <Text className="text-roster-gray text-lg">
                  First Name<Text className="text-green"> *</Text>
                </Text>
                <View
                  style={[
                    styles.input.inputContainer,
                    firstnameFocused || firstName
                      ? { borderColor: "black" }
                      : { borderColor: "lightgray" },
                  ]}>
                  <TextInput
                    autoCorrect={false}
                    onFocus={() => setFirstnameFocused(true)}
                    onBlur={() => setFirstnameFocused(false)}
                    placeholder="First Name"
                    style={styles.input.input}
                    value={firstName}
                    onChangeText={(value) => setFirstname(value)}
                    ref={firstnameInput}
                    returnKeyType="next"
                    onSubmitEditing={() => {
                      lastnameInput.current.focus();
                    }}
                  />
                </View>
              </View>
              {/* Last Name Input */}
              <View className="flex flex-col space-y-2">
                <Text className="text-roster-gray text-lg">
                  Last Name<Text className="text-green"> *</Text>
                </Text>
                <View
                  style={[
                    styles.input.inputContainer,
                    lastnameFocused || lastName
                      ? { borderColor: "black" }
                      : { borderColor: "lightgray" },
                  ]}>
                  <TextInput
                    autoCorrect={false}
                    onFocus={() => setLastnameFocused(true)}
                    onBlur={() => setLastnameFocused(false)}
                    placeholder="First Name"
                    style={styles.input.input}
                    value={lastName}
                    onChangeText={(value) => setLastname(value)}
                    ref={lastnameInput}
                    returnKeyType="done"
                  />
                </View>
              </View>
            </View>
          </KeyboardAwareScrollView>
        </ScrollView>
        <TouchableOpacity
          disabled={loading || disableButton}
          className={`flex items-center justify-center h-14 rounded-lg mb-2 ${
            disableButton ? "bg-roster-offwhite border-2 border-[#cacaca]" : "bg-roster-gray"
          }`}
          onPress={() => updateProfile({ username, firstName, lastName })}>
          {loading ? (
            <Loading dotColor="#FAFAFA" />
          ) : (
            <Text
              className={`text-lg font-bold ${disableButton ? "text-[#cacaca]" : "text-offwhite"}`}>
              Save Profile
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
