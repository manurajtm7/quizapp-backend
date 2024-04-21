const Scheduler = require("node-schedule");
const QuizSchema = require("../Schema/Quiz");

const getToIsoDate = () => {
  const currentDate = new Date();
  const ISTOffset = 5.5 * 60 * 60 * 1000;
  const formattedData = new Date(
    currentDate.getTime() + ISTOffset
  ).toISOString();

  return formattedData;
};
/*
This functions mainly used for getting the current date in ISO format 
current date contains the standard date so it is converted to the correct date formdatt
*/


// job scheduling is conducted for automated method that checks the activeness of the quizz question 
// it plays a major role for getting the results also for active quiz

const job = () => {
  Scheduler.scheduleJob("*/1 * * * *", async function () {
    const quizzesData = await QuizSchema.find({}); //finds all the documents  from the database 

    quizzesData.forEach(async (data, index) => { //looping through the documents from database and check condtions
      if (data.EndDate < getToIsoDate()) {
        // if the condition is true ie: the end date should be less than the current date (using getToIsoDate is a method for handling date)
        // if it is true then changes isActive property  false
        await QuizSchema.findByIdAndUpdate(
          { _id: data._id.toString() },
          { isActive: false },
          { new: true }
        );
      } else {
        // if it is false then changes isActive property true
        await QuizSchema.findByIdAndUpdate(
          { _id: data._id.toString() },
          { isActive: true },
          { new: true }
        );
      }
    });
  });
};

module.exports = job;
