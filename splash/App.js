import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import logo from './assets/images/logo.png';

export default function App() {
  return (
    <View style={styles.container}>
      <ImageBackground source={require('./assets/images/office_space.png')} style={styles.backgroundImage} blurRadius={5}>

        <Image source={require('./assets/images/logo.png')} style={styles.logo}/>

      </ImageBackground> 
      
    </View>
  );
}
const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  backgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center'
  },

  logo: {
    marginTop: 20,
    width: "90%", 
    borderRadius: 100
  },


});