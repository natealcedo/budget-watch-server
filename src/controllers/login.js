import db from '../models';
import bcrypt from 'bcrypt';
import validateLogin from '../validations/login';
import isEmpty from 'lodash/isEmpty';
const loginController = {};

loginController.login = function(req,res){
    validateLogin(req.body).then(({isValid, errors})=>{
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

export default loginController;
