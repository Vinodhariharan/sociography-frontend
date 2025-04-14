import React, { useState, useEffect } from 'react';
import {
  Grid, Typography, Button, Divider, Dialog, DialogTitle, DialogContent, DialogActions, TextField
} from '@mui/material';
import { Sheet, Box, Card, CardContent, Typography as JoyTypography } from '@mui/joy';
import ProfileAvatar from '../common/ProfileAvatar';
import DribbbleShot from '../common/Post/DribbbleShot';
import UploadDialog from './UploadDialog';
import { convertToBase64 } from '../../utils/convertToBase64';
import { useAuth } from '../AuthContext';

const About = () => {
  const { authState } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [images, setImages] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [contactRequestSent, setContactRequestSent] = useState(false);

  useEffect(() => {
    if (!authState) return;
    const token = authState.token;
    const email = authState.email;
    console.log(authState.photographerId);

    // Fetch profile data
    fetch(`http://3.106.239.84:8080/photographers/email/${email}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => {
        setProfileData(data.photographer);
        setFormData(data.photographer);
      })
      .catch(error => console.error('Error fetching profile data:', error));

    // Fetch images
    fetch(`http://3.106.239.84:8080/photographers/${email}/pictures`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => {
        const imagesWithBase64 = data.map(image => ({
          ...image,
          picture: image.picture
        }));
        setImages(imagesWithBase64);
        for (const element of data) {
          console.log(element.id);
        }
      })
      .catch(error => console.error('Error fetching pictures:', error));
  }, [authState]);

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

  const handleSave = () => {
        // Save the updated profile data
        console.log(formData);
        handleClose();
      };

    
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({ ...formData, profilePic: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const [error, setError] = useState(null);

  const handleProfileSave = async () => {
    try {
      const email = authState.email;
      const response = await fetch(`http://3.106.239.84:8080/photographers/email/${email}/edit`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${authState.token}` },
        body: JSON.stringify(formData),
      });
      console.log(response);
  
      if (!response.ok) {
        throw new Error(`Error updating profile: ${response.status}`);
      }
  
      const data = await response.json();
      // Handle the response data
    } catch (error) {
      setError(error.message);
      console.error('Error updating profile:', error);
    }
  };


  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <Box
        sx={{
          width: '100%',
          position: 'relative',
          overflow: { xs: 'auto', sm: 'initial' },
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            display: 'block',
            width: '1px',
            bgcolor: 'warning.300',
            left: '500px',
            top: '-24px',
            bottom: '-24px',
              // '&::before': {
              //   top: '4px',
              //   content: '"vertical"',
              //   display: 'block',
              //   position: 'absolute',
              //   right: '0.5rem',
              //   color: 'text.tertiary',
              //   fontSize: 'sm',
              //   fontWeight: 'lg',
              // },
              // '&::after': {
              //   top: '4px',
              //   content: '"horizontal"',
              //   display: 'block',
              //   position: 'absolute',
              //   left: '0.5rem',
              //   color: 'text.tertiary',
              //   fontSize: 'sm',
              //   fontWeight: 'lg',
              // },
          }}
        />
        <Card
          orientation="horizontal"
          sx={{
            width: '100%',
            flexWrap: 'wrap',
            [`& > *`]: {
              '--stack-point': '500px',
              minWidth:
                'clamp(0px, (calc(var(--stack-point) - 2 * var(--Card-padding) - 2 * var(--variant-borderWidth, 0px)) + 1px - 100%) * 999, 100%)',
            },
            overflow: 'auto',
            resize: 'horizontal',
          }}
        >
          <ProfileAvatar imageUrl={`data:image/png;base64,${profileData.profilePic}`} altText="Profile Picture" />
          <CardContent>
            <Typography variant="h4" sx={{ fontFamily: 'League Spartan, sans-serif', fontWeight: 'bold' }}>
              {profileData.name}
            </Typography>
            <Typography variant="body1" sx={{ fontFamily: 'League Spartan, sans-serif', marginBottom: '10px' }}>
              {profileData.selfInfo}
            </Typography>
            {/* <Sheet
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
                <Typography fontWeight="lg">{profileData.totalLikes}</Typography>
              </div>
              <div>
                <Typography level="body-xs" fontWeight="lg">
                  Followers
                </Typography>
                <Typography fontWeight="lg">{profileData.followersCount}</Typography>
              </div>
              <div>
                <Typography level="body-xs" fontWeight="lg">
                  Following
                </Typography>
                <Typography fontWeight="lg">{profileData.followingCount}</Typography>
              </div>
            </Sheet> */}
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item>
                <Button variant="contained" color="primary" sx={{ fontFamily: 'League Spartan, sans-serif' }} onClick={handleClickOpen}>
                  Edit Profile
                </Button>
              </Grid>
              {/* <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ fontFamily: 'League Spartan, sans-serif' }}
                  onClick={handleContactRequest}
                  disabled={contactRequestSent}
                >
                  {contactRequestSent ? 'Request Sent' : 'Contact Request'}
                </Button>
              </Grid> */}
              <Grid item>
                <UploadDialog
                  onUploadStart={() => console.log('Upload started')}
                  onUploadEnd={(success) => console.log(`Upload ${success ? 'succeeded' : 'failed'}`)}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>

      <Divider sx={{ marginY: 4, borderColor: 'black' }} />

      <Grid container spacing={2}>
        {images.map((image) => (
          <Grid item xs={12} sm={6} md={4} key={image.id}>
            <DribbbleShot
  id={image.id}
  image={image.picture} // Assuming DribbbleShot will handle base64 encoding if needed
  description={image.description}
  location={image.location}
  date={image.timestamp }
  likes={image.likes}
  author={profileData.name}
  avatar={profileData.profilePic ? profileData.profilePic : null} // Only format if profilePic is available
  category={image.category}
  initialComments={image.comments}
  photographerId={authState.photographerId} // Add photographerId if needed
/>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose} PaperProps={{ style: { borderRadius: '10px' } }}>
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} style={{ textAlign: 'center' }}>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="profile-picture-upload"
              type="file"
              onChange={handleProfilePicChange}
            />
            <label htmlFor="profile-picture-upload">
              <img
                src={convertToBase64(formData.profilePic) || '/default-profile-pic.png'}
                alt="Profile"
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  cursor: 'pointer',
                }}
              />
            </label>
          </Grid>
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
              name="selfInfo"
              value={formData.selfInfo}
              onChange={handleChange}
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={() => handleProfileSave(formData)} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>

    </div>
  );
};

export default About;
