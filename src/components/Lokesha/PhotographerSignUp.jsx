import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Paper, Box, IconButton, InputAdornment, Slide } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { styled } from '@mui/system';

const StyledPaper = styled(Paper)({
  padding: '40px',
  borderRadius: '15px',
  boxShadow: '0px 6px 12px rgba(0,0,0,0.1)',
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'scale(1.02)',
    boxShadow: '0px 12px 24px rgba(0,0,0,0.2)',
  },
});

const StyledButton = styled(Button)({
  fontFamily: 'League Spartan, sans-serif',
  marginTop: '20px',
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
  },
});

const PhotographerSignUp = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [selfInfo, setSelfInfo] = useState('');
  const [location, setLocation] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleProfilePicChange = (e) => {
    if (e.target.files[0]) {
      setProfilePic(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSignup = () => {
    // Add signup logic here
    console.log('Name:', name);
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Date of Birth:', dob);
    console.log('Profile Picture:', profilePic);
    console.log('Self Info:', selfInfo);
    console.log('Location:', location);
    console.log('Contact No:', contactNo);
    console.log('Email:', email);

    // Redirect to photographer dashboard on successful signup
    navigate('/photographer-dashboard');
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: '100vh', padding: '20px' }}
    >
      <Slide direction="up" in mountOnEnter unmountOnExit>
        <Grid item xs={12} sm={10} md={6}>
          <StyledPaper>
            <Typography variant="h4" align="center" gutterBottom sx={{ fontFamily: 'League Spartan, sans-serif', fontWeight: 'bold' }}>
              Photographer Sign Up
            </Typography>
            <form noValidate autoComplete="off">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="profile-pic"
                    type="file"
                    onChange={handleProfilePicChange}
                  />
                  <label htmlFor="profile-pic">
                    <StyledButton
                      variant="contained"
                      component="span"
                      startIcon={<PhotoCameraIcon />}
                    >
                      Upload Profile Picture
                    </StyledButton>
                  </label>
                  {profilePic && (
                    <Box mt={2} textAlign="center">
                      <img
                        src={profilePic}
                        alt="Profile Preview"
                        style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                      />
                    </Box>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email or Phone"
                    variant="outlined"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ fontFamily: 'League Spartan, sans-serif' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Username"
                    variant="outlined"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    sx={{ fontFamily: 'League Spartan, sans-serif' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Password"
                    variant="outlined"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    sx={{ fontFamily: 'League Spartan, sans-serif' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Date of Birth"
                    variant="outlined"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    sx={{ fontFamily: 'League Spartan, sans-serif' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Location"
                    variant="outlined"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    sx={{ fontFamily: 'League Spartan, sans-serif' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Self Intro"
                    variant="outlined"
                    multiline
                    rows={4}
                    value={selfInfo}
                    onChange={(e) => setSelfInfo(e.target.value)}
                    sx={{ fontFamily: 'League Spartan, sans-serif' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <StyledButton
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleSignup}
                  >
                    Sign Up
                  </StyledButton>
                </Grid>
              </Grid>
            </form>
          </StyledPaper>
        </Grid>
      </Slide>
    </Grid>
  );
};

export default PhotographerSignUp;
