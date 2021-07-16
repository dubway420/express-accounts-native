// determine if a date is later than 5th of april
function isAfterFifthApril(date) {
    return date.getMonth() >= 4 && date.getDate() > 5
  }
  
export function financialYear() {

    var newDate = new Date()

    var year = newDate.getFullYear()


    if (isAfterFifthApril(newDate)) {

        let yearPlusOne = year + 1

        return String(year) + "-" + String(yearPlusOne)

        }
    else {

        let yearMinusOne = year - 1
        
        return String(yearMinusOne) + "-" + String(year)

    }  

    
}