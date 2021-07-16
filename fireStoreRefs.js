import fire from './fire'
import {financialYear} from './utils'

var db = fire.firestore()
var userID = fire.auth().currentUser.uid;

var userFB = db.collection("users").doc(userID)
export var userReceipts = userFB.collection("receipts" + financialYear())
export var userLogReceipts = userFB.collection("logs" + financialYear()).doc("receipts")