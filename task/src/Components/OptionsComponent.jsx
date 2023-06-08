import React from "react";
import FormComponent from "./FormComponent";

const OptionsComponent = ({ options, onOptionsChange }) => {
  const handleAddOption = () => {
    const newOptions = [...options, ""];
    onOptionsChange(newOptions);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    onOptionsChange(newOptions);
  };

  const handleRemoveOption = (index) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    onOptionsChange(newOptions);
  };

  return (
    <div>
      {options.map((option, index) => (
        <FormComponent
          key={index}
          index={index}
          option={option}
          onOptionChange={handleOptionChange}
          onRemoveOption={handleRemoveOption}
        />
      ))}
      <button
        className="bg-gray-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        onClick={handleAddOption}
      >
        Add Option
      </button>
    </div>
  );
};

export default OptionsComponent;
