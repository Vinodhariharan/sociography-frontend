import React from 'react';
import { Card, CardContent, Typography, Grid, Button, Box, Container } from '@mui/joy';
import AspectRatio from '@mui/joy/AspectRatio';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
// import AppLogo from '../path/to/logo.png'; // Update with the correct path to your logo image

const StyledContainer = styled(Container)({
  backgroundColor: '#14273a', // Navy blue background
  minHeight: '100vh',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

const StyledCard = styled(Card)({
  cursor: 'pointer',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-10px)', // Lift up effect
    boxShadow: '0px 6px 12px rgba(0,0,0,0.2)',
  },
  maxWidth: 300,
  margin: '0 auto',
  textAlign: 'center',
  padding: '20px',
  borderRadius: '10px',
  background: 'linear-gradient(to bottom, white, lightgrey)',
});

const SignupSelection = () => {
  const navigate = useNavigate();

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <div style={{ backgroundColor:'#14273a'}}>
    <StyledContainer>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <img src='./logo2.png' alt="App Logo" style={{ width: '100px', height: 'auto' }} />
        <Typography variant="h2" sx={{ color: '#fff', fontFamily: 'League Spartan, sans-serif', fontWeight: 'bold' }}>
          Sociography
        </Typography>
        <Typography variant="subtitle1" sx={{ color: '#ccc' }}>
          Choose your role to get started
        </Typography>
      </Box>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={6}>
          <StyledCard onClick={() => handleCardClick('/photographer-signup')}>
            <CardContent>
              <AspectRatio ratio="1/1" sx={{ mb: 2 }}>
                <img
                  src="/loginpic.jpg" // Update with the correct image URL
                  alt="Photographer"
                />
              </AspectRatio>
              <Typography variant="h5" component="div" sx={{ fontFamily: 'League Spartan, sans-serif', mb: 1 }}>
                Photographer
              </Typography>
              <Typography>
                Capture stunning moments and build your portfolio.
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>
        <Grid item xs={12} sm={6}>
          <StyledCard onClick={() => handleCardClick('/partner-signup')}>
            <CardContent>
              <AspectRatio ratio="1/1" sx={{ mb: 2 }}>
                <img
                  src="pexels-photo-3184294.webp" // Update with the correct image URL
                  alt="Partner"
                />
              </AspectRatio>
              <Typography variant="h5" component="div" sx={{ fontFamily: 'League Spartan, sans-serif', mb: 1 }}>
                Partner
              </Typography>
              <Typography>
                Collaborate with photographers and support their journey.
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>
    </StyledContainer>
    </div>
  );
};

export default SignupSelection;
