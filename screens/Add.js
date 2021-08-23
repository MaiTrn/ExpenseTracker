import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Platform,
  Keyboard,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import firebase from "firebase";
require("firebase/firestore");
require("firebase/firebase-storage");
import { connect } from "react-redux";

import { COLORS, FONTS, SIZES } from "../constants";
import { bindActionCreators } from "redux";
import { fetchCategories } from "../redux/actions";

const Add = (props) => {
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

  //open and close status
  const [openC, setOpenC] = useState(false);
  const [openS, setOpenS] = useState(false);

  //keyboard state
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  useEffect(() => {
    //setting categories data for picker
    let categories = props.categoriesData.map((item) => ({
      label: item.name,
      value: item.id,
    }));
    setCategories(categories);

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

  const onCategoryOpen = useCallback(() => {
    setOpenS(false);
  }, []);

  const onStatusOpen = useCallback(() => {
    setOpenC(false);
  }, []);

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

  function renderHeader() {
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
  }

  function renderAddBudget() {
    return (
      <View
        style={{
          flex: 1,
          padding: SIZES.padding,
          backgroundColor: COLORS.white,
        }}
      >
        <DropDownPicker
          open={openC}
          onOpen={onCategoryOpen}
          value={selectedCategory}
          items={categories}
          setOpen={setOpenC}
          setValue={setSelectedCategory}
          placeholder="Category"
          zIndex={2000}
          zIndexInverse={1000}
          dropDownContainerStyle={{
            margin: SIZES.padding * 0.2,
            width: 300,
            alignSelf: "center",
            backgroundColor: COLORS.darkgray2,
            borderRadius: 15,
            borderColor: "#E9E9E9",
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

            ...FONTS.h4,
          }}
        />
        <TextInput
          placeholder="Title"
          onChangeText={(text) => setExpenseName(text)}
          value={title}
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
        />
        <TextInput
          placeholder="Description"
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
          onChangeText={(text) => setExpenseDescription(text)}
          value={description}
        />
        <TextInput
          placeholder="Location"
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
          onChangeText={(text) => setExpenseLocation(text)}
          value={location}
        />
        <TextInput
          placeholder="Amount"
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
          onChangeText={(text) => setTotal(text)}
          keyboardType="numeric"
          value={total}
        />

        <DropDownPicker
          open={openS}
          onOpen={onStatusOpen}
          value={status}
          items={statusType}
          setOpen={setOpenS}
          setValue={setStatus}
          placeholder="Status"
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
          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
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
          <TouchableOpacity
            onPress={() => saveExpenseData()}
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: 45,
              width: 110,
              backgroundColor: COLORS.secondary,
              borderRadius: 12,
              ...styles.shadow,
            }}
          >
            <Text style={{ ...FONTS.h3, color: COLORS.white }}>SAVE</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,

        backgroundColor: COLORS.lightGray2,
      }}
    >
      {renderHeader()}
      {renderAddBudget()}
    </View>
  );
};

const mapStateToProps = (store) => ({
  categoriesData: store.categoriesData,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ fetchCategories }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Add);

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
