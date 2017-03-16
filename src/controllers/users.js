import models from "../models";

const usersController = {};

usersController.getUser = function(req,res){
  const userInput = req.params.userInput;    
  models.User.find({
    $or: [
      { username: userInput },
      { email : userInput }
    ]
  }).then(foundUser => {
    if(foundUser.length > 0){
      res.status(200).json({
        exists: true
      });
    } else {
      res.status(404).json({
        exists: false
      });
    }
  });
};

export default usersController;
