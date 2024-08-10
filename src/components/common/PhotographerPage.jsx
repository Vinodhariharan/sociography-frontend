import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, Input, Grid, Divider
} from '@mui/material';
import { Container, Sheet } from '@mui/joy';
import ProfileAvatar from '../common/ProfileAvatar';
import DribbbleShot from '../common/Post/DribbbleShot';
import { convertToBase64 } from '../../utils/convertToBase64';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../axiosInstance'; // Import the custom axios instance
import { useAuth } from '../AuthContext';

const PhotographerPage = () => {
  const { photographerId } = useParams();

  const [profileData, setProfileData] = useState(null);
  const [images, setImages] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [contactRequestSent, setContactRequestSent] = useState(false);

  const {authState} = useAuth();

  useEffect(() => {
    if (!photographerId) return;

    // Fetch profile data
    axiosInstance.get(`/photographers/${photographerId}/profile`)
      .then(response => {
        setProfileData(response.data);
        setFormData(response.data);
        console.log(response);
      })
      .catch(error => console.error('Error fetching profile data:', error));

    // Fetch images
    axiosInstance.get(`/photographers/pictures/${photographerId}`)
      .then(response => {
        const imagesWithBase64 = response.data.map(image => ({
          ...image,
          picture: convertToBase64(image.picture)
        }));
        setImages(imagesWithBase64);
      })
      .catch(error => console.error('Error fetching pictures:', error));
  }, [photographerId]);

  const handleContactRequest = () => {
    setContactRequestSent(true);
    console.log('Contact request sent');
  };

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
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
            imageUrl={`data:image/png;base64,${profileData.profilePic}`} 
            altText="Profile Picture" 
            sx={{ width: 182, height: 182 }} 
          />
          <Box sx={{ flex: 1 }}>
            <Typography 
              variant="h3" 
              sx={{ fontFamily: 'League Spartan, sans-serif', fontWeight: 'bold' }}
            >
              {profileData.name}
            </Typography>
            <Typography 
              variant="subtitle1" 
              color="text.secondary"
              sx={{ fontFamily: 'League Spartan, sans-serif' }}
            >
              {profileData.selfInfo}
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
              {/* <div>
                <Typography level="body-xs" fontWeight="lg">
                  Likes
                </Typography>
                <Typography fontWeight="lg">{profileData.totalLikes}</Typography>
              </div> */}
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
            </Sheet>
            <Box sx={{ display: 'flex', gap: 1.5, mt: 2 }}>
            <>
      {authState.mode !== 'photographer' && (
        <Button
          variant="contained"
          color="secondary"
          onClick={handleContactRequest}
          disabled={contactRequestSent}
          sx={{ fontFamily: 'League Spartan, sans-serif' }}
        >
          {contactRequestSent ? 'Request Sent' : 'Contact Request'}
        </Button>
      )}
    </>
    <>
      {authState.mode !== 'partner' && (
        <Button
          variant="contained"
          color="primary"
        //   onClick={handleFollow}
          sx={{ fontFamily: 'League Spartan, sans-serif' }}
        >
          Follow
        </Button>
      )}
    </>
            </Box>
          </Box>
        </Box>


        <Grid container spacing={2}>
          {images.map((image) => (
            <Grid item xs={12} sm={6} md={4} key={image.id}>
              <DribbbleShot
                id={image.id}
                image={image.picture}
                description={image.description}
                location={image.location}
                date={image.date}
                likes={image.likes}
                author={profileData.name}
                avatar={`data:image/png;base64,${profileData.profilePic}`}
                category={image.category}
                initialComments={image.comments}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default PhotographerPage;
