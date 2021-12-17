import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
} from "react-native";
import { COLORS, SIZES, FONTS, icons } from "../../../../constants";
const IncomingExpenses = (props) => {
  let allExpenses = props.selectedCategory
    ? props.selectedCategory.expenses
    : [];
  let incomingExpenses = allExpenses?.filter((a) => a.status == "P");

  const renderExpenses = ({ item, index }) => (
    <View
      style={{
        marginLeft: index == 0 ? SIZES.padding : 0,
        ...styles.container,
        ...styles.shadow,
      }}
    >
      <View style={styles.nodeContainer}>
        {/* Title */}
        <View style={styles.imageContainer}>
          <Image
            source={icons[props.selectedCategory.icon.toString()]}
            style={{
              width: 25,
              height: 25,
              tintColor: props.selectedCategory.color,
            }}
          />
        </View>
        <Text
          style={{
            color: props.selectedCategory.color,
            ...FONTS.h3,
          }}
        >
          {props.selectedCategory.name}
        </Text>
      </View>

      {/* Description */}
      <View style={{ paddingHorizontal: SIZES.padding, top: 0 }}>
        {/* Title and Description */}
        <Text style={{ ...FONTS.h2 }}>{item.title}</Text>
        <Text
          style={{
            color: COLORS.darkgray,
            ...FONTS.body3,
          }}
        >
          {item.description}
        </Text>

        {/* Location */}
        <Text
          style={{
            marginTop: SIZES.padding,
            color: COLORS.black,
            ...FONTS.h4,
          }}
        >
          Location
        </Text>
        <View style={{ flexDirection: "row" }}>
          <Image
            source={icons.pin}
            style={{
              width: 20,
              height: 20,
              tintColor: COLORS.darkgray,
            }}
          />
          <Text
            style={{
              marginBottom: SIZES.base,
              paddingLeft: 5,
              color: COLORS.darkgray,
              ...FONTS.body4,
            }}
          >
            {item.location}
          </Text>
        </View>
      </View>

      {/* Price */}
      <TouchableOpacity
        style={{
          backgroundColor: props.selectedCategory.color,
          ...styles.confirmButton,
        }}
        onPress={() => props.confirmExpense(item)}
      >
        <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
          CONFIRM {item.total.toFixed(2)} USD
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ marginBottom: 20 }}>
      {/* Render Header */}
      <View style={styles.header}>
        <Text style={{ color: COLORS.primary, ...FONTS.h3 }}>
          INCOMING EXPENSES
        </Text>
        <Text style={{ color: COLORS.darkgray, ...FONTS.body4 }}>
          {incomingExpenses?.length} total
        </Text>
      </View>

      {/* Render Expenses */}
      <View>
        {incomingExpenses?.length > 0 && (
          <FlatList
            data={incomingExpenses}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={renderExpenses}
            keyExtractor={(item) => `${item.id}`}
          />
        )}
        {incomingExpenses?.length == 0 && (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: 280,
            }}
          >
            <Text style={{ color: COLORS.primary, ...FONTS.h3 }}>
              No Record
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default IncomingExpenses;

const styles = StyleSheet.create({
  container: {
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.white,
    justifyContent: "space-between",
    width: 300,
    marginRight: SIZES.padding,
    marginVertical: SIZES.radius,
  },
  nodeContainer: {
    flexDirection: "row",
    padding: SIZES.padding,
    alignItems: "center",
  },
  imageContainer: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: COLORS.lightGray,
    alignItems: "center",
    justifyContent: "center",
    marginRight: SIZES.base,
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
  confirmButton: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    borderBottomStartRadius: SIZES.radius,
    borderBottomEndRadius: SIZES.radius,
    bottom: 0,
  },
  header: {
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding * 0.5,
    backgroundColor: COLORS.lightGray2,
  },
});
