const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema({
  Question: { type: String, require: true },
  Options: [{ type: String, require: true }],
  Answer: { type: Number, require: true },
  StartDate: { type: String, require: true },
  EndDate: { type: String, require: true },
  isActive: { type: Boolean , default : true },
});

const QuizModel = mongoose.model("quiz-information", QuizSchema);

module.exports = QuizModel;
