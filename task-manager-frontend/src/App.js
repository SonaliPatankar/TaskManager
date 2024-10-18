import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Tasks from './pages/Tasks';
import Header from './pages/Header';
import Logout from './pages/Logout';
import TaskDetails from './pages/TaskDetails';
import PrivateRoute from './viewer/PrivateRoute';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Footer from './pages/Footer';

const App = () => {
  const location = useLocation();
  const showHeader = !["/login", "/register"].includes(location.pathname); 

  return (
    <>
      {showHeader && <Header />}
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/tasks/:id" element={<PrivateRoute element={<TaskDetails />} />}/> {/* Route for task details */}
        <Route path="/tasks" element={<PrivateRoute element={<Tasks />} />} /> {/* Protect Tasks route */}
      </Routes>
      <Footer/>
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
