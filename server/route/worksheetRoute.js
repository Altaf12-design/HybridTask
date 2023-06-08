const express = require("express");
const {
  postQuestion,
  getAllQuestions,
  addQuestion,
  deleteQuestion,
  updateQuestion,
} = require("../controller/worksheetController");

const router = express.Router();

// Route to create a new worksheet
router.post("/addQuestion", postQuestion);

// Route to get all questions
router.get("/getAllQuestions", getAllQuestions);

// Route to add a question to a worksheet
router.post("/worksheet/:worksheetId/question", addQuestion);

// Route to delete a question from a worksheet
router.delete("/worksheet/question/:questionId", deleteQuestion);

// Route to update a question in a worksheet
router.put("/worksheet/:worksheetId/question/:questionId", updateQuestion);

module.exports = router;
