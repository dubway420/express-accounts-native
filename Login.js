import React, {Component} from "react"
import { SafeAreaView, ScrollView, Image, TextInput, Text, View, TouchableOpacity, Alert } from "react-native";
import CheckBox from 'expo-checkbox';
import {styles} from './styles'
import background from './assets/background.jpg'
import logo from './assets/logo.png'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Linking } from 'react-native';
import { Dialog, ConfirmDialog } from 'react-native-simple-dialogs';
import { emailHandler, passwordHandler } from './utils/handlers.js'

// Provides a sign up page for new users to enter their details
// The user can enter their name, password, email address and asks them to read and accept the privacy policy

// Base settings for page state
var baseState = {

  email : "",
  password : "",
  password_see: false,

  fname: "",
  sname: "",
  fnumber: "",
  error: false,

  signup: false,

  emailResetDialog: false,
  emailReset: ""
  
}


export class Login extends Component{
  constructor(props){
    super(props)

    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
  



    this.state=baseState
    


  }

  login(e){


    // e.preventDefault();
    fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{

      this.props.navigation.navigate("receiptsView")
      

    }).catch((err)=>{

      console.log(err)
      
      this.setState({error: true})
    })

  }

  register(e){

    // this.setState({signup: true})
    this.props.navigation.navigate('Sign up')
 
  }

  sendResetEmail = async () => {

    await fire.auth().sendPasswordResetEmail(this.state.emailReset).then(() => {

      Alert.alert(
        "Reset Password",
        "A password reset email has been sent to your email address",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );

    }).catch(error => {

      Alert.alert(
        "Reset Password",
        "Something went wrong, please try again",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );

    })

  }

  componentDidMount(){
    console.log("componentDidMount: login")
  }



  
  render() {
    
      return(
        
        <SafeAreaView style={styles.outerContainer}>

           {/* Adds a background image*/}
          <Image
          source={background}
          style={styles.large} />

          <ScrollView keyboardShouldPersistTaps='handled' style={styles.scrollView}>

            <View style={styles.box}>


              <Image style={styles.logo} source={logo} />
              <TextInput style = {styles.input}
              underlineColorAndroid = "transparent"
              type="email"
              id="email"
              name="email"
              // autoComplete="email address"
              placeholder="Enter email address"
              placeholderTextColor = "black"
              autoCapitalize = "none"
              value={this.state.email}
              onChangeText = {(email) => emailHandler(email)}/>
                
              <View style = {styles.inputAlt}>
                  
                  <TextInput style={styles.inputAltInner}
                      underlineColorAndroid = "transparent"
                      type="password"
                      id="password"
                      name="password"
                      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                      // autoComplete="password"
                      placeholder="Enter password   "
                      placeholderTextColor = "black"
                      autoCapitalize = "none"
                      secureTextEntry={!this.state.password_see}
                      onChangeText = {(password) => passwordHandler(this, password)}/>

                  <Icon style={styles.searchIcon} onPress={
                    () => this.setState({password_see: !this.state.password_see})} name={this.state.password_see ? "eye-slash" : "eye"} size={20} color="#000"/>
              </View>        

       
            
            {this.state.password_check_warn && <Text style={styles.error}>Error: Invalid confirmation password.</Text>}
            

            {this.state.password_check_message && <Text style={this.state.password_check_valid ? styles.passwordCorrect : styles.error}>{this.state.password_check_message}</Text>}
            
            <Text style={{ textAlign: 'center', marginTop: 10, borderBottomWidth: 1 }}> </Text>

         

            <TouchableOpacity
                style = {styles.submitButton}
                onPress = {
                    () => this.login()
                }>
                <Text style = {styles.submitButtonText}> Sign Up </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style = {styles.submitButton}
                onPress = {
                    () => this.cancel()
                }>
                <Text style = {styles.submitButtonText}> Cancel </Text>
            </TouchableOpacity>

            </View> 
            
    
            </ScrollView>
            
        </SafeAreaView>
    

    )

//   }

  }
}  
