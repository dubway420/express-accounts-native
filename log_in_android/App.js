import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import logo from './assets/images/logo.png';

export default function App() {
  return (
    <View style={logoStyles.container}>
      <ImageBackground source={require('./assets/images/office_space.png')} style={logoStyles.backgroundImage} blurRadius={5}>

        {/* The Logo at the top of the page */}
        <Image source={require('./assets/images/logo.png')} style={logoStyles.logo}/>
        
        {/* The log in message */}
        <View style={logoStyles.signInMessage}>

          <Text style={boxStyle.textSignIn}>Sign in to continue</Text>

        </View>

        {/* Log in buttons */}
        <View style={boxStyle.box}>

          <TouchableOpacity style={boxStyle.buttonLogIn}>
            <Text style={boxStyle.textButton}>Log in</Text>  
          </TouchableOpacity>

          <TouchableOpacity style={boxStyle.buttonSignUp}>
            <Text style={boxStyle.textButton}>Sign up</Text>  
          </TouchableOpacity>

        </View>

        {/* Federated log in buttons */}
        <View style={boxStyle.boxBottom}>

          <Text style={boxStyle.federatedTextLogIn}>Log in with</Text>

          <View style={boxStyle.federatedInnerBox}>

          <TouchableOpacity style={boxStyle.federatedButton}>
            
            <Image source={require('./assets/images/google.png')} style={boxStyle.iconFederated} />           
            <Text style={boxStyle.federatedText}>Google</Text>  

          </TouchableOpacity>

          <TouchableOpacity style={boxStyle.federatedButton}>
            
            <Image source={require('./assets/images/Microsoft_logo.svg.png')} style={boxStyle.iconFederated} />           
            <Text style={boxStyle.federatedText}>Microsoft</Text>  

          </TouchableOpacity>
          </View>
        </View>



      </ImageBackground> 
      
    </View>
  );
}
const logoStyles = StyleSheet.create({
  
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  backgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    flex: 1,
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  logo: {
    marginTop: 60,
    width: "90%", 
    borderRadius: 100
  },

  signInMessage: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 100,
    width: "90%"
  }


});

const boxStyle = StyleSheet.create({

  box: {
    flex: 0.35,
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 30,
    width: "90%", 
    justifyContent: 'space-around',
  },

  textSignIn: {
    color: "#312e74",
    fontSize: 20.5,
    padding: 10
  },

  buttonLogIn: {
    flex: 0.3,
    backgroundColor: "#312e74",
    borderColor: "#a60d49",
    borderWidth: 5,
    width: "80%",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },

  textButton: {
    color: "white",
    fontSize: 30,
  },

  buttonSignUp: {
    flex: 0.3,
    backgroundColor: "#a60d49",
    borderColor: "#312e74",
    borderWidth: 5,
    width: "80%",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },

  boxBottom: {
    flex: 0.35,
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    borderRadius: 30,
    width: "90%", 
    marginBottom: 20
  },

  federatedTextLogIn: {
    textDecorationLine: 'underline',
    fontSize: 15
  },

  federatedInnerBox: {
    flex: 1, 
    flexDirection: "vertical", 
    justifyContent: 'space-around', 
    width: "100%", 
    alignItems: "center"
  },

  federatedButton: {
    flex: 0.35,
    flexDirection: "row",
    borderColor: "#312e74",
    borderWidth: 5,
    width: "80%",
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 10,
  },

  federatedText: {
    marginLeft: "22%",
    color: "black",
    fontSize: 25

  },

  iconFederated: {
    marginLeft: 10,
    height: 30,
    width: 30,
    // flex: 1
  }

})