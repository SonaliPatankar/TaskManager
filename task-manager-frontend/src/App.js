import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Tasks from './pages/Tasks';
import Header from './pages/Header';
import Logout from './pages/Logout';
import TaskDetails from './pages/TaskDetails';
import PrivateRoute from './viewer/PrivateRoute';
const App = () => {
  const location = useLocation();
  const showHeader = !["/login", "/register"].includes(location.pathname); // Fixed to include the correct path

  return (
    <>
      {showHeader && <Header />}
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/tasks/:taskId" element={<PrivateRoute element={<TaskDetails />} />}/> {/* Route for task details */}
        <Route path="/tasks" element={<PrivateRoute element={<Tasks />} />} /> {/* Protect Tasks route */}
      </Routes>
    </>
  );
};

const AppWithRouter = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWithRouter;
