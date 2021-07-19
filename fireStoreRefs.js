import fire from './fire'
import {financialYear} from './utils'



export function firestoreRefs(userID) {

    var db = fire.firestore()

    var userFB = db.collection("users").doc(userID)
    var userReceipts = userFB.collection("receipts" + financialYear())
    var userLogReceipts = userFB.collection("logs" + financialYear()).doc("receipts")

    return {userLogReceipts, userReceipts}

}