import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Container, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import NotificationDropdown from './NotificationDropdown'; // Import the new component

const Navbar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleSearchChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    if (event.key === 'Enter' && query.trim()) {
      navigate(`/search-results?query=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#f1efe7' }}>
      <Container>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" component="div" sx={{ color: 'black', fontFamily: 'League Spartan, sans-serif', fontWeight: 600 }}>
            SocioGraphy.
          </Typography>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            <TextField
              variant="outlined"
              placeholder="Search..."
              value={query}
              onChange={handleSearchChange}
              onKeyDown={handleSearchSubmit} // Add the key down event handler
              sx={{
                width: '50%',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'rgb(80, 140, 155)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgb(80, 140, 155)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'rgb(80, 140, 155)',
                  },
                },
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button color="primary" sx={{ fontFamily: 'League Spartan, sans-serif' }} component={Link} to="/">
              Home
            </Button>
            <Button color="primary" sx={{ fontFamily: 'League Spartan, sans-serif' }} component={Link} to="/about">
              About
            </Button>
            <NotificationDropdown /> {/* Add notification dropdown */}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
