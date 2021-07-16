import { Dimensions } from "react-native";
import { categories } from './constants'
import React , {Component} from "react"

const screenWidth = Dimensions.get("window").width;

import {
  PieChart,
} from "react-native-chart-kit";

const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 10, // optional, default 3
    barPercentage: 10,
    useShadowColorFromDataset: false // optional
  };

export default function makeChart (data) {
  return (
    <PieChart
    data={categoryDataMaker(data)}
    width={screenWidth*0.85}
    height={185}
    chartConfig={chartConfig}
    accessor={"value"}
    backgroundColor={"white"}
    // paddingLeft={10}
    center={[5, 0]}
    absolute={false}
    hasLegend={true}
  />
  );
}

function categoryDataMaker (data) {
  
    // make list with indices and values
    var indexedData = data.map(function(e, i){return {ind: i, val: e}});

    // sort index/value couples, based on values
    indexedData.sort(function(x, y){return x.val < y.val ? 1 : x.val == y.val ? 0 : -1});

    // make list keeping only indices
    // indices = indexedData.map(function(e){return e.ind});

    let colors1 = ["#0000FF", "#FF8C00", "#8A2BE2", "#006400", "#FF00FF"]

    var x = -1

    var data = indexedData.slice(0, 5).map(function(e) { x += 1
                return {
                        name: categories[e.ind].name, 
                        value: e.val, 
                        legendFontColor: "black", 
                        color: colors1[x],
                        legendFontSize: 10}})

    // eliminate ones with 0 value
    data = data.filter(function(e){return e.value > 0})                    

    
    return data
}


// determine if a date is later than 5th of april
function isAfterFifthApril(date) {
    return date.getMonth() >= 4 && date.getDate() > 5
  }
  
  export function financialYear() {
  
    var newDate = new Date()
  
    var year = newDate.getFullYear()
    console.log(year)
  
   
    if (isAfterFifthApril(newDate)) {
  
      let yearPlusOne = year + 1
  
      return String(year) + "-" + String(yearPlusOne)
  
      }
    else {
  
      let yearMinusOne = year - 1
      
      return String(yearMinusOne) + "-" + String(year)
  
    }  
    
     
  } 


