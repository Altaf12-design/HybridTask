const worksheetModel = require("../model/worksheetModel");

exports.postQuestion = async (req, res) => {
  try {
    const { questions } = req.body;
    const worksheet = new worksheetModel({ questions });
    await worksheet.save();
    res.json({ worksheetId: worksheet._id });
  } catch (error) {
    console.error("Error saving worksheet:", error);
    res.status(500).json({ error: "Error saving worksheet" });
  }
};

exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await worksheetModel.find();
    res.json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ error: "Error fetching questions" });
  }
};

exports.addQuestion = async (req, res) => {
  try {
    const { worksheetId } = req.params;
    const { question } = req.body;

    const worksheet = await worksheetModel.findById(worksheetId);
    if (!worksheet) {
      return res.status(404).json({ error: "Worksheet not found" });
    }

    worksheet.questions.push(question);
    await worksheet.save();

    res.json(worksheet);
  } catch (error) {
    console.error("Error adding question:", error);
    res.status(500).json({ error: "Error adding question" });
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    const { questionId } = req.params;
    console.log(req.params);

    const result = await worksheetModel.findByIdAndDelete(questionId);
    console.log(result);
    if (!result) {
      return res.status(404).json({ error: "Question not found" });
    }

    res.json({ success: true });
  } catch (error) {
    console.error("Error deleting question:", error);
    res.status(500).json({ error: "Error deleting question" });
  }
};

exports.updateQuestion = async (req, res) => {
  try {
    const { worksheetId, questionId } = req.params;
    const { newQuestion } = req.body;

    const worksheet = await worksheetModel.findById(worksheetId);
    if (!worksheet) {
      return res.status(404).json({ error: "Worksheet not found" });
    }

    const question = worksheet.questions.id(questionId);
    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    question.text = newQuestion;
    await worksheet.save();

    res.json(worksheet);
  } catch (error) {
    console.error("Error updating question:", error);
    res.status(500).json({ error: "Error updating question" });
  }
};
