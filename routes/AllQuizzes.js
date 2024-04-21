const route = require("express").Router();
const QuizzesSchema = require("../Schema/Quiz");
const jwtMiddlware = require("../Middlewares/JwtSign");

route.get("/", jwtMiddlware, async (req, res) => {
  try {
    const response = await QuizzesSchema.find({}).select({ Answer: 0 }); //get all documents from database 
    if (!response) throw new Error("Couldn't find quizzes"); //if the quizzes didn't get then respond with some errors

    res //else respond with 200 status code and a message
      .json({
        header: "All Quizzes",
        message: response, //all documents are send to client excluding the anwers
      })
      .status(200);
  } catch (err) {
    if (err) {
      //if any errors then it will return the error and send a json error message to the client
      //error handling for all quizzes
      res
        .json({
          header: "Error on gathering quizzes",
          message: "something went wrong to the server or db",
        })
        .status(400);
    }
  }
});

module.exports = route;
