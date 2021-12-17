import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import TextInput from "./components/TextInput";

import { useFormik } from "formik";
import * as Yup from "yup";
import firebase from "firebase";

import { COLORS, FONTS, SIZES } from "../../constants";

const SignupSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Too short!")
    .max(25, "Too long!")
    .required("Required"),
  email: Yup.string().email("Invalid email!").required("Required"),
  name: Yup.string().required("Required"),
});

const Register = (props) => {
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
      },
      validationSchema: SignupSchema,
      onSubmit: (value) => {
        const { name, email, password } = value;
        const modifiedName = name.charAt(0).toUpperCase() + name.slice(1);
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(() => {
            firebase
              .firestore()
              .collection("usersData")
              .doc(firebase.auth().currentUser.uid)
              .set({
                name: modifiedName,
                email,
              });
            props.navigation.navigation("Landing");
          })
          .catch((error) => {
            console.log(error);
          });
      },
    });

  const emailRef = React.useRef(null);
  const passwordRef = React.useRef(null);

  return (
    <View style={styles.container}>
      <Text style={{ ...FONTS.h2, color: COLORS.primary, paddingBottom: 40 }}>
        Sign up and track your expenses!
      </Text>
      <TextInput
        icon="account-outline"
        placeholder="Enter your name"
        value={values.name}
        onChangeText={handleChange("name")}
        onBlur={handleBlur("name")}
        errors={errors.name}
        touched={touched.name}
        autoCompleteType="name"
        returnKeyType="next"
        onSubmitEditing={() => emailRef.current?.focus()}
      />
      <TextInput
        ref={emailRef}
        icon="email-outline"
        placeholder="Enter your email"
        value={values.email}
        onChangeText={handleChange("email")}
        onBlur={handleBlur("email")}
        errors={errors.email}
        touched={touched.email}
        autoCapitalize="none"
        autoCompleteType="email"
        returnKeyType="next"
        onSubmitEditing={() => passwordRef.current?.focus()}
      />
      <TextInput
        icon="lock-outline"
        placeholder="Enter your password"
        value={values.password}
        ref={passwordRef}
        secureTextEntry
        onChangeText={handleChange("password")}
        onBlur={handleBlur("password")}
        errors={errors.password}
        touched={touched.password}
        autoCompleteType="password"
        returnKeyType="go"
        onSubmitEditing={handleSubmit}
      />
      <TouchableOpacity
        style={{ ...styles.button, backgroundColor: COLORS.primary }}
        onPress={handleSubmit}
      >
        <Text style={{ color: COLORS.white }}>Sign up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => props.navigation.pop()}
      >
        <Text style={{ color: COLORS.primary }}>Cancel</Text>
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
    paddingTop: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 150,
    height: 40,
    borderRadius: SIZES.borderRadius.xl,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
});
