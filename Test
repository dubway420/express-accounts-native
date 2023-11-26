import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const FrontPage = () => {
  return (
    <View style={styles.container}>
      {/* Background Image */}
      <Image
        source={require('background.jpg')}
        style={styles.background}
      />
      {/* Foreground Logo */}
      <Image
        source={require('logo.png')}
        style={styles.logo.png}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // or 'contain' based on your preference
  },
  logo: {
    width: 200, // Adjust the width and height as needed
    height: 200,
    resizeMode: 'contain', // or 'cover' based on your preference
    // You can also add margin, padding, etc. to position the logo as desired
  },
});

export default FrontPage;
