import color from "color";
import {StyleSheet, StatusBar} from "react-native"

export const styles = StyleSheet.create({
    
    outerContainer: {
      flex: 1,
      marginTop: StatusBar.currentHeight,
    },
    container: {
      paddingTop: StatusBar.currentHeight,
      // flex: 1,
      backgroundColor: "white",
      // alignItems: "center",
      justifyContent: "center",
      width: '90%'
    },
    scrollView: {
      backgroundColor: '#00000000',
      marginHorizontal: 15,
      alignSelf: "center",
      width: '95%'
    },
    box: {
      marginTop:15,
      flex: 1,
      flexWrap: 'wrap',
      backgroundColor: "white",
      // alignItems: "center",
      justifyContent: "center",
      },
    large: {position:'absolute',
    left:0, 
    right:0, 
    top:0,
    bottom:0,
    height:900,
    width:500},
      
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
      },
    logo: {
        height: 100,
        width: '90%',
        margin: 20,
        flex: 1,
    // width: null,
    // height: null,
    resizeMode: 'contain'
      },  
    textContainer: {
       marginVertical: 10
    },  
    text: {
      marginLeft: 20,
      alignSelf: 'center'
    },
    passwordMessage: {
      marginHorizontal: 20,
      // alignSelf: 'center',
      color: 'blue',
      fontStyle: 'italic'

    },
    passwordCorrect: {
      marginHorizontal: 20,
      // alignSelf: 'center',
      color: 'green',
      fontStyle: 'italic'

    },
    input: {
      flex:1,
      flexDirection: 'row',
      // justifyContent: 'space-evenly',
      alignItems: 'center',
      backgroundColor: '#fff',
      margin: 15,
      height: 40,
      borderColor: '#61040f',
      borderWidth: 1,
      padding: 5,
      width: '90%',
      backgroundColor: '#fff',
      color: '#424242',
   },
   inputAlt: {
      height: 40,
      padding: 5,
      width: '80%',
 },
   submitButton: {
      backgroundColor: '#800020',
      padding: 10,
      margin: 15,
      height: 40,
      width: '90%'
   },
   submitButtonText:{
      color: 'white'
   },
   error: {
     color: 'red',
     marginLeft: 30,
     alignSelf: 'center'

   },
   searchSection: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: '#fff',
},
    searchIcon: {
      padding: 20,
},

  });