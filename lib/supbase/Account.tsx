import { Alert } from "react-native";
import { supabase } from "./supabase";
import { User } from "@supabase/supabase-js";

interface AccountData {
  avatar_url: string;
  username: string;
  first_name: string;
  last_name: string;
}

const getAvatar = async (user: string): Promise<string | void> => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("avatar_url")
      .eq("id", user)
      .single();

    if (error) {
      Alert.alert("Error", error.message);
      return;
    }

    if (!data || !data.avatar_url) {
      // Handle the case where there is no data or avatar_url is not present
      Alert.alert("Info", "No avatar found for this user.");
      return;
    }

    return data.avatar_url;
  } catch (error: any) {
    Alert.alert("Error", error.message);
  }
};

const getAccountData = async (user: string): Promise<AccountData | void> => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("username, avatar_url, first_name, last_name")
      .eq("id", user)
      .single();

    if (error) {
      Alert.alert("Error", error.message);
      return;
    }

    if (!data) {
      // Handle the case where there is no data or avatar_url is not present
      Alert.alert("Info", "No data found for this user.");
      return;
    }

    return data;
  } catch (error: any) {
    Alert.alert("Error", error.message);
  }
};

export { getAvatar, getAccountData };
