import React from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchExpenses } from "../redux/actions";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "./Home";

const Tab = createBottomTabNavigator();
const EmptyScreen = () => null;

export class Main extends React.Component {
  componentDidMount() {
    this.props.fetchExpenses();
  }

  render() {
    return (
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen component={Home} name="Home" />
        <Tab.Screen
          component={EmptyScreen}
          name="AddNew"
          listeners={({ navigation }) => ({
            tabPress: (event) => {
              event.preventDefault();
              navigation.navigate("Add");
            },
          })}
        />
      </Tab.Navigator>
    );
  }
}

const mapStateToProps = (store) => ({
  categoriesData: store.categoriesData,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ fetchExpenses }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Main);
