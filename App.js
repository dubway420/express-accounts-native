import React from "react"
import { Text, View } from 'react-native';
import {styles} from './styles'
import { Signup } from './Signup'
import initializeFirebase from './firebase/fire'



class App extends React.Component {
  constructor(props){
    super(props)
    
    initializeFirebase()
  }


 
  

  render() {

    return (

    <Signup/>

    )

  }
}

export default App
