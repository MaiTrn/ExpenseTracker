import React from "react";
import { View } from "react-native";
import { ExpensePie, ExpenseSummaryList } from "./components";

const ChartView = (props) => {
  //filter expenses with "Confirmed status"
  const processCategoryDataToDisplay = () => {
    let chartData = props.categories?.map((item) => {
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
  };

  const setSelectCategoryByName = (name) => {
    let category = props.categories?.filter((a) => a.name == name);
    props.setSelectedCategory(category[0]);
  };

  let chartData = [];
  chartData = processCategoryDataToDisplay();
  let colorScales = chartData?.map((item) => item.color);
  let totalExpenseCount = chartData?.reduce(
    (a, b) => a + (b.expenseCount || 0),
    0
  );

  return (
    <View>
      <ExpensePie
        {...{
          chartData,
          colorScales,
          totalExpenseCount,
          setSelectCategoryByName,
        }}
        selectedCategory={props.selectedCategory}
      />
      <ExpenseSummaryList
        {...{
          chartData,
          setSelectCategoryByName,
        }}
        selectedCategory={props.selectedCategory}
      />
    </View>
  );
};

export default ChartView;
