import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../../../constants";

const SaveButton = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.container, styles.shadow]}
    >
      <Text style={{ ...FONTS.h3, color: COLORS.white }}>SAVE</Text>
    </TouchableOpacity>
  );
};

export default SaveButton;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: 45,
    width: 110,
    backgroundColor: COLORS.secondary,
    borderRadius: 12,
  },
});
