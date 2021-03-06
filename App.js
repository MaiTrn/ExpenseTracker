import React from "react";
import { StyleSheet, Text, View, LogBox, StatusBar } from "react-native";
import * as Font from "expo-font";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import firebase from "firebase";
import { Provider } from "react-redux";

import Authentication from "./src/screens/auth";
import AddExpense from "./src/screens/main/addexpenses";
import Main from "./src/screens/main";
import store from "./src/redux/store";
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

let customFonts = {
  "Roboto-Black": require("./assets/fonts/Roboto-Black.ttf"),
  "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      loggedIn: false,
      fontsLoaded: false,
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({ loggedIn: false, loaded: true });
      } else {
        this.setState({ loggedIn: true, loaded: true });
      }
    });
    this._loadFontsAsync();
    LogBox.ignoreLogs(["Setting a timer"]);
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }

  render() {
    const { loggedIn, loaded, fontsLoaded } = this.state;
    if (!fontsLoaded || !loaded) {
      return (
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      );
    }
    return (
      <Provider store={store}>
        <StatusBar style="dark" />
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName={loggedIn ? "Main" : "Authentication"}
          >
            <Stack.Screen component={Authentication} name="Authentication" />
            <Stack.Screen component={Main} name="Main" />
            <Stack.Screen component={AddExpense} name="AddExpense" />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

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
