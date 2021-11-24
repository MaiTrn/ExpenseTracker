import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import firebase from "firebase";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const onSignUp = () => {
    const modifiedName = name.charAt(0).toUpperCase() + name.slice(1);
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        firebase
          .firestore()
          .collection("usersData")
          .doc(firebase.auth().currentUser.uid)
          .set({
            name,
            email,
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="email"
        onChangeText={(email) => setEmail(email)}
        autoCapitalize="none"
        style={styles.textInput}
      />
      <TextInput
        placeholder="name"
        onChangeText={(name) => setName(name)}
        style={styles.textInput}
      />
      <TextInput
        placeholder="password"
        onChangeText={(password) => setPassword(password)}
        secureTextEntry={true}
        style={styles.textInput}
      />
      <TouchableOpacity onPress={onSignUp}>
        <Text>Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },

  textInput: {
    height: 30,
    width: 150,
    borderRadius: 5,
    alignItems: "center",
    paddingLeft: 5,
    marginVertical: 5,
  },
});
