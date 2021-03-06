import React, { Component } from "react"
import { Button, SafeAreaView, ScrollView, Image, Text, View, TextInput, TouchableOpacity, LogBox, Alert } from "react-native";
import fire from './fire'
import { styles } from './styles'
import background from './background.jpg'
import logo from './logo.png'
import { categories, months, currencies } from './constants'
import { screenWidth } from './extras'
import { makeCategoryChart, monthListFull, makeMonthlyChart, makeCurrencyChart } from './graphStuff'
import { financialYear, amountValid, getStartOfFinancialYear } from './utils'
import { firestoreRefs } from './fireStoreRefs'
import { Table, TableWrapper, Row } from 'react-native-table-component';
import Modal from 'react-native-modal';
import { Picker } from '@react-native-picker/picker'
import { Dialog, ConfirmDialog } from 'react-native-simple-dialogs';
import Icon from 'react-native-vector-icons/FontAwesome'
import DateTimePicker from '@react-native-community/datetimepicker';
import firebase from 'firebase'
import { updateReceipts, deleteReceipts } from './saveReceipt'
import { topBar } from './topBar'
import SplashScreen from './splashScreen'

import ImageViewing from "./ImageViewing";
import ImageList from "./components/ImageList";
import ImageHeader from "./components/ImageHeader";
import ImageFooter from "./components/ImageFooter";

import { architecture } from "./data/architecture";
import { travel } from "./data/travel";
import { city } from "./data/city";
import { food } from "./data/food";

import { getImageSource } from './typescriptStuff'

import get from "lodash/get";


// Firebase sets some timeers for a long period, which will trigger some warnings. Let's turn that off for this example
LogBox.ignoreLogs([`Setting a timer for a long period`]);

const tableHead = ['Amount', 'date', 'Category', 'Logged']
const widthArr = [screenWidth * 0.2, screenWidth * 0.2, screenWidth * 0.35, screenWidth * 0.2]

const widthArr2 = [screenWidth * 0.45, screenWidth * 0.4]



export class ReceiptsView extends Component {
  constructor(props) {
    super(props)

    this.dateFormat = this.dateFormat.bind(this)

    this.state = {

      addReceipt: false,
      receipts: 0,

      categoryCount: [],
      categoryTotals: [],
      currencyCount: [],
      currencyTotals: [],

      // firstReceiptDate: null,
      // firstReceiptSubmitDate: null,
      // latestReceiptDate: null,
      // latestReceiptSubmitDate: null,

      receiptDetails: [],

      financialYear: financialYear(),

      showPoundsSummaryList: false,
      showMonthlySummary: false,
      showCurrencySummary: false,


      showReceiptsList: false,

      receiptsSorted: [],
      receiptsList: [],
      currentImageIndex: 0,
      images: [],
      imagesURLs: [],
      imageVisible: false,

      updated: null,

      showReceiptDialogs: false,

      currency: 0,
      amount: 0,
      category: 0,
      date: new Date(),
      convertedDate: new Date,
      logged: new Date(),
      updated: null,

      showEditDialog: false,

      tempCurrency: null,
      tempAmount: null,
      amountValid: true,
      tempCategory: null,

      editCurrency: null,
      editAmount: null,
      editCategory: null,
      editDate: null,

      showUpdateButton: false,

      editSaved: false,

      deleteButtonPressed: false,
      showSplash: true

    };

  }

  selectImages(images, index) {
    this.setState({
      currentImageIndex: index,
      imageVisible: true
    })
  }



  dateFormat = (date) => {
    let convertedDate = date.toDate()

    let month = months[convertedDate.getMonth()];
    let day = convertedDate.getDate();
    let year = convertedDate.getFullYear();

    // console.log(date)

    return `${day} ${month} ${year}`;
  }

  receiptsMessage = () => {

    let numberReceipts
    let fullList
    let firstReceiptMessage
    let latestReceiptMessage
    let graphs
    let otherGraph

    if (this.state.receipts === 0) {
      numberReceipts = <Text style={styles.label}>You have not saved any receipts yet</Text>
    } else if (this.state.receipts === 1) {
      numberReceipts = <Text style={styles.label}>You have saved one receipt</Text>
      // firstReceiptMessage = <Text style={styles.message}>This receipt was dated {this.dateFormat(this.state.firstReceiptDate)} and submitted on {this.dateFormat(this.state.firstReceiptSubmitDate)}</Text>
    } else {
      numberReceipts = <Text style={styles.label}>You have saved a total of {this.state.receipts} receipts</Text>
      // firstReceiptMessage = <Text style={styles.message}>First receipt was dated {this.dateFormat(this.state.firstReceiptDate)} and submitted on {this.dateFormat(this.state.firstReceiptSubmitDate)}</Text>
      // latestReceiptMessage = <Text style={styles.message}>Latest receipt was dated {this.dateFormat(this.state.latestReceiptDate)} and submitted on {this.dateFormat(this.state.latestReceiptSubmitDate)}</Text>
      fullList = <TouchableOpacity
        style={styles.moreInfoButton}
        onPress={this.receiptList}>
        <Text style={styles.moreInfoText}> Full List </Text>
      </TouchableOpacity>
      if (this.state.currencyCount[0] > 0) {
        graphs = <View style={{ marginTop: 10 }}>


          <Text style={styles.label2}>Pounds Sterling - Category Breakdown </Text>
          <TouchableOpacity style={styles.graph} onPress={() => this.setState({ showPoundsSummaryList: !this.state.showPoundsSummaryList })}>


            {this.state.showPoundsSummaryList ? this.categoryTable() : makeCategoryChart(this.state.categoryTotals)}

          </TouchableOpacity>

          <Text style={styles.label2}>Totals per Month</Text>
          <TouchableOpacity style={styles.graph}
            onPress={() => this.setState({ showMonthlySummary: !this.state.showMonthlySummary })}
          >

            {this.state.showMonthlySummary ? this.monthlyTable(this.state.receiptDetails) : makeMonthlyChart(this.state.receiptDetails)}

          </TouchableOpacity>
        </View>
      }

      if (this.otherCurrencies()) {

        otherGraph = <View style={{ marginTop: 10 }}>


          <Text style={styles.label2}>Currency Breakdown - Number of Receipts </Text>
          <TouchableOpacity style={styles.graph} onPress={() => this.setState({ showCurrencySummary: !this.state.showCurrencySummary })}>


            {this.state.showCurrencySummary ? this.currencyTable() : makeCurrencyChart(this.state.currencyCount)}
            {/* {makeCurrencyChart(this.state.currencyCount)} */}
          </TouchableOpacity>


        </View>

      }


    }

    let view = <View style={styles.label}>
      {numberReceipts}
      {fullList}
      {firstReceiptMessage}
      {latestReceiptMessage}
      {graphs}
      {otherGraph}
    </View>
    return (view)

  }

  otherCurrencies = () => {
    var currencyCounts = this.state.currencyCount

    // sum elements 1 through n of currencyCounts
    var total = 0
    for (var i = 1; i < currencyCounts.length; i++) {
      total += currencyCounts[i]
    }

    if (total > 0) {
      return true
    }
  }

  convertReceipt(receipt) {

    if (receipt.currency === 0) {

      var date = this.dateFormat(receipt.date)
      var logged = this.dateFormat(receipt.logged)


      return [String(receipt.amount), date, categories[receipt.category].name, logged]

    }

  }

  currencyItems() {

    return currencies.map((myValue, myIndex) => {
      return (
        <Picker.Item label={myValue.symbol} value={myIndex} key={myIndex} />
      )
    });

  }

  receiptList = () => {

    var receipts = this.state.receiptDetails

    // map receipts to a list of receipt objects
    receipts.sort(function (x, y) { return x.date > y.date ? 1 : x.date == y.date ? 0 : -1 });

    var receiptList = receipts.map((receipt) => this.convertReceipt(receipt))

    this.setState({ receiptsList: receiptList, showReceiptsList: true, receiptsSorted: receipts })



  }

  onEdit = (value) => {


    this.setState({
      showEditDialog: true,
      showEditDialogType: value,
    })
  }

  amountHandler(value) {



    this.setState({
      tempAmount: value,
      amountValid: amountValid(value),
      showUpdateButton: true
    })

    // console.log(value)
    // console.log(this.state.amountValid)

  }

  categoryItems() {

    return categories.map((myValue, myIndex) => {
      return (
        <Picker.Item label={myValue.name} value={myIndex} key={myIndex} />
      )
    });

  }

  changeCategory = (itemValue, itemIndex) => {

    this.setState({
      tempCategory: itemIndex,
      showUpdateButton: true
    })

  }

  changeCurrency = (itemValue, itemIndex) => {

    this.setState({
      tempCurrency: itemIndex,
      showUpdateButton: true
    })

  }

  closeDialog = () => {
    if (this.state.showEditDialogType === 1) {
      this.setState({
        showEditDialog: false,
        tempCurrency: null,
        tempAmount: null,

      })
    }

    else {

      this.setState({
        showEditDialog: false,
        tempCategory: null,
        showUpdateButton: false,

      })


    }

  }

  updateButton = () => {

    if (this.state.showEditDialogType === 1) {

      if (this.state.amountValid) {

        this.setState({
          showEditDialog: false,
          showUpdateButton: false,
          editCurrency: this.state.tempCurrency,
          editAmount: this.state.tempAmount,
          tempCurrency: null,
          tempAmount: null,
          editSaved: true

        })

      } else {

        Alert.alert("Ensure that the amount field is filled in with a valid amount.")

      }
    }

    else {
      this.setState({
        showEditDialog: false,
        showUpdateButton: false,
        editCategory: this.state.tempCategory,
        tempCategory: null,
        editSaved: true
      })
    }

  }

  dateChange = (event, selectedDate) => {

    if (event.type === "set") {
      this.setState({
        editDate: selectedDate,
        showEditDialog: false,
        editSaved: true
      })
    }
    else {
      this.setState({ showEditDialog: false })
    }

  };

  editDialog = () => {

    if (this.state.showEditDialogType === 1) {

      var currency_val
      if (this.state.tempCurrency !== null) {
        currency_val = this.state.tempCurrency
      } else if (this.state.editCurrency !== null) {
        currency_val = this.state.editCurrency
      } else {
        currency_val = this.state.currency
      }

      var amount_val
      if (this.state.tempAmount !== null) {
        amount_val = this.state.tempAmount
      } else if (this.state.editAmount !== null) {
        amount_val = this.state.editAmount
      } else {
        amount_val = this.state.amount
      }



      return (
        <Dialog
          visible={this.state.showEditDialog}
          title="Edit Amount"
          onTouchOutside={this.closeDialog} >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Picker onValueChange={this.changeCurrency} style={styles.currencyBox} selectedValue={currency_val}>
              {this.currencyItems()}
            </Picker>

            <TextInput style={styles.currencyInput}
              underlineColorAndroid="transparent"
              type="number"
              id="value"
              name="value"
              value={String(amount_val)}
              keyboardType="numeric"
              placeholder="Value"
              placeholderTextColor="black"
              autoCapitalize="none"
              onChangeText={(amount) => this.amountHandler(amount)} />

          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>

            <TouchableOpacity
              style={styles.photoButton}
              onPress={this.closeDialog}
            >
              <Text style={styles.submitButtonText}> Close </Text>
            </TouchableOpacity>

            {this.state.showUpdateButton && <TouchableOpacity
              style={styles.photoButton}
              onPress={this.updateButton}
            >
              <Text style={styles.submitButtonText}> Update </Text>
            </TouchableOpacity>}



          </View>

        </Dialog>
      )

    } else if (this.state.showEditDialogType === 2) {

      var date
      if (this.state.editDate) {

        date = this.state.editDate

      } else {

        date = this.state.convertedDate

      }

      if (this.state.showEditDialog) {
        return (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            // mode={mode}
            is24Hour={true}
            display="default"
            minimumDate={getStartOfFinancialYear()}
            maximumDate={new Date()}
            visible={this.state.showEditDialog}
            onChange={this.dateChange}
          />
        )
      }
    } else if (this.state.showEditDialogType === 3) {

      var category_val
      if (this.state.tempCategory !== null) {
        category_val = this.state.tempCategory
      } else if (this.state.editCategory !== null) {
        category_val = this.state.editCategory
      } else {
        category_val = this.state.category
      }

      return (
        <Dialog
          visible={this.state.showEditDialog}
          title="Edit Category"
          onTouchOutside={this.closeDialog} >
          <View style={styles.categoryInput}>

            <Picker onValueChange={this.changeCategory} style={styles.categoryBox} selectedValue={category_val}>
              {this.categoryItems()}

            </Picker>

          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>

            <TouchableOpacity
              style={styles.photoButton}
              onPress={this.closeDialog}
            >
              <Text style={styles.submitButtonText}> Close </Text>
            </TouchableOpacity>

            {this.state.showUpdateButton && <TouchableOpacity
              style={styles.photoButton}
              onPress={this.updateButton}
            >
              <Text style={styles.submitButtonText}> Update </Text>
            </TouchableOpacity>}



          </View>
        </Dialog>
      )
    }

  }

  receiptListModal = () => {

    // ====== AMOUNT =========
    var amount_line
    if (this.state.editCurrency) {

      amount_line = currencies[this.state.editCurrency].symbol

    } else {

      amount_line = currencies[this.state.currency].symbol

    }

    if (this.state.editAmount) {

      amount_line += this.state.editAmount

    } else {

      amount_line += this.state.amount

    }

    var amount_style
    if (this.state.editCurrency || this.state.editAmount) {

      amount_style = { width: "50%", color: 'green' }

    } else {

      amount_style = { width: "50%" }

    }

    // ====== DATE =========

    var date, date_style
    if (this.state.editDate) {

      var dateRaw = this.state.editDate

      let month = months[dateRaw.getMonth()];
      let day = dateRaw.getDate();
      let year = dateRaw.getFullYear();

      // console.log(date)

      date = `${day} ${month} ${year}`;


      date_style = { width: "50%", color: 'green' }

    } else {

      date = this.state.date
      date_style = { width: "50%" }

    }

    // ====== CATEGORY =========

    var category_val, category_style
    if (this.state.editCategory !== null) {
      category_val = categories[this.state.editCategory].name
      category_style = { width: "50%", color: 'green' }
    } else {
      category_val = categories[this.state.category].name
      category_style = { width: "50%" }
    }

    var x = 0

    return (
      // <Modal style={{margin: 0}} visible={this.state.displayPhoto}>
      <SafeAreaView style={styles.tableView}>

        <ScrollView keyboardShouldPersistTaps='handled' horizontal={true}>


          <View>

            <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
              <Row data={tableHead} widthArr={widthArr} style={styles.header} textStyle={styles.text} />
            </Table>
            <ScrollView keyboardShouldPersistTaps='handled' style={{ height: "50%" }}>
              <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9', width: "100%" }}>
                {

                  this.state.receiptsList.map(

                    function (e, i) {

                      if (e) {
                        x += 1
                      }

                      return <Row
                        key={i}
                        data={e}
                        widthArr={widthArr}
                        style={[styles.row, x % 2 && { backgroundColor: '#F7F6E7' }]}
                        textStyle={styles.text}
                        onPress={() => { this.selectRow(i) }}
                      />
                    }, this
                  )
                }
              </Table>


              <Dialog
                visible={this.state.showReceiptDialogs}
                title="Receipt Details"
                onTouchOutside={() => this.setState({ showReceiptDialogs: false })} >
                <View>

                  <Text> Amount: </Text>
                  <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                    <Text style={amount_style}> {amount_line}</Text>
                    <TouchableOpacity
                      // style = {styles.trashButton}
                      onPress={() => this.setState({ showReceiptDialogs: false })}
                    >

                      <Icon onPress={() => this.onEdit(1)} style={{ marginLeft: 10 }} name={"edit"} size={20} />
                    </TouchableOpacity>
                  </View>

                  <Text style={{ width: "50%" }}> Date of transaction: </Text>
                  <View style={{ flexDirection: 'row', marginBottom: 10 }}>

                    <Text style={date_style}> {date}</Text>

                    <TouchableOpacity
                      // style = {styles.trashButton}
                      onPress={() => this.setState({ showReceiptDialogs: false })}
                    >

                      <Icon onPress={() => this.onEdit(2)} style={{ marginLeft: 10 }} name={"edit"} size={20} />
                    </TouchableOpacity>

                  </View>


                  <Text style={{ width: "50%" }}> Category: </Text>
                  <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                    <Text style={category_style}> {category_val}</Text>

                    <TouchableOpacity
                      // style = {styles.trashButton}
                      onPress={() => this.setState({ showReceiptDialogs: false })}
                    >

                      <Icon onPress={() => this.onEdit(3)} style={{ marginLeft: 10 }} name={"edit"} size={20} />
                    </TouchableOpacity>
                  </View>

                  <View style={{ flexDirection: 'row', width: "100%" }}>

                    <Text> Logged: </Text>
                    <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                      <Text style={{ width: "40%" }}> {this.state.logged}</Text>
                    </View>

                    {this.state.updated &&
                      <><Text> Updated: </Text><View style={{ flexDirection: 'row', marginBottom: 10 }}>
                        <Text style={{ width: "40%" }}> {this.state.logged}</Text>
                      </View></>}

                  </View>
                  <ImageList
                    images={this.state.imagesURLs}
                    onPress={(index) => this.selectImages(travel, index)}
                    shift={0.25}
                  />

                  <View style={{ flexDirection: 'row' }}>

                    {this.state.editSaved &&

                      <TouchableOpacity
                        style={styles.closeButton}
                        onPress={this.updateReceipt}
                      >
                        <Text style={styles.submitButtonText}> Save Changes </Text>
                      </TouchableOpacity>

                    }

                    <TouchableOpacity
                      style={styles.closeButton}
                      onPress={this.closeReceipt}
                    >
                      <Text style={styles.submitButtonText}> Close </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.trashButton}
                      onPress={() => this.setState({ deleteButtonPressed: true })}
                    >

                      <Icon
                        //  onPress = {() => this.setState({deleteButtonPressed: true})}
                        name={"trash"} size={20} />
                    </TouchableOpacity>

                  </View>
                </View>
              </Dialog>

              <ConfirmDialog
                title="Receipt Deletion"
                message="Are you sure that you want to delete this receipt?"
                visible={this.state.deleteButtonPressed}
                onTouchOutside={() => this.setState({ deleteButtonPressed: false })}
                positiveButton={{
                  title: "YES",
                  onPress: this.deleteReceipt
                }}
                negativeButton={{
                  title: "NO",
                  onPress: () => this.setState({ deleteButtonPressed: false })
                }}
              />



              <ImageViewing
                images={getImageSource(this.state.images)}
                imageIndex={this.state.currentImageIndex}
                presentationStyle="overFullScreen"
                visible={this.state.imageVisible}
                onRequestClose={() => this.setState({ imageVisible: false })}
              // onLongPress={onLongPress}

              />
              <TouchableOpacity
                style={styles.photoButton}
                onPress={this.closeModal}
              >
                <Text style={styles.submitButtonText}> Close </Text>
              </TouchableOpacity>
            </ScrollView>



          </View>

          {this.editDialog()}


        </ScrollView>
      </SafeAreaView>

    )
  }

  tableDataMaker() {

    var data = this.state.categoryTotals

    // make list with indices and values
    var indexedData = data.map(function (e, i) { return { ind: i, val: e } });

    // sort index/value couples, based on values
    indexedData.sort(function (x, y) { return x.val < y.val ? 1 : x.val == y.val ? 0 : -1 });


    var data = indexedData.map(function (e) {
      return [categories[e.ind].name,
      e.val]
    })

    // eliminate ones with 0 value
    data = data.filter(function (e) { return e[1] > 0 })


    return data
  }

  categoryTable() {

    var data = this.tableDataMaker()


    return (

      <ScrollView keyboardShouldPersistTaps='handled' horizontal={true}>
        <View style={{ width: "100%" }}>

          <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
            <Row data={['Category', "Amount"]} widthArr={widthArr2} style={styles.header} textStyle={styles.text} />
          </Table>
          <ScrollView keyboardShouldPersistTaps='handled' style={styles.dataWrapper}>
            <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
              {

                data.map((rowData, index) => (
                  <Row
                    key={index}
                    data={rowData}
                    widthArr={widthArr2}
                    style={[styles.row, index % 2 && { backgroundColor: '#F7F6E7' }]}
                    textStyle={styles.text} />
                ))



              }
            </Table>



          </ScrollView>
        </View>
      </ScrollView>

    )


  }

  monthlyTable() {

    var data = monthListFull(this.state.receiptDetails)


    return (

      <ScrollView keyboardShouldPersistTaps='handled' horizontal={true}>
        <View style={{ width: "100%" }}>

          <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
            <Row data={['Category', "Amount"]} widthArr={widthArr2} style={styles.header} textStyle={styles.text} />
          </Table>
          <ScrollView keyboardShouldPersistTaps='handled' style={styles.dataWrapper}>
            <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
              {
                data.map((rowData, index) => (
                  <Row
                    key={index}
                    data={rowData}
                    widthArr={widthArr2}
                    style={[styles.row, index % 2 && { backgroundColor: '#F7F6E7' }]}
                    textStyle={styles.text} />
                ))
              }
            </Table>

          </ScrollView>
        </View>
      </ScrollView>

    )


  }

  currencyDataMaker() {

    var data = this.state.currencyTotals
    // const currencies = currencies

    // make list with indices and values
    var indexedData = data.map(function (e, i) { return { ind: i, val: currencies[i].symbol + e } });

    // sort index/value couples, based on values
    // indexedData.sort(function(x, y){return x.val < y.val ? 1 : x.val == y.val ? 0 : -1});


    var data = indexedData.map(function (e) {
      return [currencies[e.ind].name,
      e.val]
    })

    // eliminate ones with 0 value
    // data = data.filter(function(e){return e[1] > 0})                


    return data
  }

  currencyTable() {

    var data = this.currencyDataMaker()


    return (

      <ScrollView keyboardShouldPersistTaps='handled' horizontal={true}>
        <View style={{ width: "100%" }}>

          <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
            <Row data={['Category', "Amount"]} widthArr={widthArr2} style={styles.header} textStyle={styles.text} />
          </Table>
          <ScrollView keyboardShouldPersistTaps='handled' style={styles.dataWrapper}>
            <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
              {
                data.map((rowData, index) => (
                  <Row
                    key={index}
                    data={rowData}
                    widthArr={widthArr2}
                    style={[styles.row, index % 2 && { backgroundColor: '#F7F6E7' }]}
                    textStyle={styles.text} />
                ))
              }
            </Table>

          </ScrollView>
        </View>
      </ScrollView>

    )


  }

  componentDidMount = async () => {

    console.log("componentDidMount: receipts view")

    this.loadData()

    // this.setState({ showSplash: false })

  }

  loadData = async () => {

    var UserID = fire.auth().currentUser.uid

    firestoreRefs(UserID).userLogReceipts.get().then((doc) => {
      if (doc.exists) {

        var data = doc.data()


        this.setState({
          receipts: data.receipts,

          categoryCount: data.categoryCount,
          categoryTotals: data.categoryTotals,

          currencyCount: data.currencyCount,
          currencyTotals: data.currencyTotals,

          // firstReceiptDate: data.firstReceiptDate,
          // firstReceiptSubmitDate: data.firstReceiptSubmitDate,

          // latestReceiptDate: data.latestReceiptDate,
          // latestReceiptSubmitDate: data.latestReceiptSubmitDate,
          receiptDetails: data.receiptDetails,
          showSplash: false

        })

      }

      else {
        this.setState({showSplash: false})
      }
    })

    return true

  }

  closeModal = () => {
    this.setState({ showReceiptsList: false })
  }

  closeReceipt = () => {

    this.setState({
      showReceiptDialogs: false,
      editCurrency: null,
      editAmount: null,
      amountValid: false,
      editCategory: null,
      editDate: null,
      showUpdateButton: false,
      editSaved: false
    })

  }

  selectRow = (index) => {

    var receipt = this.state.receiptsSorted[index]

    var imagesURLs = receipt.listURLs

    var images = imagesURLs.map(function (e, i) { return { title: ("Receipt " + (i + 1)), thumbnail: e, original: e } })

    var updated
    if (receipt.updated) {
      updated = this.dateFormat(receipt.updated)
    } else {
      updated = null
    }


    this.setState({
      receiptIndex: index,
      currency: receipt.currency,
      amount: receipt.amount,
      category: receipt.category,
      date: this.dateFormat(receipt.date),
      convertedDate: receipt.date.toDate(),
      logged: this.dateFormat(receipt.logged),
      loggedConverted: receipt.logged.toDate(),
      updated: updated,

      imagesURLs,
      images,
      showReceiptDialogs: true
    })

  }

  updateReceipt = async () => {

    var receiptsAll = this.state.receiptsSorted

    // Only changes if currency is changing
    var currencyCount = this.state.currencyCount
    var currencyTotals = this.state.currencyTotals

    // Only changes if category is changing
    var categoryCount = this.state.categoryCount

    // Changes if 1) category is changing, or 2) currency is changing from/to 0
    var categoryTotals = this.state.categoryTotals

    var amountNew = this.state.amount
    if (this.state.editAmount) {
      amountNew = Number(this.state.editAmount)
      receiptsAll[this.state.receiptIndex].amount = amountNew

      this.setState({ editAmount: null })


      if (this.state.editCurrency === null && this.state.editCategory === null) {

        categoryTotals[this.state.category] = categoryTotals[this.state.category] - this.state.amount
        categoryTotals[this.state.category] = categoryTotals[this.state.category] + amountNew

      }

    }


    if (this.state.editCurrency) {
      receiptsAll[this.state.receiptIndex].currency = this.state.editCurrency

      currencyCount[this.state.editCurrency] = currencyCount[this.state.editCurrency] + 1
      currencyTotals[this.state.editCurrency] = currencyTotals[this.state.editCurrency] + amountNew

      currencyCount[this.state.currency] = currencyCount[this.state.currency] - 1
      currencyTotals[this.state.currency] = currencyTotals[this.state.currency] - this.state.amount

      // If previous currency was 0
      if (this.state.currency === 0) {

        categoryCount[this.state.category] = categoryCount[this.state.category] - 1
        categoryTotals[this.state.category] = categoryTotals[this.state.category] - this.state.amount

        // If currency is now 0 and category has not been changed  
      } else if (this.state.editCurrency === 0 && editCategory === null) {

        categoryCount[this.state.category] = categoryCount[this.state.category] + 1
        categoryTotals[this.state.category] = categoryTotals[this.state.category] + amountNew

        // If currency is now 0 and category *has* been changed  
      } else if (this.state.editCurrency === 0 && editCategory !== null) {

        categoryCount[this.state.editCategory] = categoryCount[this.state.editCategory] + 1
        categoryTotals[this.state.editCategory] = categoryTotals[this.state.editCategory] + amountNew

      }


      this.setState({ editCurrency: null })
    }


    if (this.state.editDate) {

      var firebaseDate = firebase.firestore.Timestamp.fromDate(this.state.editDate)

      receiptsAll[this.state.receiptIndex].date = firebaseDate
      this.setState({ editDate: null })

    }

    if (this.state.editCategory) {
      receiptsAll[this.state.receiptIndex].category = this.state.editCategory

      if (this.state.currency === 0 && this.state.editCurrency === null) {

        categoryCount[this.state.category] = categoryCount[this.state.category] - 1
        categoryTotals[this.state.category] = categoryTotals[this.state.category] - this.state.amount

        categoryCount[this.state.editCategory] = categoryCount[this.state.editCategory] + 1
        categoryTotals[this.state.editCategory] = categoryTotals[this.state.editCategory] + amountNew


      }

      this.setState({ editCategory: null })

    }

    receiptsAll[this.state.receiptIndex].updated = firebase.firestore.Timestamp.fromDate(new Date())

    //  console.log(receiptsAll)
    this.setState({
      showReceiptDialogs: false,
      receiptsSorted: receiptsAll,
      showUpdateButton: false,
      editSaved: false
    })


    const changesSaved = await updateReceipts(categoryCount, categoryTotals, currencyCount, currencyTotals, receiptsAll)

    this.receiptList()
    if (changesSaved) {
      Alert.alert('Changes Saved', 'Your changes have been saved.')
    }
    else {
      Alert.alert('Error', 'We encountered an error whilst trying to save your changes. Please try again.')

    }

  }

  static getDerivedStateFromProps(props, state) {

    if (props.route.params) {
      return props.route.params
    }
    else {
      return null
    }

  }


  deleteReceipt = async () => {

    var receipts = this.state.receipts
    receipts = receipts - 1

    var receiptsAll = this.state.receiptsSorted

    // remove the receipt from the array
    receiptsAll.splice(this.state.receiptIndex, 1)

    var currency = this.state.currency

    var category = this.state.category
    var categoryTotals = this.state.categoryTotals
    var categoryCount = this.state.categoryCount

    if (currency === 0) {


      categoryCount[category] = categoryCount[category] - 1
      categoryTotals[category] = categoryTotals[category] - this.state.amount

    }

    var currencyCount = this.state.currencyCount
    var currencyTotals = this.state.currencyTotals

    currencyCount[currency] = currencyCount[currency] - 1
    currencyTotals[currency] = currencyTotals[currency] - this.state.amount


    // var firstReceiptDate = this.state.firstReceiptDate
    // var latestReceiptDate = this.state.latestReceiptDate

    // var firstReceiptSubmitDate = this.state.firstReceiptSubmitDate
    // var latestReceiptSubmitDate = this.state.latestReceiptSubmitDate

    this.setState({
      receipts,
      receiptsSorted: receiptsAll,
      categoryCount: categoryCount,
      categoryTotals: categoryTotals,
      currencyCount: currencyCount,
      currencyTotals: currencyTotals,
      deleteButtonPressed: false,
      showReceiptDialogs: false,
      showUpdateButton: false,
      editSaved: false
    })

    const changesSaved = await deleteReceipts(receipts, categoryCount, categoryTotals, currencyCount, currencyTotals, receiptsAll)
    this.receiptList()
    if (changesSaved) {
      Alert.alert('Changes Saved', 'Your changes have been saved.')
    }
    else {
      Alert.alert('Error', 'We encountered an error whilst trying to save your changes. Please try again.')
      // this.loadData() 
    }
  }


  render() {

    console.log("render")

    if (this.state.showSplash) {
      return (
        <SplashScreen />
      )
    }
    else if (this.state.showReceiptsList) {

      return (this.receiptListModal())

    }

    else {

      return (

        <SafeAreaView keyboardShouldPersistTaps='handled' style={styles.outerContainer}>

          <Image
            source={background}
            style={styles.large} />



          <ScrollView style={styles.scrollView}>

            {topBar(this.props.navigation, "grey")}

            <View style={styles.box}>



              <View style={styles.textContainer}>
                <Text style={styles.text} >Welcome, {fire.auth().currentUser.displayName}</Text>

                {this.state.showReceiptsList && this.receiptListModal()}

                <TouchableOpacity
                  style={styles.doneButton}
                  onPress={
                    () => this.props.navigation.navigate('receipts')
                  }>
                  <Text style={styles.submitButtonText}> Add Receipt </Text>
                </TouchableOpacity>

                <Text style={{ textAlign: 'center', marginTop: 10, borderBottomWidth: 1 }}> Summary of Financial Year {this.state.financialYear}</Text>
              </View>

              {this.receiptsMessage()}

            </View>


          </ScrollView>
        </SafeAreaView>


      )
    }


  }



}



export default ReceiptsView;