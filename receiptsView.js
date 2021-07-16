import React , {Component} from "react"
import { Button, SafeAreaView, ScrollView, Image, Text, View, TextInput, TouchableOpacity, LogBox, Alert } from "react-native";
import fire from './fire'
import {styles} from './styles'
import background from './background.jpg'
import logo from './logo.png'
import Receipts from './Receipts'
import { months } from './constants'
import { data, chartConfig, screenWidth } from './extras'
import makeChart from './graphStuff'
import {financialYear} from './utils'
import {userLogReceipts} from './fireStoreRefs'

// Firebase sets some timeers for a long period, which will trigger some warnings. Let's turn that off for this example
LogBox.ignoreLogs([`Setting a timer for a long period`]);



class ReceiptsView extends Component{
  constructor(props){
    super(props)

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

        financialYear: financialYear()
    };

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
                  <Text style={styles.label2}>Pounds Sterling - Category Breakdown</Text>
                  <View style= {styles.graph}>


                    {makeChart(this.state.categoryTotals)}
                    

                  </View>

                  <Text style={styles.moreInfo}>More info.</Text>

                  <Text style={styles.label2}>Currency Breakdown</Text>
                  <View style= {styles.graph}>


                    {makeChart(this.state.categoryTotals)}
                    

                  </View>
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

  componentDidMount(){
    
    console.log(userLogReceipts)

    userLogReceipts.get().then((doc) => {
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
                          latestReceiptSubmitDate: data.latestReceiptSubmitDate
          })

      }
    }) 

  }




  render() {

       

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
                <Text style={{textAlign: 'center', marginTop: 10, borderBottomWidth: 1}}> Summary of Financial Year {this.state.financialYear}</Text>
                </View>

                {/* <View style={styles.box}> */}

                    {this.receiptsMessage()}

                    <TouchableOpacity
                      style = {styles.doneButton}
                      onPress = {
                        () => this.setState({addReceipt: true})
                      }>
                      <Text style = {styles.submitButtonText}> Add Receipt </Text>
                    </TouchableOpacity>

                    
                  

                  
                
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