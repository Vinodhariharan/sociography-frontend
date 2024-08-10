// src/components/LoginPage.js
import React, { useState } from 'react';
import { Button, Grid, Typography, Card, CardContent, CardMedia, Box, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/joy/styles';
import Input from '@mui/joy/Input';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from '../AuthContext';
import SnackbarWithDecorators from './SnackbarWithDecorators';

const StyledInput = styled('input')({
  border: 'none', // remove the native input border
  minWidth: 0, // remove the native input width
  outline: 0, // remove the native input outline
  padding: 0, // remove the native input padding
  paddingTop: '1em',
  flex: 1,
  color: 'inherit',
  backgroundColor: 'transparent',
  fontFamily: 'inherit',
  fontSize: 'inherit',
  fontStyle: 'inherit',
  fontWeight: 'inherit',
  lineHeight: 'inherit',
  textOverflow: 'ellipsis',
  '&::placeholder': {
    opacity: 0,
    transition: '0.1s ease-out',
  },
  '&:focus::placeholder': {
    opacity: 1,
  },
  '&:focus ~ label, &:not(:placeholder-shown) ~ label, &:-webkit-autofill ~ label': {
    top: '0.5rem',
    fontSize: '0.75rem',
  },
  '&:focus ~ label': {
    color: 'var(--Input-focusedHighlight)',
  },
  '&:-webkit-autofill': {
    alignSelf: 'stretch', // to fill the height of the root slot
  },
  '&:-webkit-autofill:not(* + &)': {
    marginInlineStart: 'calc(-1 * var(--Input-paddingInline))',
    paddingInlineStart: 'var(--Input-paddingInline)',
    borderTopLeftRadius:
      'calc(var(--Input-radius) - var(--variant-borderWidth, 0px))',
    borderBottomLeftRadius:
      'calc(var(--Input-radius) - var(--variant-borderWidth, 0px))',
  },
});

const StyledLabel = styled('label')(({ theme }) => ({
  position: 'absolute',
  lineHeight: 1,
  top: 'calc((var(--Input-minHeight) - 1em) / 2)',
  color: theme.vars.palette.text.tertiary,
  fontWeight: theme.vars.fontWeight.md,
  transition: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
}));

const InnerInput = React.forwardRef(function InnerInput(props, ref) {
  const id = React.useId();
  return (
    <React.Fragment>
      <StyledInput {...props} ref={ref} id={id} />
      <StyledLabel htmlFor={id}>{props.label}</StyledLabel>
    </React.Fragment>
  );
});

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // Use login from AuthContext

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async () => {
    try {
      // Call login method from AuthContext
      await login(email, password);

      // Navigate to the homepage after successful login
      navigate('/');
    } catch (error) {
      // Handle error (e.g., display error message)
      setError('Login failed. Please try again.');
      setSnackbarOpen(true);
    }
  };

  const handleRegister = () => {
    navigate('/signup-selection');
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: '100vh', padding: '20px', backgroundColor: '#14273a' }}
    >
      <Card
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'center',
          width: { xs: '100%', md: '70%' },
          height: { xs: 'auto', md: '75vh' },
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
          borderRadius: '10px',
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: { xs: '50%', md: '100%' },
          }}
        >
          <CardMedia
            component="img"
            alt="Login Image"
            image="loginpic.jpg"
            title="Login Image"
            sx={{
              height: '100%',
              width: '100%',
              borderTopLeftRadius: '10px',
              borderBottomLeftRadius: '10px',
              borderTopRightRadius: { xs: '10px', md: 0 },
              borderBottomRightRadius: { xs: 0, md: 0 },
            }}
          />
        </Box>
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: { xs: '50%', md: '100%' },
          }}
        >
          <CardContent
            sx={{
              width: '70%',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              borderTopLeftRadius: { xs: 0, md: '0' },
              borderBottomLeftRadius: { xs: 0, md: '0' },
              borderTopRightRadius: '10px',
              borderBottomRightRadius: '10px',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <img
                src="Logo2.png"
                alt="Logo"
                style={{ height: 60 }}
              />
            </Box>
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              sx={{ fontFamily: 'League Spartan, sans-serif', fontWeight: 'bold' }}
            >
              SocioGraphy.
            </Typography>
            <Typography level="h5" sx={{ fontFamily: 'League Spartan, sans-serif', color: 'black', textAlign: 'center', mb: 2 }}>
              Discover breathtaking moments, share your vision, and connect with fellow photographers.
            </Typography>
            <form noValidate autoComplete="off">
              <Input
                endDecorator={null}
                slots={{ input: InnerInput }}
                slotProps={{ input: { placeholder: 'Enter your email', type: 'email', value: email, onChange: handleEmailChange, label: 'Email' } }}
                sx={{
                  '--Input-minHeight': '56px',
                  '--Input-radius': '6px',
                  marginBottom: '16px',
                }}
              />
              <Input
                endDecorator={
                  <IconButton
                    onClick={handleTogglePasswordVisibility}
                    edge="end"
                    aria-label="toggle password visibility"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                }
                slots={{ input: InnerInput }}
                slotProps={{ input: { placeholder: 'Enter your password', type: showPassword ? 'text' : 'password', value: password, onChange: handlePasswordChange, label: 'Password' } }}
                sx={{
                  '--Input-minHeight': '56px',
                  '--Input-radius': '6px',
                }}
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleLogin}
                sx={{ fontFamily: 'League Spartan, sans-serif', marginTop: '20px' }}
              >
                Login
              </Button>
            </form>
            <Typography variant="body2" align="center" style={{ marginTop: '20px' }}>
              Don't have an account? <Button onClick={handleRegister}>Register</Button>
            </Typography>
          </CardContent>
        </Box>
      </Card>
      <SnackbarWithDecorators
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        message={error}
      />
    </Grid>
  );
};

export default LoginPage;
  