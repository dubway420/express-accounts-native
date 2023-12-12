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

          <Text style={boxStyle.create_account}>Create New Account</Text>

          <View style={logoStyles.alreadyRegistered}>

            <Text>Already Registered? Log in </Text>
            <Text style={logoStyles.here}>here</Text>
          </View>


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
    flex: 0.15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 100,
    width: "80%"
  },

  alreadyRegistered: {
    flex: 1,
    flexDirection: 'row'
  },

  here: {
    color: "#a60d49",
    fontWeight: 'bold'
  }


});

const boxStyle = StyleSheet.create({

  box: {
    flex: 0.75,
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 30,
    width: "90%",
    justifyContent: 'space-around',
  },

  create_account: {
    color: "#312e74",
    fontSize: 25,
    padding: 10,
    fontWeight: 'bold'

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
