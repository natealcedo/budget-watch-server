import bcrypt from "bcrypt";
import db from "../models";
import isEmpty from "lodash/isEmpty";
import validateAuthentication from "../validations/authentication";
import jwt from "jsonwebtoken";
import config from "../../config";

const authenticationController = {};

authenticationController.authentication = function(req,res){
  validateAuthentication(req.body).then(({ isValid, errors, user })=>{
    if(isValid){
      jwt.sign({
        username: user.username,
        email: user.email,
        userId: user._id
      }, config.jwtSecret, {
        expiresIn: "1h"
      }, (err, token)=>{
        if(err){
          throw err;
        } else {
          res.status(200).json({
            sucess: true,
            jwt: token
          });
        }
      });
    } else {
      res.status(401).json({
        errors
      });
    }
  });
};

export default authenticationController;
