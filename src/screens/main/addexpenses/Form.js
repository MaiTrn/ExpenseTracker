import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, Keyboard } from "react-native";
import firebase from "firebase";
require("firebase/firestore");
require("firebase/firebase-storage");
import { connect } from "react-redux";

import { COLORS, SIZES } from "../../../constants";
import { bindActionCreators } from "redux";
import { fetchCategories } from "../../../redux/actions";
import { Picker, Input, SaveButton, CancelButton } from "./components";

const Form = (props) => {
  //upload data
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [total, setTotal] = useState("");
  const [status, setStatus] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const currentDate = new Date();

  //pickers data
  const [categories, setCategories] = useState([]);
  const statusType = [
    { label: "Confirm", value: "C" },
    { label: "Pending", value: "P" },
  ];

  //keyboard state
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  useEffect(() => {
    //setting categories data for picker
    let c = props.categoriesData.map((item) => ({
      label: item.name,
      value: item.id,
    }));
    setCategories(c);

    //add keyboard listener
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
      Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
    };
  }, [props.categoriesData]);

  const _keyboardDidShow = () => setKeyboardOpen(true);
  const _keyboardDidHide = () => setKeyboardOpen(false);

  const setExpenseName = (text) => {
    if (text.length <= 20) {
      setTitle(text);
      setErrorMsg("");
    } else {
      setErrorMsg("Title cannot be longer than 20 words!");
    }
  };
  const setExpenseDescription = (text) => {
    if (text.length <= 60) {
      setDescription(text);
      setErrorMsg("");
    } else {
      setErrorMsg("Decription cannot be longer than 60 words!");
    }
  };

  const setExpenseLocation = (text) => {
    if (text.length <= 30) {
      setLocation(text);
      setErrorMsg("");
    } else {
      setErrorMsg("Location cannot be longer than 30 words!");
    }
  };

  const saveExpenseData = () => {
    if (
      selectedCategory.length === 0 ||
      title.length === 0 ||
      total.length === 0 ||
      status.length === 0 ||
      description.length === 0 ||
      location.length === 0
    ) {
      setErrorMsg("Please fill in the necessary data!");
    } else {
      firebase
        .firestore()
        .collection("usersData")
        .doc(firebase.auth().currentUser.uid)
        .collection("expensesData")
        .doc(selectedCategory)
        .collection("expenses")
        .add({
          title,
          description,
          location,
          total: Number(total),
          status,
          creation: {
            date: currentDate.getDate(),
            month: currentDate.getMonth() + 1,
            year: currentDate.getFullYear(),
          },
        })
        .then(function () {
          props.fetchCategories();
          props.navigation.popToTop();
        });
    }
  };

  return (
    <View
      style={{
        flex: 1,
        padding: SIZES.padding,
        backgroundColor: COLORS.white,
      }}
    >
      <Picker
        value={selectedCategory}
        items={categories}
        setValue={setSelectedCategory}
        placeholder="Category"
      />
      <Input
        placeholder="Title"
        onChange={(text) => setExpenseName(text)}
        value={title}
      />
      <Input
        placeholder="Description"
        onChange={(text) => setExpenseDescription(text)}
        value={description}
      />
      <Input
        placeholder="Location"
        onChange={(text) => setExpenseLocation(text)}
        value={location}
      />
      <Input
        placeholder="Amount"
        onChange={(text) => setTotal(text)}
        keyboardType="numeric"
        value={total}
      />
      <Picker
        value={status}
        items={statusType}
        setValue={setStatus}
        placeholder="Status"
      />
      <Text
        style={{
          fontStyle: "italic",
          color: COLORS.red,
          marginLeft: 30,
          marginTop: 5,
        }}
      >
        {errorMsg}
      </Text>

      <View
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          marginBottom: keyboardOpen ? 25 : 50,
          marginRight: 25,
          flexDirection: "row",
        }}
      >
        <CancelButton onPress={() => props.navigation.goBack()} />
        <SaveButton onPress={() => saveExpenseData()} />
      </View>
    </View>
  );
};

const mapStateToProps = (store) => ({
  categoriesData: store.categoriesData,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ fetchCategories }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Form);

const styles = StyleSheet.create({
  captionContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    width: SIZES.width,
    marginVertical: SIZES.padding * 1.8,
    paddingHorizontal: SIZES.padding,
  },
  saveButton: {
    paddingVertical: SIZES.padding * 0.8,
    paddingHorizontal: SIZES.padding,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  textInput: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.darkgray,
    padding: SIZES.padding * 0.8,
    width: 300,
    justifyContent: "center",
    alignItems: "center",
  },
});
