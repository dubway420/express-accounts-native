import React, { Component } from "react"
import { SafeAreaView, ScrollView, Image, Text, View, TextInput, TouchableOpacity, LogBox, Alert } from "react-native";
import fire from './fire'
import { styles } from './styles'
import background from './background.jpg'
import { screenWidth } from './extras'
import { Dialog, ConfirmDialog } from 'react-native-simple-dialogs';
import Icon from 'react-native-vector-icons/FontAwesome'
import { topBar } from './topBar'
import {emailVerifier, passwordVerifier, nameVerifier} from './validators'
import { passwordHandler } from './handlers.js'
import firebase from "firebase";
import { Linking } from 'react-native';

var baseState = {

  userName: null,
  userEmail: null,
  userPhone: null,

  nameChangeDialog: false,
  emailChangeDialog: false,

  firstName: null,
  lastName: null,


  sname_valid: true,
  fname_valid: true,
  email_valid: true,
  

  sname_warn: false,
  fname_warn: false,
  email_warn: false,

  editSaved: false,

  passwordChangeDialog: false,

  password_old: "",
  password_old_see: false,
  password_old_warn: false,

  password: "",
  password_new_see: false,
  password_warn: false,

  password_check: "",
  password_check_see: false,
  password_check_message: null,
  password_check_valid: null,
  password_check_warn: false,


  logoutDialog: false,

};

// Firebase sets some timeers for a long period, which will trigger some warnings. Let's turn that off for this example
LogBox.ignoreLogs([`Setting a timer for a long period`]);

const tableHead = ['Amount', 'date', 'Category', 'Logged']
const widthArr = [screenWidth * 0.2, screenWidth * 0.2, screenWidth * 0.35, screenWidth * 0.2]

const widthArr2 = [screenWidth * 0.45, screenWidth * 0.4]



export class settingsPage extends Component {
  constructor(props) {
    super(props)


    this.state = baseState

  }


  componentDidMount = async () => {

    console.log("componentDidMount: settings page")

    this.loadData()

  }

  loadData = async () => {

    this.setState({
    
      userName: fire.auth().currentUser.displayName,
      userEmail: fire.auth().currentUser.email,
      userPhone: fire.auth().currentUser.phoneNumber,

      firstName: fire.auth().currentUser.displayName.split(" ")[0],
      lastName: fire.auth().currentUser.displayName.split(" ")[1],
      
    })

  }


  updateName = async () => {


    if (this.state.fname_valid && this.state.sname_valid) {


      await fire.auth().currentUser.updateProfile({
        displayName: this.state.firstName + " " + this.state.lastName,
      })

      this.setState({
        nameChangeDialog: false,
        editSaved: false,
        userName: fire.auth().currentUser.displayName
      })

      return true

    }

    if (!this.state.fname_valid) {
      this.setState({
        fname_warn: true,
      })
    }

    if (!this.state.sname_valid) {
      this.setState({
        sname_warn: true,
      })
    }

  }

  closeDialog = () => {
    this.setState({
      nameChangeDialog: false,
      editSaved: false,
      
      sname_valid: true,
      fname_valid: true,
      email_valid: true,
      

      sname_warn: false,
      fname_warn: false,
      email_warn: false,

      userName: fire.auth().currentUser.displayName,
      firstName: fire.auth().currentUser.displayName.split(" ")[0],
      lastName: fire.auth().currentUser.displayName.split(" ")[1],


    })
  }


  updatePassword = async () => {

    var password_change_message

    if (this.state.password_check_valid) {

      var user = fire.auth().currentUser;
      var credential = firebase.auth.EmailAuthProvider.credential(
        user.email,
        this.state.password_old
      );

      await user.reauthenticateWithCredential(credential).then(async () => {

        await user.updatePassword(this.state.password).then(async () => {

          this.setState({
            passwordChangeDialog: false,
            editSaved: false,
            password_old: "",
            password_old_see: false,
            password_old_warn: false,

            password: "",
            password_new_see: false,
            password_warn: false,

            password_check: "",
            password_check_see: false,
            password_check_message: null,
            password_check_valid: null,
            password_check_warn: false,

          })

          password_change_message = "Password changed successfully"


        }).catch(error => {

          this.setState({
            passwordChangeDialog: false,
            editSaved: false,
            password_old: "",
            password_old_see: false,
            password_old_warn: false,

            password: "",
            password_new_see: false,
            password_warn: false,

            password_check: "",
            password_check_see: false,
            password_check_message: null,
            password_check_valid: null,
            password_check_warn: false,

          })

          password_change_message = "Something went wrong, please try again"

        })

      }).catch(error => {

        this.setState({

          password_old_warn: true

        })

        password_change_message = "Your old password is incorrect. Please try again"


      })

    }

    return this.passwordChangeConfirm(password_change_message)

  }

  closePasswordDialog = () => {

    this.setState({
      passwordChangeDialog: false,
      editSaved: false,
      password_old: "",
      password_old_see: false,
      password_old_warn: false,

      password: "",
      password_new_see: false,
      password_warn: false,

      password_check: "",
      password_check_see: false,
      password_check_message: null,
      password_check_valid: null,
      password_check_warn: false,

    })

  }

  passwordChangeConfirm = (message) => {


    return Alert.alert(
      "Changing Password",
      message,
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );

  } 


  sendResetEmail = async () => {

    await fire.auth().sendPasswordResetEmail(this.state.userEmail).then(() => {

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







  logout = () => {

    fire.auth().signOut()
    this.setState({ logoutDialog: false })
    this.props.navigation.navigate('Login')

  
  }




  render() {

    console.log("render")
   
      return (

        <SafeAreaView keyboardShouldPersistTaps='handled' style={styles.outerContainer}>

          <Image
            source={background}
            style={styles.large} />



          <ScrollView style={styles.scrollView}>

            {topBar(this.props.navigation, "red")}

            <View style={styles.box}>

              <ConfirmDialog
                  title="Log Out"
                  message="Are you sure that you want to logout?"
                  visible={this.state.logoutDialog}
                  onTouchOutside={() => this.setState({ logoutDialog: false })}
                  positiveButton={{
                    title: "YES",
                    onPress: this.logout
                  }}
                  negativeButton={{
                    title: "NO",
                    onPress: () => this.setState({ logoutDialog: false })
                  }}
                />




              <View style={styles.textContainer}>

              <Dialog
                visible={this.state.nameChangeDialog}
                title="Edit Name"
                onTouchOutside={() => this.setState({nameChangeDialog: false})}
                 >
               {this.state.fname_warn && <Text style={styles.error}>Error: Please provide a valid first name.</Text>}
               {this.state.sname_warn && <Text style={styles.error}>Error: Please provide a valid surname.</Text>}

               <View style={{ flexDirection: "row", alignItems: "center" }}>
                  
                  

                  <TextInput style = {styles.input}
                      underlineColorAndroid = "transparent"
                      type="text"
                      id="fname"
                      name="fname"
                      autoComplete="first name"
                      placeholder="Enter first name"
                      placeholderTextColor = "black"
                      autoCapitalize = "none"
                      value={this.state.firstName}
                      onChangeText = {(fname) => { this.setState({ firstName: fname,
                                                                  fname_valid: nameVerifier(fname),
                                                                  fname_warn: false,
                                                                  editSaved: true})}}/>

                  

                  <TextInput style = {styles.input}
                      underlineColorAndroid = "transparent"
                      type="text"
                      id="sname"
                      name="sname"
                      autoComplete="Surname"
                      placeholder="Enter surname"
                      placeholderTextColor = "black"
                      autoCapitalize = "none"
                      value={this.state.lastName}
                      onChangeText = {(sname) => { this.setState({ lastName: sname,
                                                                  sname_valid: nameVerifier(sname),
                                                                  sname_warn: false,
                                                                  editSaved: true})}}/>
                  
               </View>   
                  {this.state.editSaved &&
                  <TouchableOpacity
                        style={styles.closeButton}
                        onPress={this.updateName}
                      >
                        <Text style={styles.submitButtonText}> Save Changes </Text>
                      </TouchableOpacity>

                    }

                    <TouchableOpacity
                      style={styles.closeButton}
                      onPress={this.closeDialog}
                    >
                      <Text style={styles.submitButtonText}> Close </Text>
                    </TouchableOpacity>


                
             
              </Dialog>

              <Dialog 
                visible={this.state.passwordChangeDialog}
                title="Change Password"
                onTouchOutside={() => this.closePasswordDialog()}
                  > 

                <SafeAreaView style={{ flexDirection: "column", alignItems: "center" }}>
                
                {this.state.password_old_warn && <Text style={styles.error}>Error: You have entered the wrong password.</Text>}
                <View style = {styles.inputAltEdit}>
                  
                  <TextInput style={styles.inputAltInner}
 
                      underlineColorAndroid = "transparent"
                      type="password"
                      id="password"
                      name="password"
                      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                      autoComplete="password"
                      placeholder="Enter old password   "
                      placeholderTextColor = "black"
                      autoCapitalize = "none"
                      secureTextEntry={!this.state.password_old_see}
                      underlineColorAndroid="transparent"
                      onChangeText = {(password) => this.setState({password_old: password})}/>

                  <Icon style={styles.searchIcon} onPress={
                    () => this.setState({password_old_see: !this.state.password_old_see})} name={this.state.password_old_see ? "eye-slash" : "eye"} size={20} color="#000"/>
                </View>       

                {this.state.password_warn && <Text style={styles.error}>Error: Invalid password.</Text>}
                <View style = {styles.inputAltEdit}>
                  
                  <TextInput style={styles.inputAltInner}
 
                      underlineColorAndroid = "transparent"
                      type="password"
                      id="password"
                      name="password"
                      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                      autoComplete="password"
                      placeholder="Enter new password   "
                      placeholderTextColor = "black"
                      autoCapitalize = "none"
                      secureTextEntry={!this.state.password_new_see}
                      underlineColorAndroid="transparent"
                      onChangeText = {(password) => passwordHandler(this, password)}/>

                  <Icon style={styles.searchIcon} onPress={
                    () => this.setState({password_new_see: !this.state.password_new_see})} name={this.state.password_new_see ? "eye-slash" : "eye"} size={20} color="#000"/>
                </View>        

                <Text style = {styles.passwordMessage} >Password must contain:   </Text>    
                <Text style = {this.state.pvalid8 ?  styles.passwordCorrect : styles.passwordMessage} > {this.state.pvalid8 ? '\u2713': '\u2717'} at least 8 characters</Text>
                <Text style = {this.state.pvalidUpperLower ?  styles.passwordCorrect : styles.passwordMessage} > {this.state.pvalidUpperLower ? '\u2713': '\u2717'} upper and lowercase letters</Text>
                <Text style = {this.state.pvalidNumbers ?  styles.passwordCorrect : styles.passwordMessage} > {this.state.pvalidNumbers ? '\u2713': '\u2717'} at least one number</Text>
            {/* </View>  */}
            
            {this.state.password_check_warn && <Text style={styles.error}>Error: Invalid confirmation password.</Text>}
            <View style = {styles.inputAltEdit}>

            <TextInput style = {styles.inputAltInner}
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
            
            { this.state.password_check_valid && this.state.pvalid8 && this.state.pvalidUpperLower && this.state.pvalidNumbers && this.state.password_old.length >= 1 &&
              <TouchableOpacity
                style = {styles.submitButton}
                onPress = {
                    () => this.updatePassword()
                }>
                <Text style = {styles.submitButtonText}> Update Password </Text>
            </TouchableOpacity> }

            <TouchableOpacity
                style = {styles.submitButton}
                onPress = {
                    () => this.closePasswordDialog()
                }>
                <Text style = {styles.submitButtonText}> Cancel </Text>
            </TouchableOpacity>

                </SafeAreaView>
              </Dialog>

              <Text style={styles.label}>About You</Text>

              <Text> Email: </Text>
              <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                <Text> {this.state.userEmail}</Text>
                <TouchableOpacity
                  
                  onPress={() => this.setState({emailChangeDialog: true})}
                >

                  {/* <Icon style={{ marginLeft: 10 }} name={"edit"} size={20} /> */}
                </TouchableOpacity>
              </View>

              <Text> Name: </Text>
                  <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                    <Text> {this.state.userName}</Text>
                    <TouchableOpacity
                      
                      onPress={() => this.setState({nameChangeDialog: true})}
                    >

                      <Icon style={{ marginLeft: 10 }} name={"edit"} size={20} />
                    </TouchableOpacity>
                  </View>

              <Text> Password: </Text>
              <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                <Text> ********* </Text>
                <TouchableOpacity
                  
                  onPress={() => this.setState({passwordChangeDialog: true})}
                >

                  <Icon style={{ marginLeft: 10 }} name={"edit"} size={20} />
                </TouchableOpacity>
              </View>

              {/* <Text> Phone: </Text>
              <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                <Text> {this.state.phoneNumber}</Text>
                <TouchableOpacity
                  
                  onPress={() => this.setState({  })}
                >

                  <Icon style={{ marginLeft: 10 }} name={"edit"} size={20} />
                </TouchableOpacity>
              </View> */}


                {/* <Text style={{ textAlign: 'center', marginTop: 10, borderBottomWidth: 1 }}> Summary of Financial Year {this.state.financialYear}</Text> */}


                <TouchableOpacity
                  style={{
                    textAlign: 'center',
                    backgroundColor: 'blue',
                    padding: 10,
                    margin: 5,
                    height: 40,
                    width: '90%'
                  }}
                  onPress={() => this.sendResetEmail()
                  }>
                  <Text style={styles.submitButtonText}> Reset Password </Text>
                </TouchableOpacity>


              </View>



            </View>

            <View style={styles.box}>

            <TouchableOpacity
                  style={{
                    textAlign: 'center',
                    backgroundColor: '#800020',
                    padding: 10,
                    margin: 20,
                    height: 40,
                    width: '90%'
                  }}
                  onPress={() => this.setState({ logoutDialog: true })
                  }>
                  <Text style={styles.submitButtonText}> Log Out </Text>
                </TouchableOpacity>

                 <Text id="message" style={{color: "blue", marginTop: 10,
                      marginLeft: 20,
                      marginBottom: 10,
                      alignSelf: 'center'}}
                      onPress={() => Linking.openURL('https://www.termsfeed.com/live/9a4c53e1-5df9-4ac0-9c2b-130f3df1ff23')}> Read our privacy policy </Text>

            </View>


           
          </ScrollView>
        </SafeAreaView>


      )
    }


}






export default settingsPage;