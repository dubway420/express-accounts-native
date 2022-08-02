import { Image, View, TouchableOpacity, TouchableHighlight } from "react-native";
import {styles} from './styles'
import logo from './icon.png'
import Icon from 'react-native-vector-icons/FontAwesome'
import React , {Component} from "react"
import { NavigationContainer } from '@react-navigation/native';

export function topBar(navigation, linesColor) {
    
    return (
        <View backgroundColor={"white"} style={styles.topBar} >
        
        <TouchableOpacity onPress={() => navigation.navigate("receiptsView")}>
          <Image source={logo} style={{height: 40, width: 40, paddingVertical: 5}} />
        </TouchableOpacity>

        <TouchableOpacity
          style = {{paddingLeft: 5, paddingTop: 5}}
          // onPress = {() => console.log(linesColor)}
          >
            
          <Icon 
           onPress = {() => navigation.navigate('settingsPage')}
            name={"bars"} size={35} style={{color: linesColor}} />
        </TouchableOpacity>

        

        

       
      </View>

    )

}