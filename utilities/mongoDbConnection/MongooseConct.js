const mongoose = require("mongoose");


/*
 This module handle the connectivity of database using the special env key "mainly provided a connetion string to .env file"
*/


function MongodbConnection() {
  return mongoose
    .connect(process.env.MONGODB_CONNECTION_STRING)
    .then(() => {
      console.log("mongodb connected successfully....");
    })
    .catch((e) => {
      console.log(e)
    }); //check any error if any errors on db connection itwill console the error
}

module.exports = MongodbConnection;
