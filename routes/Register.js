const route = require("express").Router();
const generateToken = require("../utilities/jsonTokenOperations"); //used for generate the token
const { hashPassword } = require("../utilities/hashedPassword"); //used hashing the credentials

// mongoose connection here
//  MongodbConnectionMethod()
// mongoose  connection ends here

// schema import here
const RegisterUserSchema = require("../Schema/User");
// schema import here

// This route is used for creating accounts or resgistering the users

route.post("/", async (req, res) => {
  const { username, password } = req.body;
  try {
    //   takes the password and hash the password using bycrypt js
    const hashedPassword = await hashPassword(password);

    // method handles the storing data on mongodb
    await RegisterUserSchema.create({ username, hashedPassword });

    // this method will generates some token according to the username credentials
    const token = generateToken({ username, hashedPassword });

    // after the token generation the token will send to client also set cookies.
    // token will expires  after 15 minutes
    if (token) {
      res
        .cookie("token", token, { maxAge: 900000, httpOnly: true })
        .json({ header: "successfully user registered", message: token })
        .status(200);
    }
  } catch (e) {
    console.log(e);
    if (e) {
      //if any errors then it will return the error and send a json error message to the client
      res
        .json({
          header: "Something wrong went to generate token",
          message:
            "error on token generation or an internal server error happened",
        })
        .status(400);
    }
  }
});

module.exports = route;
