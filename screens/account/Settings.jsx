import React from "react";
import { View, SafeAreaView, ScrollView, Text, TouchableOpacity } from "react-native";
import BackArrow from "../../components/icons/general/BackArrow";

const Settings = ({ navigation }) => {
  return (
    <SafeAreaView className="flex-1 flex-col bg-roster-offwhite">
      <View className="flex flex-row w-full items-center">
        <TouchableOpacity className="w-10 py-3 ml-6" onPress={() => navigation.goBack()}>
          <BackArrow />
        </TouchableOpacity>
        <Text className="text-2xl font-semibold text-black">Settings</Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
        }}></ScrollView>
    </SafeAreaView>
  );
};

export default Settings;
