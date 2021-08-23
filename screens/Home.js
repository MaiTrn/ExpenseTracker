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
  LogBox,
} from "react-native";
import { connect } from "react-redux";
import { VictoryPie } from "victory-native";
import { Svg } from "react-native-svg";
import firebase from "firebase";
require("firebase/firestore");
require("firebase/firebase-storage");
import { bindActionCreators } from "redux";
import { fetchCategories } from "../redux/actions";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Home = (props) => {
  const [viewMode, setViewMode] = useState("chart");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showMore, setShowMore] = useState(false);

  const [cAnimation, setCAnimation] = useState(new Animated.Value(0));

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

  React.useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    setCategories(props.categoriesData);
  }, [props.categoriesData]);

  //List animation
  const categoryListHeightAnimationValue = useRef(
    new Animated.Value(115)
  ).current;

  //Confirm status animation
  const color = cAnimation.interpolate({
    inputRange: [0, 0.2, 1.8, 2],
    outputRange: [
      "rgba(255, 255, 255, 0.0)",
      "rgba(45, 57, 82, 0.5)",
      "rgba(45, 57, 82, 0.8)",
      "rgba(255, 255, 255, 0.0)",
    ],
  });
  const openModal = cAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });
  const modalTrigger = () => {
    Animated.timing(cAnimation, {
      toValue: 1,
      duration: 400,
      useNativeDriver: false,
    }).start();
  };
  const close = () => {
    Animated.timing(cAnimation, {
      toValue: 0,
      duration: 400,
      useNativeDriver: false,
    }).start();
  };
  const open = {
    transform: [{ scale: openModal }],
  };
  const background = {
    backgroundColor: color,
  };

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
  }

  //LIST VIEW FUNCTIONS - PENDING EXPENSES
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
        <Animated.View
          style={{ height: categoryListHeightAnimationValue }}
          pointerEvents="box-none"
        >
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
  }

  function confirmExpense(item) {
    firebase
      .firestore()
      .collection("usersData")
      .doc(firebase.auth().currentUser.uid)
      .collection("expensesData")
      .doc(selectedCategory.id)
      .collection("expenses")
      .doc(item.id)
      .update({
        status: "C",
        creation: {
          month: currentDate.getMonth() + 1,
          year: currentDate.getFullYear(),
        },
      })
      .then(() => {
        console.log("Document successfully updated!");
        props.fetchCategories();
        modalTrigger();
        setSelectedCategory(false);
      })
      .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  }

  //render expenses with "pending status"
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
          onPress={() => confirmExpense(item)}
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
  }
  //END LIST VIEW FUNCTIONS

  //CHART VIEW FUNCTIONS - CONFIRMED EXPENSES
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
  //END CHART VIEW FUNCTIONS

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.lightGray2 }}>
      {renderHeader()}

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: 50 }}
      >
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
      <Animated.View
        style={[
          background,
          {
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: "center",
            justifyContent: "center",
          },
        ]}
        pointerEvents="box-none"
      >
        <Animated.View
          style={[
            open,
            {
              position: "absolute",
              width: 250,
              height: 300,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.white,
              padding: SIZES.padding,
              paddingTop: 30,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 130,
              ...styles.shadow2,
            },
          ]}
          pointerEvents="box-none"
        >
          <View
            style={{
              height: 120,
              width: 120,
              borderRadius: 60,
              backgroundColor: COLORS.lightgreen,
              justifyContent: "center",
              alignItems: "center",
            }}
            pointerEvents="none"
          >
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 50,
                backgroundColor: COLORS.white,
                opacity: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MaterialCommunityIcons
                name={"check"}
                color={COLORS.lightgreen}
                size={80}
              />
            </View>
          </View>
          <Text
            style={{
              paddingTop: 10,
              color: COLORS.lightgreen,
              ...FONTS.h4,
            }}
          >
            Confirmed!
          </Text>
          <TouchableOpacity
            style={{
              marginTop: 40,
              padding: 8,
              backgroundColor: COLORS.secondary,
              width: 100,
              borderRadius: SIZES.radius,
              justifyContent: "center",
              alignItems: "center",
              ...styles.shadow,
            }}
            onPress={() => close()}
          >
            <Text style={{ color: COLORS.white, ...FONTS.body3 }}>Close</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </View>
  );
};

const mapStateToProps = (store) => ({
  categoriesData: store.categoriesData,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ fetchCategories }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);

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
