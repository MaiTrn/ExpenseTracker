import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { COLORS, FONTS, SIZES } from "../../constants";

const bg = require("../../../assets/images/bg.png");

const Landing = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={bg}
        style={{
          position: "absolute",
          width: SIZES.width,
          height: SIZES.height + 50,
        }}
      />

      <Text
        style={{
          ...FONTS.h1,
          fontSize: 40,
          color: COLORS.primary,
          paddingVertical: 20,
        }}
      >
        Expense tracker
      </Text>
      <Text style={{ ...FONTS.h2, color: COLORS.black, paddingVertical: 20 }}>
        Keep track of your spendings monthly
      </Text>
      <Text style={{ ...FONTS.h2, color: COLORS.black, paddingVertical: 20 }}>
        Anywhere, Anytime
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={{ color: COLORS.white, ...FONTS.body3 }}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={{ color: COLORS.white, ...FONTS.body3 }}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Landing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.gray,
  },
  button: {
    width: 150,
    height: 40,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.borderRadius.xl,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
});
