import React, { useState } from "react";
import QuestionWidget from "../Components/QuestionWidget";
import PreviewComponent from "../Components/PreviewComponent";
import Swal from "sweetalert2";
import {
  useAddQuestionMutation,
  useDeleteQuestionMutation,
} from "../../GlobalState/WorkSheetSlice";
import { useNavigate } from "react-router-dom";

const IndexPage = () => {
  const [questions, setQuestions] = useState([]);
  const [worksheetId, setWorksheetId] = useState(null);
  const [addQuestionMutation] = useAddQuestionMutation();
  const navigate = useNavigate();
  const dataPostSuccess = () => {
    Swal.fire("Submitted..!", "You clicked the button!", "success");
  };

  const handleQuestionChange = (index, newQuestion) => {
    const newQuestions = [...questions];
    newQuestions[index] = {
      question: newQuestion,
      options: newQuestions[index]?.options || [],
    };
    setQuestions(newQuestions);
  };

  const handleOptionsChange = (index, newOptions) => {
    const newQuestions = [...questions];
    newQuestions[index].options = newOptions;
    setQuestions(newQuestions);
  };

  const handleSaveWorksheet = async () => {
    try {
      const { data } = await addQuestionMutation({ questions });
      if (data && data.worksheetId) {
        const { worksheetId } = data;
        setWorksheetId(worksheetId);
        dataPostSuccess();
      } else {
        console.error("Invalid response data:", data);
      }
    } catch (error) {
      console.error("Error saving worksheet:", error);
    }
  };

  return (
    <>
      <div className="text-3xl font-extrabold p-2 md:p-8">
        <p
          onClick={() => navigate("/detail")}
          className="hover:text-purple-500 cursor-pointer"
        >
          Click me! View History And Detail
        </p>
      </div>
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
        <div className="w-full md:w-1/2 bg-white p-4 md:p-8">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-red-500">Questions</h2>
            {questions.map((question, index) => (
              <QuestionWidget
                key={index}
                question={question.question}
                options={question.options}
                onQuestionChange={(newQuestion) =>
                  handleQuestionChange(index, newQuestion)
                }
                onOptionsChange={(newOptions) =>
                  handleOptionsChange(index, newOptions)
                }
              />
            ))}
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              onClick={() =>
                setQuestions([...questions, { question: "", options: [] }])
              }
            >
              Add Question
            </button>
          </div>
        </div>
        <div className="w-full md:w-1/2 bg-gray-200 p-4 md:p-8">
          <div className="space-y-6">
            <PreviewComponent questions={questions} />
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
              onClick={handleSaveWorksheet}
            >
              Save Worksheet
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default IndexPage;
