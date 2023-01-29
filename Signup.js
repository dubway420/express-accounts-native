import React , {Component} from "react"
import { SafeAreaView, ScrollView, Image, TextInput, Text, View, TouchableOpacity, Alert } from "react-native";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {emailVerifier, nameVerifier, passwordVerifier} from './utils/validators'
import { passwordHandler } from './utils/handlers.js'
import { checkIfAllTrue } from './utils/tools'
import {styles} from './styles'
import background from './assets/background.jpg'
import logo from './assets/logo.png'
import Icon from 'react-native-vector-icons/FontAwesome'

import CheckBox from 'expo-checkbox';
import { Linking } from 'react-native';

// Provides a sign up page for new users to enter their details
// The user can enter their name, password, email address and asks them to read and accept the privacy policy

// Base settings for page state
var baseState = {

  message : "Please log in or sign up",
  
  email : "",
  email_valid: false,
  email_warn: false,

  password : "",
  password_see: false,
  password_warn: false,

  pvalid8: false,
  pvalidUpperLower: false,
  pvalidNumbers: false,

  password_check: "",
  password_check_see: false,
  password_check_message: null,
  password_check_valid: null,
  password_check_warn: false,

  signup: true,

  fname_valid: false,
  fname: "",
  fname_warn: false,

  sname_valid: false,
  sname: "",
  sname_warn: false,

  acceptPrivacyPolicy: false,
  acceptPrivacyPolicy_warn: false,

  error: "",

  
}


export class Signup extends Component{
  constructor(props){
    super(props)

    this.cancel = this.cancel.bind(this);
    this.signup = this.signup.bind(this);
    this.emailHandler = this.emailHandler.bind(this);   
    this.registrationVerification = this.registrationVerification.bind(this);
    this.testing = this.testing.bind(this)
    this.testing_signup_firebase = this.testing_signup_firebase(this)

    this.state=baseState
    


  }

  testing() { 

    
    
    // this.emailHandler("name.surname@domain.co.uk")
    // console.log(emailVerifier(email))

    let emails = {
                  "name.surname@domain.co.uk": true, 
                  "name.surnamedomain.co.uk": false, 
                  "name.surname@domainuk": false,

                  "example1@gmail.com": true,
                  "example2@yahoo.com": true,
                  "example3@hotmail.com": true,
                  "example4@outlook.com": true,
                  "example5@aol.com": true,
                  "example6@gmail.co.uk": true,
                  "example7@yahoo.co.uk": true,
                  "example8@hotmail.co.uk": true,
                  "example9@outlook.co.uk": true,
                  "example10@aol.co.uk": true,

                  "example.com": false,
                  "example@": false,
                  "@example.com": false,
                  "example@.com": false, 
                  "example@@example.com": false,
                  "example@com ": false,
                  "example@-.com ": false,
                  "example@com.": false, 
                  "example@!#$%^&*.com": false, 
                  "example@.com.": false 

                }

    console.log("\n ---- Email Addresses ----\n")
    for (let email in emails) {

      if (emailVerifier(email) == emails[email]){
        console.log("Passed")
      }  
      else {
        console.log("Failed. Email: " + email)  


      } 
  
    }

    // ===================================================

    let passwords = {
      
                    // Invalid passwords - Words Only
                     "apple": false, 
                     "banana": false, 
                     "cherry": false, 
                     "date": false, 
                     "elderberry": false, 
                     "fig": false, 
                     "grape": false, 
                     "huckleberry": false, 
                     "kiwi": false, 
                     "lemon": false, 
                     "mango": false, 
                     "nectarine": false, 
                     "orange": false, 
                     "peach": false, 
                     "quince": false, 
                     "raspberry": false, 
                     "strawberry": false, 
                     "tangerine": false, 
                     "ugli": false, 
                     "violet": false,

                    // Invalid passwords - no capital letter
                    "beguiling9":false, 
                    "celestial82":false, 
                    "ebullience10":false, 
                    "effervesce30":false, 
                    "effervescent88":false, 
                    "efflorescence87":false, 
                    "effulgent17":false, 
                    "emanate11":false, 
                    "enigmatic13":false, 
                    "ethereal16":false, 
                    "gargantuan4":false, 
                    "inimitable8":false, 
                    "inscrutable46":false, 
                    "laudable43":false, 
                    "loquacious53":false, 
                    "mellifluous62":false, 
                    "nihilistic13":false, 
                    "quintessential3":false, 
                    "ubiquitous79":false, 
                    "zenith40":false,
                     
                    //  Valid passwords - Capital letter, lowercase letters and a number
                     "Celestial93": true,
                     "Conundrum58": true, 
                     "Ebullience83": true, 
                     "Effervesce76": true, 
                     "Effervescence78": true, 
                     "Efflorescence74": true, 
                     "Effulgent33": true, 
                     "Emanate73": true, 
                     "Enigmatic85": true, 
                     "Ethereal70": true, 
                     "Gossamer75": true, 
                     "Inimitable57": true, 
                     "Inscrutable40": true, 
                     "Laudable88": true, 
                     "Loquacious66": true, 
                     "Luminous37": true, 
                     "Nihilistic3": true, 
                     "Quintessential38": true, 
                     "Ubiquitous80": true, 
                     "Zenith46": true,


                    }

                    console.log("\n ---- Passwords ---- \n")
                    for (let password in passwords) {
                

                      if (checkIfAllTrue(passwordVerifier(password)) == passwords[password]){
                        console.log("Passed")
                      }  
                      else {
                        console.log("Failed. Email: " + password)  
                
                
                      } 
                  
                    }

                    console.log("test")

  }

  testing_signup_firebase() {

    const auth = getAuth();

    console.log(auth.currentUser)

    // createUserWithEmailAndPassword(auth, "huwjones37@gmail.com", "Example1").then((u)=>{
      
    //   updateProfile(u.user, {
    //     displayName: "Huw Jones"
    //   })
  
    // })

    // const auth = getAuth();

    // updateProfile(auth.currentUser, {
    //   displayName: "Huw Jones"
    // })


  }

  emailHandler(email) {

    
    // if the last character of email is a space, remove it
    if (email[email.length - 1] === ' ') {
      email = email.substring(0, email.length - 1);
    }

    this.setState({
      email: email.toLowerCase(),
                    email_valid: emailVerifier(email),
                    email_warn: false})
    
    

  }


  

  cancel(e){

    this.props.navigation.navigate('Login')

  }

  registrationVerification() {

    var lastChar = this.state.email.substring(this.state.email.length-1)
    
    if (lastChar === " ") {
      
	
      this.setState({email: this.state.email.slice(0, -1)})


    } 

    var valid = 1

    if (!this.state.email_valid){
      this.setState({email_warn: true})
      valid -= 1 
    }
    if (!this.state.pvalid8 || !this.state.pvalidNumbers || !this.state.pvalidUpperLower) {
      this.setState({password_warn: true})
      valid -= 1
    }
    if (!this.state.password_check_valid) {
      this.setState({password_check_warn: true})
      valid -= 1
    } 
    if (!this.state.fname_valid) {
      this.setState({fname_warn: true})
      valid -= 1
    }
    if (!this.state.sname_valid) {
      this.setState({sname_warn: true})
      valid -= 1
    }
    if (!this.state.acceptPrivacyPolicy) {
      this.setState({acceptPrivacyPolicy_warn: true})
      valid -= 1
    }

    if (valid < 1) {
      Alert.alert("Error", "Some of the values you entered were incorrect. Please review the highlighted fields.")
      return false}
    else {return true}  

  }

  signup() {

    

    // Makes a local check to determine if all fields contain valid data
    var verified = this.registrationVerification()
    

    if (verified) {
      
      const auth = getAuth();

      createUserWithEmailAndPassword(auth, this.state.email, this.state.password).then((u)=>{
        
        console.log(u.user)

        // u.user.updateProfile({
        //   displayName: this.state.fname + " " + this.state.sname,
        // })

        // u.user.sendEmailVerification().then(function() {

        // })

        Alert.alert("Success", "Successfully signed up")

        // this.props.navigation.navigate('receiptsView')


      }).catch((err)=>{

        Alert.alert("Failed", "Something went wrong")

        console.log(err)

      })

    
    } 

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
            <Text style = {styles.text && {borderBottomWidth: 1, alignSelf: 'center', marginTop: 20}} >Please fill out all of the fields below:</Text>

            

            {/* <View style = {styles.textContainer}> */}
            {this.state.email_warn && <Text style={styles.error}>Error: Invalid email address.</Text>}
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
                    onChangeText = {(email) => this.emailHandler(email)}/>
                
                
                {this.state.password_warn && <Text style={styles.error}>Error: Invalid password.</Text>}
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

                <Text style = {styles.passwordMessage} >Password must contain:   </Text>    
                <Text style = {this.state.pvalid8 ?  styles.passwordCorrect : styles.passwordMessage} > {this.state.pvalid8 ? '\u2713': '\u2717'} at least 8 characters</Text>
                <Text style = {this.state.pvalidUpperLower ?  styles.passwordCorrect : styles.passwordMessage} > {this.state.pvalidUpperLower ? '\u2713': '\u2717'} upper and lowercase letters</Text>
                <Text style = {this.state.pvalidNumbers ?  styles.passwordCorrect : styles.passwordMessage} > {this.state.pvalidNumbers ? '\u2713': '\u2717'} at least one number</Text>
            {/* </View>  */}
            
            {this.state.password_check_warn && <Text style={styles.error}>Error: Invalid confirmation password.</Text>}
            <View style = {styles.inputAlt}>

            <TextInput style = {styles.inputAltInner}
                    underlineColorAndroid = "transparent"
                    type="password_check"
                    id="password_check"
                    name="password_check"
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    // autoComplete="none"
                    placeholder="Confirm password"
                    placeholderTextColor = "black"
                    autoCapitalize = "none"
                    secureTextEntry={!this.state.password_check_see}
                    onChangeText = {(password_check) => { 
                     
                        this.setState({ 
                            password_check: password_check});
                            
                            if (password_check == "" || this.state.password == "") {
                              this.setState({
                                password_check_valid: null,
                                password_check_message: null
                              })
                            }
                            else if (password_check == this.state.password) {
                              this.setState({
                                password_check_valid: true,
                                password_check_message: " \u2713 Passwords match"

                              })
                            } else {
                              this.setState({
                              password_check_valid: false,
                              password_check_message: "\u2717 Passwords do not match"
                              })
                            }

                          }
                        }/>

                    <Icon style={styles.searchIcon} onPress={
                    () => this.setState({password_check_see: !this.state.password_check_see, password_check_warn: false})} name={this.state.password_check_see ? "eye-slash" : "eye"} size={20} color="#000"/>
            </View>

            {this.state.password_check_message && <Text style={this.state.password_check_valid ? styles.passwordCorrect : styles.error}>{this.state.password_check_message}</Text>}
            
            <Text style={{ textAlign: 'center', marginTop: 10, borderBottomWidth: 1 }}> </Text>

            {this.state.fname_warn && <Text style={styles.error}>Error: Please provide a valid first name.</Text>}
            {/* <View style = {styles.textContainer}> */}

                <TextInput style = {styles.input}
                    underlineColorAndroid = "transparent"
                    type="text"
                    id="fname"
                    name="fname"
                    // autoComplete="first name"
                    placeholder="Enter first name"
                    placeholderTextColor = "black"
                    autoCapitalize = "none"
                    onChangeText = {(fname) => { this.setState({ fname: fname,
                                                                 fname_valid: nameVerifier(fname),
                                                                 fname_warn: false})}}/>

            {this.state.sname_warn && <Text style={styles.error}>Error: Please provide a valid surname.</Text>}

                <TextInput style = {styles.input}
                    underlineColorAndroid = "transparent"
                    type="text"
                    id="sname"
                    name="sname"
                    // autoComplete="Surname"
                    placeholder="Enter surname"
                    placeholderTextColor = "black"
                    autoCapitalize = "none"
                    onChangeText = {(sname) => { this.setState({ sname: sname,
                                                                 sname_valid: nameVerifier(sname),
                                                                 sname_warn: false})}}/>

            {/* {this.state.fnumber_warn && <Text style={styles.error}>Error: Invalid telephone number.</Text>}
                <TextInput style = {styles.input}
                    underlineColorAndroid = "transparent"
                    type="tel"
                    id="fnumber"
                    name="fnumber"
                    keyboardType="numeric"
                    autoComplete="telephone number"
                    placeholder="Enter phone number"
                    placeholderTextColor = "black"
                    autoCapitalize = "none"
                    onChangeText = {(fnumber) => { this.setState({ fnumber: fnumber, 
                                                                   fnumber_valid: phoneNumberVerifier(fnumber),
                                                                   fnumber_warn: false})}}/>       */}
            
            {/* </View> */}

          {this.state.acceptPrivacyPolicy_warn && <Text style={styles.error}> Please indicate that you have read the privacy policy. </Text>}
          <View style={{flexDirection: "row", alignItems: "center", marginLeft: 10}}>

            <CheckBox
              disabled={false}
              value={this.state.acceptPrivacyPolicy}
              onValueChange={(newValue) => this.setState({acceptPrivacyPolicy: newValue})}
            />

          <Text id="message" style={{color: "blue", marginTop: 10,
                      marginLeft: 20,
                      marginBottom: 10,
                      alignSelf: 'center'}}
                      onPress={() => Linking.openURL('https://www.termsfeed.com/live/9a4c53e1-5df9-4ac0-9c2b-130f3df1ff23')}> I have read the privacy policy </Text>


          </View>  

            <TouchableOpacity
                style = {styles.submitButton}
                onPress = {
                    () => this.signup()
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
