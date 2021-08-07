import fire from './fire'
import firebase from 'firebase'
import {currencies, categories} from './constants'
import {firestoreRefs} from './fireStoreRefs'
import uuid from "uuid";
import { financialYear } from './utils';

var success = false

export async function saveReceipt (currency, amount, date, category, images) {

    var UserID = fire.auth().currentUser.uid

    // Get the current user's receipt data
    var data = await firestoreRefs(UserID).userLogReceipts.get().then((doc) => {

            return doc.data()
        
    });

    var amountFloat = parseFloat(amount)

    console.log(data)

    var categoryCount = new Array(categories.length).fill(0);
    var categoryTotals = new Array(categories.length).fill(0);
    
    var currencyCount = new Array(currencies.length).fill(0);
    var currencyTotals = new Array(currencies.length).fill(0);

    var numberImages = images.length 

    var listURLs = []

    if (numberImages > 0) {
        listURLs = await uploadImages(images, financialYear(), UserID)}
        

    // If the user has existing receipt data, append to that
    if (data) {

        var receipts = data.receipts + 1


        categoryCount = data.categoryCount
        categoryCount[category] += 1

        categoryTotals = data.categoryTotals
        if (currency === 0) {
            
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
                logged: new Date,
                listURLs,
                updated: null
            }

        receiptDetails.push(receiptCurrentDetails)

        var firstReceiptDate = data.firstReceiptDate
        var latestReceiptDate = data.latestReceiptDate

        if (firebase.firestore.Timestamp.fromDate(date).seconds < firstReceiptDate.seconds) {
            firstReceiptDate = date
        }

        if (firebase.firestore.Timestamp.fromDate(date).seconds > latestReceiptDate.seconds) {
            latestReceiptDate = date
        }

        firestoreRefs(UserID).userLogReceipts.update({
            receipts,
            categoryCount,
            categoryTotals,
            currencyCount,
            currencyTotals,

            firstReceiptDate,
            latestReceiptDate,

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

    var receipts = 1

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
            logged: new Date,
            listURLs,
            updated: null
        }]


    
    firestoreRefs(UserID).userLogReceipts.set({
        receipts,
        categoryCount,
        categoryTotals,
        currencyCount,
        currencyTotals,
        firstReceiptDate: date,
        latestReceiptDate: date,
        firstReceiptSubmitDate: new Date,
        latestReceiptSubmitDate: new Date,
        receiptDetails,
        // images: uploadedImages

    }).then(() => {
        
        return true
    })
    .catch((error) => {
        
    });

    

    }
    
    return true

}

export async function updateReceipts (categoryCount, categoryTotals, currencyCount, currencyTotals, firstReceiptDate, latestReceiptDate, receiptDetails) {
    
    var UserID = fire.auth().currentUser.uid

    

    var result = await firestoreRefs(UserID).userLogReceipts.update({
        categoryCount,
        categoryTotals,
        currencyCount,
        currencyTotals,

        firstReceiptDate,
        latestReceiptDate,

        receiptDetails

    }).then(() => {

        return true
    })
    .catch((error) => {
        console.log(error)

        return false
    });

    return result
    
}



// cycle through the array of images and upload them
export async function uploadImages(images, receiptNumber, UserID) {
    var promises = []
    var url
    for (var i = 0; i < images.length; i++) {
        url = await uploadImageAsync(images[i], receiptNumber, UserID).then((url) => { return url})
        promises.push(url)
    }
    

    return promises

}   




// Upload image to Firebase Storage
async function uploadImageAsync(uri, receiptNumber, UserID) {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
  
    // const uploadTask = fire.storage().ref(`/${UserID}/Receipts/R${receiptNumber}/`).put(blob);
    // const result = await uploadTask;
    // return result;

    const ref = fire.storage().ref(`/${UserID}/Receipts/R${receiptNumber}/`).child(uuid.v4());
    const snapshot = await ref.put(blob);
  
    // We're done with the blob, close and release it
    blob.close();
  
      
    // console.log('Uploaded image to Firebase Storage:', snapshot.ref.getDownloadURL().toString());
    var url = await snapshot.ref.getDownloadURL().then((downloadURL) => {
        
        return downloadURL
      });

    return url
  }

  
 
