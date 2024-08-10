import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Paper, IconButton, InputAdornment, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import axiosInstance from '../../axiosInstance';
import { convertbackBase64, convertToBase64 } from '../../utils/convertToBase64';
import { useAuth } from '../AuthContext';

const PartnerSignUp = () => {
  const [name, setName] = useState(' hsdhiuj');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [organizationDetails, setOrganizationDetails] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {signup} = useAuth();

  const handleProfilePicChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = convertbackBase64(reader.result);

        setProfilePic(base64Data);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSignup = async () => {
    try {
      const partnerData = {
        name,
        username,
        password,
        email,
        phone,
        profilePic,
        organizationDetails,
        tagline,
        description
      };

      const response = await axiosInstance.post('/api/partners/signup', partnerData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
        // Assuming the token is included in the response data
        const token = response.data.split('Token: ')[1];
        console.log(response.data.split('Token: ')[1]);
        await localStorage.setItem('token', token);
        await localStorage.setItem('email', email);
        await localStorage.setItem('mode', 'partner');
        await localStorage.setItem('photographerId', response.data.photographerId);
        await signup(); // Adjust according to response structure

        // Redirect or handle successful signup
        navigate('/');

    } catch (error) {
      console.error('Error signing up partner:', error);
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: '100vh', padding: '20px' }}
    >
      <Grid item xs={12} sm={10} md={6}>
        <Paper elevation={3} style={{ padding: '20px', borderRadius: '10px' }}>
          <Typography variant="h4" align="center" gutterBottom sx={{ fontFamily: 'League Spartan, sans-serif', fontWeight: 'bold' }}>
            Partner Sign Up
          </Typography>
          <form noValidate autoComplete="off">
            <Grid container spacing={2}>
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
                  label="Email"
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
                  label="Phone"
                  variant="outlined"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  sx={{ fontFamily: 'League Spartan, sans-serif' }}
                />
              </Grid>
              <Grid item xs={12}>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="profile-pic"
                  type="file"
                  onChange={handleProfilePicChange}
                />
                <label htmlFor="profile-pic">
                  <Button
                    variant="contained"
                    component="span"
                    startIcon={<PhotoCameraIcon />}
                  >
                    Upload Profile Picture
                  </Button>
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
                  label="Organization Details"
                  variant="outlined"
                  multiline
                  rows={4}
                  value={organizationDetails}
                  onChange={(e) => setOrganizationDetails(e.target.value)}
                  sx={{ fontFamily: 'League Spartan, sans-serif' }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Tagline"
                  variant="outlined"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  sx={{ fontFamily: 'League Spartan, sans-serif' }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  variant="outlined"
                  multiline
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  sx={{ fontFamily: 'League Spartan, sans-serif' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={handleSignup}
                  sx={{ fontFamily: 'League Spartan, sans-serif', marginTop: '20px' }}
                >
                  Sign Up
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default PartnerSignUp;
