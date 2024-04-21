const jwt = require("jsonwebtoken");

const jwtKey = process.env.JWT_KEY;


// it is middleware that plays a major role in authentication of the users crendentials
//this module is used for verification of the token if verification is success then return the user details such as usernames etc

const jwtSignCredentials = (req, res, next) => {
  const token = req.cookies?.token; //takes the token from request cookies
  if (!token) return;
  const verification = jwt.verify(token, jwtKey); //verifies the token  
  if (!!verification) {
    res.locals.value = verification; //set to the local variable for access for callback method 
    next(); //only for success it will goes for next method or the main callback method of request route
  }
};

module.exports = jwtSignCredentials;
