import fire from './fire'
import Login from './Login'
import EmailNotVerified from './emailNotVerified'
import React from "react"
import ImageExtract from './ImageExtract'
import Receipts from './Receipts'
import {displayValues} from './testSpace'


class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      file: null,
      user: null,
      signup: {},
      emailVerified: false
    }

  }

  componentDidMount() {

    this.authListener();

  }

  authListener(){



    fire.auth().onAuthStateChanged((user)=>{
      
      if(user){
        
        var emailVerified = fire.auth().currentUser.emailVerified
        this.setState({user: user,
                       emailVerified: emailVerified})

      }  
      else {
        this.setState({user : null})
      }


    })

  }  

  

  render() {
    
      

    if (!this.state.user){
      

      return (
          <Login/>)
            
    } else if (!this.state.user.emailVerified) {
          
        return (
        <EmailNotVerified/>
        )
    } 
    else {
        return (
        <Receipts/>
        // displayValues
        )
      }
      }
  


  

  

}

export default App

