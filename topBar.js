import { Image, View, TouchableOpacity } from "react-native";
import {styles} from './styles'
import logo from './icon.png'
import Icon from 'react-native-vector-icons/FontAwesome'
import React , {Component} from "react"

export function topBar() {
    
    return (
        <View backgroundColor={"white"} style={styles.topBar} >

        <TouchableOpacity
          style = {{paddingLeft: 5, paddingTop: 5}}
          onPress = {() => this.setState({deleteButtonPressed: true})}
          >
            
          <Icon 
          //  onPress = {() => this.setState({deleteButtonPressed: true})}
            name={"bars"} size={35} style={{color: "grey"}} />
        </TouchableOpacity>

        <Image source={logo} style={styles.logoTop} />

        <TouchableOpacity  
                  style = {{paddingRight: 5}}
                  onPress = {() => this.setState({deleteButtonPressed: true})}
                  >
                    
                  <Icon 
                  //  onPress = {() => this.setState({deleteButtonPressed: true})}
                   name={"users"} size={30} style={{color: "grey"}} />
                </TouchableOpacity>

       
      </View>

    )

}