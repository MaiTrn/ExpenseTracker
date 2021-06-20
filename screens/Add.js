import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";

import firebase from "firebase";
require("firebase/firestore");
require("firebase/firebase-storage");

import { COLORS, FONTS, SIZES } from "../constants";

const Add = ({ navigation, route }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState("");

  const saveExpenseData = (downloadURL) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(firebase.auth().currentUser.uid)
      .collection("userPosts")
      .add({
        downloadURL,
        caption,
        creation: firebase.firestore.FieldValue.serverTimestamp(),
        likesCount: 0,
      })
      .then(function () {
        navigation.popToTop();
      });
  };

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <View style={styles.captionContainer}>
        <TextInput
          style={{
            ...styles.textInput,
            ...FONTS.body3,
          }}
          placeholder="Insert caption here..."
          onChangeText={(caption) => setCaption(caption)}
          value={caption}
        />
        <TouchableOpacity
          style={{ ...styles.saveButton, ...styles.shadow }}
          onPress={() => uploadImage()}
        >
          <Text style={{ color: COLORS.white, ...FONTS.body3 }}>Save</Text>
        </TouchableOpacity>
      </View>

      {imageURI && (
        <Image
          resizeMode="contain"
          source={{ uri: imageURI }}
          style={{ width: SIZES.width - 5, height: SIZES.height - 120 }}
        />
      )}
    </View>
  );
};

export default Add;

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
