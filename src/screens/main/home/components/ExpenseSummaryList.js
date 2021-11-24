import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { SIZES, COLORS, FONTS } from "../../../../constants";

const ExpenseSummaryList = (props) => {
  const renderItem = ({ item }) => {
    const setColor = (trueColor, falseColor) =>
      props.selectedCategory && props.selectedCategory.name == item.name
        ? trueColor
        : falseColor;

    return (
      <TouchableOpacity
        style={{
          backgroundColor: setColor(item.color, null),
          ...styles.container,
        }}
        onPress={() => {
          let categoryName = item.name;
          props.setSelectCategoryByName(categoryName);
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              width: 20,
              height: 20,
              backgroundColor: setColor(COLORS.white, item.color),
              borderRadius: 5,
              marginRight: 10,
            }}
          />
          <Text
            style={{
              color: setColor(COLORS.white, COLORS.primary),
              ...FONTS.h4,
            }}
          >
            {item.name}
          </Text>
        </View>

        <Text
          style={{
            color: setColor(COLORS.white, COLORS.primary),
            ...FONTS.h4,
          }}
        >
          {item.y.toFixed(2)} USD - {item.label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        paddingHorizontal: SIZES.padding,
        paddingVertical: SIZES.padding * 0.6,
      }}
    >
      <FlatList
        data={props.chartData}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.id}`}
      />
    </View>
  );
};

export default ExpenseSummaryList;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SIZES.radius,
    height: 40,
    borderRadius: 10,
  },
});
