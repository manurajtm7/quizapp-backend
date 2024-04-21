const route = require("express").Router();
const { comparePassword } = require("../utilities/hashedPassword");
const generateToken = require("../utilities/jsonTokenOperations");

// user schema import here
const UserSchema = require("../Schema/User");

route.post("/", async (req, res) => {
  const { username, password } = req.body;
  //   if there is no username and password the return null
  if (!(username, password)) return;
  // using the  bcrypt compare the plain password from the client and hashed passsword from the database according to the username
  try {
    // from the database fetch the user detail according to the unique user name
    const response = await UserSchema.findOne({ username });
    // by using bcrypt js compare the plain password from the client and hashed password from the database
    const isValid = await comparePassword(password, response.hashedPassword);
    // the variable check user is valid or not , it return true or false

    if (isValid) {
      // when the isValid method gives true value then creates a token and saves to client cookies also give json message
      const token = generateToken({
        username,
        hashedPassword: response.hashedPassword,
      });
      //  send token and cookies here
      res
        .cookie("token", token, { maxAge: 900000, httpOnly: true })
        .json({ header: "successfully user logged in", message: token })
        .status(200);
    } else throw new Error("not a valid user");
  } catch (err) {
    // for error handling check any errors if any catche the errors
    if (err) {
      console.log(err);
      //if any errors then it will return the error and send a json error message to the client
      // sends error response to client
      res
        .json({
          header: "Un authorized user",
          message: "User credentails are not valid check the credentials",
        })
        .status(401);
    }
  }
});

module.exports = route;
