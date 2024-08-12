import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, Input, Grid
} from '@mui/material';
import { Container, Sheet } from '@mui/joy';
import ProfileAvatar from '../common/ProfileAvatar';
import axiosInstance from '../../axiosInstance'; // Import the custom axios instance
import { useParams } from 'react-router-dom';
import { convertToBase64 } from '../../utils/convertToBase64';

const PartnerPage = () => {
    const { partnerId } = useParams();

  const [partnerData, setPartnerData] = useState(null);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(null);
  const [contactRequestSent, setContactRequestSent] = useState(false);

  useEffect(() => {
    const fetchPartnerData = async () => {
        if (isNaN(partnerId)) {
          console.error('Invalid partnerId:', partnerId);
          return;
        }
      
        try {
          const response = await axiosInstance.get(`/partners/${partnerId}`);
          setPartnerData(response.data);
          setFormData(response.data); // Initialize form data with fetched partner data
        } catch (error) {
          console.error('Error fetching partner data:', error);
        }
      };
      

    fetchPartnerData();
  }, [partnerId]);

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

  if (!partnerData) {
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
            imageUrl={convertToBase64(partnerData.profilePic)} 
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
                <Typography fontWeight="lg">{partnerData.likesCount}</Typography>
              </div>
              <div>
                <Typography level="body-xs" fontWeight="lg">
                  Contacted
                </Typography>
                <Typography fontWeight="lg">{partnerData.contactedCount}</Typography>
              </div>
            </Sheet> */}
            <Box sx={{ display: 'flex', gap: 1.5, mt: 2 }}>
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
      </Box>
    </Container>
  );
};

export default PartnerPage;
