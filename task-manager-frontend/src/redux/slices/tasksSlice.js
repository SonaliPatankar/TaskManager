// src/features/tasksSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (token) => {
  const response = await axios.get('http://localhost:5000/api/tasks', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
});

export const createTask = createAsyncThunk('tasks/createTask', async ({ token, task }) => {
  const response = await axios.post('http://localhost:5000/api/tasks/create', task, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
});

export const updateTask = createAsyncThunk('tasks/updateTask', async ({ token, task }) => {
  const response = await axios.put(`http://localhost:5000/api/tasks/update/${task._id}`, task, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async ({ token, taskId }) => {
  await axios.delete(`http://localhost:5000/api/tasks/delete/${taskId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return taskId;
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex((task) => task._id === action.payload._id);
        state.tasks[index] = action.payload;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex((task) => task._id === action.payload);
        if (index !== -1) {
          state.tasks.splice(index, 1);
        }
      });
  },
});

export default tasksSlice.reducer;
