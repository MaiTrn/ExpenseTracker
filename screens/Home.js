import React, { useState, useRef } from "react";
import { COLORS, FONTS, SIZES, icons } from "../constants";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
  Animated,
} from "react-native";
import { connect } from "react-redux";
import { VictoryPie } from "victory-native";
import { Svg } from "react-native-svg";
import dummyData from "../DummyData";

const Home = (props) => {
  const [viewMode, setViewMode] = useState("chart");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showMore, setShowMore] = useState(false);

  React.useEffect(() => {
    setCategories(props.categoriesData);
  }, [props.categoriesData]);

  const categoryListHeightAnimationValue = useRef(
    new Animated.Value(115)
  ).current;

  function renderHeader() {
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
              My Expenses
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
                backgroundColor: viewMode == "chart" ? COLORS.secondary : null,
              }}
              onPress={() => setViewMode("chart")}
            >
              <Image
                source={icons.chart}
                resizeMode="contain"
                style={{
                  height: 20,
                  width: 20,
                  tintColor:
                    viewMode == "chart" ? COLORS.white : COLORS.darkgray,
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
                backgroundColor: viewMode == "list" ? COLORS.secondary : null,
              }}
              onPress={() => setViewMode("list")}
            >
              <Image
                source={icons.menu}
                resizeMode="contain"
                style={{
                  height: 20,
                  width: 20,
                  tintColor:
                    viewMode == "list" ? COLORS.white : COLORS.darkgray,
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
              11 Nov, 2020
            </Text>
            <Text style={{ color: COLORS.darkgray, ...FONTS.bod4 }}>
              18% more than last month
            </Text>
          </View>
        </View>
      </View>
    );
  }

  function renderCategoriesList() {
    const renderItem = ({ item, index }) => (
      <TouchableOpacity
        style={{
          flex: 1,
          flexDirection: "row",
          borderRadius: 5,
          backgroundColor: COLORS.white,
          alignItems: "center",
          paddingHorizontal: SIZES.padding,
          paddingVertical: SIZES.radius,
          margin: 5,
          ...styles.shadow,
        }}
        onPress={() => {
          // dummyData.categoriesData[index].expenses.push({
          //   id: 10,
          //   title: "More",
          //   description: "Tuition fee",
          //   location: "ByProgrammers' tuition center",
          //   total: 100.0,
          //   status: "P",
          // });
          // setCategories(dummyData.categoriesData);
          setSelectedCategory(item);
        }}
      >
        <Image
          source={item.icon}
          style={{ width: 20, height: 20, tintColor: item.color }}
        />
        <Text
          style={{ marginLeft: SIZES.base, color: COLORS.primary, ...FONTS.h4 }}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );

    return (
      <View style={{ paddingHorizontal: SIZES.padding - 5 }}>
        <Animated.View style={{ height: categoryListHeightAnimationValue }}>
          <FlatList
            data={categories}
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
            marginVertical: SIZES.base,
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
  }

  function renderIncomingExpenses() {
    let allExpenses = selectedCategory ? selectedCategory.expenses : [];
    let incomingExpenses = allExpenses?.filter((a) => a.status == "P");

    const renderExpenses = ({ item, index }) => (
      <View
        style={{
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.white,
          justifyContent: "space-between",
          width: 300,
          marginRight: SIZES.padding,
          marginLeft: index == 0 ? SIZES.padding : 0,
          marginVertical: SIZES.radius,
          ...styles.shadow,
        }}
      >
        {/* Title */}
        <View
          style={{
            flexDirection: "row",
            padding: SIZES.padding,
            alignItems: "center",
          }}
        >
          <View
            style={{
              height: 40,
              width: 40,
              borderRadius: 20,
              backgroundColor: COLORS.lightGray,
              alignItems: "center",
              justifyContent: "center",
              marginRight: SIZES.base,
            }}
          >
            <Image
              source={selectedCategory.icon}
              style={{
                width: 25,
                height: 25,
                tintColor: selectedCategory.color,
              }}
            />
          </View>

          <Text
            style={{
              color: selectedCategory.color,
              ...FONTS.h3,
            }}
          >
            {selectedCategory.name}
          </Text>
        </View>

        {/* Description */}
        <View style={{ paddingHorizontal: SIZES.padding, top: 0 }}>
          {/* Title and Description */}
          <Text style={{ ...FONTS.h2 }}>{item.title}</Text>
          <Text
            style={{
              flexWrap: "wrap",
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
            backgroundColor: selectedCategory.color,
            justifyContent: "center",
            alignItems: "center",
            height: 50,
            borderBottomStartRadius: SIZES.radius,
            borderBottomEndRadius: SIZES.radius,
            bottom: 0,
          }}
        >
          <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
            CONFIRM {item.total.toFixed(2)} USD
          </Text>
        </TouchableOpacity>
      </View>
    );
    return (
      <View style={{ marginBottom: 20 }}>
        {/* Render Title */}
        <View
          style={{
            paddingHorizontal: SIZES.padding,
            paddingVertical: SIZES.padding * 0.5,
            backgroundColor: COLORS.lightGray2,
          }}
        >
          <Text style={{ color: COLORS.primary, ...FONTS.h3 }}>
            INCOMING EXPENSES
          </Text>
          <Text style={{ color: COLORS.darkgray, ...FONTS.body4 }}>
            {incomingExpenses.length} total
          </Text>
        </View>

        {/* Render Expenses */}
        <View>
          {incomingExpenses.length > 0 && (
            <FlatList
              data={incomingExpenses}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={renderExpenses}
              keyExtractor={(item) => `${item.id}`}
            />
          )}
          {incomingExpenses.length == 0 && (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: 200,
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
  }

  function processCategoryDataToDisplay() {
    //filter expenses with "Confirmed status"
    let chartData = categories?.map((item) => {
      let confirmExpenses = item.expenses?.filter((a) => a.status == "C");
      var total = confirmExpenses?.reduce((a, b) => a + (b.total || 0), 0);
      return {
        name: item.name,
        y: total,
        expenseCount: confirmExpenses?.length,
        color: item.color,
        id: item.id,
      };
    });

    //filter expenses with no data/expenses
    let filterChartData = chartData?.filter((item) => item.y > 0);

    //Calculate the total expenses
    let totalExpense = filterChartData?.reduce((a, b) => a + (b.y || 0), 0);

    //calculate percentage and repopulate chart data
    let finalChartData = filterChartData?.map((item) => {
      let percentage = ((item.y / totalExpense) * 100).toFixed(0);

      return {
        label: `${percentage}%`,
        y: Number(item.y),
        name: item.name,
        expenseCount: item.expenseCount,
        color: item.color,
        id: item.id,
      };
    });

    return finalChartData;
  }

  function setSelectCategoryByName(name) {
    let category = categories?.filter((a) => a.name == name);
    setSelectedCategory(category[0]);
  }

  function renderCategoriesChart() {
    let chartData = [];
    chartData = processCategoryDataToDisplay();
    let colorScales = chartData?.map((item) => item.color);
    let totalExpenseCount = chartData?.reduce(
      (a, b) => a + (b.expenseCount || 0),
      0
    );
    if (chartData.length == 0) {
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
      <View
        style={{
          marginTop: 10,
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "center",
          width: 294,
          height: 294,
          borderRadius: 294 / 2,
          ...styles.shadow2,
        }}
      >
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
            data={chartData}
            colorScale={colorScales}
            labels={(datum) => `${datum.y}`}
            radius={({ datum }) =>
              selectedCategory && selectedCategory.name == datum.name
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
                ...styles.shadow2,
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
                        mutation: (props) => {
                          let categoryName = chartData[props.index].name;
                          setSelectCategoryByName(categoryName);
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
            {totalExpenseCount}
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
  }

  function renderExpenseSummary() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: SIZES.radius,
          height: 40,
          backgroundColor:
            selectedCategory && selectedCategory.name == item.name
              ? item.color
              : null,
          borderRadius: 10,
        }}
        onPress={() => {
          let categoryName = item.name;
          setSelectCategoryByName(categoryName);
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              width: 20,
              height: 20,
              backgroundColor:
                selectedCategory && selectedCategory.name == item.name
                  ? COLORS.white
                  : item.color,
              borderRadius: 5,
              marginRight: 10,
            }}
          ></View>
          <Text
            style={{
              color:
                selectedCategory && selectedCategory.name == item.name
                  ? COLORS.white
                  : COLORS.primary,
              ...FONTS.h4,
            }}
          >
            {item.name}
          </Text>
        </View>

        <Text
          style={{
            color:
              selectedCategory && selectedCategory.name == item.name
                ? COLORS.white
                : COLORS.primary,
            ...FONTS.h4,
          }}
        >
          {item.y.toFixed(2)} USD - {item.label}
        </Text>
      </TouchableOpacity>
    );

    return (
      <View
        style={{
          paddingHorizontal: SIZES.padding,
          paddingVertical: SIZES.padding * 0.6,
        }}
      >
        <FlatList
          data={processCategoryDataToDisplay()}
          renderItem={renderItem}
          keyExtractor={(item) => `${item.id}`}
        />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.lightGray2 }}>
      {renderHeader()}

      <ScrollView showsVerticalScrollIndicator={false}>
        {viewMode == "list" && (
          <View>
            {renderCategoriesList()}
            {renderIncomingExpenses()}
          </View>
        )}
        {viewMode == "chart" && (
          <View>
            {renderCategoriesChart()}
            {renderExpenseSummary()}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const mapStateToProps = (store) => ({
  categoriesData: store.categoriesData,
});

export default connect(mapStateToProps, null)(Home);

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
