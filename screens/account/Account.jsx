import React, { useEffect, useState } from "react";
import { View, SafeAreaView, Text, TouchableOpacity } from "react-native";
import { getAccountData } from "../../lib/supbase/Account";
import { supabase } from "../../lib/supbase/supabase";
import Avatar from "../../components/account/avatar";
import Wins from "../../components/account/Wins";
import AccountListItem from "../../components/account/AccountListItem";

const Account = (session, navigation) => {
  const [avatarSrc, setAvatarSrc] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    console.log("NAVIGATION: ", navigation);
    const fetchAccountData = async () => {
      const accountData = await getAccountData(session.user.id);
      if (accountData) {
        setAvatarSrc(accountData.avatar_url);
        setUsername(accountData.username);
        setFirstName(accountData.first_name);
        setLastName(accountData.last_name);
      }
    };

    fetchAccountData();
  }, []);

  return (
    <SafeAreaView className="flex-1 flex-col bg-roster-offwhite">
      {/* Profile pic */}
      <View className="flex flex-col p-5 justify-center items-center mt-10">
        <Avatar editable={true} size={120} src={avatarSrc} />
        <Text className="text-2xl font-bold text-roster-gray mt-2">{username}</Text>
        <Text className="text-sm text-gray-400">
          {firstName} {lastName}
        </Text>
        <Wins wins={100} />
      </View>

      {/* List Items */}
      <View className="flex mt-5 flex-col justify-center items-center border-2 border-gray-400 mx-10 rounded-xl">
        <TouchableOpacity onPress={() => navigation.navigate("Profile")} className="flex flex-row">
          <AccountListItem title="Profile" icon="user" />
        </TouchableOpacity>
        <TouchableOpacity className="flex flex-row">
          <AccountListItem title="Settings" icon="settings" />
        </TouchableOpacity>
        <TouchableOpacity className="flex flex-row">
          <AccountListItem title="Join team" icon="arrow-left" />
        </TouchableOpacity>
        <TouchableOpacity
          className="w-full items-center justify-end p-3 rounded-lg bg-gray"
          onPress={() => supabase.auth.signOut()}>
          <Text className="text-lg font-bold text-offwhite">Sign Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Account;
