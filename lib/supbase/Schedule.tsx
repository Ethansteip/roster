import { supabase } from "./supabase";
import { Alert } from "react-native";

export default async function getEvents(teamId: number) {
  try {
    const { data, error } = await supabase.from("events").select().eq("team_id", teamId);

    if (error) {
      Alert.alert("Error", error.message);
      return;
    }

    if (!data) {
      Alert.alert("Info", "No data found for this user.");
      return;
    }

    return data;
  } catch (error: any) {
    Alert.alert("Error", error.message);
    return;
  }
}
