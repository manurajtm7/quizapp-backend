const mongoose = require("mongoose");

const UserCredentailSchema = new mongoose.Schema({
  username: { type: String, require: true, min: 4, unique: true },
  hashedPassword: { type: String, require: true, min: 6 },
  quizzes: [{ type: mongoose.Schema.ObjectId, ref: "quiz-information" }],
});

const UserCredentailModel = mongoose.model(
  "userCredential",
  UserCredentailSchema
);

module.exports = UserCredentailModel;
