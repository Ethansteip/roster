import React, { useEffect, useState } from "react";
import { View, SafeAreaView, Text, TouchableOpacity, ScrollView } from "react-native";
import { getAccountData } from "../../lib/supbase/Account";
import Avatar from "../../components/account/avatar";
import Wins from "../../components/account/Wins";
import BackArrow from "./../../components/icons/general/BackArrow";
import PersonalInformation from "../../components/account/PersonalInformation";
import UtilitiesList from "../../components/account/UtilitiesList";
import { MaterialIcons } from "@expo/vector-icons";

export default function AccountPage({ route, navigation }) {
  const { session } = route.params;
  const [avatarSrc, setAvatarSrc] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchAccountData = async () => {
      const accountData = await getAccountData(session.user.id);
      if (accountData) {
        setAvatarSrc(accountData.avatar_url);
        setUsername(accountData.username);
        setFirstName(accountData.first_name);
        setLastName(accountData.last_name);
        setEmail(accountData.email);
      }
    };

    fetchAccountData();
  }, []);

  return (
    <SafeAreaView className="flex-1 flex-col bg-roster-offwhite">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
        }}>
        {/* Profile pic */}
        <View className="flex flex-col justify-center items-center pt-10">
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Profile", {
                userData: { firstName, lastName, email, username, avatarSrc },
              })
            }>
            <Avatar editable={false} size={120} src={avatarSrc} />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-roster-gray mt-2">{username}</Text>
          <Text className="text-sm text-gray-400">
            {firstName} {lastName}
          </Text>
          <Wins wins={100} />
        </View>

        {/* Personal Information Section */}
        <View className="flex flex-col w-full justify-center items-center px-8 mt-8">
          <View className="flex flex-row w-full items-center justify-between mb-2 px-1">
            <Text className="flex justify-start text-[16px] text-black">Personal Information</Text>
            <TouchableOpacity
              className="flex flex-row space-x-1"
              onPress={() =>
                navigation.navigate("Profile", {
                  userData: { firstName, lastName, email, username, avatarSrc },
                })
              }>
              <MaterialIcons name="edit" size={16} color="#3b82f6" />
              <Text className="text-blue-500">Edit</Text>
            </TouchableOpacity>
          </View>
          <View className="flex flex-col w-full border-2 border-gray-200 rounded-lg">
            <PersonalInformation
              email={email}
              firstName={firstName}
              lastName={lastName}
              username={username}
            />
          </View>
        </View>

        {/* Utilities Section */}
        <View className="flex flex-col w-full justify-center items-center px-8 mt-6">
          <View className="flex flex-row w-full items-center justify-start mb-2 px-1">
            <Text className="flex justify-start text-[16px] text-black">Utilities</Text>
          </View>
          <View className="flex flex-col w-full border-2 border-gray-200 rounded-lg">
            <UtilitiesList navigation={navigation} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
