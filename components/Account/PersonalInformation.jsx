import React from "react";
import { View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const PersonalInformation = ({
  firstName,
  lastName,
  username,
  email = "test@aol.com",
  location = "Nigara Falls, On",
}) => {
  return (
    <>
      {/* Email */}
      <View className="flex flex-row items-center justify-between w-full p-3 border-b border-gray-200">
        <View className="flex flex-row items-center space-x-2">
          <Feather name="mail" size={22} color="black" />
          <Text>Email</Text>
        </View>
        <Text>{email}</Text>
      </View>
      {/* Username */}
      <View className="flex flex-row items-center justify-between w-full px-3 py-2 border-b border-gray-200">
        <View className="flex flex-row items-center space-x-2">
          <Feather name="user" size={22} color="black" />
          <Text>Username</Text>
        </View>
        <Text>{username}</Text>
      </View>
      {/* First Name */}
      <View className="flex flex-row items-center justify-between w-full px-3 py-2 border-b border-gray-200">
        <View className="flex flex-row items-center space-x-2">
          <Feather name="user" size={22} color="black" />
          <Text>Name</Text>
        </View>
        <Text>
          {firstName} {lastName}
        </Text>
      </View>
      {/* Location */}
      <View className="flex flex-row items-center justify-between w-full px-3 py-2">
        <View className="flex flex-row items-center space-x-2">
          <Ionicons name="location-sharp" size={22} color="black" />
          <Text>Location</Text>
        </View>
        <Text>{location}</Text>
      </View>
    </>
  );
};

export default PersonalInformation;
