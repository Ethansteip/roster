import { Alert } from "react-native";
import { supabase } from "./supabase";

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
      .select("username, avatar_url, first_name, last_name, email")
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

const signOut = async () => await supabase.auth.signOut();

const validateUsername = async (username: string, originalUsername: string) => {
  let result = {};
  if (username === originalUsername) {
    result = { valid: true, message: "" };
    return result;
  }
  if (username.length < 3) {
    result = { valid: false, message: "Username must be 3 or more characters." };
    return result;
  }

  try {
    const { data } = await supabase.from("profiles").select().eq("username", username);
    console.log("USERNAME QUERY RESULT: ", data);
    if (data) {
      result = { valid: false, message: "Username already taken" };
      return result;
    }
    return { valid: true, message: "" };
  } catch (error) {
    console.error("Error on validateUsername: ", error);
    return Alert.alert(error.message);
  }
};

const getUserTeams = async (userId: string) => {
  try {
    const { data, error } = await supabase.from("rosters").select("*").eq("player_id", userId);

    if (error) {
      Alert.alert("Error", error.message);
      return;
    }

    if (!data) {
      return false;
    }
    return data;
  } catch (error) {
    Alert.alert("Error", error.message);
    return false;
  }
};

export { getAvatar, getAccountData, signOut, validateUsername, getUserTeams };
