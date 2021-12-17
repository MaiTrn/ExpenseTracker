import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "./Login";
import Register from "./Register";
import Landing from "./Landing";

const Stack = createStackNavigator();

const AuthenticationNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Landing"
    >
      <Stack.Screen
        component={Landing}
        name="Landing"
        options={{ headerShown: false }}
      />
      <Stack.Screen component={Register} name="Register" />
      <Stack.Screen component={Login} name="Login" />
    </Stack.Navigator>
  );
};

export default AuthenticationNavigator;
