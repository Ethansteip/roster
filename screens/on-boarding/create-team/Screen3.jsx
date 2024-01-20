import React from "react";
import { View, Alert, Text, SafeAreaView, TouchableOpacity, Share } from "react-native";
import TeamCode from "../../../components/on-boarding/team-code";

import BackArrow from "../../../components/icons/general/BackArrow";

const Screen3 = ({ navigation, route }) => {
  const { name, team_code } = route.params[0];

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `You are invited to join the ${name} roster! Start by downloading the roster app, then sign up and join the team using this secret code - ${team_code}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  return (
    <SafeAreaView className="flex h-full w-full flex-col justify-between">
      <View className="flex h-1/2 flex-col justify-center items-center">
        {/* Celebreate icon */}
        <View className="bg-green h-[100px] w-[100px] rounded-full flex items-center justify-center mb-3">
          <View className="bg-gray border-[4px] border-offwhite h-[90px] w-[90px] rounded-full flex items-center justify-center">
            <Text className="text-[40px]">🎉</Text>
          </View>
        </View>
        <Text className="text-3xl font-bold text-center text-green">Success!</Text>
        <Text className=" w-5/6 text-center text-gray">
          <Text className="font-bold">{name}</Text> have joined the big leagues! Use your seceret
          team code below to start inviting team mates to your roster!
        </Text>
        {/* Team Code */}
        <View className="flex flex-col space-y-2 items-center w-full h-auto p-5">
          <TeamCode teamName={team_code} />
        </View>
      </View>
      <View className="flex h-1/2 flex-col justify-end items-center mx-8 space-y-3 pb-5">
        <TouchableOpacity
          onPress={onShare}
          className="p-3 flex justify-center items-center border-2 border-blue indigo-900 border-black rounded-lg w-full">
          <Text className="text-lg font-bold text-gray">Invite Teammates</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          className="p-3 flex justify-center items-center bg-gray indigo-900 border-black rounded-lg w-full">
          <Text className="text-lg font-bold text-offwhite">Finish</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Screen3;
