import React from "react";
import { View } from "react-native";

import { COLORS } from "../../../constants";
import Header from "./Header";
import Form from "./Form";

const AddExpense = (props) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.lightGray2,
      }}
    >
      <Header />
      <Form navigation={props.navigation} />
    </View>
  );
};

export default AddExpense;
