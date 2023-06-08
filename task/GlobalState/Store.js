import { configureStore } from "@reduxjs/toolkit";
import { worksheetSlice } from "./WorkSheetSlice";

export const store = configureStore({
  reducer: {
    [worksheetSlice.reducerPath]: worksheetSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(worksheetSlice.middleware),

  devTools: true,
});
