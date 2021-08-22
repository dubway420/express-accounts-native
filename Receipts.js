import React , {Component} from "react"
import { Button, Modal, SafeAreaView, ScrollView, Image, Text, View, TextInput, TouchableOpacity, LogBox, Alert, Dimensions } from "react-native";
import {Picker} from '@react-native-picker/picker'
import fire from './fire'
import {styles} from './styles'
import background from './background.jpg'
import logo from './logo.png'
import loading from './loading_bars.gif'
import Icon from 'react-native-vector-icons/FontAwesome'
import DateTimePicker from '@react-native-community/datetimepicker';
import {months, currencies, categories} from './constants'
import * as ImagePicker from "expo-image-picker";
import uuid from "uuid";
// import Modal from 'modal-react-native-web';
// import Modal from 'react-native-modal';
import {callGoogleVisionAsync} from './vision'
import extractData from './extractors'
import DatePicker from 'react-mobile-datepicker'
import CheckBox from '@react-native-community/checkbox';
import {saveReceipt} from './saveReceipt'
import ReceiptsView from './receiptsView'
import { ConfirmDialog, ProgressDialog } from 'react-native-simple-dialogs';
import {amountValid, getStartOfFinancialYear, isInCurrentFinancialYear} from './utils'
import {topBar} from './topBar'

// Firebase sets some timeers for a long period, which will trigger some warnings. Let's turn that off for this example
LogBox.ignoreLogs([`Setting a timer for a long period`]);

var baseState = {

      currency: 0,
      amount: null,
      amountValid: false,
      date: new Date(),
      category: 0,
      images: [],

      showDate: false,
      analysing: false,
      showImage: false,
      displayImage: null,
      extractedInfo: {money: {value: null, currency: 0}, 
                      date:{day: null, month: null, year: null}, 
                      category: -1},

      valid: false,
      
      moneyAccept: false,
      dateAccept: false,
      categoryAccept: false,

      displayPhoto: false,
      imageToDisplay: null,
    
      dialogVisible: false,
      returnToView: false,

      imageMethodMessage: false,
      uploadingMessageShow: false,

      successMessage: "Receipt Successfully added to database",
      allData: null
  }

export default class Receipts extends Component{
  constructor(props){
    super(props)
    // this.signOut = this.signOut.bind(this);
    this.state=baseState;

  }

  async componentDidMount() {
    // if (Platform.OS !== "web") {
      const {
        status,
      } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    // }
  }

  

  signOut = () => {

    fire.auth().signOut() 

  }

  changeCurrency = (itemValue, itemIndex) => {
    this.setState({currency: itemIndex})

  }

  currencyItems() {
    
    return currencies.map((myValue, myIndex) => {
      return(
      <Picker.Item label={myValue.symbol} value={myIndex} key={myIndex}/>
      )
    });

  }  

  categoryItems() {
    
    return categories.map((myValue, myIndex) => {
      return(
      <Picker.Item label={myValue.name} value={myIndex} key={myIndex}/>
      )
    });

  }  

  amountHandler(value) {

    this.setState({
      amount: value,
      amountValid: amountValid(value)
    })

  }

  showDatePicker = () => {

    this.setState({showDate: true})

  }

  dateChange = (event, selectedDate) => {
    
    if (event.type === "set") {
      this.setState({date: selectedDate, 
                     showDate:false})}
    else {
      this.setState({showDate:false})}
    

  };

  changeCategory = (itemValue, itemIndex) => {
    this.setState({category: itemIndex})

  }

  takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      // allowsEditing: true,
      // aspect: [3, 4],
      base64: true
    });

    this.handleImagePicked(pickerResult);
  };

  pickImage = async () => {

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      // allowsEditing: true,
      // aspect: [3, 4],
      base64: true
    });


    

    this.handleImagePicked(pickerResult);
  };

  handleImagePicked = async (pickerResult) => {


      if (!pickerResult.cancelled) {
        // const uploadUrl = await uploadImageAsync(pickerResult.uri);

        this.setState({ 
                        showImage: true,
                        displayImage: pickerResult.uri,
                        analysing: true});

        const result = await callGoogleVisionAsync(pickerResult.base64)
        

        if (!result) {this.setState({valid: false,
                                        analysing: false})}
        else {
        
          var extracted = extractData(result)
          this.setState({valid: true, 
                        analysing: false,
                        extractedInfo: extracted})}

      }
     

  };

  closeButton = () => {

    let extractedInfo = this.state.extractedInfo

    var countAccept = 0

    if (this.state.moneyAccept)    {countAccept += 1
                                    this.amountHandler(String(extractedInfo.money.value))}

    if (this.state.dateAccept)     {countAccept += 1
                                    let newDate = new Date(extractedInfo.date.year, extractedInfo.date.month, extractedInfo.date.day)
                                    this.setState({date: newDate})}

    if (this.state.categoryAccept) {countAccept += 1
                                    this.setState({category: extractedInfo.category})}

    this.setState({moneyAccept: false, dateAccept: false, categoryAccept: false, showImage: false})

    if (countAccept >= 1) {this.setState({images: [...this.state.images, this.state.displayImage]})}

  }

  handleCancel = () => {
    this.setState({ showDate: false });
  }

  handleSelect = (date) => {
    this.setState({ date: date, showDate: false });
  }

  photoPressed = (index) => {

    this.setState({
                   displayPhoto: true,
                   imageToDisplay: this.state.images[index]
    })

    // console.log(this.state.displayPhoto)

  }

  photoLine = (index) => {

    return <Text onPress = {() => this.photoPressed(index)} key={index} style={{color: 'blue', marginVertical: 5}}> Photo{index+1} </Text>
  }

  returnPhotos = () => {

    var photos = this.state.images.map(function(itemObject, index){
      return this.photoLine(index)

    }, this)

    return photos

  }

  closeButton2 = () => {
    this.setState({displayPhoto: false,
                imageToDisplay: null})
  }

  submitReceipt = async () => {

    if (this.state.amountValid) {
      
      this.setState({
        uploadingMessageShow: true
      })

      const allData = await saveReceipt(this.state.currency, this.state.amount, this.state.date, this.state.category, this.state.images)

      this.setState({
        dialogVisible: true,
        uploadingMessageShow: false,
        allData: allData
      })
      
      
    } else {

      Alert.alert("Ensure that the amount field is filled in with a value.")

    }
  }

  cancel = () => {
    
    this.props.navigation.navigate('receiptsView')

  }

  reset = () => {

    this.setState(baseState)

  }


  handleCamera = () => {
    this.takePhoto();
    this.setState({
      imageMethodMessage: false})

  }

  handleUpload = () => {
    this.pickImage();
    this.setState({
      imageMethodMessage: false})
  }



  render() {

  //   const monthMap = {
  //     '1': 'Jan',
  //     '2': 'Feb',
  //     '3': 'Mar',
  //     '4': 'Apr',
  //     '5': 'May',
  //     '6': 'Jun',
  //     '7': 'Jul',
  //     '8': 'Aug',
  //     '9': 'Sep',
  //     '10': 'Oct',
  //     '11': 'Nov',
  //     '12': 'Dec',
  // };
   
  // const dateConfig = {
  //       'date': {
  //         format: 'DD',
  //         caption: 'Day',
  //         step: 1,
  //     },
  //     'month': {
  //         format: value => monthMap[value.getMonth() + 1],
  //         caption: 'Mon',
  //         step: 1,
  //     },
  //     'year': {
  //       format: 'YYYY',
  //       caption: 'Year',
  //       step: 1,
  //   },
  // };


    let extractedInfo = this.state.extractedInfo
    let money = extractedInfo.money
    let date = extractedInfo.date
    let category = extractedInfo.category

    let displayValues
    let notDetected = "not detected"

    var moneyOutput = false 
    var dateOutput = false
    var categoryOutput = false

    

    // console.log() 
    // {
    //   var currentFinancialYear = getStartOfFinancialYear()
    //   displayValues = <Text style={{alignSelf: 'center', width: "80%"}}> The date that appears on this receipt, {date.day + "/" + date.month + "/" + date.year}, is before the current financial year. Please choose a receipt that is dated within the current financial year (on or after {currentFinancialYear.getDate() + "/" + currentFinancialYear.getMonth() + 1 + "/" + currentFinancialYear.getFullYear()}) </Text>
    // }
    if (isInCurrentFinancialYear(date) && this.state.valid) {

      let moneyText
      if (money.value) {moneyText = currencies[money.currency].symbol + money.value
                        moneyOutput = true}
      else {moneyText = notDetected}

      let dateText
      if (date) {dateText = date.day + " " + months[date.month] + " " + date.year
                dateOutput = true}
      else {dateText = notDetected}

      let categoryText
      if (category >= 0) {categoryText = categories[category].name
                          categoryOutput = true}
      else {categoryText = notDetected}


      displayValues = <View style={{alignContent: 'center', width: "80%"}}> 
                        <Text style={styles.outline}>We were able to extract the following information from this image: </Text> 
                        
                        <View style={styles.CheckBoxContainer}> 
                            <Text style={styles.outline}> </Text> 
                            <Text style={styles.outline}> Accept? </Text> 
                        </View>

                        <View style={styles.CheckBoxContainer}> 
                            <Text style={styles.outline}> Amount:  {moneyText}</Text> 
                            <CheckBox style={styles.checkBoxActual} disabled={!moneyOutput} value={this.state.moneyAccept} onValueChange={(newValue) => this.setState({moneyAccept: newValue})} /> 
                        </View>

                        <View style={styles.CheckBoxContainer}> 
                            <Text style={styles.outline}> Date: {dateText} </Text>
                            <CheckBox style={styles.checkBoxActual} disabled={!dateOutput} value={this.state.dateAccept} onValueChange={(newValue) => this.setState({dateAccept: newValue})} /> 
                        </View>

                        <View style={styles.CheckBoxContainer}> 
                            <Text style={styles.outline}> Category: {categoryText} </Text>
                            <CheckBox style={styles.checkBoxActual} disabled={!categoryOutput} value={this.state.categoryAccept} onValueChange={(newValue) => this.setState({categoryAccept: newValue})} /> 
                        </View>
                    </View>

    } else { 
      displayValues = <Text style={{alignSelf: 'center', width: "80%"}}> We're sorry, we were unable to extract any information from this image. Please provide a clear image of a receipt or bill. </Text>
    }

    if (!moneyOutput && !dateOutput && !categoryOutput) {
      displayValues = <Text style={{alignSelf: 'center', width: "80%"}}> We're sorry, we were unable to extract any information from this image. Please provide a clear image of a receipt or bill. </Text>
    }

    if (!isInCurrentFinancialYear(date)) {
      var currentFinancialYear = getStartOfFinancialYear()
      displayValues = <View style={{width: "80%"}}>  
                        <Text style={{alignSelf: 'center', width: "80%"}}>The date that appears on this receipt: </Text> 
                        <Text style={{textAlign: 'center', width: "80%"}}>{date.day + "/" + date.month + "/" + date.year} </Text>
                        <Text style={{alignSelf: 'center', width: "80%"}} >is before the current financial year. Please choose a receipt that is dated within the current financial year (on or after {currentFinancialYear.getDate() + "/" + currentFinancialYear.getMonth() + 1 + "/" + currentFinancialYear.getFullYear() + ")"}  </Text> 
                      </View>
    }

    

    let photoPanel 
    if (this.state.images.length > 0) {

      var photos = this.returnPhotos()
      photoPanel = <View>
                    <Text style={styles.label}>Photos for this receipt</Text>
                    {photos}
                  </View>

    }

      return(
      
        <SafeAreaView style={styles.outerContainer}>

          <Image
          source={background}
          style={styles.large} />

          <ScrollView keyboardShouldPersistTaps='handled' style={styles.scrollView}>

            {/* <ImageBackground source={background} style={styles.image}> */}
            {topBar()}
            
            <View style={styles.box}>

            {/* <Image style={styles.logo} source={logo} /> */}

            

              <View style = {styles.textContainer}>
                <Text style = {styles.text} > Add new receipts here</Text>
                
              </View>

              <View style={styles.borderedBox}>

              <ConfirmDialog
                  title={this.state.successMessage}
                  message="Would you like to add another receipt?"
                  visible={this.state.dialogVisible}
                  onTouchOutside={() => this.setState(baseState)}
                  positiveButton={{
                      title: "YES",
                      onPress: () => this.setState(baseState)
                  }}
                  negativeButton={{
                      title: "NO",
                      onPress: () => this.props.navigation.navigate('receiptsView', 
                                                                    this.state.allData)
                  }}
              />

                <Modal 
                  style={{margin: 0}} 
                  visible={this.state.showImage}
                  backdropOpacity={0.3}  >
                  <SafeAreaView style={{height: "100%", width: "100%", backgroundColor: 'white', alignItems: 'center', paddingVertical: 20}}>
                    

                    {this.state.analysing && <Text> Analysing - please wait... </Text> }
                    {this.state.analysing && <Image source={loading}/>}
                    

                    {!this.state.analysing && <Image source={{uri: this.state.displayImage}}
                          style={{width: "80%", height: "65%", paddingVertical: 20}} />}

                    {!this.state.analysing && displayValues }

                    <TouchableOpacity
                      style = {styles.photoButton}
                        onPress = {this.closeButton}>
                        <Text style = {styles.submitButtonText}> Close </Text>
                    </TouchableOpacity>
                  </SafeAreaView>
                </Modal>



                <Modal style={{margin: 0}} visible={this.state.displayPhoto}>
                  <SafeAreaView style={{height: "100%", width: "100%", backgroundColor: 'white', alignItems: 'center', paddingVertical: 20}}>
                    
                          <Image source={{uri: this.state.imageToDisplay}}
                          style={{width: "80%", height: "65%", paddingVertical: 20}} />

                    <TouchableOpacity
                      style = {styles.photoButton}
                      onPress = {this.closeButton2}>
                        <Text style = {styles.submitButtonText}> Close </Text>
                    </TouchableOpacity>

                  </SafeAreaView>
                </Modal>

                <Text style={styles.label}>Amount</Text>

                <Picker onValueChange={this.changeCurrency} style={styles.currencyBox} selectedValue={this.state.currency}>
                  {this.currencyItems()}
                </Picker>

                <TextInput style = {styles.currencyInput}
                      underlineColorAndroid = "transparent"
                      type="number"
                      id="value"
                      name="vaue"
                      value={this.state.amount}
                      keyboardType="numeric"
                      placeholder="Value"
                      placeholderTextColor = "black"
                      autoCapitalize = "none"
                      onChangeText = {(amount) => this.amountHandler(amount)}/>

                <Text style={styles.label}>Date of transaction</Text>
                  
                {/* <Text onPress={this.showDatePicker} style={styles.dateInput}>{this.state.date.getDate()} {months[this.state.date.getMonth()]} {this.state.date.getFullYear()}</Text> */}
                  {/* <Icon onPress={this.showDatePicker} name={'caret-down'} size={15} color={'grey'}/> */}
                
                  <TouchableOpacity
                        style={styles.dateInput}
                        onPress = {this.showDatePicker}>
                        <Text style={{fontSize:15}} > {this.state.date.getDate()} {months[this.state.date.getMonth()]} {this.state.date.getFullYear()} </Text>
                        <Icon style={{paddingRight: 15}} onPress={this.showDatePicker} name={'calendar'} size={15} color={'grey'}/>
                  </TouchableOpacity>


                {this.state.showDate && <DateTimePicker
                  testID="dateTimePicker"
                  value={this.state.date}
                  // mode={mode}
                  is24Hour={true}
                  display="default"
                  minimumDate={getStartOfFinancialYear()}
                  maximumDate={new Date()}
                  onChange={this.dateChange}
                />}

                {/* <DatePicker
                    value={this.state.date}
                    isOpen={this.state.showDate}
                    confirmText={'OK'}
                    cancelText={'Cancel'}
                    onSelect={this.handleSelect}
                    onCancel={this.handleCancel} 
                    dateConfig={dateConfig}/> */}



                <Text style={styles.label}>Category</Text>
                
                <View style={styles.categoryInput}>

                  <Picker onValueChange={this.changeCategory} style={styles.categoryBox} selectedValue={this.state.category}>
                    {this.categoryItems()}

                  </Picker>

                </View>

                <Text style={styles.label}>Images</Text>
                
                <View style={{width: "100%"}}>
                  <TouchableOpacity
                    style = {styles.photoButton}
                    onPress = {
                        () => this.setState({imageMethodMessage: true})
                    }>
                    <Text style = {styles.submitButtonText}> Add Image </Text>
                  </TouchableOpacity>

                  <Modal 
                    style={{margin: 0}} 
                    visible={this.state.uploadingMessageShow}
                    backdropOpacity={0}  >
                    <SafeAreaView 
                    style={{height: "50%", width: "100%", backgroundColor: 'white', alignItems: 'center', paddingVertical: 20}}
                    >
                      

                      <Text> Uploading your receipt... </Text>
                      <Image source={loading}/>
                      


                    </SafeAreaView>
                  </Modal>

                </View>

                {photoPanel}

                <ConfirmDialog
                  title={"Adding an image for this receipt"}
                  message="Which method would you like to use to add a receipt image?"
                  visible={this.state.imageMethodMessage}
                  onTouchOutside={() => this.setState({imageMethodMessage: false})}
                  positiveButton={{
                      title: "Camera",
                      onPress: () => this.handleCamera()
                  }}
                  negativeButton={{
                      title: "Upload",
                      onPress: () => this.handleUpload()
                  }}
                  cancelButton={{
                      title: "Cancel",

                  }}
                />

                
                <TouchableOpacity
                  style = {styles.doneButton}
                  onPress = {
                      () => this.submitReceipt()
                  }>
                  <Text style = {styles.submitButtonText}> Complete </Text>
                </TouchableOpacity>

                
                <TouchableOpacity
                  style = {styles.utilityButton}
                  onPress = {
                      () => this.cancel()
                  }>
                  <Text style = {styles.submitButtonText}> Cancel </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style = {styles.utilityButton2}
                  onPress = {
                      () => this.reset()
                  }>
                  <Text style = {styles.submitButtonText}> Reset </Text>
                </TouchableOpacity>
              </View>



              {/* <Button onPress={this.signOut} title="Sign Out" />   */}

            </View>  

          
        </ScrollView>
      </SafeAreaView>
    

    )

    

  }  



}

