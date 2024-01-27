import React from "react";
import { View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import ArrowRight from "../icons/general/arrow-right";
import { MaterialIcons } from "@expo/vector-icons";
import { signOut } from "../../lib/supbase/Account";
import { TouchableOpacity } from "react-native-gesture-handler";

const UtilitiesList = ({ navigation }) => {
  return (
    <>
      {/* Settings */}
      <TouchableOpacity
        onPress={() => navigation.navigate("Settings")}
        className="flex flex-row items-center justify-between w-full p-3 border-b border-gray-200">
        <View className="flex flex-row items-center space-x-2">
          <Feather name="settings" size={22} color="black" />
          <Text>Settings</Text>
        </View>
        <ArrowRight colour="#1d4ed8" size={16} />
      </TouchableOpacity>
      {/* Teams */}
      <TouchableOpacity className="flex flex-row items-center justify-between w-full px-3 py-2 border-b border-gray-200">
        <View className="flex flex-row items-center space-x-2">
          <Feather name="users" size={24} color="black" />
          <Text>Teams</Text>
        </View>
        <ArrowRight colour="#1d4ed8" size={16} />
      </TouchableOpacity>
      {/* Signout */}
      <TouchableOpacity
        onPress={() => signOut()}
        className="flex flex-row items-center justify-between w-full px-3 py-2">
        <View className="flex flex-row items-center space-x-2">
          <MaterialIcons name="logout" size={24} color="black" />
          <Text>Sign out</Text>
        </View>
        <ArrowRight colour="#1d4ed8" size={16} />
      </TouchableOpacity>
    </>
  );
};

export default UtilitiesList;
