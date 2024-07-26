import React, { useState } from 'react';
import {
  Grid, Typography, Button, Divider, Dialog, DialogTitle, DialogContent, DialogActions, TextField
} from '@mui/material';
import ProfileAvatar from './ProfileAvatar';
import DribbbleShot from './DribbbleShot';

const ProfilePhotographer = () => {
  const profileData = {
    imageUrl: '/profilepic1.jpg',
    altText: 'Profile Picture',
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.',
    contactDetails: '123-456-7890'
  };

  const images = [
    { id: 1, src: '/image1.jpg', title: 'Image 1', location: 'Location 1' },
    { id: 2, src: '/image2.jpg', title: 'Image 2', location: 'Location 2' },
    { id: 3, src: '/image3.jpg', title: 'Image 3', location: 'Location 3' },
    { id: 4, src: '/image4.jpg', title: 'Image 4', location: 'Location 4' },
    { id: 5, src: '/image5.jpg', title: 'Image 5', location: 'Location 5' },
    { id: 6, src: '/image6.jpg', title: 'Image 6', location: 'Location 6' },
    { id: 7, src: '/image7.jpg', title: 'Image 7', location: 'Location 7' },
    { id: 8, src: '/image8.jpg', title: 'Image 8', location: 'Location 8' },
    { id: 9, src: '/image9.jpg', title: 'Image 9', location: 'Location 9' }
  ];

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(profileData);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSave = () => {
    // Save the updated profile data
    console.log(formData);
    handleClose();
  };

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
          <Button variant="contained" color="primary" sx={{ fontFamily: 'League Spartan, sans-serif' }} onClick={handleClickOpen}>
            Edit Profile
          </Button>
          <Button variant="contained" color="secondary" sx={{ fontFamily: 'League Spartan, sans-serif', marginTop: '10px' }}>
            Contact Request
          </Button>
        </Grid>
      </Grid>

      <Divider sx={{ marginY: 2, marginX: 1, borderColor: 'black' }} />

      <Grid container spacing={2}>
        {images.map((image) => (
          <Grid item xs={12} sm={6} md={4} key={image.id}>
            <DribbbleShot image={image.src} title={image.title} location={image.location} />
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose} PaperProps={{ style: { borderRadius: '10px' } }}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Contact Details"
                name="contactDetails"
                value={formData.contactDetails}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProfilePhotographer;
