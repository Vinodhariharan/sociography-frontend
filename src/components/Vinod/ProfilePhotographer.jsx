import React, { useState } from 'react';
import {
  Grid, Typography, Button, Divider, Dialog, DialogTitle, DialogContent, DialogActions, TextField
} from '@mui/material';
import { Chip, Grid as JoyGrid, Typography as JoyTypography, Sheet } from '@mui/joy';
import ProfileAvatar from './ProfileAvatar';
import DribbbleShot from '../common/DribbbleShot';
import UploadDialog from './UploadDialog'; // Import the new UploadDialog component

const About = () => {
  // Ensure profileData is declared and initialized properly
  const profileData = {
    imageUrl: '/profilepic1.jpg',
    altText: 'Profile Picture',
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.',
    contactDetails: '123-456-7890',
    likesCount: 125,
    contactedCount: 45,
  };

  const images = [
    {
      id: 1,
      src: '/image1.jpg',
      description: 'A stunning view of the mountains.',
      location: 'Location 1',
      date: 'July 20, 2024',
      likes: 123,
      author: 'Photographer 1',
      avatar: '/profilepic1p.jpg',
      category: 'Nature',
      comments: [{ user: 'User1', text: 'Great shot!' }]
    },
    {
      id: 2,
      src: '/image2.jpg',
      description: 'A vibrant sunset over the ocean.',
      location: 'Location 2',
      date: 'July 21, 2024',
      likes: 98,
      author: 'Photographer 2',
      avatar: '/profilepic1p.jpg',
      category: 'Sunset',
      comments: [{ user: 'User2', text: 'Nice colors!' }]
    },
    {
      id: 3,
      src: '/image3.jpg',
      description: 'A close-up of a beautiful flower.',
      location: 'Location 3',
      date: 'July 22, 2024',
      likes: 150,
      author: 'Photographer 3',
      avatar: '/profilepic1p.jpg',
      category: 'Floral',
      comments: [{ user: 'User3', text: 'Inspiring work!' }]
    },
    {
      id: 4,
      src: '/image4.jpg',
      description: 'A serene landscape with a river.',
      location: 'Location 4',
      date: 'July 23, 2024',
      likes: 110,
      author: 'Photographer 4',
      avatar: '/profilepic1p.jpg',
      category: 'Landscape',
      comments: [{ user: 'User4', text: 'Lovely composition!' }]
    },
    {
      id: 5,
      src: '/image5.jpg',
      description: 'A bustling city street at night.',
      location: 'Location 5',
      date: 'July 24, 2024',
      likes: 132,
      author: 'Photographer 5',
      avatar: '/profilepic1p.jpg',
      category: 'Urban',
      comments: [{ user: 'User5', text: 'Awesome!' }]
    },
    {
      id: 6,
      src: '/image6.jpg',
      description: 'A tranquil beach with crystal-clear water.',
      location: 'Location 6',
      date: 'July 25, 2024',
      likes: 145,
      author: 'Photographer 6',
      avatar: '/profilepic1p.jpg',
      category: 'Beach',
      comments: [{ user: 'User6', text: 'Wonderful!' }]
    },
    {
      id: 7,
      src: '/image7.jpg',
      description: 'An artistic black and white portrait.',
      location: 'Location 7',
      date: 'July 26, 2024',
      likes: 120,
      author: 'Photographer 7',
      avatar: '/profilepic1p.jpg',
      category: 'Portrait',
      comments: [{ user: 'User7', text: 'Excellent!' }]
    },
    {
      id: 8,
      src: '/image8.jpg',
      description: 'A majestic mountain range covered in snow.',
      location: 'Location 8',
      date: 'July 27, 2024',
      likes: 155,
      author: 'Photographer 8',
      avatar: '/profilepic1p.jpg',
      category: 'Mountain',
      comments: [{ user: 'User8', text: 'Marvelous!' }]
    },
    {
      id: 9,
      src: '/image9.jpg',
      description: 'A captivating view of the night sky full of stars.',
      location: 'Location 9',
      date: 'July 28, 2024',
      likes: 170,
      author: 'Photographer 9',
      avatar: '/profilepic1p.jpg',
      category: 'Astro',
      comments: [{ user: 'User9', text: 'Amazing!' }]
    }
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
        <Grid item xs={12} md={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <ProfileAvatar imageUrl={profileData.imageUrl} altText={profileData.altText} />
        </Grid>
        <Grid item xs={12} md={9}>
          <Typography variant="h4" sx={{ fontFamily: 'League Spartan, sans-serif', fontWeight: 'bold' }}>
            {profileData.name}
          </Typography>
          <Typography variant="body1" sx={{ fontFamily: 'League Spartan, sans-serif', marginBottom: '10px' }}>
            {profileData.bio}
          </Typography>
          <Sheet
            sx={{
              bgcolor: 'background.level1',
              borderRadius: 'sm',
              p: 1.5,
              my: 1.5,
              display: 'flex',
              gap: 2,
              '& > div': { flex: 1 },
            }}
          >
            <div>
              <Typography level="body-xs" fontWeight="lg">
                Likes
              </Typography>
              <Typography fontWeight="lg">{profileData.likesCount}</Typography>
            </div>
            <div>
              <Typography level="body-xs" fontWeight="lg">
                Contacted
              </Typography>
              <Typography fontWeight="lg">{profileData.contactedCount}</Typography>
            </div>
          </Sheet>
          <Grid container spacing={2} sx={{ mt: 2 }}>
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
            <DribbbleShot
    key={image.id}
    image={image.src}
    description={image.description}
    location={image.location}
    date={image.date}
    likes={image.likes}
    author={profileData.name}
    avatar={profileData.imageUrl}
    category={image.category}
    initialComments={image.comments}
  />
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
