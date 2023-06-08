import React from "react";
import {
  useDeleteQuestionMutation,
  useGetQuestionsQuery,
} from "../../GlobalState/WorkSheetSlice";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Detail = () => {
  const {
    data: questions,
    error,
    isLoading,
    isSuccess,
  } = useGetQuestionsQuery();
  const [deleteQuestion] = useDeleteQuestionMutation();
  console.log(questions);
  const navigate = useNavigate();
  const handleEditQuestion = (question) => {
    console.log("Edit question:", question);
  };

  const handleDeleteQuestion = async (questionId) => {
    try {
      if (!questionId) {
        console.error("Question ID is missing");
        return;
      }
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover this imaginary file!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel",
        reverseButtons: true,
      });

      if (result.isConfirmed) {
        await deleteQuestion({ questionId: String(questionId) });
        Swal.fire(
          "Deleted!",
          "Your imaginary file has been deleted.",
          "success"
        );
        console.log("Question deleted:", questionId);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your imaginary file is safe :)", "error");
      }
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching questions: {error.message}</div>;
  }

  return (
    <div>
      <div>
        <p
          className="text-xl font-extrabold p-5 cursor-pointer hover:text-gray-600"
          onClick={() => navigate("/")}
        >
          Click ME ! Go Back to Home
        </p>
      </div>
      {questions?.map((questionGroup, index) =>
        questionGroup.questions.map((question, questionIndex) => {
          const key = `${questionGroup._id}_${questionIndex}`;
          return (
            <div className="p-4 border border-gray-300 rounded mb-4" key={key}>
              <div className="flex flex-col md:flex-row items-center mb-2">
                <h2 className="text-sm font-bold md:mr-4">
                  Question {index + 1}:
                </h2>
                <div>
                  <p className="text-lg font-serif font-extrabold">
                    {question.question}
                  </p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:flex-1">
                  <div className="ml-3 md:ml-0 md:flex justify-evenly">
                    {question.options.map((option, optionIndex) => (
                      <li key={`${key}_${optionIndex}`}>{option}</li>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col md:flex-row justify-end mt-2 md:mt-0">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-2 md:mb-0 md:mr-2"
                    onClick={() => handleEditQuestion(question)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleDeleteQuestion(questionGroup._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Detail;
