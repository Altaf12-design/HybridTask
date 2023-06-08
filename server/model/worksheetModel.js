const mongoose = require("mongoose");

const worksheetSchema = new mongoose.Schema({
  questions: [
    {
      question: { type: String, required: true },
      options: [{ type: String }],
    },
  ],
});

module.exports = mongoose.model("Worksheet", worksheetSchema);
