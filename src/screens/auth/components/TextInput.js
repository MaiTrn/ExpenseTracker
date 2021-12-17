import React from "react";
import { View, StyleSheet, TextInput as RNTextInput } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { COLORS, SIZES } from "../../../constants";

const TextInput = React.forwardRef(
  ({ icon, touched, errors, ...props }, ref) => {
    const color = !touched
      ? COLORS.darkGray
      : errors
      ? COLORS.danger
      : COLORS.valid;
    return (
      <View style={{ borderColor: color, ...styles.container }}>
        <MaterialCommunityIcons
          name={icon}
          size={16}
          color={color}
          style={{ paddingHorizontal: SIZES.borderRadius.s }}
        />
        <RNTextInput
          underlineColorAndroid="transparent"
          placeholderTextColor={color}
          style={styles.textInput}
          ref={ref}
          {...props}
        />
        {touched && (
          <MaterialCommunityIcons
            name={errors ? "close-circle" : "check-circle"}
            size={18}
            color={color}
            style={{ paddingHorizontal: SIZES.borderRadius.s }}
          />
        )}
      </View>
    );
  }
);

export default TextInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: 320,
    height: 48,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: SIZES.borderRadius.s,
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding,
    alignItems: "center",
    marginBottom: SIZES.borderRadius.m,
  },
  textInput: {
    width: 250,
    height: 50,
    color: COLORS.primary,
  },
});
