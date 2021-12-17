import React, { useState } from "react";
import { COLORS } from "../../../constants";
import { View, StyleSheet, ScrollView } from "react-native";
import { connect } from "react-redux";
import firebase from "firebase";
require("firebase/firestore");
require("firebase/firebase-storage");
import { bindActionCreators } from "redux";
import { fetchCategories } from "../../../redux/actions";

import ListView from "./ListView";
import ChartView from "./ChartView";
import { Header } from "./components";
import ConfirmPopUp from "./components/ConfirmPopUp";

const Home = (props) => {
  const [viewMode, setViewMode] = useState("chart");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const currentDate = new Date();

  React.useEffect(() => {
    setCategories(props.categoriesData);
  }, [props.categoriesData]);

  const confirmExpense = (item) => {
    firebase
      .firestore()
      .collection("usersData")
      .doc(firebase.auth().currentUser.uid)
      .collection("expensesData")
      .doc(selectedCategory.id)
      .collection("expenses")
      .doc(item.id)
      .update({
        status: "C",
        creation: {
          month: currentDate.getMonth() + 1,
          year: currentDate.getFullYear(),
        },
      })
      .then(() => {
        console.log("Document successfully updated!");
        props.fetchCategories();
        setConfirmVisible(true);
        setSelectedCategory(null);
      })
      .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.lightGray2 }}>
      <Header {...{ viewMode, setViewMode }} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: 50 }}
      >
        {viewMode == "list" && (
          <ListView
            {...{
              selectedCategory,
              setSelectedCategory,
              confirmExpense,
              categories,
            }}
          />
        )}
        {viewMode == "chart" && (
          <ChartView
            {...{ selectedCategory, setSelectedCategory, categories }}
          />
        )}
      </ScrollView>
      <ConfirmPopUp
        confirmVisible={confirmVisible}
        setConfirmVisible={setConfirmVisible}
      />
    </View>
  );
};

const mapStateToProps = (store) => ({
  categoriesData: store.categoriesData,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ fetchCategories }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);

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
