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
import SuccessModal from "../../components/forms/modal";
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
  const [avatarImage, setAvatarImage] = useState(null);
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

  useEffect(() => {
    const unsubscribe = navigation.addListener("transitionEnd", (e) => {
      usernameInput.current?.focus();
    });

    return unsubscribe;
  }, [navigation]);

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

      // upload avatar
      await uploadAvatar();
      // Retrieve uploaded avatar url
      const { data: avatar } = await supabase.storage
        .from("avatares")
        .getPublicUrl(`${session?.user.email}.png`);

      setAvatarUrl(avatar);

      const updates = {
        id: session?.user.id,
        username,
        first_name: firstName,
        last_name: lastName,
        avatar_url,
        updated_at: new Date(),
      };

      await uploadAvatar();
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
        // setShowUsernameMessage(false);
        // setmodalText("Successfully saved profile.");
        // setModalSuccess(true);
        // setModalVisible(true);
        // setTimeout(() => {
        //   setModalVisible(false);
        //   navigation.navigate("GetStarted");
        // }, 1500);
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
      setAvatarImage(result.assets[0].base64);
      return result;
    }
  }

  async function uploadAvatar() {
    try {
      const { error } = await supabase.storage
        .from("avatars")
        .upload(`${session?.user.email}.png`, decode(avatarImage), {
          contentType: "image/png",
        });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      console.log("FINISHED UPLOADING IMAGE!");
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
                <Text className="text-gray-100 text-lg">Email</Text>
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
                <Text className="text-gray-100 text-lg">
                  Username<Text className="text-green"> *</Text>
                </Text>
                {/* Email Input */}
                <View
                  style={[
                    styles.input.inputContainer,
                    usernameFocused ? { borderColor: "#4bad9c" } : { borderColor: "lightgray" },
                  ]}>
                  <TextInput
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
                <Text className="text-gray-100 text-lg">
                  First Name<Text className="text-green"> *</Text>
                </Text>
                <View
                  style={[
                    styles.input.inputContainer,
                    firstnameFocused ? { borderColor: "#4bad9c" } : { borderColor: "lightgray" },
                  ]}>
                  <TextInput
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
                <Text className="text-gray-100 text-lg">
                  Last Name<Text className="text-green"> *</Text>
                </Text>
                <View
                  style={[
                    styles.input.inputContainer,
                    lastnameFocused ? { borderColor: "#4bad9c" } : { borderColor: "lightgray" },
                  ]}>
                  <TextInput
                    onFocus={() => setLastnameFocused(true)}
                    onBlur={() => setLastnameFocused(false)}
                    placeholder="First Name"
                    style={styles.input.input}
                    value={lastName}
                    onChangeText={(value) => setLastname(value)}
                    ref={lastnameInput}
                    returnKeyType="next"
                  />
                </View>
              </View>
            </View>
          </KeyboardAwareScrollView>
        </ScrollView>
        <TouchableOpacity
          disabled={loading || disableButton}
          className={` w-full items-center justify-center h-14 rounded-lg mb-2 ${
            disableButton
              ? "bg-offwhite border-2 border-[#cacaca]"
              : "bg-offwhite border-2 border-blue"
          }`}
          onPress={() => updateProfile({ username, firstName, lastName })}>
          {loading ? (
            <Loading dotColor="#363D4F" />
          ) : (
            <Text className={`text-lg font-bold ${disableButton ? "text-[#cacaca]" : "text-gray"}`}>
              Save Profile
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
