// src/components/NotFound.js
import React from 'react';
import { Button } from '@mui/joy';
import { Link } from 'react-router-dom';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';

const NotFound = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center' }}>
      <Typography level="h1" sx={{ fontFamily: 'League Spartan, sans-serif', marginBottom: 2 }}>
        404 - Page Not Found
      </Typography>
      <Typography level="h5" sx={{ fontFamily: 'League Spartan, sans-serif', marginBottom: 4 }}>
        You might be able to view this page if you log in.
      </Typography>
      <Button component={Link} to="/login" variant="solid" sx={{ fontFamily: 'League Spartan, sans-serif' }}>
        Login
      </Button>
    </Box>
  );
};

export default NotFound;
