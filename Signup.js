import React , {Component} from "react"
import { SafeAreaView, ScrollView, Image, TextInput, Text, View, TouchableOpacity, DevSettings, Alert } from "react-native";
import fire from './fire'
import {emailVerifier, passwordVerifier, nameVerifier, phoneNumberVerifier} from './validators'
import {styles} from './styles'
import background from './background.jpg'
import logo from './logo.png'
import Icon from 'react-native-vector-icons/FontAwesome'

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
  fname_valid: false,

  fnumber_valid: false,
  fnumber: "",
  fnumber_warn: false,

  error: "",

  

}


export class Signup extends Component{
  constructor(props){
    super(props)
    this.cancel = this.cancel.bind(this);
    this.signup = this.signup.bind(this);
    this.emailHandler = this.emailHandler.bind(this);   
    this.passwordHandler = this.passwordHandler.bind(this); 
    this.registrationVerification = this.registrationVerification.bind(this);
    this.state=baseState

  }

  emailHandler(email) {

    this.setState({ email: email,
                    email_valid: emailVerifier(email),
                    email_warn: false})
                

  }

  passwordHandler(password) { 
                          
    var passwordValidation = passwordVerifier(password)

    this.setState({ 
        password_warn: false,
        pvalid8: passwordValidation[0],
        pvalidUpperLower: passwordValidation[1],
        pvalidNumbers: passwordValidation[2],
        password: password})
      }

  

  cancel(e){

    DevSettings.reload()

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
    if (!this.state.fnumber_valid) {
      this.setState({fnumber_warn: true})
      valid -= 1
    }

    if (valid < 1) {
      Alert.alert("Error", "Some of the values you entered were incorrect. Please review the highlighted fields.")
      return false}
    else {return true}  

  }

  signup() {

    console.log("hello")
    
    var verified = this.registrationVerification()
    

    if (verified) {

      fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
        
        // const user = fire.auth().currentUser

        // user.displayName = this.state.fname + " " + this.state.sname 
        // user.phoneNumber = this.state.fnumber

        u.user.updateProfile({
          displayName: this.state.fname + " " + this.state.sname,
          phoneNumber: this.state.fnumber
        })

        u.user.sendEmailVerification().then(function() {

        })


      }).catch((err)=>{

        console.log(err)

      })
    }
  }




  
  render() {
    
         return(
        
            <SafeAreaView style={styles.outerContainer}>

          <Image
          source={background}
          style={styles.large} />

                <ScrollView style={styles.scrollView}>

            <View style={styles.box}>


            <Image style={styles.logo} source={logo} />
            <Text style = {styles.text} >Please fill out all of the fields below:</Text>

            

            <View style = {styles.textContainer}>
            {this.state.email_warn && <Text style={styles.error}>Error: Invalid email address.</Text>}
                <TextInput style = {styles.input}
                    underlineColorAndroid = "transparent"
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="email address"
                    placeholder="Enter email address"
                    placeholderTextColor = "black"
                    autoCapitalize = "none"
                    onChangeText = {(email) => this.emailHandler(email)}/>
                
                
                {this.state.password_warn && <Text style={styles.error}>Error: Invalid password.</Text>}
                <View style = {styles.input}>
                  
                  <TextInput style={styles.inputAlt}
                      underlineColorAndroid = "transparent"
                      type="password"
                      id="password"
                      name="password"
                      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                      autoComplete="password"
                      placeholder="Enter password   "
                      placeholderTextColor = "black"
                      autoCapitalize = "none"
                      secureTextEntry={!this.state.password_see}
                      underlineColorAndroid="transparent"
                      onChangeText = {(password) => this.passwordHandler(password)}/>

                  <Icon style={styles.searchIcon} onPress={
                    () => this.setState({password_see: !this.state.password_see})} name={this.state.password_see ? "eye-slash" : "eye"} size={20} color="#000"/>
                </View>        

                <Text style = {styles.passwordMessage} >Password must contain:   </Text>    
                <Text style = {this.state.pvalid8 ?  styles.passwordCorrect : styles.passwordMessage} > {this.state.pvalid8 ? '\u2713': '\u2717'} at least 8 characters</Text>
                <Text style = {this.state.pvalidUpperLower ?  styles.passwordCorrect : styles.passwordMessage} > {this.state.pvalidUpperLower ? '\u2713': '\u2717'} upper and lowercase letters</Text>
                <Text style = {this.state.pvalidNumbers ?  styles.passwordCorrect : styles.passwordMessage} > {this.state.pvalidNumbers ? '\u2713': '\u2717'} at least one number</Text>
            </View> 
            
            {this.state.password_check_warn && <Text style={styles.error}>Error: Invalid confirmation password.</Text>}
            <View style = {styles.input}>

            <TextInput style = {styles.inputAlt}
                    underlineColorAndroid = "transparent"
                    type="password_check"
                    id="password_check"
                    name="password_check"
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    autoComplete="none"
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
            
            {this.state.fname_warn && <Text style={styles.error}>Error: Please provide a first name.</Text>}
            <View style = {styles.textContainer}>

                <TextInput style = {styles.input}
                    underlineColorAndroid = "transparent"
                    type="text"
                    id="fname"
                    name="fname"
                    autoComplete="first name"
                    placeholder="Enter first name"
                    placeholderTextColor = "black"
                    autoCapitalize = "none"
                    onChangeText = {(fname) => { this.setState({ fname: fname,
                                                                 fname_valid: nameVerifier(fname),
                                                                 fname_warn: false})}}/>

            {this.state.sname_warn && <Text style={styles.error}>Error: Please provide a surname.</Text>}

                <TextInput style = {styles.input}
                    underlineColorAndroid = "transparent"
                    type="text"
                    id="sname"
                    name="sname"
                    autoComplete="Surname"
                    placeholder="Enter surname"
                    placeholderTextColor = "black"
                    autoCapitalize = "none"
                    onChangeText = {(sname) => { this.setState({ sname: sname,
                                                                 sname_valid: nameVerifier(sname),
                                                                 sname_warn: false})}}/>

            {this.state.fnumber_warn && <Text style={styles.error}>Error: Invalid telephone number.</Text>}
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
                                                                   fnumber_warn: false})}}/>      
            
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
