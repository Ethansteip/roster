// Card.js
import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  withSpring,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";

const Card = () => {
  const translateY = useSharedValue(50);
  const opacity = useSharedValue(0);
  const shadowOpacity = useSharedValue(0);

  useEffect(() => {
    translateY.value = withSpring(1, {
      mass: 1,
      damping: 50,
      stiffness: 100,
      overshootClamping: false,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 2,
    });
    opacity.value = withTiming(1, { duration: 500 });
    shadowOpacity.value = withTiming(0.5, { duration: 500 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
      opacity: opacity.value,
      shadowOpacity: shadowOpacity.value,
    };
  });

  return (
    <Animated.View style={[styles.card, animatedStyle]}>
      <Text style={styles.text}>Welcome Ethan</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "black",
    padding: 20,
    borderRadius: 10,
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 5,
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default Card;
