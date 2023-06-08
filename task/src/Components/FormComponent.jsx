import React from "react";

const FormComponent = ({ index, option, onOptionChange, onRemoveOption }) => {
  const handleOptionChange = (e) => {
    const value = e.target.value;
    onOptionChange(index, value);
  };

  const handleRemove = () => {
    onRemoveOption(index);
  };

  return (
    <div className="flex items-center mb-4">
      <input
        type="text"
        value={option}
        onChange={handleOptionChange}
        placeholder="Enter an option"
        className="bg-gray-200  text-gray-700  rounded-full py-2 px-4 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow"
      />
      <button
        onClick={handleRemove}
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
      >
        Remove
      </button>
    </div>
  );
};

export default FormComponent;
