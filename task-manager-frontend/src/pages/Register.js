import React, { useState } from 'react';
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
import { useTheme } from '@emotion/react';

const Register = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any of the fields are empty
    if (!formData.username || !formData.email || !formData.password) {
      setSnackbarMessage('All fields are required.');
      setSnackbarOpen(true);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', formData);
      setSnackbarMessage(response.data.message);
      setSnackbarOpen(true);
      navigate('/tasks');
    } catch (error) {
      console.error('Error registering user:', error);
      setSnackbarMessage('Registration failed!');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

const url =''
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
              alignItems: 'flex-start',
              justifyContent: 'center',
            }}
          >
            <Box>
              <img
                alt="Task Mnager Logo"
                src="/"
                style={{ height: 52, marginBottom: 16, cursor: 'pointer' }}
                onClick={() => navigate('/')}
              />
              <Typography
                component="h1"
                variant="h4"
                color={theme.palette.primary.main}
              >
                Register
              </Typography>
              <Typography component="p" variant="h6" color="black">
                Create your own tasks.
              </Typography>
            </Box>
          </Grid>

          {/* Registration Form Container */}
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
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  value={formData.username}
                  onChange={handleChange}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Email Address"
                  name="email"
                  autoComplete="email"
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
                  Register
                </Button>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body1" color="textSecondary" align="center">
                    Already have an account?{' '}
                    <Link
                      to="/login"
                      style={{
                        textDecoration: 'none',
                        color: theme.palette.secondary.main,
                      }}
                    >
                      Sign in
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
        <Alert onClose={handleSnackbarClose} severity="warning" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Register;
