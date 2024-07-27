import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, IconButton, InputAdornment } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { motion } from 'framer-motion';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    // Add authentication logic here
    console.log('Email:', email);
    console.log('Password:', password);
    // Redirect to profile page on successful login
    navigate('/home');
  };

  const handleRegister = () => {
    navigate('/signup-selection'); // Redirect to the PhotographerSignUp page
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: '100vh', padding: '20px' }} // No background color or gradient
    >
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', // Updated shadow for more depth
          }}
        >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontFamily: 'League Spartan, sans-serif', fontWeight: 'bold' }}
          >
            Welcome back! Log in to your account
          </Typography>
          <form noValidate autoComplete="off">
            <TextField
              fullWidth
              label="Email"
              margin="normal"
              variant="outlined"
              type="email"
              value={email}
              onChange={handleEmailChange}
              sx={{ fontFamily: 'League Spartan, sans-serif' }}
            />
            <TextField
              fullWidth
              label="Password"
              margin="normal"
              variant="outlined"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={handlePasswordChange}
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
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleLogin}
                sx={{ fontFamily: 'League Spartan, sans-serif', marginTop: '20px' }}
              >
                Login
              </Button>
            </motion.div>
          </form>
          <Typography variant="body2" align="center" style={{ marginTop: '20px' }}>
            Don't have an account? <Button onClick={handleRegister}>Register</Button>
          </Typography>
        </motion.div>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
