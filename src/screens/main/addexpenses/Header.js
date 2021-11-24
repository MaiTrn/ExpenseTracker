import React from "react";
import { View, Text } from "react-native";
import { SIZES, COLORS, FONTS } from "../../../constants";

const Header = () => {
  return (
    <View
      style={{
        padding: SIZES.padding,
        backgroundColor: COLORS.white,
        paddingTop: 30,
      }}
    >
      <Text style={{ color: COLORS.primary, ...FONTS.h2 }}>ADD BUDGET</Text>
    </View>
  );
};

export default Header;
