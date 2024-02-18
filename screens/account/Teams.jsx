import React, { useEffect, useState } from "react";
import { View, SafeAreaView, ScrollView, Text, TouchableOpacity } from "react-native";
import BackArrow from "../../components/icons/general/BackArrow";
import { getUserTeams } from "../../lib/supbase/Account";

const Teams = ({ route, navigation }) => {
  const { session } = route.params;
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const getTeams = async () => {
      const result = await getUserTeams(session.user.id);
      if (result) {
        console.log("RESULT: ", result);
        setTeams(result);
      } else {
        setTeams(false);
      }
      console.log("TEAM DATA: ", teams);
    };

    getTeams();
  }, []);

  return (
    <SafeAreaView className="flex-1 flex-col bg-roster-offwhite">
      <View className="flex flex-row w-full items-center">
        <View className="flex flex-row w-1/3 justify-start items-center">
          <TouchableOpacity className="w-10 py-3 ml-6" onPress={() => navigation.goBack()}>
            <BackArrow />
          </TouchableOpacity>
        </View>
        <View className="flex flex-row w-1/3 items-center justify-center">
          <Text className="text-2xl font-semibold text-black">Teams</Text>
        </View>
        <View className="flex flex-row w-1/3"></View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
        }}>
        {teams.map((team, index) => (
          <View key={index}>
            <Text>{team.team_name}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Teams;
