// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./slices/tasksSlice"; // Import your tasks slice reducer
import userReducer from "./slices/userSlice"
const store = configureStore({
  reducer: {
    tasks: tasksReducer, // Add the tasks slice reducer to the store
    user: userReducer,
  },
});

export default store;
