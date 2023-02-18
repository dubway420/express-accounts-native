import React, {Component} from "react"
import { SafeAreaView, ScrollView, Image, TextInput, Text, View, TouchableOpacity, Alert } from "react-native";
import CheckBox from 'expo-checkbox';
import {styles} from './styles'
import background from './assets/background.jpg'
import logo from './assets/logo.png'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/Fontisto'
import { Linking } from 'react-native';
import { Dialog, ConfirmDialog } from 'react-native-simple-dialogs';
import { emailHandler, passwordHandler } from './utils/handlers.js'
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";


// Provides a sign up page for new users to enter their details
// The user can enter their name, password, email address and asks them to read and accept the privacy policy

// TODO 
// Google login 
// Microsoft login 
// Reset password

// Testing
// log in with username and password
// Federated log in
// Existing user
// Banned user

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
    const auth = getAuth();

    signInWithEmailAndPassword(auth, this.state.email, this.state.password).then((u)=>{

      Alert.alert("Success", "Successfully signed in")

      console.log(u.user)
      

    }).catch((err)=>{

      console.log(err)
      
      this.setState({error: true})

      if (err.message == "Firebase: Error (auth/invalid-email).") {
        Alert.alert("Sign In Failed", "The email address you specified is invalid. Please try again or register. ")
      }
      else if (err.message == "Firebase: Error (auth/user-not-found).") {
        Alert.alert("Sign In Failed", "We couldn't find a registered user with the details you provided. Have you registered?")
      }
      else if (err.message == "Firebase: Error (auth/wrong-password).") {
        Alert.alert("Sign In Failed", "The password you specified is incorrect. Please try again or request a password reset.")
      }
      else {
        Alert.alert("Sign In Failed", "We're sorry but we couldn't log you in with the details you provided. Please try again, request a password reset or register.")
      }

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

              <View style = {styles.textContainer}>
                <Text style = {styles.text && {borderBottomWidth: 1, alignSelf: 'center', marginTop: 20}} >Welcome to Express Accounts</Text>
                <Text id="message" style={styles.text }>Please log in or sign up</Text>
              </View>

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
              onChangeText = {(email) => emailHandler(this, email)}/>
                
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

              <Text id="message" style={{color: "blue", 
                      // marginTop: 5,
                      borderBottomWidth: 1,
                      borderBottomColor: "blue",
                      marginLeft: 20,
                      marginBottom: 10,
                      alignSelf: 'flex-start'
                    }}
                      // onPress={() => Linking.openURL('https://www.termsfeed.com/live/9a4c53e1-5df9-4ac0-9c2b-130f3df1ff23')}
                      > 
                      Forgotten password? </Text>


            
          
         

              <TouchableOpacity
                  style = {styles.submitButton}
                  onPress = {
                      () => this.login()
                  }>
                  <Text style = {styles.submitButtonText}> Sign In </Text>
              </TouchableOpacity>

              <TouchableOpacity
                  style = {styles.submitButton}
                  onPress = {
                      () => this.cancel()
                  }>
                  <Text style = {styles.submitButtonText}> Register </Text>
              </TouchableOpacity>

            </View>

            <View style={styles.fedBox}>

              <TouchableOpacity
                  style = {styles.federatedButton}
                  onPress = {
                      () => this.login()
                  }>
                    <Icon style={styles.searchIcon} name={"google"} size={20} color="#000"/>
                  <Text style = {styles.federatedButtonText}> Google </Text>
              </TouchableOpacity>

              <TouchableOpacity
                  style = {styles.federatedButton}
                  onPress = {
                      () => this.login()
                  }>
                    <Icon2 style={styles.searchIcon} name={"microsoft"} size={20} color="#000"/>
                  <Text style = {styles.federatedButtonText}> Microsoft </Text>
              </TouchableOpacity>

            </View> 
            
    
            </ScrollView>
            
        </SafeAreaView>
    

    )

//   }

  }
}  
