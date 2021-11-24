import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FONTS, COLORS, SIZES } from "../../../../constants";
import { VictoryPie } from "victory-native";
import { Svg } from "react-native-svg";

const ExpensePie = (props) => {
  if (props.chartData.length == 0) {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          height: 200,
        }}
      >
        <Text style={{ color: COLORS.primary, ...FONTS.h2 }}>No Record</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, styles.shadow]}>
      <Svg
        width={SIZES.width}
        height={SIZES.width}
        style={{
          width: "100%",
          height: "auto",
        }}
      >
        <VictoryPie
          standalone={false}
          data={props.chartData}
          colorScale={props.colorScales}
          labels={(datum) => `${datum.y}`}
          radius={({ datum }) =>
            props.selectedCategory && props.selectedCategory.name == datum.name
              ? SIZES.width * 0.4
              : SIZES.width * 0.4 - 10
          }
          innerRadius={60}
          labelRadius={({ innerRadius }) =>
            (SIZES.width * 0.4 + innerRadius) / 2.5
          }
          style={{
            labels: { fill: "white", ...FONTS.body3 },
            parent: {
              ...styles.shadow,
            },
          }}
          width={SIZES.width}
          height={SIZES.width}
          events={[
            {
              target: "data",
              eventHandlers: {
                onPress: () => {
                  return [
                    {
                      target: "labels",
                      mutation: (p) => {
                        let categoryName = props.chartData[p.index].name;
                        props.setSelectCategoryByName(categoryName);
                      },
                    },
                  ];
                },
              },
            },
          ]}
        />
      </Svg>
      <View
        style={{
          position: "absolute",
          top: "39.5%",
          left: "38.5%",
        }}
      >
        <Text
          style={{ textAlign: "center", color: COLORS.primary, ...FONTS.h1 }}
        >
          {props.totalExpenseCount}
        </Text>
        <Text
          style={{
            textAlign: "center",
            color: COLORS.darkgray,
            ...FONTS.body3,
          }}
        >
          Expenses
        </Text>
      </View>
    </View>
  );
};

export default ExpensePie;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: 294,
    height: 294,
    borderRadius: 294 / 2,
  },
  shadow: {
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
