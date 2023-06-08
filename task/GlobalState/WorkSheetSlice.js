import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const worksheetSlice = createApi({
  reducerPath: "worksheetSlice",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/" }),
  endpoints: (builder) => ({
    addQuestion: builder.mutation({
      query: (question) => ({
        url: "/api/addQuestion",
        method: "POST",
        body: question,
      }),
    }),
    deleteQuestion: builder.mutation({
      query: ({ questionId }) => ({
        url: `api/worksheet/question/${questionId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Worksheet"],
    }),
    updateQuestion: builder.mutation({
      query: ({ worksheetId, questionId, newQuestion }) => ({
        url: `/api/worksheet/${worksheetId}/question/${questionId}`,
        method: "PUT",
        body: { question: newQuestion },
      }),
      invalidatesTags: ["Worksheet"],
    }),
    getQuestions: builder.query({
      query: () => "/api/getAllQuestions",
      providesTags: ["Worksheet"],
    }),
  }),
});

export const {
  useAddQuestionMutation,
  useDeleteQuestionMutation,
  useUpdateQuestionMutation,
  useGetQuestionsQuery,
} = worksheetSlice;
