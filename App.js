import fire from './fire'
import Login from './Login'
import { Signup } from './Signup'
import React from "react"
import ReceiptsView from './receiptsView'
import Receipts from './Receipts'
import SplashScreen from './splashScreen'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();


class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      user: null,
      loginResolved: false
      
    }

  }

  componentDidMount() {
    
    // firebase logout
    // fire.auth().signOut()

    this.authListener();

  }

  authListener(){



    fire.auth().onAuthStateChanged((user)=>{
      
      

      if(user){
        
        this.setState({user: user})
        
      } 

      this.setState({loginResolved: true})

      
    })

  }  

  

  render() {
    
      if (this.state.loginResolved) {

        if (this.state.user) {

          return (
            <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen name="receiptsView" component={ReceiptsView} options={{ headerShown: false }} />
                <Stack.Screen name="receipts" component={Receipts} options={{ headerShown: false }} />
                </Stack.Navigator>  
            </NavigationContainer>
          )
          
        } else {
          return (
            <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen
                  name="Login"
                  component={Login}
                  options={{ headerShown: false }}
                />
                <Stack.Screen name="Sign up" component={Signup} options={{ headerShown: false }}/>
                <Stack.Screen name="receiptsView" component={ReceiptsView} options={{ headerShown: false }} />
                <Stack.Screen name="receipts" component={Receipts} options={{ headerShown: false }} />
              </Stack.Navigator>
            </NavigationContainer>
            );
        }
      }

      else {
        return (
          <SplashScreen/>
        )
      }

  }
}

export default App

