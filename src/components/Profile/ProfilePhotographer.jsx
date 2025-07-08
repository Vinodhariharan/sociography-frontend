import React, { useState, useEffect } from 'react';
import {
  Grid, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField
} from '@mui/material';
import { 
  Sheet, 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Divider,
  Avatar,
  IconButton,
  Stack,
  Chip,
  AspectRatio
} from '@mui/joy';
import { Edit, Camera, Upload } from '@mui/icons-material';
import ProfileAvatar from '../common/ProfileAvatar';
import DribbbleShot from '../common/Post/DribbbleShot';
import UploadDialog from './UploadDialog';
import { convertToBase64 } from '../../utils/convertToBase64';
import { useAuth } from '../AuthContext';
import axiosInstance from '../../axiosInstance';

const About = () => {
  const { authState } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [images, setImages] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [contactRequestSent, setContactRequestSent] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!authState) return;

    const token = authState.token;
    const email = authState.email;
    console.log(authState.photographerId);

    const fetchProfileAndImages = async () => {
      try {
        // Fetch profile data
        const profileResponse = await axiosInstance.get(`/photographers/email/${email}`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true,
        });

        setProfileData(profileResponse.data.photographer);
        setFormData(profileResponse.data.photographer);

        // Fetch images
        const imagesResponse = await axiosInstance.get(`/photographers/${email}/pictures`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true,
        });

        const imagesWithBase64 = imagesResponse.data.map(image => ({
          ...image,
          picture: image.picture
        }));
        setImages(imagesWithBase64);

        for (const element of imagesResponse.data) {
          console.log(element.id);
        }

      } catch (error) {
        console.error('Error fetching profile or pictures:', error);
      }
    };

    fetchProfileAndImages();
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

  const handleProfileSave = async () => {
    try {
      const email = authState.email;
      const response = await axiosInstance.put(`/photographers/email/${email}/edit`, formData, {
        headers: {
          Authorization: `Bearer ${authState.token}`,
          'Content-Type': 'application/json',
        },
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
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '400px',
        color: 'neutral.600' 
      }}>
        <Typography level="body-lg">Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      p: { xs: 2, md: 4 }, 
      backgroundColor: 'background.body',
      minHeight: '100vh' 
    }}>
      {/* Profile Header Card */}
      <Card
        variant="outlined"
        sx={{
          mb: 4,
          backgroundColor: 'background.surface',
          borderColor: 'neutral.200',
          boxShadow: 'sm',
          '--Card-padding': '24px',
        }}
      >
        <Stack 
          direction={{ xs: 'column', md: 'row' }} 
          spacing={3}
          alignItems={{ xs: 'center', md: 'flex-start' }}
        >
          {/* Profile Avatar */}
          <Box sx={{ position: 'relative' }}>
            <Avatar
              src={`data:image/png;base64,${profileData.profilePic}`}
              sx={{
                width: 120,
                height: 120,
                border: '3px solid',
                borderColor: 'neutral.300',
                backgroundColor: 'neutral.100',
              }}
            />
          </Box>

          {/* Profile Info */}
          <Stack spacing={2} sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
            <Box>
              <Typography 
                level="h2" 
                sx={{ 
                  fontFamily: 'League Spartan, sans-serif',
                  fontWeight: 600,
                  color: 'neutral.800',
                  mb: 1
                }}
              >
                {profileData.name}
              </Typography>
              <Typography 
                level="body-md" 
                sx={{ 
                  color: 'neutral.600',
                  lineHeight: 1.6,
                  maxWidth: '600px'
                }}
              >
                {profileData.selfInfo}
              </Typography>
            </Box>

            {/* Action Buttons */}
            <Stack 
              direction={{ xs: 'column', sm: 'row' }} 
              spacing={2}
              sx={{ mt: 2 }}
            >
              <Button
                variant="contained"
                onClick={handleClickOpen}
                startIcon={<Edit />}
                sx={{
                  backgroundColor: 'neutral.800',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'neutral.700',
                  },
                  fontFamily: 'League Spartan, sans-serif',
                  textTransform: 'none',
                  borderRadius: '8px',
                  px: 3,
                  py: 1
                }}
              >
                Edit Profile
              </Button>
              
              <UploadDialog
                onUploadStart={() => console.log('Upload started')}
                onUploadEnd={(success) => console.log(`Upload ${success ? 'succeeded' : 'failed'}`)}
              />
            </Stack>
          </Stack>
        </Stack>
      </Card>

      {/* Gallery Section */}
      <Box sx={{ mb: 3 }}>
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
          <Typography 
            level="h3" 
            sx={{ 
              fontFamily: 'League Spartan, sans-serif',
              fontWeight: 600,
              color: 'neutral.800'
            }}
          >
            Gallery
          </Typography>
          <Chip 
            size="sm" 
            variant="soft" 
            color="neutral"
            sx={{ 
              backgroundColor: 'neutral.100',
              color: 'neutral.600',
              border: '1px solid',
              borderColor: 'neutral.200'
            }}
          >
            {images.length} photos
          </Chip>
        </Stack>

        <Divider sx={{ borderColor: 'neutral.200' }} />
      </Box>

      {/* Images Grid */}
      <Grid container spacing={3}>
        {images.map((image) => (
          <Grid item xs={12} sm={6} md={4} key={image.id}>
            <Card
              variant="outlined"
              sx={{
                backgroundColor: 'background.surface',
                borderColor: 'neutral.200',
                transition: 'all 0.2s ease',
                '&:hover': {
                  borderColor: 'neutral.300',
                  boxShadow: 'md',
                  transform: 'translateY(-2px)',
                },
                overflow: 'hidden'
              }}
            >
              <DribbbleShot
                id={image.id}
                image={image.picture}
                description={image.description}
                location={image.location}
                date={image.timestamp}
                likes={image.likes}
                author={profileData.name}
                avatar={profileData.profilePic ? profileData.profilePic : null}
                category={image.category}
                initialComments={image.comments}
                photographerId={authState.photographerId}
              />
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Edit Profile Dialog */}
      <Dialog 
        open={open} 
        onClose={handleClose} 
        PaperProps={{ 
          style: { 
            borderRadius: '12px',
            backgroundColor: '#fafafa',
            border: '1px solid #e5e5e5'
          } 
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ 
          fontFamily: 'League Spartan, sans-serif',
          fontWeight: 600,
          color: '#1a1a1a',
          pb: 1
        }}>
          Edit Profile
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} style={{ textAlign: 'center' }}>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="profile-picture-upload"
                type="file"
                onChange={handleProfilePicChange}
              />
              <label htmlFor="profile-picture-upload">
                <Box sx={{ position: 'relative', display: 'inline-block' }}>
                  <img
                    src={convertToBase64(formData.profilePic) || '/default-profile-pic.png'}
                    alt="Profile"
                    style={{
                      width: '100px',
                      height: '100px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      cursor: 'pointer',
                      border: '3px solid #e5e5e5',
                    }}
                  />
                  <IconButton
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      backgroundColor: 'white',
                      border: '2px solid #e5e5e5',
                      '&:hover': {
                        backgroundColor: '#f5f5f5',
                      },
                    }}
                  >
                    <Camera sx={{ fontSize: 16 }} />
                  </IconButton>
                </Box>
              </label>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    backgroundColor: 'white',
                    '& fieldset': {
                      borderColor: '#e5e5e5',
                    },
                    '&:hover fieldset': {
                      borderColor: '#d4d4d4',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#1a1a1a',
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    backgroundColor: 'white',
                    '& fieldset': {
                      borderColor: '#e5e5e5',
                    },
                    '&:hover fieldset': {
                      borderColor: '#d4d4d4',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#1a1a1a',
                    },
                  },
                }}
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
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    backgroundColor: 'white',
                    '& fieldset': {
                      borderColor: '#e5e5e5',
                    },
                    '&:hover fieldset': {
                      borderColor: '#d4d4d4',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#1a1a1a',
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Contact"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    backgroundColor: 'white',
                    '& fieldset': {
                      borderColor: '#e5e5e5',
                    },
                    '&:hover fieldset': {
                      borderColor: '#d4d4d4',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#1a1a1a',
                    },
                  },
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 2 }}>
          <Button 
            onClick={handleClose} 
            sx={{ 
              color: '#666',
              textTransform: 'none',
              fontFamily: 'League Spartan, sans-serif',
              '&:hover': {
                backgroundColor: '#f5f5f5',
              },
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={() => handleProfileSave(formData)} 
            variant="contained"
            sx={{
              backgroundColor: '#1a1a1a',
              color: 'white',
              textTransform: 'none',
              fontFamily: 'League Spartan, sans-serif',
              borderRadius: '8px',
              px: 3,
              '&:hover': {
                backgroundColor: '#333',
              },
            }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default About;