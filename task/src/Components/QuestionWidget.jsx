import React from "react";
import OptionsComponent from "./OptionsComponent";

const QuestionWidget = ({
  question,
  options,
  onQuestionChange,
  onOptionsChange,
}) => {
  const handleQuestionChange = (e) => {
    const newQuestion = e.target.value;
    onQuestionChange(newQuestion);
  };

  return (
    <div>
      <textarea
        value={question}
        onChange={handleQuestionChange}
        placeholder="Enter your question"
        className="w-[70%] p-1 border border-spacing-20 mb-10"
      />
      <OptionsComponent options={options} onOptionsChange={onOptionsChange} />
    </div>
  );
};

export default QuestionWidget;
