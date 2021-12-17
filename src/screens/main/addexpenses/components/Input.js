import React from "react";
import { TextInput } from "react-native";
import { SIZES, COLORS } from "../../../../constants";

const Input = ({ placeholder, onChange, value, ...props }) => {
  return (
    <TextInput
      placeholder={placeholder}
      onChangeText={onChange}
      value={value}
      style={{
        alignSelf: "center",
        paddingLeft: SIZES.padding * 0.6,
        color: COLORS.primary,
        backgroundColor: COLORS.darkgray2,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E9E9E9",
        width: 300,
        height: 40,
        margin: SIZES.padding * 0.3,
      }}
      {...props}
    />
  );
};

export default Input;
