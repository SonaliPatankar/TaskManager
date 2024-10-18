import React, { useEffect } from 'react';
import { Container, Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import bg1 from '../assets/bg1.jpg';

const AboutUs = () => {
  const theme = useTheme(); // This will allow you to use your theme's styles if needed

  useEffect(() => {
    // Prevent scrolling when this component is mounted
    document.body.style.overflow = 'hidden';

    return () => {
      // Reset the overflow style when the component is unmounted
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <Container
      maxWidth="md"
      sx={{
        height: '100vh', 
        mt: 6, 
        pt: 10, 
        pb: 10,
        backgroundImage: `url(${bg1})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '10px',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)', 
          borderRadius: '10px',
          zIndex: 0,
        },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
      }}
    >
      <Typography variant="h3" gutterBottom sx={{ zIndex: 1, color: theme.palette.common.white }}>
        About Us
      </Typography>
      <Box mt={2}>
        <Typography variant="h5" paragraph sx={{ zIndex: 1, color: theme.palette.common.white }}>
          Welcome to our task management app! Our mission is to help you stay organized, manage your tasks efficiently, and boost productivity.
        </Typography>
        <Typography variant="h5" paragraph sx={{ zIndex: 1, color: theme.palette.common.white }}>
          Our team is dedicated to providing you with the best tools to streamline your work process. Whether you're working on a personal project or collaborating with a team, our app is designed to meet your needs.
        </Typography>
        <Typography variant="h5" paragraph sx={{ zIndex: 1, color: theme.palette.common.white }}>
          Thank you for choosing our platform, and we look forward to helping you achieve your goals!
        </Typography>
      </Box>
    </Container>
  );
};

export default AboutUs;
