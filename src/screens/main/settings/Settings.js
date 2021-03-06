import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import firebase from "firebase";
import { COLORS, FONTS, SIZES } from "../../../constants";
import { CommonActions } from "@react-navigation/routers";
import { fetchCategories } from "../../../redux/actions";

const Settings = (props) => {
  const onLogout = () => {
    firebase.auth().signOut();
    props.navigation.dispatch(
      CommonActions.reset({ index: 0, routes: [{ name: "Authentication" }] })
    );
  };

  return (
    <View
      style={{ paddingTop: 60, backgroundColor: COLORS.lightGray2, flex: 1 }}
    >
      <View
        style={{
          width: SIZES.width,
          paddingHorizontal: SIZES.padding,
          paddingVertical: 10,
          left: 0,
          borderBottomColor: COLORS.darkgray,
          backgroundColor: COLORS.lightGray2,
          borderBottomWidth: 1,
          overflow: "hidden",
        }}
      >
        <TouchableOpacity onPress={() => onLogout()}>
          <Text style={{ ...FONTS.body3 }}>Log out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const mapStateToProps = (store) => ({
  categoriesData: store.categoriesData,
});

const mapDispatchToProps = {
  fetchCategories,
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  shadow2: {
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 10,
  },
});
