const express = require("express");
const cors = require("cors");
const cookiParser = require("cookie-parser");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookiParser());

//utility import here
const MongodbConnection = require("./utilities/mongoDbConnection/MongooseConct"); //mongodb connction here using function from exported module
const JobSchedule = require("./Job-Scheduling/ChecksIsActive"); //used for scheduling the jobs each 5 minutes delay function renders
//utility import ends  here

//! mongoose connection
MongodbConnection(); //connection established here for mongodb
//! mongoose connection  ends

//? checks the active quizz by a cron job using node-schedule starts
JobSchedule(); 
//? checks the active quizz by a cron job using node-schedule ends

// routes import section starts
const getDocRoute = require("./routes/getDocs");
const RegisterationRoute = require("./routes/Register");
const LoginRoute = require("./routes/Login");
const QuizzesRoute = require("./routes/Quizzes");
const AllQuizzes = require("./routes/AllQuizzes");
const ActiveQuizzes = require("./routes/ActiveQuiz");
const ResultsRoute = require("./routes/Results");
// route import section ends





// use routes starts here
app.use("/", getDocRoute); //? documentation route
app.use("/register", RegisterationRoute); //? registration route
app.use("/login", LoginRoute); //? Login route
app.use("/quizzes", QuizzesRoute); //?Create quizzes route
app.use("/quizzes/all", AllQuizzes); //?get all quizzes route
app.use("/quizzes/active", ActiveQuizzes); //?get all active  quizzes route
app.use(ResultsRoute); //?get the result quizzes, route
// use routes ends here

const port = 5000 || process.env.PORT; //! port number on localhost
app.listen(port, (err) => {
  if (err) {
    console.error(err);
  }
  console.log("Server started successfully on port " + port);
});
