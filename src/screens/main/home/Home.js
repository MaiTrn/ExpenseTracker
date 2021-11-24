import React, { useState } from "react";
import { COLORS, FONTS, SIZES } from "../../../constants";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
} from "react-native";
import { connect } from "react-redux";
require("firebase/firestore");
require("firebase/firebase-storage");
import { bindActionCreators } from "redux";
import { fetchCategories } from "../../../redux/actions";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ListView from "./ListView";
import ChartView from "./ChartView";
import { Header } from "./components";

const Home = (props) => {
  const [viewMode, setViewMode] = useState("chart");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cAnimation, setCAnimation] = useState(new Animated.Value(0));

  React.useEffect(() => {
    setCategories(props.categoriesData);
  }, [props.categoriesData]);

  //Confirm status animation
  const color = cAnimation.interpolate({
    inputRange: [0, 0.2, 1.8, 2],
    outputRange: [
      "rgba(255, 255, 255, 0.0)",
      "rgba(45, 57, 82, 0.5)",
      "rgba(45, 57, 82, 0.8)",
      "rgba(255, 255, 255, 0.0)",
    ],
  });
  const openModal = cAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });
  const modalTrigger = () => {
    Animated.timing(cAnimation, {
      toValue: 1,
      duration: 400,
      useNativeDriver: false,
    }).start();
  };
  const close = () => {
    Animated.timing(cAnimation, {
      toValue: 0,
      duration: 400,
      useNativeDriver: false,
    }).start();
  };
  const open = {
    transform: [{ scale: openModal }],
  };
  const background = {
    backgroundColor: color,
  };

  function confirmExpense(item) {
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
        modalTrigger();
        setSelectedCategory(null);
      })
      .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  }

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
      <Animated.View
        style={[
          background,
          {
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: "center",
            justifyContent: "center",
          },
        ]}
        pointerEvents="box-none"
      >
        <Animated.View
          style={[
            open,
            {
              position: "absolute",
              width: 250,
              height: 300,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.white,
              padding: SIZES.padding,
              paddingTop: 30,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 130,
              ...styles.shadow2,
            },
          ]}
          pointerEvents="box-none"
        >
          <View
            style={{
              height: 120,
              width: 120,
              borderRadius: 60,
              backgroundColor: COLORS.lightgreen,
              justifyContent: "center",
              alignItems: "center",
            }}
            pointerEvents="none"
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
          <Text
            style={{
              paddingTop: 10,
              color: COLORS.lightgreen,
              ...FONTS.h4,
            }}
          >
            Confirmed!
          </Text>
          <TouchableOpacity
            style={{
              marginTop: 40,
              padding: 8,
              backgroundColor: COLORS.secondary,
              width: 100,
              borderRadius: SIZES.radius,
              justifyContent: "center",
              alignItems: "center",
              ...styles.shadow,
            }}
            onPress={() => close()}
          >
            <Text style={{ color: COLORS.white, ...FONTS.body3 }}>Close</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
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
