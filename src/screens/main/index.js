import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchCategories } from "../../redux/actions";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Home from "./home/Home";
import Settings from "./settings/Settings";
import { COLORS } from "../../constants";
import CustomAddButton from "../../components/CustomAddButton";
import CustomButton from "../../components/CustomButton";

const Tab = createBottomTabNavigator();
const EmptyScreen = () => null;

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
            tabBarButton: (props) => <CustomButton {...props} />,
          }}
        />
        <Tab.Screen
          component={EmptyScreen}
          name="AddNew"
          options={{
            tabBarIcon: () => (
              <MaterialCommunityIcons
                name={"plus"}
                color={COLORS.white}
                size={30}
              />
            ),
            tabBarButton: (props) => <CustomAddButton {...props} />,
          }}
          listeners={({ navigation }) => ({
            tabPress: (event) => {
              event.preventDefault();
              navigation.navigate("AddExpense");
            },
          })}
        />
        <Tab.Screen
          component={Settings}
          name="Settings"
          options={{
            tabBarIcon: ({ focused, color }) => (
              <MaterialCommunityIcons
                name={focused ? "account" : "account-outline"}
                color={color}
                size={focused ? 35 : 30}
              />
            ),
            tabBarButton: (props) => <CustomButton {...props} />,
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
