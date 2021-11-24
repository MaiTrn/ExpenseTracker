import React, { useState } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";

const ConfirmPopUp = (props) => {
  const [cAnimation, setCAnimation] = useState(new Animated.Value(0));

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
        setSelectedCategory(false);
      })
      .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  }

  return (
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
  );
};

export default ConfirmPopUp;
