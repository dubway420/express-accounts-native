import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity } from 'react-native';
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 100,
    width: "90%"
  },

  textSignIn: {
    color: "#312e74",
    fontSize: 20.5,
    padding: 10
  },

  buttonLogIn: {
    backgroundColor: "#312e74",
    borderColor: "#a60d49",
    borderWidth: 2,
    width: "60%",
    alignItems: 'center',
    justifyContent: 'center',
    
  },

  textButton: {
    color: "white",
    fontSize: 30,
  }

})