import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { CommonActions } from "@react-navigation/routers";
import { useFormik } from "formik";
import * as Yup from "yup";
import firebase from "firebase";

import TextInput from "./components/TextInput";
import { COLORS, FONTS, SIZES } from "../../constants";

const LoginSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Too short!")
    .max(25, "Too long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

const Login = (props) => {
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: LoginSchema,
      onSubmit: (value) => {
        const { email, password } = value;
        firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            props.navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: "Main" }],
              })
            );
          })
          .catch((error) => {
            console.log(error);
          });
      },
    });
  const passwordRef = React.useRef(null);

  return (
    <View style={styles.container}>
      <Text style={{ ...FONTS.h2, color: COLORS.primary, paddingBottom: 40 }}>
        Log in to your wallet!
      </Text>
      <TextInput
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
        <Text style={{ color: COLORS.white }}>Sign In</Text>
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

export default Login;

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
    marginVertical: 20,
  },
});
