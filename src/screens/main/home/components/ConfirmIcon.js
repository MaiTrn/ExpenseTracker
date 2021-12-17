import React from "react";
import { View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS } from "../../../../constants";

const ConfirmIcon = () => {
  return (
    <View
      style={{
        height: 120,
        width: 120,
        borderRadius: 60,
        backgroundColor: COLORS.lightgreen,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          height: 100,
          width: 100,
          borderRadius: 50,
          backgroundColor: COLORS.white,
          opacity: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MaterialCommunityIcons
          name={"check"}
          color={COLORS.lightgreen}
          size={80}
        />
      </View>
    </View>
  );
};

export default ConfirmIcon;
