import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Snackbar, Alert, Paper } from '@mui/material';

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h3" gutterBottom align="center">
        Contact Us
      </Typography>
      <Paper elevation={3} sx={{ padding: 4, borderRadius: '8px' }}>
        <Box mt={2}>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Your Name"
              name="name"
              variant="outlined"
              margin="normal"
              required
              value={formData.name}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Your Email"
              name="email"
              variant="outlined"
              margin="normal"
              required
              type="email"
              value={formData.email}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Your Message"
              name="message"
              variant="outlined"
              margin="normal"
              required
              multiline
              rows={4}
              value={formData.message}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <Button 
              variant="contained" 
              color="primary" 
              type="submit" 
              sx={{ mt: 2, padding: '10px 20px', '&:hover': { backgroundColor: '#003d7a' }}}
            >
              Send Message
            </Button>
          </form>
        </Box>
      </Paper>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Thank you for contacting us! We'll get back to you soon.
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ContactUs;
