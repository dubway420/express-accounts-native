import React , {Component} from "react"
import { Button, SafeAreaView, ScrollView, Image, Text, View, TextInput, TouchableOpacity, LogBox, Alert } from "react-native";
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
import Modal from 'react-native-modal';
import {callGoogleVisionAsync} from './vision'
import extractData from './extractors'

// Firebase sets some timeers for a long period, which will trigger some warnings. Let's turn that off for this example
LogBox.ignoreLogs([`Setting a timer for a long period`]);


class Receipts extends Component{
  constructor(props){
    super(props)
    // this.signOut = this.signOut.bind(this);
    this.state={currency: 0,
                amount: 0,
                amountValid: false,
                date: new Date(),
                showDate: false,
                category: 0,
                images: [],
                uploading: false,
                showImage: false,
                displayImage: null}

  }

  async componentDidMount() {
    if (Platform.OS !== "web") {
      const {
        status,
      } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
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
      amountValid: !isNaN(value)
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
      allowsEditing: true,
      aspect: [3, 4],
      base64: true
    });

    this.handleImagePicked(pickerResult);
  };

  pickImage = async () => {

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [3, 4],
      base64: true
    });


    

    this.handleImagePicked(pickerResult);
  };

  handleImagePicked = async (pickerResult) => {


      if (!pickerResult.cancelled) {
        // const uploadUrl = await uploadImageAsync(pickerResult.uri);

        this.setState({ 
                        images: [...this.state.images, pickerResult],
                        showImage: true,
                        displayImage: pickerResult.uri });

        const result = await callGoogleVisionAsync(pickerResult.base64)
        var extracted = extractData(result)
        console.log(extracted)


      }
     

  };


  render() {

    var db = fire.firestore()
    var userID = fire.auth().currentUser.userID;
    

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
                
              </View>

              <View style={styles.borderedBox}>

                <Modal isVisible={this.state.showImage}>
                  <View style={{backgroundColor: 'white', alignItems: 'center'}}>
                    <Text>I am the modal content!</Text>
                    {!this.state.uploading && <Image source={{uri: this.state.displayImage}}
                           style={{width: "80%", height: "80%"}} />}
                    {this.state.uploading && <Image source={loading} /> }      
                    <TouchableOpacity
                      style = {styles.photoButton}
                        onPress = {
                        () => this.setState({showImage: false})
                        }>
                        <Text style = {styles.submitButtonText}> Close </Text>
                    </TouchableOpacity>
                  </View>
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
                      keyboardType="numeric"
                      placeholder="Value"
                      placeholderTextColor = "black"
                      autoCapitalize = "none"
                      onChangeText = {(amount) => this.amountHandler(amount)}/>

                <Text style={styles.label}>Date of transaction</Text>
                  
                <Text onPress={this.showDatePicker} style={styles.dateInput}>{this.state.date.getDate()} {months[this.state.date.getMonth()]} {this.state.date.getFullYear()}</Text>
                  {/* <Icon onPress={this.showDatePicker} name={'caret-down'} size={15} color={'grey'}/> */}
                

                {this.state.showDate && <DateTimePicker
                  testID="dateTimePicker"
                  value={new Date()}
                  // mode={mode}
                  is24Hour={true}
                  display="default"
                  onChange={this.dateChange}
                />}

                <Text style={styles.label}>Category</Text>
                
                <View style={styles.categoryInput}>

                  <Picker onValueChange={this.changeCategory} style={styles.categoryBox} selectedValue={this.state.category}>
                    {this.categoryItems()}

                  </Picker>

                </View>

                <Text style={styles.label}>Add Photos</Text>

                <TouchableOpacity
                  style = {styles.photoButton}
                  onPress = {
                      () => this.takePhoto()
                  }>
                  <Text style = {styles.submitButtonText}> Camera </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style = {styles.photoButton}
                  onPress = {
                      () => this.pickImage()
                  }>
                  <Text style = {styles.submitButtonText}> Upload </Text>
                </TouchableOpacity>
                

              </View>



            <Button onPress={this.signOut} title="Sign Out" />  

            </View>  

          
        </ScrollView>
      </SafeAreaView>
    

    )

  }



}

async function uploadImageAsync(uri) {
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

  const ref = fire.storage().ref("userxyz").child(uuid.v4());
  const snapshot = await ref.put(blob);

  // We're done with the blob, close and release it
  blob.close();

  return await snapshot.ref.getDownloadURL();
}



export default Receipts;