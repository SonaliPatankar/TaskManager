import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: !!localStorage.getItem('token'), // Check if token exists in localStorage
  user: null, // Optionally, store user details
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload; // Assuming payload contains user data
      state.error = null; // Reset error
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null; // Clear user data
      localStorage.removeItem('token'); // Clear token from local storage
    },
    setError(state, action) {
      state.error = action.payload; // Set error message
    },
    clearError(state) {
      state.error = null; // Clear error message
    },
  },
});

// Export actions
export const { login, logout, setError, clearError } = userSlice.actions;

// Export reducer
export default userSlice.reducer;
