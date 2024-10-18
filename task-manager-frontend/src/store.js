import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./redux/slices/tasksSlice";

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

export default store;
