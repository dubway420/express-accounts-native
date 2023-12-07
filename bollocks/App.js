import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import logo from './assets/images/logo.png';
import background from './assets/images/background.jpg';

export default function App() {
  return (
    <View style={styles.container}>
      <Image source={background} style={styles.background} />
      <Image source={logo} style={styles.logo} />
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
  },
  logo: {
    marginTop: 20,
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});



