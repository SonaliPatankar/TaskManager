import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  Snackbar,
  Alert,
  Box,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { login, setError } from '../redux/slices/userSlice'; // Import your actions
import task_logo from '../assets/task_logo.png';

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setSnackbarMessage('Email and Password are required');
      setSnackbarOpen(true);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      localStorage.setItem('token', response.data.token);
      setSnackbarMessage('Login successful!');
      setSnackbarOpen(true);
      dispatch(login(response.data.user));
      navigate('/tasks');
    } catch (error) {
      console.error('Error logging in:', error);
      setSnackbarMessage('Login failed!');
      dispatch(setError('Login failed! Please check your credentials.'));
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

const url = ''
  const bgImageStyle = {
    backgroundImage: `url(${url})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <Box sx={bgImageStyle}>
      <Container component="main" maxWidth="md">
        <Grid
          container
          spacing={2}
          sx={{
            backgroundColor: theme.palette.background.paper,
            borderRadius: 1,
            boxShadow: 3,
            padding: '26px',
            opacity: 0.95,
          }}
        >
          {/* Image and Heading Container */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'left',
              justifyContent: 'start',
            }}
          >
            <Box>
              <img
                alt="Task Manager"
                src={task_logo}
                style={{ height: 52, marginBottom: 16, cursor: 'pointer' }}
              />
              <Typography
                component="h1"
                variant="h4"
                color={theme.palette.primary.main}
              >
                Sign in
              </Typography>
              <Typography component="p" variant="h6" color="black">
                to continue to task management.
              </Typography>
            </Box>
          </Grid>

          {/* Login Form Container */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'center',
                height: '100%',
              }}
            >
              <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={formData.email}
                  onChange={handleChange}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign in
                </Button>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body1" color="textSecondary" align="center">
                    Don’t have an account?{' '}
                    <Link
                      to="/register"
                      color="secondary"
                      style={{
                        textDecoration: 'none',
                        color: theme.palette.secondary.main,
                      }}
                    >
                      Create account
                    </Link>
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="info" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;
