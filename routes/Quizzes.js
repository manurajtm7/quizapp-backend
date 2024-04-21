const route = require("express").Router();
const jwtMiddleware = require("../Middlewares/JwtSign");
const QuizSchema = require("../Schema/Quiz");
const UsersSchema = require("../Schema/User");

route.post("/", jwtMiddleware, (req, res) => {
  // At first check the user is exist or not using the middleware ie: jwtMiddlware after that following mehtod are handled

  const userInformations = res.locals.value; //takes the value from the middleware to access the UserInformation that verified by the jwt
  const { Question, Options, Answer, StartDate, EndDate } = req.body;

  // receives the quiz informations from the user or  client

  try {
    if (!(Question, Options, Answer, StartDate, EndDate))
      throw new Error("something is wrong"); // if not informations about quiz  then throws an error

    //if the informations are filled then a new doucment is generated to the mongodb according to the quiz details provided
    QuizSchema.create({ Question, Options, Answer, StartDate, EndDate }).then(
      async (result) => {
        if (!result) throw new Error("something is wrong");

        // check the result from the quiz schema and if result gets then 
        const Quiz_Id = result._id.toString();
        const responseFromUserModel = await UsersSchema.findOneAndUpdate(
          { username: userInformations?.username },
          { $push: { quizzes: Quiz_Id } }
        ); // if the user founds then the quiz id from quiz model is added to the uses quizzes array or list

        if (!responseFromUserModel) //if the response from the user model didn't gets then throws an error 
          throw new Error("unable update users quiz array");
        res //else respond with 200 status code and a message quizz added successfully...
          .json({
            header: "Quiz question added",
            message: "Successfully added to quiz information to the database",
          })
          .status(200);
      }
    );
  } catch (err) {
    //error handling if any error the respond error to the client
    console.error(err);
    res
      .json({
        header: "Quiz question error",
        message:
          "Something went wrong to the database/connection to add  quiz information to the database " +
          err,
      })
      .status(400);
  }
});

module.exports = route;
