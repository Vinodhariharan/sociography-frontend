import React, { useState } from 'react';
import {
  Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, Input, Grid
} from '@mui/material';
import { Sheet } from '@mui/joy';
import ProfileAvatar from '../common/ProfileAvatar';

const PartnerProfile = () => {
  const partnerData = {
    imageUrl: 'partnerpic.jpg',
    name: 'Alex Morrison',
    likesCount: 125,
    contactedCount: 45,
    address: '123 Partner Street, City, Country',
    website: 'https://partnerwebsite.com',
    description: `
      Alex is a highly skilled photographer specializing in landscape and portrait photography. 
      Known for captivating images and professional services. His work has been featured in 
      numerous galleries and publications. Alex's attention to detail and creativity sets him 
      apart in the industry. He is passionate about capturing the beauty of the world through 
      his lens and continually pushes the boundaries of his craft. Whether it's a stunning 
      landscape or an intimate portrait, Alex's work always tells a story.
    `,
    tagline: 'Professional Photographer',
  };

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(partnerData);
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
    console.log(formData);
    handleClose();
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          mb: 4,
          borderBottom: '1px solid',
          borderColor: 'grey.400',
          pb: 2,
        }}
      >
        <ProfileAvatar 
          imageUrl={partnerData.imageUrl} 
          altText={`${partnerData.name}'s Profile Picture`} 
          sx={{ width: 182, height: 182 }} 
        />
        <Box sx={{ flex: 1 }}>
          <Typography 
            variant="h3" 
            sx={{ fontFamily: 'League Spartan, sans-serif', fontWeight: 'bold' }}
          >
            {partnerData.name}
          </Typography>
          <Typography 
            variant="subtitle1" 
            color="text.secondary"
            sx={{ fontFamily: 'League Spartan, sans-serif' }}
          >
            {partnerData.tagline}
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
              <Typography fontWeight="lg">{partnerData.likesCount}</Typography>
            </div>
            <div>
              <Typography level="body-xs" fontWeight="lg">
                Contacted
              </Typography>
              <Typography fontWeight="lg">{partnerData.contactedCount}</Typography>
            </div>
          </Sheet>
          <Box sx={{ display: 'flex', gap: 1.5, mt: 2 }}>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleClickOpen}
              sx={{ fontFamily: 'League Spartan, sans-serif' }}
            >
              Edit Profile
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleContactRequest}
              disabled={contactRequestSent}
              sx={{ fontFamily: 'League Spartan, sans-serif' }}
            >
              {contactRequestSent ? 'Request Sent' : 'Contact Request'}
            </Button>
          </Box>
        </Box>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h5" 
          gutterBottom
          sx={{ fontFamily: 'League Spartan, sans-serif', fontWeight: 'bold', borderBottom: '2px solid', display: 'inline-block', paddingBottom: '4px' }}
        >
          Description
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          {partnerData.description}
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h5" 
          gutterBottom
          sx={{ fontFamily: 'League Spartan, sans-serif', fontWeight: 'bold', borderBottom: '2px solid', display: 'inline-block', paddingBottom: '4px' }}
        >
          Address
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          {partnerData.address}
        </Typography>
      </Box>

      <Box>
        <Typography 
          variant="h5" 
          gutterBottom
          sx={{ fontFamily: 'League Spartan, sans-serif', fontWeight: 'bold', borderBottom: '2px solid', display: 'inline-block', paddingBottom: '4px' }}
        >
          Website
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          <a href={partnerData.website} target="_blank" rel="noopener noreferrer">
            {partnerData.website}
          </a>
        </Typography>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Input
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                fullWidth
                label="Tagline"
                name="tagline"
                value={formData.tagline}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                fullWidth
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                fullWidth
                label="Website"
                name="website"
                value={formData.website}
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
    </Box>
  );
};

export default PartnerProfile;
