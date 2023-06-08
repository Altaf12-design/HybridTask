import React from "react";

const PreviewComponent = ({ questions }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Preview:</h2>
      {questions.map((question, index) => (
        <div key={index} className="mb-6">
          <h3 className="text-lg font-bold mb-2">Question {index + 1}:</h3>
          <p className="mb-2 text-lg font-serif">{question?.question}</p>
          <ul className="list-disc list-inside ml-8">
            {question?.options?.map((option, optionIndex) => (
              <li key={optionIndex} className="mb-2 sm:inline-block sm:mr-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name={`question_${index}`}
                    value={option}
                    className="mr-2"
                  />
                  {option}
                </label>
              </li>
            ))}
            {question.options.length === 0 && (
              <li className="mb-2 sm:inline-block sm:mr-2">Add options...</li>
            )}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PreviewComponent;
