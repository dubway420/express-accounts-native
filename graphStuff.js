import { Dimensions } from "react-native";
import { categories, currencies } from './constants'
import React , {Component} from "react"
// import { months } from './constants'

const screenWidth = Dimensions.get("window").width;

const monthMap = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

import {
  PieChart,
  BarChart
} from "react-native-chart-kit";

const chartConfig={
  backgroundColor: 'white',
  backgroundGradientFrom: 'white',
  backgroundGradientTo: 'white',
  decimalPlaces: 0, // optional, defaults to 2dp
  color: (opacity = 1) => 'black',
  style: {
    borderRadius: 16
  }
}

export function makeCategoryChart (data) {
  return (
    <PieChart
    data={categoryDataMaker(data)}
    width={screenWidth*0.8}
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

export function makeCurrencyChart (data) {
  return (
    <PieChart
    data={currencyDataMaker(data)}
    width={screenWidth*0.85}
    height={185}
    chartConfig={chartConfig}
    accessor={"value"}
    backgroundColor={"white"}
    // paddingLeft={10}
    center={[5, 0]}
    absolute={true}
    hasLegend={true}
  />
  );
}

export function makeMonthlyChart (data) {

  return (
    <BarChart
      // style={graphStyle}
      data={monthList(data)}
      width={screenWidth*0.85}
      height={185}
      fromZero={true}
      yAxisLabel={'£'}
      chartConfig={chartConfig}
    />

  )

}



function categoryDataMaker (data) {
  
    var allCategoriesTotal = 0
    // make list with indices and values
    var indexedData = data.map(function(e, i){ allCategoriesTotal += e
                                               return {ind: i, val: e}});

    // sort index/value couples, based on values
    indexedData.sort(function(x, y){return x.val < y.val ? 1 : x.val == y.val ? 0 : -1});

    // make list keeping only indices
    // indices = indexedData.map(function(e){return e.ind});

    let colors1 = ["#0000FF", "#FF8C00", "#8A2BE2", "#006400", "#FF00FF", "#696969"]

    var x = -1
    var topFiveTotal = 0

    var data = indexedData.slice(0, 5).map(function(e) { topFiveTotal += e.val
                                                         x += 1
                return {
                        name: categories[e.ind].name, 
                        value: e.val, 
                        legendFontColor: "black", 
                        color: colors1[x],
                        legendFontSize: 10}})

    // eliminate ones with 0 value
    data = data.filter(function(e){return e.value > 0})          
    
    var totalMinusTop = allCategoriesTotal - topFiveTotal

    // if totalMinusTop is positive, create an other category for it
    if (totalMinusTop > 0) {
        data.push({ 
            name: "Other",
            value: totalMinusTop,
            legendFontColor: "black",
            color: colors1[x+1],
            legendFontSize: 10
        })
    }
          




    
    return data
}

function currencyDataMaker (data) {
  
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
                      name: currencies[e.ind].name, 
                      value: e.val, 
                      legendFontColor: "black", 
                      color: colors1[x],
                      legendFontSize: 10}})

  // eliminate ones with 0 value
  data = data.filter(function(e){return e.value > 0})                    

  
  return data
}

export function monthList (receipts)  {
  
  // get the current month and year
    var currentMonth = new Date().getMonth()
    var currentYear = new Date().getFullYear()
            
    var months = [currentMonth]
    var month
        
    var years = [currentYear]
    var year
        
    for (let i = 1; i < 5; i++) {
      
      month = currentMonth - i
      
      if (month >= 0) {
      
        months.unshift(month)
        years.unshift(currentYear)
      
      } else {
      
        months.unshift(12 + month)
        years.unshift(currentYear - 1)
      
      }
    }

    
    var monthNames = months.map(function(e, i){ 
      return monthMap[e] });
    
    var monthlyTotals = [0, 0, 0, 0, 0]
    for (let i = 0; i < receipts.length; i++) {

      var receipt = receipts[i]

      if (receipt.currency === 0) {
        var receiptMonth = receipt.date.toDate().getMonth()
        var receiptYear = receipt.date.toDate().getFullYear()

        for (let j = 0; j < monthlyTotals.length; j++) {

          var checkMonth = months[j]
          var checkYear = years[j]

          if (receiptMonth === checkMonth && receiptYear === checkYear) {
            monthlyTotals[j] +=  receipt.amount
          }

        }

      }
    }

    return {
      labels: monthNames,
      datasets: [{
        data: monthlyTotals
      }]
    }

} 

export function monthListFull (receipts)  {
  
  // get the current month and year
    var currentMonth = new Date().getMonth()
    var currentYear = new Date().getFullYear()
            
    var months = [currentMonth]
    var month
        
    var years = [currentYear]
    var year
        
    for (let i = 1; i < 12; i++) {
      
      month = currentMonth - i
      
      if (month >= 0) {
      
        months.unshift(month)
        years.unshift(currentYear)
      
      } else {
      
        months.unshift(12 + month)
        years.unshift(currentYear - 1)
      
      }
    }


    
    var monthNames = months.map(function(e, i){ 
      return monthMap[e] });
    
    // a list of zeros 12 long
    var monthlyTotals = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    for (let i = 0; i < receipts.length; i++) {

      var receipt = receipts[i]

      if (receipt.currency === 0) {
        var receiptMonth = receipt.date.toDate().getMonth()
        var receiptYear = receipt.date.toDate().getFullYear()


        for (let j = 0; j < monthlyTotals.length; j++) {

          var checkMonth = months[j]
          var checkYear = years[j]

          if (receiptMonth === checkMonth && receiptYear === checkYear) {
             monthlyTotals[j] +=  receipt.amount
          }

        }

      }
    }

    var data = months.map(function(e, i){ 
      return [monthMap[e] + " " + years[i], "£" + monthlyTotals[i]]});

    return data

} 


// determine if a date is later than 5th of april
function isAfterFifthApril(date) {
    return date.getMonth() >= 4 && date.getDate() > 5
  }
  
  export function financialYear() {
  
    var newDate = new Date()
  
    var year = newDate.getFullYear()
    // console.log(year)
  
   
    if (isAfterFifthApril(newDate)) {
  
      let yearPlusOne = year + 1
  
      return String(year) + "-" + String(yearPlusOne)
  
      }
    else {
  
      let yearMinusOne = year - 1
      
      return String(yearMinusOne) + "-" + String(year)
  
    }  
    
     
  } 


