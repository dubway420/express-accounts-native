import React, {Component}  from "react"
import { SafeAreaView, ScrollView, Image, Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import {styles} from './styles'
import background from './background.jpg'
import logo from './logo.png'
import fire from './fire'
import Receipts from "./Receipts";

export class EmailNotVerified extends Component{
  constructor(props){
    super(props)
    this.haveVerified = this.haveVerified.bind(this)
    this.reSendEmail = this.reSendEmail.bind(this)
    this.signOut = this.signOut.bind(this)
    this.state = {
      emailVerified: false
    }

  }

  haveVerified() {

    fire.auth()?.currentUser.reload()
    // console.log(fire.auth().currentUser.emailVerified)
    if (!fire.auth().currentUser.emailVerified) {
      Alert.alert("Not Verified", "Something's not quite right. If you have already clicked the link in the email, please wait a few seconds and try again. If you haven't received the email, try pressing resend. Alternatively, you can log out and try signing up again.")
    } else { this.setState({emailVerified: true}) }

  }

  reSendEmail() {

    fire.auth().currentUser.sendEmailVerification();

  }

  signOut(){

    fire.auth().signOut() 

  }


  
  render() {

    // console.log()

    if (!this.state.emailVerified) {
      
      var email = fire.auth().currentUser.email

      return(
        
          <SafeAreaView style={styles.outerContainer}>

            <Image
            source={background}
            style={styles.large} />

            <ScrollView style={styles.scrollView}>

              <View style={styles.box}>

              <Image style={styles.logo} source={logo} />

                <Text style={{marginLeft: 20, alignSelf:"baseline", width: "80%"}}>
                  <Text id="message" style={styles.text}>We've sent an email to </Text>
                  <Text id="message" style={{fontWeight: "bold"}}>{email}</Text>
                
                </Text>

                <TouchableOpacity
                  style = {styles.submitButton}
                  onPress = {
                      () => this.haveVerified()
                  }>
                  <Text style = {styles.submitButtonText}> I have verified my email </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style = {styles.submitButton}
                  onPress = {
                      () => this.reSendEmail()
                  }>
                  <Text style = {styles.submitButtonText}> Resend Verification Email </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style = {styles.submitButton}
                  onPress = {
                      () => this.signOut()
                  }>
                  <Text style = {styles.submitButtonText}> Log Out </Text>
                </TouchableOpacity>

                </View> 

          </ScrollView>
        </SafeAreaView>
      
      )} else {
        return (
          <Receipts/>
        )

      }
    } 
}



export default EmailNotVerified;