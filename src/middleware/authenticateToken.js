import jwt from "jsonwebtoken";
import models from "../models";

export default function authenticateToken(req, res, next){
  const authorizationHeader = req.headers["authorization"];
  let token;

  if(authorizationHeader){
    token = authorizationHeader.split(" ")[1];
  }

  if(token){
    jwt.verify(token, process.env.JWT, (err, decodedToken)=>{
      if(err){
        res.status(401).json({
          error: "Failed to authenticate"
        });
      } else {
        models.User.find({ _id: decodedToken.userId }).then(foundUser => {
          if(!foundUser){
            res.status(404).json({
              error: "user not found"
            });
          } else {
            foundUser = foundUser[0];
            const user = {
              userId: foundUser._id,
              email: foundUser.email,
              username: foundUser.username
            };
            req.user = user;
            next();
          }
        }).catch(err => {
          res.status(500).json({
            error: err
          });
        });
      }
    });
  } else {
    res.status(403).json({
      error: "No token found"
    });
  }
}
