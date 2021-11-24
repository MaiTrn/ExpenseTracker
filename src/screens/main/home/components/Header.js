import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { COLORS, SIZES, FONTS, icons } from "../../../../constants";

const Header = (props) => {
  const currentDate = new Date();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <View
      style={{
        backgroundColor: COLORS.white,
        padding: SIZES.padding,
        paddingTop: 30,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text style={{ color: COLORS.primary, ...FONTS.h2 }}>
            MY EXPENSES
          </Text>
          <Text style={{ color: COLORS.darkgray, ...FONTS.h3 }}>
            Summary (private)
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginRight: -10,
          }}
        >
          <TouchableOpacity
            style={{
              height: 50,
              width: 50,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 25,
              backgroundColor:
                props.viewMode == "chart" ? COLORS.secondary : null,
            }}
            onPress={() => props.setViewMode("chart")}
          >
            <Image
              source={icons.chart}
              resizeMode="contain"
              style={{
                height: 20,
                width: 20,
                tintColor:
                  props.viewMode == "chart" ? COLORS.white : COLORS.darkgray,
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: 50,
              width: 50,
              borderRadius: 25,
              backgroundColor:
                props.viewMode == "list" ? COLORS.secondary : null,
            }}
            onPress={() => props.setViewMode("list")}
          >
            <Image
              source={icons.menu}
              resizeMode="contain"
              style={{
                height: 20,
                width: 20,
                tintColor:
                  props.viewMode == "list" ? COLORS.white : COLORS.darkgray,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: SIZES.padding,
        }}
      >
        <View
          style={{
            height: 50,
            width: 50,
            backgroundColor: COLORS.lightGray,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={icons.calendar}
            style={{
              height: 20,
              width: 20,
              tintColor: COLORS.lightBlue,
            }}
          />
        </View>
        <View
          style={{
            marginLeft: SIZES.padding,
          }}
        >
          <Text style={{ color: COLORS.primary, ...FONTS.h3 }}>
            {currentDate.getDate() +
              " " +
              months[currentDate.getMonth()] +
              ", " +
              currentDate.getFullYear()}
          </Text>
          <Text style={{ color: COLORS.darkgray, ...FONTS.bod4 }}>
            18% more than last month
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Header;
