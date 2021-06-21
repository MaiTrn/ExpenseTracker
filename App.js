import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import firebase from "firebase";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import Add from "./screens/Add.js";
import Main from "./screens/Main.js";
import rootReducer from "./redux/reducers";

const Stack = createStackNavigator();

const firebaseConfig = {
  apiKey: "AIzaSyDKAx6bMHlDoAVcPq9povb3yuhz7En8d1o",
  authDomain: "expensetracker-10563.firebaseapp.com",
  projectId: "expensetracker-10563",
  storageBucket: "expensetracker-10563.appspot.com",
  messagingSenderId: "397985473984",
  appId: "1:397985473984:web:0e9a5f33b7cefed0a65425",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const store = createStore(rootReducer, applyMiddleware(thunk));

const App = () => {
  const [loaded] = useFonts({
    "Roboto-Black": require("./assets/fonts/Roboto-Black.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer theme={theme}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="Main"
        >
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="Add" component={Add} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;

const theme = {
  ...DefaultTheme,
  color: {
    ...DefaultTheme.colors,
    border: "transparent",
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
