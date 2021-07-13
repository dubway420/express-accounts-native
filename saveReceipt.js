import fire from './fire'
import {currencies, categories} from './constants'


export function saveReceipt(currency, amount, date, category) {

    var amountFloat = parseFloat(amount)
    var receipts 

    var categoryCount = new Array(categories.length).fill(0);
    var categoryTotals = new Array(categories.length).fill(0);
    
    var currencyCount = new Array(currencies.length).fill(0);
    var currencyTotals = new Array(currencies.length).fill(0);
        
    var db = fire.firestore()
    var userID = fire.auth().currentUser.uid;

    var userFB = db.collection("users").doc(userID)
    var userReceipts = userFB.collection("receipts")
    var userLogReceipts = userFB.collection("logs").doc("receipts")


    userLogReceipts.get().then((doc) => {
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

            userLogReceipts.update({
                receipts,
                categoryCount,
                categoryTotals,
                currencyCount,
                currencyTotals,

                latestReceiptDate: date,

                latestReceiptSubmitDate: new Date
        
            })

            var receiptName = "R" + receipts

            userReceipts.doc(receiptName).set({
                currency,
                amount: amountFloat,
                date,
                category,
                logged: new Date
            })



    }else {

    var receiptName = "R1"

    categoryCount[category] += 1

    if (currency === 0) {
        categoryTotals[category] += amountFloat
    }

    currencyCount[currency] += 1
    currencyTotals[currency] += amountFloat
    
    userLogReceipts.set({
        receipts: 1,
        categoryCount,
        categoryTotals,
        currencyCount,
        currencyTotals,
        firstReceiptDate: date,
        latestReceiptDate: date,
        firstReceiptSubmitDate: new Date,
        latestReceiptSubmitDate: new Date

    })

    userReceipts.doc(receiptName).set({
        currency,
        amount: amountFloat,
        date,
        category,
        logged: new Date
    })
    .then(() => {
        console.log("Document successfully written!");
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });

    }
    });



}