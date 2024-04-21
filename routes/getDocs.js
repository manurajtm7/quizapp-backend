const route = require("express").Router();

route.get("/", (req, res) => {
  res.json({
    title: "Quizz application backend",
    description: "Backend for a quizz application. its an assignment",
  });
});

module.exports = route;
