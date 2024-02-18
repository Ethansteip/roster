import React, { useState, useEffect, useRef } from "react";
import { View, TouchableOpacity, SafeAreaView, Text, TextInput } from "react-native";
import { useDebounce } from "../../lib/hooks/hooks";
import { validateUsername } from "../../lib/supbase/Account";
import BackArrow from "../../components/icons/general/BackArrow";
import Avatar from "../../components/account/avatar";
import styles from "../../styles/forms";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Loading from "../../components/icons/general/loading";

const Profile = ({ route, navigation }) => {
  const { userData } = route.params;

  const [firstName, setFirstName] = useState(userData.firstName);
  const [lastName, setLastName] = useState(userData.lastName);
  const [username, setUsername] = useState(userData.username);
  const [usernameValid, setUsernameValid] = useState({ valid: true, message: "" });
  const [email, setEmail] = useState(userData.email);
  const [avatarSrc, setAvatarSrc] = useState(userData.avatarSrc);
  const [loading, setLoading] = useState(false);

  const firstNameInput = useRef();
  const lastNameInput = useRef();

  const disableButton = !username || !firstName || !lastName;
  const debouncedSearch = useDebounce(username);

  useEffect(async () => {
    const validUsernameResult = await validateUsername(username, userData.username);
    setUsernameValid(validUsernameResult);
  }, [debouncedSearch]);

  return (
    <SafeAreaView className="flex-1 flex-col bg-roster-offwhite">
      <TouchableOpacity className="w-10 py-3 ml-6" onPress={() => navigation.goBack()}>
        <BackArrow />
      </TouchableOpacity>
      <KeyboardAwareScrollView extraHeight={250}>
        {/* Profile pic, username, first/last name */}
        <View className="flex flex-col justify-center items-center">
          <TouchableOpacity>
            <Avatar editable={true} size={120} src={avatarSrc} />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-roster-gray mt-2 h-[30px]">{username}</Text>
          <Text className="text-sm text-gray-400 h-[18px]">
            {firstName} {lastName}
          </Text>
        </View>

        <View className="flex flex-col space-y-3 mt-3 px-8">
          <View className="flex flex-col space-y-3">
            {/* Email */}
            <View className="flex flex-col space-y-1">
              <View className="flex flex-row w-full items-center justify-between">
                <Text className="text-gray-700 text-lg">Email</Text>
                <TouchableOpacity className="">
                  <Text className="text-sm text-blue-500">Update Email</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.input.inputContainer}>
                <TextInput
                  editable={false}
                  style={styles.input.input}
                  placeholder={email}
                  disabled={true}
                />
              </View>
            </View>
            {/* Username */}
            <View className="flex flex-col space-y-1">
              <View className="flex flex-row w-full justify-between">
                <Text className="text-roster-gray text-lg">Username</Text>
                <Text>{usernameValid.message}</Text>
              </View>
              <View style={[styles.input.inputContainer, { borderColor: "black" }]}>
                <TextInput
                  autoCorrect={false}
                  placeholderTextColor="lightgray"
                  placeholder="Username"
                  style={styles.input.input}
                  value={username}
                  onChangeText={(value) => setUsername(value)}
                  returnKeyType="next"
                  onSubmitEditing={() => firstNameInput.current.focus()}
                />
              </View>
            </View>
            {/* First Name */}
            <View className="flex flex-col space-y-1">
              <Text className="text-roster-gray text-lg">First Name</Text>
              <View style={[styles.input.inputContainer, { borderColor: "black" }]}>
                <TextInput
                  autoCorrect={false}
                  ref={firstNameInput}
                  placeholderTextColor="lightgray"
                  placeholder="First Name"
                  style={styles.input.input}
                  value={firstName}
                  onChangeText={(value) => setFirstName(value)}
                  returnKeyType="next"
                  onSubmitEditing={() => lastNameInput.current.focus()}
                />
              </View>
            </View>
            {/* Last Name */}
            <View className="flex flex-col space-y-1">
              <Text className="text-roster-gray text-lg">Last Name</Text>
              <View style={[styles.input.inputContainer, { borderColor: "black" }]}>
                <TextInput
                  autoCorrect={false}
                  ref={lastNameInput}
                  placeholderTextColor="lightgray"
                  placeholder="Last Name"
                  style={styles.input.input}
                  value={lastName}
                  onChangeText={(value) => setLastName(value)}
                  returnKeyType="done"
                />
              </View>
            </View>
          </View>
        </View>
        <TouchableOpacity
          disabled={loading || disableButton}
          className={`flex items-center justify-center h-14 mx-8 rounded-lg mt-10 ${
            disableButton ? "bg-roster-offwhite border-2 border-[#cacaca]" : "bg-roster-gray"
          }`}>
          {loading ? (
            <Loading dotColor="#FAFAFA" />
          ) : (
            <Text
              className={`text-lg font-bold ${
                disableButton ? "text-[#cacaca]" : "text-roster-offwhite"
              }`}>
              Save Profile
            </Text>
          )}
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Profile;
