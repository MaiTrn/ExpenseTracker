import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import firebase from "firebase";
require("firebase/firestore");
require("firebase/firebase-storage");
import { connect } from "react-redux";

import { COLORS, FONTS, SIZES } from "../constants";
import { bindActionCreators } from "redux";
import { fetchExpenses } from "../redux/actions";

const Add = (props) => {
  //upload data
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [total, setTotal] = useState("");
  const [status, setStatus] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  //pickers data
  const [categoryNames, setCategoryNames] = useState([]);
  const statusType = [
    { label: "Confirm", value: "C" },
    { label: "Pending", value: "P" },
  ];

  //open and close status
  const [openC, setOpenC] = useState(false);
  const [openS, setOpenS] = useState(false);

  useEffect(() => {
    let categories = props.categoriesData.map((item) => ({
      label: item.name,
      value: item.name,
    }));
    setCategoryNames(categories);
  }, [props.categoriesData]);

  const onCategoryOpen = useCallback(() => {
    setOpenS(false);
  }, []);

  const onStatusOpen = useCallback(() => {
    setOpenC(false);
  }, []);

  const getIDFromCategoryName = (categoryName) => {
    const id = props.categoriesData
      .filter((item) => item.name == categoryName)
      .map((item) => item.id);
    return id[0];
  };

  const saveExpenseData = () => {
    if (selectedCategory !== null) {
      firebase
        .firestore()
        .collection("categoriesData")
        .doc(getIDFromCategoryName(selectedCategory))
        .collection("expenses")
        .add({
          title,
          description,
          location,
          total: Number(total),
          status,
        })
        .then(function () {
          props.fetchExpenses();
          props.navigation.popToTop();
        });
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", marginTop: 30 }}>
      <DropDownPicker
        open={openC}
        onOpen={onCategoryOpen}
        value={selectedCategory}
        items={categoryNames}
        setOpen={setOpenC}
        setValue={setSelectedCategory}
      />
      <TextInput
        placeholder="title"
        onChangeText={(text) => setTitle(text)}
        value={title}
      />
      <TextInput
        placeholder="description"
        onChangeText={(text) => setDescription(text)}
        value={description}
      />
      <TextInput
        placeholder="location"
        onChangeText={(text) => setLocation(text)}
        value={location}
      />
      <TextInput
        placeholder="total"
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
      />
      <TouchableOpacity onPress={() => saveExpenseData()}>
        <Text>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = (store) => ({
  categoriesData: store.categoriesData,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ fetchExpenses }, dispatch);

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
