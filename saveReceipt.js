import fire from './fire'
import {currencies, categories} from './constants'
import {firestoreRefs} from './fireStoreRefs'

var success = false

export function saveReceipt(currency, amount, date, category) {

    var amountFloat = parseFloat(amount)
    var receipts 

    var categoryCount = new Array(categories.length).fill(0);
    var categoryTotals = new Array(categories.length).fill(0);
    
    var currencyCount = new Array(currencies.length).fill(0);
    var currencyTotals = new Array(currencies.length).fill(0);
        
    var UserID = fire.auth().currentUser.uid

    // Get the current user's receipt data
    firestoreRefs(UserID).userLogReceipts.get().then((doc) => {
        
        // If the user has existing receipt data, append to that
        if (doc.exists) {

            var data = doc.data()

            receipts = data.receipts
            receipts += 1

            categoryCount = data.categoryCount
            categoryCount[category] += 1

            if (currency === 0) {
                categoryTotals = data.categoryTotals
                categoryTotals[category] += amountFloat
            }

            currencyCount = data.currencyCount
            currencyCount[currency] += 1

            currencyTotals = data.currencyTotals
            currencyTotals[currency] += amountFloat

            var receiptDetails = data.receiptDetails

            var receiptCurrentDetails = {
                    currency,
                    amount: amountFloat,
                    date,
                    category,
                    logged: new Date
                }

            receiptDetails.push(receiptCurrentDetails)

            firestoreRefs(UserID).userLogReceipts.update({
                receipts,
                categoryCount,
                categoryTotals,
                currencyCount,
                currencyTotals,

                latestReceiptDate: date,

                latestReceiptSubmitDate: new Date,

                receiptDetails
        
            }).then(() => {
        
                return true
            })
            .catch((error) => {
                console.log(error)
            });




    // If the user has no receipt data, create a new document
    }else {

    // var receiptName = "R1"

    categoryCount[category] += 1

    if (currency === 0) {
        categoryTotals[category] += amountFloat
    }

    currencyCount[currency] += 1
    currencyTotals[currency] += amountFloat

    receiptDetails = [{
            currency,
            amount: amountFloat,
            date,
            category,
            logged: new Date
        }]
    
    firestoreRefs(UserID).userLogReceipts.set({
        receipts: 1,
        categoryCount,
        categoryTotals,
        currencyCount,
        currencyTotals,
        firstReceiptDate: date,
        latestReceiptDate: date,
        firstReceiptSubmitDate: new Date,
        latestReceiptSubmitDate: new Date,
        receiptDetails

    }).then(() => {
        
        return true
    })
    .catch((error) => {
        
    });

    

    }
    });

  

}