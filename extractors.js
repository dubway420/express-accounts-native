import {months, categories} from './constants'

function checkCurrency(val) {

  if (val.match(this)) {
  
    return parseFloat(val.substring(1))
   
   }
 
 }
 
 function dateChecker(words, key) {
      
   var val = words[key]
   if (isFinite(val)) {
     return (parseInt(val))
   }
 }
 
function extractDateAlt (words) {
 
  for (var key in words) {
   
    var day, month
    
    var d = new Date();
    var year = d.getFullYear()
    
    key = parseInt(key)
     
    var word = words[key]
     
    for (var month_index in months) {
       
      var found = word.match(RegExp(months[month_index], "i"))
       
      if (found) {
       
        month = parseInt(month_index)

        var number_word_split = word.split(/([0-9]+)/).filter(Number)
        
//      TODO: REFACTOR THIS SECTION

//      METHOD 1 

        
        if (number_word_split.length === 2) {
          day = number_word_split[0]
          year = number_word_split[1] 

        }

        if (day && month) {
          
          return {day: day, 
            month: month,
            year: year} 
 
          }

//      METHOD 2

        if (key !== 0) {
         
           day = dateChecker(words, key-1)
          
        }
         
         
        if (key !== words.length) {
                 
          year = dateChecker(words, key+1)
         
        }
          
        if (day && month) {
          
          return {day: day, 
            month: month,
            year: year} 
 
          }
      }
       
    }
         
     
  }

  return null

 
}
 
function checkDate(d) {

  var day, month, year;

  var result = d.match(/\d{2}([\/.-])\d{2}\1\d{2}/);

  var dateSplitted

  if (null != result) {

    dateSplitted = result[0].split(result[1]);
    day = dateSplitted[0];
    month = dateSplitted[1];
    year = "20" + dateSplitted[2];

    }

  result = d.match(/\d{2}([\/.-])\d{2}\1\d{4}/);

  if (null != result) {
      
    dateSplitted = result[0].split(result[1]);
    day = dateSplitted[0];
    month = dateSplitted[1];
    year = dateSplitted[2];
  }

  if (month>12) {

    var aux = day;
    day = month;
    month = aux;

  }

  if (day !== undefined && month !== undefined) {

    return {day: parseInt(day), 
            month: parseInt(month) -1,
            year: parseInt(year)} 
  } else {
    return null

  }  

}

function categoryFinder(test_string){

  var category_counts = []
  
  var found = false
  
  var meta

  for (var cat in categories) {

    meta = categories[cat].meta

    var check = test_string.match(RegExp(meta.join("|"), "ig"))

    if (check) {
      category_counts.push(check.length)
      found = true
    } else {
      category_counts.push(0)
    }


  }
  
  // console.log(category_counts)

  if (found) {
    var highestCategoryIndex = category_counts.indexOf(Math.max(...category_counts))

    return highestCategoryIndex
  } 
  
  return -1
  
}

function extractData(text) {

  /* remove line breaks and split the extracted text into individual words */
  var words = text.replace(/\n/g, " ").split(' ')
 
  
  // Search for £. Creates an array of values with £
  /* GBP = words.filter(checkGBP, currency_symbols[0]) */
  
  var GBP = words.map(checkCurrency, "£").filter(Number)

  var amount
  if (GBP.length > 0) {amount = Math.max(...GBP)}
  else {amount = null}

  // console.log(words)
  
  var date = words.map(checkDate).filter(item => item)[0]
  
  if (date === undefined) {
  
    date = extractDateAlt(words)
  
  }

  if (date === undefined) {

    var altWords = text.split("-")
    // console.log(altWords)
    date = extractDateAlt(altWords)
  }

  var category = categoryFinder(text) 
  
  return {
    
    money: {
      value: amount,
      currency: 0
      },
    
    date: date,
    
    category : category

  }
      
}



export default extractData
