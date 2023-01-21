import React , {Component} from "react"
import {View, SafeAreaView, Image} from 'react-native'
import {styles} from './styles'
import background from './assets/background.jpg'
import logo from './assets/logo.png'

export default class splashScreen extends Component{

    render(){

        return (
            
            <SafeAreaView style={styles.splashScreen}>

                <Image
                source={background}
                style={styles.large} />

                <View style={{height: "20%", width: "100%", justifyContent: "center",  backgroundColor: "white"}}>

                    <Image style={{resizeMode: 'contain', alignSelf: 'center', width: "90%"}} source={logo} />

                </View>
            </SafeAreaView>
            
            )

    }
}