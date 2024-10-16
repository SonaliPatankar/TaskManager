import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/userSlice';

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Remove the token from local storage
    localStorage.removeItem('token');
    dispatch(logout()); // Dispatch logout action
    navigate('/login');
  }, [dispatch,navigate]);

  return (
    <div>
      <h2>Logging out...</h2>
      {/* Optionally, you can display a loading indicator or a message */}
    </div>
  );
};

export default Logout;
