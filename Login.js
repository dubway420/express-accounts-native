import React , {Component} from "react"
import { SafeAreaView, ScrollView, Image, Text, View, TextInput, TouchableOpacity } from "react-native";
import {Signup} from './Signup'
import fire from './fire'
import {styles} from './styles'
import background from './background.jpg'
import logo from './logo.png'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Linking } from 'react-native';
import { Dialog, ConfirmDialog } from 'react-native-simple-dialogs';

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

              <Text id="message" style={{color: "blue", marginTop: 10,
                      marginLeft: 20,
                      alignSelf: 'center'}}
                      onPress={() => this.setState({emailResetDialog: true})}
                      >
                        
                      Forgot your password? Click here.</Text>
              
              <TouchableOpacity
                style = {styles.submitButton}
                onPress = {
                    () => this.login()
                }>
                <Text style = {styles.submitButtonText}> Log In </Text>
              </TouchableOpacity>
              

              <TouchableOpacity
                style = {styles.submitButton}
                onPress = {
                    () => this.register()
                }>
                <Text style = {styles.submitButtonText}> Sign Up </Text>
              </TouchableOpacity>

              <Text id="message" style={{color: "blue", marginTop: 10,
                      marginLeft: 20,
                      marginBottom: 10,
                      alignSelf: 'center'}}
                      onPress={() => Linking.openURL('https://www.termsfeed.com/live/9a4c53e1-5df9-4ac0-9c2b-130f3df1ff23')}> Read our privacy policy </Text>

              {/* <Text id="privacy" style={{marginTop: 10,
                                         marginLeft: 20,
                                         alignSelf: 'center',
                                         color: "blue", 
                                         underlineColorAndroid: "blue"}}> Read our privacy policy </Text> */}

              </View> 
            
      
            {/* </ImageBackground> */}

            <Dialog
                visible={this.state.emailResetDialog}
                title="Edit Name"
                onTouchOutside={() => this.setState({emailResetDialog: false, emailReset: ""})}
                 >

               <View style={{ flexDirection: "row", alignItems: "center" }}>
                  
                  

                  <TextInput style = {styles.input}
                      underlineColorAndroid = "transparent"
                      type="text"
                      id="email"
                      name="email"
                      autoComplete="first name"
                      placeholder="Enter your email address"
                      placeholderTextColor = "black"
                      autoCapitalize = "none"
                      value={this.state.firstName}
                      onChangeText = {(email) => this.setState({emailReset: email})}/>

                  
               </View> 

                 
                  <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => this.sendResetEmail}
                      >
                        <Text style={styles.submitButtonText}> Send reset email </Text>
                      </TouchableOpacity>

                    

                    <TouchableOpacity
                      style={styles.closeButton}
                      onPress={() => {this.setState({emailResetDialog: false, emailReset: ""})}}
                    >
                      <Text style={styles.submitButtonText}> Close </Text>
                    </TouchableOpacity>


                
             
              </Dialog>
          
        </ScrollView>
      </SafeAreaView>
    

    )

  }



}



export default Login;