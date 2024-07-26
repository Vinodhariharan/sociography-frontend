import React, { useState } from 'react';
import {
  Grid, Typography, Button, Divider, Dialog, DialogTitle, DialogContent, DialogActions, TextField
} from '@mui/material';
import ProfileAvatar from './ProfileAvatar';
import DribbbleShot from './DribbbleShot';
import UploadDialog from './UploadDialog'; // Import the new UploadDialog component

const About = () => {
  // Ensure profileData is declared and initialized properly
  const profileData = {
    imageUrl: '/profilepic1.jpg',
    altText: 'Profile Picture',
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.',
    contactDetails: '123-456-7890'
  };

  const images = [
    { id: 1, src: '/image1.jpg', title: 'Image 1', location: 'Location 1', comments: [{ user: 'User1', text: 'Great shot!' }] },
    { id: 2, src: '/image2.jpg', title: 'Image 2', location: 'Location 2', comments: [{ user: 'User2', text: 'Nice colors!' }] },
    { id: 3, src: '/image3.jpg', title: 'Image 3', location: 'Location 3', comments: [{ user: 'User3', text: 'Inspiring work!' }] },
    { id: 4, src: '/image4.jpg', title: 'Image 4', location: 'Location 4', comments: [{ user: 'User4', text: 'Lovely composition!' }] },
    { id: 5, src: '/image5.jpg', title: 'Image 5', location: 'Location 5', comments: [{ user: 'User5', text: 'Awesome!' }] },
    { id: 6, src: '/image6.jpg', title: 'Image 6', location: 'Location 6', comments: [{ user: 'User6', text: 'Wonderful!' }] },
    { id: 7, src: '/image7.jpg', title: 'Image 7', location: 'Location 7', comments: [{ user: 'User7', text: 'Excellent!' }] },
    { id: 8, src: '/image8.jpg', title: 'Image 8', location: 'Location 8', comments: [{ user: 'User8', text: 'Marvelous!' }] },
    { id: 9, src: '/image9.jpg', title: 'Image 9', location: 'Location 9', comments: [{ user: 'User9', text: 'Amazing!' }] }
  ];

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(profileData);
  const [contactRequestSent, setContactRequestSent] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleContactRequest = () => {
    setContactRequestSent(true);
    console.log('Contact request sent');
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
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={4}>
          <ProfileAvatar imageUrl={profileData.imageUrl} altText={profileData.altText} />
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h4" sx={{ fontFamily: 'League Spartan, sans-serif', fontWeight: 'bold' }}>
            {profileData.name}
          </Typography>
          <Typography variant="h6" sx={{ fontFamily: 'League Spartan, sans-serif', color: 'gray', marginBottom: '10px' }}>
            {profileData.email}
          </Typography>
          <Typography variant="body1" sx={{ fontFamily: 'League Spartan, sans-serif', marginBottom: '10px' }}>
            {profileData.bio}
          </Typography>
          <Typography variant="body1" sx={{ fontFamily: 'League Spartan, sans-serif', marginBottom: '10px' }}>
            Contact: {profileData.contactDetails}
          </Typography>
          <Grid container spacing={2}>
            <Grid item>
              <Button variant="contained" color="primary" sx={{ fontFamily: 'League Spartan, sans-serif' }} onClick={handleClickOpen}>
                Edit Profile
              </Button>
            </Grid>
            <Grid item>
            <Button
                variant="contained"
                color="secondary"
                sx={{ fontFamily: 'League Spartan, sans-serif' }}
                onClick={handleContactRequest}
                disabled={contactRequestSent}
              >
                {contactRequestSent ? 'Request Sent' : 'Contact Request'}
              </Button>
            </Grid>
            <Grid item>
              <UploadDialog
                onUploadStart={() => console.log('Upload started')}
                onUploadEnd={(success) => console.log(`Upload ${success ? 'succeeded' : 'failed'}`)}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Divider sx={{ marginY: 4, borderColor: 'black' }} />

      <Grid container spacing={2}>
        {images.map((image) => (
          <Grid item xs={12} sm={6} md={4} key={image.id}>
            <DribbbleShot image={image.src} title={image.title} location={image.location} comments={image.comments} />
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

export default About;
