import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchCategories } from "../redux/actions";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Svg, { Path } from "react-native-svg";

import Home from "./Home";
import Settings from "./Settings";
import { COLORS } from "../constants";

const Tab = createBottomTabNavigator();
const EmptyScreen = () => null;

const TabBarCustomButtonAdd = (props) => {
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <View style={{ flexDirection: "row", position: "absolute", top: 0 }}>
        <View style={{ flex: 1, backgroundColor: COLORS.white }}></View>
        <Svg width={75} height={61} viewBox="0 0 75 61">
          <Path
            d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
            fill={COLORS.white}
          />
        </Svg>
        <View style={{ flex: 1, backgroundColor: COLORS.white }}></View>
      </View>

      <TouchableOpacity
        style={{
          top: -22.5,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: COLORS.secondary,
          width: 50,
          height: 50,
          borderRadius: 25,
          ...styles.shadow,
        }}
        onPress={props.onPress}
      >
        {props.children}
      </TouchableOpacity>
    </View>
  );
};

const TabBarCustomButton = (props) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: COLORS.white,
      }}
    >
      <TouchableOpacity
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: 50,
          height: 50,
        }}
        onPress={props.onPress}
      >
        {props.children}
      </TouchableOpacity>
    </View>
  );
};

export class Main extends React.Component {
  componentDidMount() {
    this.props.fetchCategories();
  }

  render() {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        tabBarOptions={{
          keyboardHidesTabBar: true,
          showLabel: false,
          style: {
            backgroundColor: "transparent",
            borderTopWidth: 0,
            marginTop: -50, //make the background visible
            elevation: 0,
          },
          activeTintColor: COLORS.secondary,
        }}
      >
        <Tab.Screen
          component={Home}
          name="Home"
          options={{
            tabBarIcon: ({ focused, color }) => (
              <MaterialCommunityIcons
                name={focused ? "home" : "home-outline"}
                color={color}
                size={focused ? 35 : 30}
              />
            ),
            tabBarButton: (props) => <TabBarCustomButton {...props} />,
          }}
        />
        <Tab.Screen
          component={EmptyScreen}
          name="AddNew"
          options={{
            tabBarIcon: ({ focused, color }) => (
              <MaterialCommunityIcons
                name={"plus"}
                color={COLORS.white}
                size={30}
              />
            ),
            tabBarButton: (props) => <TabBarCustomButtonAdd {...props} />,
          }}
          listeners={({ navigation }) => ({
            tabPress: (event) => {
              event.preventDefault();
              navigation.navigate("Add");
            },
          })}
        />
        <Tab.Screen
          component={Settings}
          name="Settings"
          options={{
            tabBarIcon: ({ focused, color }) => (
              <MaterialCommunityIcons
                name={focused ? "wallet" : "wallet-outline"}
                color={color}
                size={focused ? 35 : 30}
              />
            ),
            tabBarButton: (props) => <TabBarCustomButton {...props} />,
          }}
        />
      </Tab.Navigator>
    );
  }
}

const mapStateToProps = (store) => ({
  categoriesData: store.categoriesData,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ fetchCategories }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Main);

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
