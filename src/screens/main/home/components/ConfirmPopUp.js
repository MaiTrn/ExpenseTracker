import React from "react";
import { View, Modal, Text, TouchableOpacity, StyleSheet } from "react-native";
import ConfirmIcon from "./ConfirmIcon";
import { COLORS, SIZES, FONTS } from "../../../../constants";

const ConfirmPopUp = (props) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={props.confirmVisible}
        onRequestClose={() => {
          Alert.alert("Closed.");
          props.setConfirmVisible(!confirmVisible);
        }}
      >
        <View style={styles.background} />
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.confirmVisible}
        onRequestClose={() => {
          Alert.alert("Closed.");
          props.setConfirmVisible(!confirmVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ConfirmIcon />
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
              onPress={() => props.setConfirmVisible(!props.confirmVisible)}
            >
              <Text style={{ color: COLORS.white, ...FONTS.body3 }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ConfirmPopUp;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    position: "absolute",
    width: SIZES.width,
    height: SIZES.height,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  background: {
    flex: 1,
    position: "absolute",
    top: 0,
    bottom: 0,
    width: SIZES.width,
    height: SIZES.height + 100,
    backgroundColor: COLORS.black,
    opacity: 0.8,
    zIndex: 100,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
