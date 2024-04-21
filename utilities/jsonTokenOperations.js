const jwt = require("jsonwebtoken");
const jwtKey = process.env.JWT_KEY;


//  this module is used for handling the token generation for authentication
const token = ({ username, hashedPassword }) => {
  if (!(username, hashedPassword)) return; //converts the credentials into tokens
  else {
    return jwt.sign({ username, hashedPassword }, jwtKey); //returns the token 
  }
};

module.exports = token;
