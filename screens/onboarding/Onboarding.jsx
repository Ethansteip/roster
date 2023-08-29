import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

function OnBoardingScreen1({ navigation }) {
  return (
    <>
      <View style={styles.navigationDotsContainer}>
        <View style={[styles.navigationDots, styles.activeDot]} />
        <View style={styles.navigationDots} />
        <View style={styles.navigationDots} />
      </View>
      <View style={styles.mainContainer}>
        <Text style={styles.mainText}>Welcome To Roster</Text>
        <Text style={styles.subText}>
          The Easiest Way To Manage Your Intermural And Beer League Sports
        </Text>
      </View>
      <View style={styles.navigationContainer1}>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate("OnboardingScreen2")}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Auth", { screen: "SignUp" })}>
          <Text style={styles.skipButton}>Skip</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

function OnBoardingScreen2({ navigation }) {
  return (
    <>
      <View style={styles.navigationDotsContainer}>
        <View style={[styles.navigationDots, styles.activeDot]} />
        <View style={[styles.navigationDots, styles.activeDot]} />
        <View style={styles.navigationDots} />
      </View>
      <View style={styles.mainContainer}>
        <Text style={styles.mainText}>Team Management Made Easy</Text>
        <Text style={styles.subText}>
          Group Chat, Scheduling, league fees - We&apos;ve got you covered
        </Text>
      </View>
      <View style={styles.navigationContainer1}>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate("OnboardingScreen3")}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Auth", { screen: "SignUp" })}>
          <Text style={styles.skipButton}>Skip</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

function OnBoardingScreen3({ navigation }) {
  return (
    <>
      <View style={styles.navigationDotsContainer}>
        <View style={[styles.navigationDots, styles.activeDot]} />
        <View style={[styles.navigationDots, styles.activeDot]} />
        <View style={[styles.navigationDots, styles.activeDot]} />
      </View>
      <View style={styles.mainContainer}>
        <Text style={styles.mainText}>Game On!</Text>
        <Text style={styles.subText}>
          Stay up-to-date with real-time notifications and keep the competitive spirit alive.
        </Text>
      </View>
      <View style={styles.navigationContainer1}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Auth", { screen: "SignUp" })}
          style={styles.nextButton}>
          <Text style={styles.nextButtonText}>Get Started</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Auth", { screen: "SignUp" })}>
          <Text style={styles.skipButton}>Skip</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const Onboard = createNativeStackNavigator();

export default function Onboarding() {
  return (
    <Onboard.Navigator screenOptions={{ headerShown: false }} initialRouteName="OnboardingScreen1">
      <Onboard.Screen name="OnboardingScreen1" component={OnBoardingScreen1} />
      <Onboard.Screen name="OnboardingScreen2" component={OnBoardingScreen2} />
      <Onboard.Screen name="OnboardingScreen3" component={OnBoardingScreen3} />
    </Onboard.Navigator>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#ffe294",
    paddingHorizontal: 30,
  },
  navigationContainer1: {
    paddingVertical: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffe294",
  },
  navigationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  navigationDotsContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingVertical: 50,
    backgroundColor: "#ffe294",
  },
  navigationDots: {
    width: "30%",
    height: 7,
    marginHorizontal: 3,
    borderRadius: 10,
    backgroundColor: "rgba(0,0,0,0.18)",
  },
  activeDot: {
    backgroundColor: "#000000",
  },
  nextButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "94%",
    paddingVertical: 15,
    backgroundColor: "black",
    borderRadius: 12,
  },
  nextButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 18,
  },
  skipButton: {
    color: "black",
    fontSize: 15,
    paddingVertical: 13,
  },
  mainText: {
    fontWeight: "900",
    color: "white",
    fontSize: 50,
    lineHeight: 50,
  },
  subText: {
    fontWeight: "300",
    color: "#707070",
    fontSize: 20,
    lineHeight: 25,
    paddingVertical: 10,
  },
});
