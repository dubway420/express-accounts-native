import React , {Component} from "react"
import { Button, SafeAreaView, ScrollView, Image, Text, View, Dimensions, TouchableOpacity, LogBox, Alert } from "react-native";
import fire from './fire'
import {styles} from './styles'
import background from './background.jpg'
import logo from './logo.png'
import Receipts from './Receipts'
import { categories, months, currencies } from './constants'
import { screenWidth } from './extras'
import { makeCategoryChart, monthListFull, makeMonthlyChart } from './graphStuff'
import {financialYear} from './utils'
import {firestoreRefs} from './fireStoreRefs'
import { Table, TableWrapper, Row } from 'react-native-table-component';
import Modal from 'react-native-modal';
import {Picker} from '@react-native-picker/picker'
import { Dialog } from 'react-native-simple-dialogs';
import Icon from 'react-native-vector-icons/FontAwesome'

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

const tableHead = ['Amount', 'date', 'Category', 'Logged at']
const widthArr = [screenWidth*0.2, screenWidth*0.2, screenWidth*0.35, screenWidth*0.2]

const widthArr2 = [screenWidth*0.45, screenWidth*0.4]



export class ReceiptsView extends Component{
  constructor(props){
    super(props)

    this.dateFormat = this.dateFormat.bind(this)

    this.state={

        addReceipt: false,
        receipts: 0,
        categoryCount: [],
        categoryTotals: [],
        currencyCount: [],
        currencyTotals: [],
        firstReceiptDate: null,
        firstReceiptSubmitDate: null,
        latestReceiptDate: null,
        latestReceiptSubmitDate: null,
        receiptDetails: [],

        financialYear: financialYear(),

        showPoundsSummaryList: false,
        showMonthlySummary: false,


        showReceiptsList: false,

        receiptsSorted: [],
        receiptsList: [],
        currentImageIndex: 0,
        images: [],
        imagesURLs: [],
        imageVisible: false,

        showReceiptDialogs: false,

        currency: 0,
        amount: 0,
        category: 0,
        date: new Date(),
        logged: new Date(),


    };

  }

  selectImages (images, index) {
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
    let firstReceiptMessage
    let latestReceiptMessage
    let graphs
    
    if (this.state.receipts === 0){
      numberReceipts = <Text style={styles.label}>You have not saved any receipts yet</Text>
    } else if (this.state.receipts === 1){ 
      numberReceipts = <Text style={styles.label}>You have saved one receipt</Text>
      firstReceiptMessage = <Text style={styles.message}>This receipt was dated {this.dateFormat(this.state.firstReceiptDate)} and submitted on {this.dateFormat(this.state.firstReceiptSubmitDate)}</Text>
    } else {
      numberReceipts =  <Text style={styles.label}>You have saved a total of {this.state.receipts} receipts</Text> 
      firstReceiptMessage = <Text style={styles.message}>First receipt was dated {this.dateFormat(this.state.firstReceiptDate)} and submitted on {this.dateFormat(this.state.firstReceiptSubmitDate)}</Text>
      latestReceiptMessage = <Text style={styles.message}>Latest receipt was dated {this.dateFormat(this.state.latestReceiptDate)} and submitted on {this.dateFormat(this.state.latestReceiptSubmitDate)}</Text>
      
      graphs = <View style = {{marginTop: 10}}>      
                    <TouchableOpacity
                        style = {styles.moreInfoButton}
                        onPress = {this.receiptList}>
                      <Text style = {styles.moreInfoText}> Full List </Text>
                     </TouchableOpacity>  

                  <Text style={styles.label2}>Pounds Sterling - Category Breakdown </Text>
                  <TouchableOpacity style= {styles.graph} onPress={() => this.setState({showPoundsSummaryList: !this.state.showPoundsSummaryList})}>
                   

                  { this.state.showPoundsSummaryList ?  this.categoryTable() : makeCategoryChart(this.state.categoryTotals)}

                  </TouchableOpacity>

                    <Text style={styles.label2}>Totals per Month</Text>
                    <TouchableOpacity style= {styles.graph} 
                    onPress={() => this.setState({showMonthlySummary: !this.state.showMonthlySummary})}
                    >

                    { this.state.showMonthlySummary ?  this.monthlyTable(this.state.receiptDetails) : makeMonthlyChart(this.state.receiptDetails)}
                                      
                    

                  </TouchableOpacity>
      </View>
    }

    let view = <View style={styles.label}>
      {numberReceipts}
      {firstReceiptMessage}
      {latestReceiptMessage}
      {graphs}
    </View>
    return (view)
    
  }

  convertReceipt(receipt){

      if (receipt.currency === 0) {

      var date = this.dateFormat(receipt.date)
      var logged = this.dateFormat(receipt.logged)
      
      
      return [String(receipt.amount), date, categories[receipt.category].name , logged ] 
    
    }
  
  }

  receiptList = () => {

    var receipts = this.state.receiptDetails

    // map receipts to a list of receipt objects
    receipts.sort(function(x, y){return x.date > y.date ? 1 : x.date == y.date ? 0 : -1});

    var receiptList = receipts.map((receipt) => this.convertReceipt(receipt)) 

    this.setState({receiptsList: receiptList, showReceiptsList: true, receiptsSorted: receipts})
 

    
  }

 



  receiptListModal = () => {

    return (
      <Modal style={{margin: 0}} visible={this.state.displayPhoto}>
      <SafeAreaView style={{height: "100%", width: "100%", backgroundColor: 'white', alignItems: 'center', paddingVertical: 20}}>
        
      <ScrollView keyboardShouldPersistTaps='handled' horizontal={true}>
          <View>

            <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
              <Row data={tableHead} widthArr={widthArr} style={styles.header} textStyle={styles.text}/>
            </Table>
            <ScrollView keyboardShouldPersistTaps='handled' style={styles.dataWrapper}>
              <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                {
                  this.state.receiptsList.map((rowData, index) => (
                    <Row
                      key={index}
                      data={rowData}
                      widthArr={widthArr}
                      style={[styles.row, index%2 && {backgroundColor: '#F7F6E7'}]}
                      textStyle={styles.text}
                      onPress={() => {this.selectRow(index)}}
                    />
                  ))
                }
              </Table>


              <Dialog
                  visible={this.state.showReceiptDialogs}
                  title="Custom Dialog"
                  onTouchOutside={() => this.setState({showReceiptDialogs: false})} >
                  <View>

                    <Text> Amount:    </Text>

                    <ImageList
                      images={this.state.imagesURLs}
                      onPress={(index) => this.selectImages(travel, index)}
                      shift={0.25}
                    />

                    <View style={{flexDirection: 'row'}}>
                      <TouchableOpacity
                        style = {styles.closeButton}
                        onPress = {() => this.setState({showReceiptDialogs: false})}
                        >
                          <Text style = {styles.submitButtonText}> Close </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style = {styles.trashButton}
                        onPress = {() => this.setState({showReceiptDialogs: false})}
                        >
                          
                        <Icon name={"trash"} size={20} />
                      </TouchableOpacity>
                    </View>
                  </View>
              </Dialog>

              

              <ImageViewing
                      images={getImageSource(this.state.images)}
                      imageIndex={this.state.currentImageIndex}
                      presentationStyle="overFullScreen"
                      visible={this.state.imageVisible}
                      onRequestClose={() => this.setState({imageVisible: false})}
                      // onLongPress={onLongPress}

              />

            </ScrollView>
          </View>
        </ScrollView>

        <TouchableOpacity
          style = {styles.photoButton}
          onPress = {this.closeModal}
          >
            <Text style = {styles.submitButtonText}> Close </Text>
        </TouchableOpacity>

      </SafeAreaView>
    </Modal>
    )
  }

  tableDataMaker () {

    var data = this.state.categoryTotals
  
    // make list with indices and values
    var indexedData = data.map(function(e, i){return {ind: i, val: e}});

    // sort index/value couples, based on values
    indexedData.sort(function(x, y){return x.val < y.val ? 1 : x.val == y.val ? 0 : -1});


    var data = indexedData.map(function(e) { 
                return [categories[e.ind].name, 
                        e.val]})

    // eliminate ones with 0 value
    data = data.filter(function(e){return e[1] > 0})                

    
    return data
}

categoryTable () {

  var data = this.tableDataMaker()


  return (

    <ScrollView keyboardShouldPersistTaps='handled' horizontal={true}>
    <View style={{width: "100%"}}>

      <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
        <Row data={['Category', "Amount"]} widthArr={widthArr2} style={styles.header} textStyle={styles.text}/>
      </Table>
      <ScrollView keyboardShouldPersistTaps='handled' style={styles.dataWrapper}>
        <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
          {
            data.map((rowData, index) => (
              <Row
                key={index}
                data={rowData}
                widthArr={widthArr2}
                style={[styles.row, index%2 && {backgroundColor: '#F7F6E7'}]}
                textStyle={styles.text}/>
            ))
          }
        </Table>

        

      </ScrollView>
    </View>
  </ScrollView>

  )


}

monthlyTable () {

  var data = monthListFull(this.state.receiptDetails)


  return (

    <ScrollView keyboardShouldPersistTaps='handled' horizontal={true}>
    <View style={{width: "100%"}}>

      <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
        <Row data={['Category', "Amount"]} widthArr={widthArr2} style={styles.header} textStyle={styles.text}/>
      </Table>
      <ScrollView keyboardShouldPersistTaps='handled' style={styles.dataWrapper}>
        <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
          {
            data.map((rowData, index) => (
              <Row
                key={index}
                data={rowData}
                widthArr={widthArr2}
                style={[styles.row, index%2 && {backgroundColor: '#F7F6E7'}]}
                textStyle={styles.text}/>
            ))
          }
        </Table>

      </ScrollView>
    </View>
  </ScrollView>

  )


}

  componentDidMount(){

    
        
    console.log("componentDidMount")
    var UserID = fire.auth().currentUser.uid
    
    firestoreRefs(UserID).userLogReceipts.get().then((doc) => {
      if (doc.exists) {
          
          var data = doc.data()


          this.setState({receipts: data.receipts,

                          categoryCount: data.categoryCount,
                          categoryTotals: data.categoryTotals,

                          currencyCount: data.currencyCount,
                          currencyTotals: data.currencyTotals,

                          firstReceiptDate: data.firstReceiptDate,
                          firstReceiptSubmitDate: data.firstReceiptSubmitDate,

                          latestReceiptDate: data.latestReceiptDate,
                          latestReceiptSubmitDate: data.latestReceiptSubmitDate,
                          receiptDetails: data.receiptDetails
          })

      }
    }) 

    

  }

 closeModal = () => {
    this.setState({showReceiptsList: false})
  } 

 selectRow = (index) => {

  var receipt = this.state.receiptsSorted[index]

  var imagesURLs = receipt.listURLs

  var images = imagesURLs.map(function(e, i){return {title: ("Receipt " + (i+1)), thumbnail: e, original: e}})

  this.setState({currency: receipt.currency,
                 amount: receipt.amount,
                 category: receipt.category,
                 date: this.dateFormat(receipt.date),
                 logged: this.dateFormat(receipt.logged),

                 imagesURLs,
                 images, 
                 showReceiptDialogs: true})
  
 }



  render() {
    
    console.log("render")

    if (this.state.addReceipt) {
      
        return (
        <Receipts/>
      )

    } else {

        return(
            
            <SafeAreaView style={styles.outerContainer}>

            <Image
            source={background}
            style={styles.large} />

            <ScrollView style={styles.scrollView}>

            {/* <ImageBackground source={background} style={styles.image}> */}

            <View style={styles.box}>

            <Image style={styles.logo} source={logo} />

                <View style = {styles.textContainer}>
                  <Text style = {styles.text} >Welcome, {fire.auth().currentUser.displayName}</Text>

                  {this.state.showReceiptsList && this.receiptListModal()}
                  
                  <TouchableOpacity
                        style = {styles.doneButton}
                        onPress = {
                          () => this.setState({addReceipt: true})
                        }>
                        <Text style = {styles.submitButtonText}> Add Receipt </Text>
                      </TouchableOpacity>

                      <Text style={{textAlign: 'center', marginTop: 10, borderBottomWidth: 1}}> Summary of Financial Year {this.state.financialYear}</Text>
                </View>

                {/* <View style={styles.box}> */}

                    {this.receiptsMessage()}
                
                {/* </View> */}



                <Button onPress={this.signOut} title="Sign Out" />  

            </View>  

            
        </ScrollView>
        </SafeAreaView>
    

        )
    }
    

  }  



}



export default ReceiptsView;