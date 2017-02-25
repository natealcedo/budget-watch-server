import bcrypt from 'bcrypt';
import db from '../models';
import isEmpty from 'lodash/isEmpty';
import validator from 'validator';

import validateInput from '../validations/signup';

const signupController = {};


signupController.post = function(req,res){
    validateInput(req.body).then(({errors, isValid})=>{
        const { username, password, email } = req.body;
        if(isValid){
            bcrypt.hash(password, 10, (err, password_digest)=>{
                if(err){
                    throw err;
                }
                const user = new db.User({
                    username,
                    email,
                    password_digest
                });
                user.save().then(newUser =>{
                    res.status(201).json({
                        sucess: true,
                        user: newUser
                    });
                }).catch(err =>{
                    res.status(500).json({error: err});
                });
            }); 
        } else {
            res.json({ errors });
        }
    }).catch(err => {
        res.status(500).json({error: err});
    });
};

export default signupController;
