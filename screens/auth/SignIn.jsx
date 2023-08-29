import React from "react";
import { View, Text, StyleSheet } from "react-native";



export default function SignIn() {
  return (
      <View style={styles.mainContainer}>
        <Text>Sign In Page</Text>
      </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})