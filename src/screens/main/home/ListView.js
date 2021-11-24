import React from "react";
import { View, Text } from "react-native";
import { CategoriesList, IncomingExpenses } from "./components";

const ListView = (props) => {
  return (
    <View>
      <CategoriesList
        selectedCategory={props.selectedCategory}
        setSelectedCategory={props.setSelectedCategory}
        categories={props.categories}
      />
      <IncomingExpenses
        selectedCategory={props.selectedCategory}
        confirmExpense={props.confirmExpense}
      />
    </View>
  );
};

export default ListView;
