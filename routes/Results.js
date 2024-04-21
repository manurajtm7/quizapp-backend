const route = require("express").Router();
const jwtMiddleWare = require("../Middlewares/JwtSign");
const QuizModel = require("../Schema/Quiz");

route.get("/qizzes/:id/result", jwtMiddleWare, async (req, res) => {
  const userInformation = res.locals.value; //if any user log or user accessments then we can use this userInformations
  const quizId = req.params.id.split(":")[1]; //get the quiz id from the url and split to get correct quiz id

  try {
    const response = await QuizModel.find(
      { _id: quizId },
      { $eq: { isActive: false } }
    ); //fetch the quiz that according to the quizz id and also check the activeness
    if (!response) throw new Error("No quizzes found"); //handle error here when quiz not found
    res.json({
      header: "Result of quiz", //send response with the answer of the quizz
      message: response,
    });
  } catch (err) {
    //if any errors then it will return the error and send a json error message to the client
    res
      .json({
        header: "No quizzes found",
        message:
          "something went wrong to get the result (please check later / after publish) or server or db  ",
      })
      .status(400);
  }
});

module.exports = route;
