import { Dimensions } from "react-native";

import React , {Component} from "react"

export const screenWidth = Dimensions.get("window").width;

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

export const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 10, // optional, default 3
  barPercentage: 10,
  useShadowColorFromDataset: false // optional
};


export const data = [
  {
    name: "Accomodation",
    population: 21500000,
    color: "#0000FF",
    legendFontColor: "black",
    legendFontSize:  10
  },
  {
    name: "Rent",
    population: 2800000,
    color: "#FF8C00",
    legendFontColor: "black",
    legendFontSize:  10
  },
  {
    name: "Telephone and Internet",
    population: 527612,
    color: "#8A2BE2",
    legendFontColor: "black",
    legendFontSize:  10
  },
  {
    name: "Plant and Machinery",
    population: 8538000,
    color: "#006400",
    legendFontColor: "black",
    legendFontSize:  10
  },
  {
    name: "Moscow",
    population: 11920000,
    color: "#FF00FF",
    legendFontColor: "black",
    legendFontSize:  10
  }
];

// An array of random integers of length 10
// const data = new Array(10).fill(0).map((_, i) => Math.floor(Math.random() * 100));



// var categoryCount = new Array(categories.length).fill(0);

// // An array of random integers of length 10
// const test = categoryCount.map((_, i) => Math.floor(Math.random() * 100));

// // make list with indices and values
// indexedTest = test.map(function(e,i){return {ind: i, val: e}});

// console.log(indexedTest)

// // sort index/value couples, based on values
// indexedTest.sort(function(x, y){return x.val > y.val ? 1 : x.val == y.val ? 0 : -1});
// // make list keeping only indices
// indices = indexedTest.map(function(e){return e.ind});

// var data = indexedTest.map(function(e) {return {category: categories[e.ind].name, value: e.val}})

// console.log(data)







