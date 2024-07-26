import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Container } from '@mui/material';
import NotificationDropdown from './NotificationDropdown'; // Import the new component

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#f1efe7' }}>
      <Container>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'black', fontFamily: 'League Spartan, sans-serif', fontWeight: 600 }}>
            SocioGraphy.
          </Typography>
          <Button color="primary" sx={{ fontFamily: 'League Spartan, sans-serif' }}>
            Home
          </Button>
          <Button color="primary" sx={{ fontFamily: 'League Spartan, sans-serif' }}>
            About
          </Button>
          <NotificationDropdown /> {/* Add notification dropdown */}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
