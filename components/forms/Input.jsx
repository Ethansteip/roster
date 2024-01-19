import React, { forwardRef, useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

// eslint-disable-next-line react/display-name
const InputField = forwardRef(({ showIcon, iconColour, style, ...rest }, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.inputContainer, style]}>
      {showIcon && (
        <MaterialIcons
          name="email" // Assuming the icon is always an email icon, change as needed
          size={24}
          color={isFocused ? iconColour : "grey"}
          style={styles.icon}
        />
      )}
      <TextInput
        ref={ref}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={styles.input}
        {...rest}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
});

export { InputField };
