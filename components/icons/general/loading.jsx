import React, { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
} from "react-native-reanimated";

const Dot = ({ color, delay }) => {
  const translateY = useSharedValue(0);

  useEffect(() => {
    translateY.value = withDelay(
      delay,
      withRepeat(
        withSequence(withTiming(-6, { duration: 400 }), withTiming(0, { duration: 500 })),
        -1, // repeat indefinitely
        true // reverse the animation
      )
    );
  }, [delay, translateY]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <Animated.View
      style={[
        {
          height: 10,
          width: 10,
          borderRadius: 5,
          backgroundColor: color,
          margin: 5,
        },
        animatedStyle,
      ]}
    />
  );
};

const Loading = ({ dotColor = "black" }) => {
  return (
    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
      <Dot color={dotColor} delay={0} />
      <Dot color={dotColor} delay={100} />
      <Dot color={dotColor} delay={200} />
    </View>
  );
};

export default Loading;
