import React from "react"
import { Text, View } from 'react-native';
import {styles} from './styles'
import { Login } from './Login'
import initializeFirebase from './firebase/fire'



class App extends React.Component {
  constructor(props){
    super(props)
    
    initializeFirebase()
  }


 
  

  render() {

    return (

    <Login/>

    )

  }
}

export default App
