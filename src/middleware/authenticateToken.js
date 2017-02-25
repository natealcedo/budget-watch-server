import jwt from 'jsonwebtoken';
import config from '../../config';
import models from '../models';

export default function authenticateToken(req, res, next){
    const authorizationHeader = req.headers['authorization'];
    let token;

    if(authorizationHeader){
        token = authorizationHeader.split(' ')[1];
    }

    if(token){
        jwt.verify(token, config.jwtSecret, (err, decodedToken)=>{
            if(err){
                res.status(401).json({
                    error: 'Failed to authenticate'
                });
            } else {
                console.log(decodedToken);
                models.User.find({ _id: decodedToken.id}).then(user =>{
                    if(!user){
                        res.status(404).json({
                            error: 'No such user'
                        });
                    } else {
                        const user = {
                            userId: user._id,
                            email: user.email,
                            username: user.username
                        };
                        req.user = user;
                        next();
                    }
                }).catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });
            }
        });
    } else {
        res.status(403).json({
            error: 'No token found'
        });
    }
}
