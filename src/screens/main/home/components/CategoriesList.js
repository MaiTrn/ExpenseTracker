import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  Animated,
} from "react-native";
import { COLORS, SIZES, FONTS, icons } from "../../../../constants";

const CategoriesList = (props) => {
  const [showMore, setShowMore] = useState(false);

  const categoryListHeightAnimationValue = useRef(
    new Animated.Value(115)
  ).current;

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={[styles.container, styles.shadow]}
        onPress={() => {
          props.setSelectedCategory(item);
        }}
      >
        <Image
          source={icons[item.icon.toLowerCase()]}
          style={{ width: 20, height: 20, tintColor: item.color }}
        />
        <Text style={styles.categoryTitle}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ paddingHorizontal: SIZES.padding - 5 }}>
      <Animated.View
        style={{ height: categoryListHeightAnimationValue }}
        pointerEvents="box-none"
      >
        <FlatList
          data={props.categories}
          keyExtractor={(item) => `${item.id}`}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          renderItem={renderItem}
          numColumns={2}
        />
      </Animated.View>

      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginVertical: SIZES.base * 0.5,
        }}
        onPress={() => {
          //show less
          if (showMore) {
            Animated.timing(categoryListHeightAnimationValue, {
              toValue: 115,
              duration: 300,
              useNativeDriver: false,
            }).start();
          }
          //show more
          else {
            Animated.timing(categoryListHeightAnimationValue, {
              toValue: 172.5,
              duration: 300,
              useNativeDriver: false,
            }).start();
          }

          setShowMore(!showMore);
        }}
      >
        <Text style={{ color: COLORS.darkgray, ...FONTS.body4 }}>
          {showMore ? "LESS" : "MORE"}
        </Text>
        <Image
          source={showMore ? icons.up_arrow : icons.down_arrow}
          style={{
            marginLeft: 5,
            height: 15,
            width: 15,
            tintColor: COLORS.darkgray,
            alignSelf: "center",
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CategoriesList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    borderRadius: 5,
    backgroundColor: COLORS.white,
    alignItems: "center",
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.radius,
    margin: 5,
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
  categoryTitle: {
    marginLeft: SIZES.base,
    color: COLORS.primary,
    ...FONTS.h4,
  },
});
