import bcrypt from 'bcrypt';
import db from '../models';
import isEmpty from 'lodash/isEmpty';
import validateLogin from '../validations/login';

const authenticationController = {};

authenticationController.authentication = function(req,res){
    validateLogin(req.body).then(({ isValid, errors })=>{
        if(isValid){
            res.status(200).json({
                sucess: true,
                jwtToken: 'here is your token!'
            });
        } else {
            res.status(401).json({
                errors
            });
        }
    });
};

export default authenticationController;
