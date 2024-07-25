import React from 'react';
import ProfileAvatar from './ProfileAvatar';
import { Grid, Typography, Button, Divider } from '@mui/material';
import MediaCard from './TestCard';

// Example functional component
const MyComponent = () => {
  const profileData = {
    imageUrl: '/profilepic1.jpg',
    altText: 'Profile Picture',
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.'
  };

  const images = [
    '/image1.jpg',
    '/image2.jpg',
    '/image3.jpg'
  ];

  return (
    <div style={{ padding: '20px' }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <ProfileAvatar imageUrl={profileData.imageUrl} altText={profileData.altText} />
        </Grid>
        <Grid item xs>
          <Typography variant="h5" sx={{ fontFamily: 'League Spartan, sans-serif', fontWeight: 'bold' }}>
            {profileData.name}
          </Typography>
          <Typography variant="body1" sx={{ fontFamily: 'League Spartan, sans-serif', color: 'gray' }}>
            {profileData.email}
          </Typography>
          <Typography variant="body2" sx={{ fontFamily: 'League Spartan, sans-serif', marginTop: '10px' }}>
            {profileData.bio}
          </Typography>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" sx={{ fontFamily: 'League Spartan, sans-serif' }}>
            Contact Request
          </Button>
        </Grid>
      </Grid>

      <Divider sx={{ marginY: 2 }} />

      <Grid container spacing={2}>
        {images.map((image, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <img src={image} alt={`Gallery image ${index + 1}`} style={{ width: '100%', borderRadius: '8px' }} />
          </Grid>
        ))}
      </Grid>

      <MediaCard></MediaCard>
    </div>
  );
}

export default MyComponent;
