import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { COLORS, FONTS } from "../../../../constants";

const CancelButton = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        alignItems: "center",
        justifyContent: "center",
        height: 45,
        width: 110,
        marginRight: 5,
      }}
    >
      <Text style={{ ...FONTS.h3, color: COLORS.primary }}>CANCEL</Text>
    </TouchableOpacity>
  );
};

export default CancelButton;
