import validator from "validator";
import db from "../models";
import isEmpty from "lodash/isEmpty";
import bcrypt from "bcrypt";

function validateAuthentication(data){
  const {  userInput, password } = data;
  const errors = {};
  if(validator.isEmpty(userInput)){
    errors.userInput = "username is required";
  }
  if(validator.isEmpty(password)){
    errors.password = "password is required";
  }
  return db.User.find({ 
    $or:[{ username: userInput }, { email: userInput }] 
  }).then(existingUser =>{
    if(existingUser.length > 0){
      // User exists, check if password matches hash
      const user = existingUser[0];
      return bcrypt.compare(password, user.password_digest).then(valid =>{
        if(!valid){
          errors.password = "invalid password";
        }
        if(validator.isEmpty(password)){
          errors.password = "password is required";
        }
        return {
          isValid: isEmpty(errors),
          user,
          errors
        };
      });
    } else {
      if(validator.isEmpty(userInput) || validator.isEmpty(password)){
        return {
          isValid: isEmpty(errors),
          errors
        };
      } else {
        errors.userInput = "username or email does not exist";
        return {
          isValid: isEmpty(errors),
          errors
        };
      }
    }
  });
}

export default validateAuthentication;
