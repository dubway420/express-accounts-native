import React , {Component} from "react"
import { SafeAreaView, ScrollView, Image, Text, View, TextInput, TouchableOpacity } from "react-native";
import {Signup} from './Signup'
import fire from './fire'
import {styles} from './styles'
import background from './background.jpg'
import logo from './logo.png'
import Icon from 'react-native-vector-icons/FontAwesome'

var baseState = {

  email : "",
  password : "",
  password_see: false,

  fname: "",
  sname: "",
  fnumber: "",
  error: false,

  signup: false
}


class Login extends Component{
  constructor(props){
    super(props)
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.emailHandler = this.emailHandler.bind(this);
    
    this.state=baseState

  }

  emailHandler(email) {
    
    // if the last character of email is a space, remove it
    if (email[email.length - 1] === ' ') {
      email = email.substring(0, email.length - 1);
    }

    this.setState({
      email: email.toLowerCase(),
      error: false
    })

  }

  login(e){


    // e.preventDefault();
    fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
      

    }).catch((err)=>{

      console.log(err)
      
      this.setState({error: true})
    })

  }

  register(e){

    this.setState({signup: true})
 
  }



  
  render() {

    if (!this.state.signup) {
      return(
      
        <SafeAreaView style={styles.outerContainer}>

          <Image
          source={background}
          style={styles.large} />

          <ScrollView keyboardShouldPersistTaps='handled' style={styles.scrollView}>

            {/* <ImageBackground source={background} style={styles.image}> */}

            <View style={styles.box}>

            <Image style={styles.logo} source={logo} />

              <View style = {styles.textContainer}>
                <Text style = {styles.text} >Welcome to Express Accounts</Text>
                <Text id="message" style={styles.text}>Please log in or sign up</Text>
              </View>
              
              <TextInput style = {styles.input}
                underlineColorAndroid = "transparent"
                type="email"
                id="email"
                name="email"
                autoComplete="email address"
                placeholder="Enter email address"
                placeholderTextColor = "black"
                autoCapitalize = "none"
                value={this.state.email}
                onChangeText = {this.emailHandler}/>
              
              <View style = {styles.inputAlt}>
                  
                <TextInput style={styles.inputAltInner}
                underlineColorAndroid = "transparent"
                type="password"
                id="password"
                name="password"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                autoComplete="password"
                placeholder="Enter password"
                placeholderTextColor = "black"
                autoCapitalize = "none"
                secureTextEntry={!this.state.password_see}
                onChangeText = {(password) => { this.setState({ password: password, error: false})}}/>
                <Icon style={styles.searchIcon} onPress={
                    () => this.setState({password_see: !this.state.password_see})} name={this.state.password_see ? "eye-slash" : "eye"} size={20} color="#000"/>
              </View>
              {this.state.error && <Text style={styles.error}>Error: Invalid email address or password. Please try again or sign up.</Text>} 
              
              <TouchableOpacity
                style = {styles.submitButton}
                onPress = {
                    () => this.login()
                }>
                <Text style = {styles.submitButtonText}> Log In </Text>
              </TouchableOpacity>
              

              <Text id="message" style={styles.text}>Haven't signed up yet? Click here:</Text>

              <TouchableOpacity
                style = {styles.submitButton}
                onPress = {
                    () => this.register()
                }>
                <Text style = {styles.submitButtonText}> Sign Up </Text>
              </TouchableOpacity>

              </View> 
            
      
            {/* </ImageBackground> */}
          
        </ScrollView>
      </SafeAreaView>
    

    )} else {
      return (
        <Signup/>

      )
    }

  }



}



export default Login;