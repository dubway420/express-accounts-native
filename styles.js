import color from "color";
import {StyleSheet, StatusBar} from "react-native"

export const styles = StyleSheet.create({
    
    splashScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: StatusBar.currentHeight*1.1,
    },  
    outerContainer: {
      flex: 1,
      height: "90%",
      marginTop: StatusBar.currentHeight*1.1,
    },
    outerContainer2: {
      width: "100%",
      flex: 1,
      marginTop: StatusBar.currentHeight,
      alignItems: 'center',
      justifyContent: 'center',
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
      width: '100%',
      height: '90%'
    },
    box: {
      marginTop:15,
      flex: 1,
      flexWrap: 'wrap',
      backgroundColor: "white",
      height: '90%',
      justifyContent: "center",
      },
    large: {position:'absolute',
    left:0, 
    right:0, 
    top:0,
    bottom:0,
    height:"100%",
    width:"100%"},
      
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
      },
    logo: {
        height: 100,
        width: '90%',
        alignSelf: 'center',
        marginTop: 15,
        flex: 20,
    // width: null,
    // height: null,
    resizeMode: 'contain',
    paddingVertical: 20,
    // marginVertical: 1,
      },  
    logoTop: {
      height: 20,
      width: '50%',
      // alignSelf: 'center',
      marginVertical: 10,
      flex: 1,
  // width: null,
  // height: null,
  resizeMode: 'contain',
  // paddingVertical: 20,
  // marginVertical: 1,
    },  
    topBar: {
      alignSelf: 'stretch',
    height: 45,
    flexDirection: 'row', // row
    alignItems: 'center',
    justifyContent: 'space-between', // center, space-around
    paddingLeft: 10,
    paddingRight: 10},
    textContainer: {
       marginVertical: 10
    },  
    text: {
      marginTop: 10,
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
      // alignItems: 'center',
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
   graph: {
    flex:1,
    flexDirection: 'row',
    // justifyContent: 'space-evenly',
    // alignItems: 'center',
    backgroundColor: '#fff',
    marginLeft: 5,
    // height: "100%",
    borderColor: '#61040f',
    // borderWidth: 1,
    padding: 5,
    width: '95%',
    backgroundColor: '#fff',
    color: '#424242',
    
 },
  moreInfo: {
    borderColor: '#61040f',
    // borderBottomWidth: 1,
    marginLeft: 5,
    marginBottom: 5,
  },
   label: {
     paddingLeft: 5,
     marginBottom: 5,
     width: "100%",
     textDecorationLine: 'underline'

   },
   label2: {
    paddingLeft: 5,
    paddingTop: 5,
    width: "100%",
    textDecorationLine: 'underline',
    borderColor: '#61040f',
    borderTopWidth: 1,
  },
   message: {
    paddingLeft: 5,
    width: "100%",
    fontSize: 10
   },
   date: {
    padding: 5,
    // width: "92%",
    // height: 20,
    fontSize: 15,
    marginVertical: 15,
   },
   dropdownIcon: {
     alignItems: "center"
   },
   dateInput: {
    // backgroundColor: '#800020',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    
    borderWidth: 1,
    paddingVertical: 10,
    paddingLeft: 5,
    // margin: 5,
    height: 40,
    width: '90%',
    marginRight: 15,
    marginVertical: 15
   },
   currencyBox: {
    //  flex: 1,
     padding: 5,
    //  borderWidth: 10,
    //  borderStyle: 'solid',
    //  borderColor: "black",
     width: "25%",
     height: 35,
     marginVertical: 5,
     
   },
   currencyInput: {
    flex:1,
    // flexDirection: 'column',
    // justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#fff',
    // margin: 15,
    height: 35,
    borderColor: '#61040f',
    borderWidth: 1,
    fontSize: 15,
    padding: 5,
    width: '40%',
    backgroundColor: '#fff',
    color: '#424242',
    margin:15
   },
   categoryBox: {
     flex: 1,
    //  padding: 5,
    //  borderWidth: 10,
    //  borderStyle: 'solid',
    //  borderColor: "black",
    //  width: "90%",
     height: 35,
    
     //  height: 20,
     
   },
   categoryInput:{
    // margin:15,
    // flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    backgroundColor: "white",
    // height: 'wrap',
    // alignItems: "center",
    // justifyContent: "center",
    // borderColor: '#61040f',
    borderWidth: 1,
    // padding: 5,
    // margin: 5,
    // backgroundColor: "white",
    // alignItems: "center",
     marginVertical: 15,
     marginRight: 15
   },

   borderedBox: {
    margin:15,
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    backgroundColor: "white",
    // height: 'wrap',
    // alignItems: "center",
    // justifyContent: "center",
    // borderColor: '#61040f',
    borderWidth: 1,
    padding: 5,
    margin: 5,
    // backgroundColor: "white",
    alignItems: "center",
    // justifyContent: "left",
  },
   inputAlt: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 15,
    height: 40,
    borderColor: '#61040f',
    borderWidth: 1,
    // padding: 5,
    width: '90%',
    backgroundColor: '#fff',
    color: '#424242',
  },
  inputAltEdit: {flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#fff',
  margin: 15,
  height: 40,
  borderColor: '#61040f',
  borderWidth: 1,
  // padding: 5,
  width: '90%',
  backgroundColor: '#fff',
  color: '#424242'},
  
  inputAltInner: {
    // flex:1,
    // flexDirection: 'row',
    // justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#fff',
    // margin: 15,
    // height: 40,
    borderColor: '#61040f',
    // borderRightWidth: 1,
    // borderTopWidth: 1,
    // borderBottomWidth: 1,
    padding: 5,
    width: '90%',
    backgroundColor: '#1C00ff00',
    color: '#424242',
  },
   submitButton: {
      backgroundColor: '#800020',
      padding: 10,
      margin: 15,
      height: 40,
      width: '90%'
   },
   photoButton: {
    backgroundColor: 'blue',
    padding: 10,
    marginLeft: 20,
    marginVertical:10,
    // height: 40,
    width: '35%',
    // alignSelf: 'center',
 },
 closeButton: {
  backgroundColor: 'blue',
  padding: 10,
  marginLeft: 10,
  marginVertical:10,
  // alignSelf: 'flex-start'
  // height: 40,
  // width: '35%',
  // alignSelf: 'center',
},
 trashButton: {
  backgroundColor: 'red',
  padding: 10,
  marginLeft: 10,
  marginVertical:10,
  alignSelf: 'flex-start'
  // height: 40,
  // width: '35%',
  // alignSelf: 'center',
},
 utilityButton: {
  backgroundColor: '#800020',
  padding: 10,
  marginLeft: 20,
  height: 40,
  width: '45%',
  borderWidth: 1
},
utilityButton2: {
  backgroundColor: '#800020',
  padding: 10,
  // marginHorizontal: 20,
  height: 40,
  width: '45%',
  borderWidth: 1
},
   submitButtonText:{
      color: 'white',
      textAlign: 'center'
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
      width:"15%",
      // alignContent: 'center',
      // justifyContent: 'center',
      // paddingLeft: "5%",
      // marginLeft: 10
      
},
CheckBoxContainer: {
  // flex:1,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#fff',
  // margin: 15,
  // height: 40,
  borderColor: '#61040f',
  // borderWidth: 1,
  // padding: 5,
  // width: '90%',
  backgroundColor: '#fff',
  color: '#424242',
},
outline : {
  width: "80%",
  borderColor: 'grey',
  // borderBottomWidth: 1,
},
checkBoxActual: {
  width: "100%",
  borderColor: '#61040f',
  borderWidth: 1,
  justifyContent: 'center'
},
doneButton: {
  textAlign: 'center',
  backgroundColor: '#800020',
  padding: 10,
  marginHorizontal: 20,
  height: 40,
  width: '90%'
},
moreInfoButton: {
  // textAlign: 'center',
  backgroundColor: 'blue',
  padding: 10,
  marginRight: 10,
  marginBottom: 10,
  height: 40,
  // width: '95%'
},
moreInfoText:{
  color: 'white',
  textAlign: 'center'
},
tableView: {
  height: "100%", 
  width: "100%", 
  backgroundColor: 'white', 
  marginTop: StatusBar.currentHeight, 
  // alignItems: 'center', 
  paddingVertical: 20}

  });