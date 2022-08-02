import {emailVerifier, passwordVerifier, nameVerifier, phoneNumberVerifier} from './validators'

export function passwordHandler(obj, password) { 
                          
    var passwordValidation = passwordVerifier(password)

    obj.setState({ 
        password_warn: false,
        pvalid8: passwordValidation[0],
        pvalidUpperLower: passwordValidation[1],
        pvalidNumbers: passwordValidation[2],
        password: password})
      }