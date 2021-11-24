import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS } from "../constants";

const CustomButton = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={props.onPress}>
        {props.children}
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
  },
});
