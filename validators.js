import {lowerCaseLetters, upperCaseLetters, numbers} from './constants' 



export function emailVerifier(value) {

  

    if (value.match(lowerCaseLetters) && value.match("@") &&  value.match(/\./)) {

        return true
      } else {
        return false
      }

}

export function passwordVerifier(value){

  returnArray = [false, false, false]

    if (value.length >= 8) {
    
      returnArray[0] = true
    } 

    if (value.match(upperCaseLetters) && value.match(lowerCaseLetters)) {
    
      returnArray[1] = true
    } 

    if (value.match(numbers)) {
    
      returnArray[2] = true
    } 
  
    return returnArray
    
  
  }

  export function nameVerifier(value) {

    if (value.match(lowerCaseLetters) || value.match(upperCaseLetters) && value.length >= 1) {
      return true
    } else {
      return false
    }
  
  }

  export function phoneNumberVerifier(value) {

    if (value.length === 11 && !isNaN(value)) {
      return true
    } else {
      return false
    }
    
  }