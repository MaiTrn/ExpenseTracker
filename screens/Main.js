import React from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchExpenses } from "../redux/actions";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

export class Main extends React.Component {
  componentDidMount() {
    this.props.fetchExpenses();
  }

  render() {
    return (
      <View style={{ marginTop: 30 }}>
        <TextInput placeholder="Write your expense" />
        <TouchableOpacity>
          <Text>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate("Home", {
              categoriesData: this.props.categoriesData,
            })
          }
        >
          <Text>MY EXPENSES</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = (store) => ({
  categoriesData: store.categoriesData,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ fetchExpenses }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Main);
