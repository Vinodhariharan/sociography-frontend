import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import Box from '@mui/joy/Box';
import Avatar from '@mui/joy/Avatar';
import { Link, useNavigate } from 'react-router-dom';
import { getToken, logout } from '../../services/AuthService';
import { Input } from '@mui/joy';
import SearchIcon from '@mui/icons-material/Search';
import { useAuth } from '../AuthContext';
import axios from '../../axiosInstance';
import { convertToBase64 } from '../../utils/convertToBase64';

const Navbar = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [profilePic, setProfilePic] = useState('');
  const navigate = useNavigate();
  const { authState } = useAuth();
  const { mode, photographerId } = authState;
  const [query, setQuery] = useState('');

  useEffect(() => {
    setAuthenticated(!!getToken());

    // Fetch profile picture based on mode
    if (mode && (mode === 'partner' || mode === 'photographer')) {
      axios.get(`/${mode === 'partner' ? 'partners' : 'photographers'}/${photographerId}`)
        .then(response => { 
          const profileData = response.data;
          console.log(profileData);
          setProfilePic(convertToBase64(profileData.profilePic) || ''); // Assuming 'profilePic' is the key
        })
        .catch(error => {
          console.error('Error fetching profile picture:', error);
        });
    }
  }, [mode, photographerId]);

  const handleSearchChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    if (event.key === 'Enter' && query.trim()) {
      navigate(`/search-results?query=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleLogout = () => {
    logout();
    setAuthenticated(false);
    navigate('/login');
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#f1f1f1', color: '#000', boxShadow: 0 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img src="Logo3.png" alt="Logo" style={{ height: 40, marginRight: 8 }} />
          <Typography component={Link} to="/" level="h3" sx={{ color: '#000', fontFamily: 'League Spartan, sans-serif', fontWeight: 600, textDecoration: 'none' }}>
            SocioGraphy.
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
          <Input
            placeholder="Search..."
            value={query}
            onChange={handleSearchChange}
            onKeyDown={handleSearchSubmit}
            startDecorator={<SearchIcon />}
            sx={{
              width: '50%',
              color: 'black',
              '& .MuiInputBase-root': {
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.25)',
                },
              },
              '& .MuiInputBase-input': {
                color: 'black',
              },
              '& .MuiSvgIcon-root': {
                color: 'black',
              },
            }}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {authenticated && (
            <>
              {mode !== 'partner' && (
                <Button component={Link} to="/partner-listing" variant="plain" sx={{ fontFamily: 'League Spartan, sans-serif', color: '#000' }}>
                  Partners
                </Button>
              )}
              <Avatar alt="Profile" component={Link} to='/profile' src={profilePic} sx={{ marginLeft: 2, cursor: 'pointer' }} />
              <Button variant="plain" onClick={handleLogout}>Logout</Button>
            </>
          )}
          {!authenticated && (
            <Button component={Link} to="/login" variant="plain" sx={{ fontFamily: 'League Spartan, sans-serif', color: '#000' }}>
              Sign In
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
