import {passwordVerifier} from './validators'

export function emailHandler(email) {

    
  // if the last character of email is a space, remove it
  if (email[email.length - 1] === ' ') {
    email = email.substring(0, email.length - 1);
  }

  this.setState({
    email: email.toLowerCase(),
                  email_valid: emailVerifier(email),
                  email_warn: false})
  
  

}

export function passwordHandler(obj, password) { 
                          
    var passwordValidation = passwordVerifier(password)

    obj.setState({ 
        password_warn: false,
        pvalid8: passwordValidation[0],
        pvalidUpperLower: passwordValidation[1],
        pvalidNumbers: passwordValidation[2],
        password: password})
}