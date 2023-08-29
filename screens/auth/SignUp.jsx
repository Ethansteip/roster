import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity } from "react-native";

export default function SignUp() {
  //const [text, onChangeText] = useState("");
  //const [number, onChangeNumber] = useState("");

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.signupContainer}>
        <Text style={styles.heading}>Sign Up</Text>
        <View style={styles.inputsContainer}>
          <TextInput style={styles.input} placeholder="First Name"></TextInput>
          <TextInput style={styles.input} placeholder="Last Name"></TextInput>
          <TextInput style={styles.input} placeholder="Email"></TextInput>
          <TextInput secureTextEntry={true} style={styles.input} placeholder="Password"></TextInput>
          <TextInput
            secureTextEntry={true}
            style={styles.input}
            placeholder="Confirm password"></TextInput>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#ffe294",
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
  },
  signupContainer: {
    flexDirection: "column",
    paddingHorizontal: 20,
    height: "auto",
  },
  heading: {
    fontWeight: "500",
    fontSize: 30,
    marginBottom: 25,
  },
  inputsContainer: {
    flexDirection: "column",
  },
  input: {
    paddingBottom: 3,
    marginBottom: 15,
    borderBottomWidth: 2,
    borderColor: "rgba(0,0,0,0.18)",
    fontSize: 20,
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingVertical: 15,
    backgroundColor: "black",
    borderRadius: 12,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 18,
  },
});
