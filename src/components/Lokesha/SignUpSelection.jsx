import React from 'react';
import { Card, CardContent, Typography, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import { styled } from '@mui/system';

const StyledPaper = styled(Paper)({
  padding: '40px',
  textAlign: 'center',
  background: 'linear-gradient(to bottom, white, lightgrey)',
  borderRadius: '15px',
  boxShadow: '0px 3px 6px rgba(0,0,0,0.1)',
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0px 6px 12px rgba(0,0,0,0.2)',
  },
});

const StyledCard = styled(Card)({
  cursor: 'pointer',
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
  },
  borderRadius: '10px',
  textAlign: 'center',
  padding: '20px',
  boxShadow: '0px 3px 6px rgba(0,0,0,0.1)',
});

const SignupSelection = () => {
  const navigate = useNavigate();

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: '100vh', padding: '20px' }}
    >
      <Grid item xs={12} sm={10} md={8}>
        <StyledPaper>
          <Typography variant="h4" gutterBottom style={{ fontFamily: 'League Spartan, sans-serif', fontWeight: 'bold' }}>
            Select Your Role!
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={6}>
              <StyledCard onClick={() => handleCardClick('/photographer-signup')}>
                <CardContent>
                  <CameraAltIcon style={{ fontSize: 80, color: '#87CEEB' }} />
                  <Typography variant="h5" component="div" style={{ fontFamily: 'League Spartan, sans-serif', marginTop: '10px' }}>
                    Photographer
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledCard onClick={() => handleCardClick('/partner-signup')}>
                <CardContent>
                  <BusinessCenterIcon style={{ fontSize: 80, color: '#87CEEB' }} />
                  <Typography variant="h5" component="div" style={{ fontFamily: 'League Spartan, sans-serif', marginTop: '10px' }}>
                    Partner
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
          </Grid>
        </StyledPaper>
      </Grid>
    </Grid>
  );
};

export default SignupSelection;
