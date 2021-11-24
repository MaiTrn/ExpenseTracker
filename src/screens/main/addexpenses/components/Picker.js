import React, { useState, useCallback } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { COLORS, SIZES, FONTS } from "../../../../constants";

const Picker = (props) => {
  //open and close status
  const [open, setOpen] = useState(false);

  return (
    <DropDownPicker
      open={open}
      setOpen={setOpen}
      value={props.value}
      items={props.items}
      setValue={props.setValue}
      placeholder={props.placeholder}
      zIndex={1000}
      zIndexInverse={2000}
      dropDownContainerStyle={{
        margin: SIZES.padding * 0.2,
        width: 300,
        alignSelf: "center",
        borderRadius: 15,
        borderColor: "#E9E9E9",
        backgroundColor: COLORS.darkgray2,
      }}
      style={{
        backgroundColor: COLORS.darkgray2,
        margin: SIZES.padding * 0.3,
        width: 300,
        height: 40,
        alignSelf: "center",
        borderRadius: 12,
        borderColor: "#E9E9E9",
      }}
      textStyle={{
        color: COLORS.primary,

        ...FONTS.body4,
      }}
    />
  );
};

export default Picker;
