import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Input,
  Modal,
  ModalClose,
  ModalDialog,
  Sheet,
  Stack,
  Typography,
  Avatar,
  IconButton,
  Chip,
  Link,
  FormControl,
  FormLabel,
  Textarea,
} from '@mui/joy';
import { Edit, Globe, MapPin, Heart, MessageCircle, Camera } from 'lucide-react';
import { useAuth } from '../AuthContext';
import axiosInstance from '../../axiosInstance';
import { convertToBase64 } from '../../utils/convertToBase64';

const PartnerProfile = () => {
  const { authState } = useAuth();
  const [partnerData, setPartnerData] = useState(null);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(null);
  const [contactRequestSent, setContactRequestSent] = useState(false);

  useEffect(() => {
    const fetchPartnerData = async () => {
      try {
        if (authState.photographerId) {
          const response = await axiosInstance.get(`/partners/${authState.photographerId}`);
          setPartnerData(response.data);
          setFormData(response.data);
        }
      } catch (error) {
        console.error('Error fetching partner data:', error);
      }
    };

    fetchPartnerData();
  }, [authState.photographerId]);

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

  const handleSave = async () => {
    try {
      // Update partner data via API
      await axiosInstance.put(`/partners/${authState.photographerId}`, formData);
      setPartnerData(formData);
      console.log('Profile updated successfully');
      handleClose();
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (!partnerData) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
          <Typography level="h4" sx={{ color: 'neutral.500' }}>
            Loading...
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header Section */}
      <Card 
        variant="outlined" 
        sx={{ 
          mb: 4, 
          backgroundColor: 'background.surface',
          borderColor: 'neutral.200',
          boxShadow: 'sm'
        }}
      >
        <CardContent>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} alignItems="flex-start">
            {/* Profile Avatar */}
            <Box sx={{ position: 'relative' }}>
              <Avatar
                src={convertToBase64(partnerData.profilePic)}
                alt={`${partnerData.name}'s Profile Picture`}
                sx={{
                  width: 160,
                  height: 160,
                  border: '4px solid',
                  borderColor: 'neutral.200',
                  boxShadow: 'md'
                }}
              />
              <IconButton
                size="sm"
                variant="solid"
                color="neutral"
                sx={{
                  position: 'absolute',
                  bottom: 8,
                  right: 8,
                  backgroundColor: 'background.surface',
                  border: '2px solid',
                  borderColor: 'neutral.200',
                  '&:hover': {
                    backgroundColor: 'neutral.50'
                  }
                }}
              >
                <Camera size={16} />
              </IconButton>
            </Box>

            {/* Profile Info */}
            <Box sx={{ flex: 1 }}>
              <Stack spacing={2}>
                <Box>
                  <Typography 
                    level="h2" 
                    sx={{ 
                      fontFamily: 'League Spartan, sans-serif', 
                      fontWeight: 700,
                      color: 'neutral.900',
                      mb: 0.5
                    }}
                  >
                    {partnerData.name}
                  </Typography>
                  <Typography 
                    level="title-md" 
                    sx={{ 
                      color: 'neutral.600',
                      fontFamily: 'League Spartan, sans-serif'
                    }}
                  >
                    {partnerData.tagline}
                  </Typography>
                </Box>

                {/* Stats */}
                <Sheet
                  variant="outlined"
                  sx={{
                    backgroundColor: 'neutral.50',
                    borderRadius: 'md',
                    p: 2,
                    borderColor: 'neutral.200'
                  }}
                >
                  <Grid container spacing={3}>
                    <Grid xs={6} sm={3}>
                      <Stack alignItems="center" spacing={0.5}>
                        <Heart size={20} color="#666" />
                        <Typography level="h4" sx={{ color: 'neutral.900' }}>
                          {partnerData.likesCount || 0}
                        </Typography>
                        <Typography level="body-sm" sx={{ color: 'neutral.600' }}>
                          Likes
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid xs={6} sm={3}>
                      <Stack alignItems="center" spacing={0.5}>
                        <MessageCircle size={20} color="#666" />
                        <Typography level="h4" sx={{ color: 'neutral.900' }}>
                          {partnerData.contactedCount || 0}
                        </Typography>
                        <Typography level="body-sm" sx={{ color: 'neutral.600' }}>
                          Contacted
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid xs={12} sm={6}>
                      <Stack alignItems="center" spacing={0.5}>
                        <Chip
                          variant="soft"
                          color="neutral"
                          size="sm"
                          sx={{
                            backgroundColor: 'neutral.100',
                            color: 'neutral.800',
                            borderColor: 'neutral.300'
                          }}
                        >
                          Professional Photographer
                        </Chip>
                      </Stack>
                    </Grid>
                  </Grid>
                </Sheet>

                {/* Action Buttons */}
                <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                  <Button 
                    variant="solid" 
                    color="neutral"
                    startDecorator={<Edit size={16} />}
                    onClick={handleClickOpen}
                    sx={{ 
                      fontFamily: 'League Spartan, sans-serif',
                      backgroundColor: 'neutral.900',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'neutral.800'
                      }
                    }}
                  >
                    Edit Profile
                  </Button>
                  <Button
                    variant="outlined"
                    color="neutral"
                    onClick={handleContactRequest}
                    disabled={contactRequestSent}
                    sx={{ 
                      fontFamily: 'League Spartan, sans-serif',
                      borderColor: 'neutral.300',
                      color: 'neutral.700',
                      '&:hover': {
                        backgroundColor: 'neutral.50'
                      }
                    }}
                  >
                    {contactRequestSent ? 'Request Sent' : 'Contact Request'}
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {/* Content Sections */}
      <Stack spacing={4}>
        {/* Description */}
        <Card 
          variant="outlined" 
          sx={{ 
            backgroundColor: 'background.surface',
            borderColor: 'neutral.200',
            boxShadow: 'sm'
          }}
        >
          <CardContent>
            <Typography 
              level="h3" 
              sx={{ 
                fontFamily: 'League Spartan, sans-serif', 
                fontWeight: 600,
                color: 'neutral.900',
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              About Me
            </Typography>
            <Divider sx={{ mb: 3, borderColor: 'neutral.200' }} />
            <Typography 
              level="body-md" 
              sx={{ 
                color: 'neutral.700',
                lineHeight: 1.7,
                fontSize: '1rem'
              }}
            >
              {partnerData.description}
            </Typography>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Grid container spacing={3}>
          <Grid xs={12} md={6}>
            <Card 
              variant="outlined" 
              sx={{ 
                backgroundColor: 'background.surface',
                borderColor: 'neutral.200',
                boxShadow: 'sm',
                height: 'fit-content'
              }}
            >
              <CardContent>
                <Typography 
                  level="h4" 
                  sx={{ 
                    fontFamily: 'League Spartan, sans-serif', 
                    fontWeight: 600,
                    color: 'neutral.900',
                    mb: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  <MapPin size={20} />
                  Location
                </Typography>
                <Divider sx={{ mb: 3, borderColor: 'neutral.200' }} />
                <Typography 
                  level="body-md" 
                  sx={{ 
                    color: 'neutral.700',
                    lineHeight: 1.6
                  }}
                >
                  {partnerData.address}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid xs={12} md={6}>
            <Card 
              variant="outlined" 
              sx={{ 
                backgroundColor: 'background.surface',
                borderColor: 'neutral.200',
                boxShadow: 'sm',
                height: 'fit-content'
              }}
            >
              <CardContent>
                <Typography 
                  level="h4" 
                  sx={{ 
                    fontFamily: 'League Spartan, sans-serif', 
                    fontWeight: 600,
                    color: 'neutral.900',
                    mb: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  <Globe size={20} />
                  Website
                </Typography>
                <Divider sx={{ mb: 3, borderColor: 'neutral.200' }} />
                <Link 
                  href={partnerData.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  sx={{ 
                    color: 'neutral.700',
                    textDecoration: 'none',
                    '&:hover': {
                      color: 'neutral.900',
                      textDecoration: 'underline'
                    }
                  }}
                >
                  {partnerData.website}
                </Link>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Stack>

      {/* Edit Profile Modal */}
      <Modal open={open} onClose={handleClose}>
        <ModalDialog
          variant="outlined"
          sx={{
            maxWidth: '600px',
            width: '90vw',
            maxHeight: '90vh',
            overflow: 'auto',
            backgroundColor: 'background.surface',
            borderColor: 'neutral.200'
          }}
        >
          <ModalClose />
          <Typography 
            level="h4" 
            sx={{ 
              fontFamily: 'League Spartan, sans-serif',
              fontWeight: 600,
              color: 'neutral.900',
              mb: 3
            }}
          >
            Edit Profile
          </Typography>
          
          <Stack spacing={3}>
            <FormControl>
              <FormLabel sx={{ color: 'neutral.700', fontWeight: 500 }}>Name</FormLabel>
              <Input
                name="name"
                value={formData?.name || ''}
                onChange={handleChange}
                variant="outlined"
                sx={{ 
                  backgroundColor: 'background.surface',
                  borderColor: 'neutral.300',
                  '&:hover': {
                    borderColor: 'neutral.400'
                  }
                }}
              />
            </FormControl>

            <FormControl>
              <FormLabel sx={{ color: 'neutral.700', fontWeight: 500 }}>Tagline</FormLabel>
              <Input
                name="tagline"
                value={formData?.tagline || ''}
                onChange={handleChange}
                variant="outlined"
                sx={{ 
                  backgroundColor: 'background.surface',
                  borderColor: 'neutral.300',
                  '&:hover': {
                    borderColor: 'neutral.400'
                  }
                }}
              />
            </FormControl>

            <FormControl>
              <FormLabel sx={{ color: 'neutral.700', fontWeight: 500 }}>Description</FormLabel>
              <Textarea
                name="description"
                value={formData?.description || ''}
                onChange={handleChange}
                minRows={4}
                variant="outlined"
                sx={{ 
                  backgroundColor: 'background.surface',
                  borderColor: 'neutral.300',
                  '&:hover': {
                    borderColor: 'neutral.400'
                  }
                }}
              />
            </FormControl>

            <FormControl>
              <FormLabel sx={{ color: 'neutral.700', fontWeight: 500 }}>Address</FormLabel>
              <Input
                name="address"
                value={formData?.address || ''}
                onChange={handleChange}
                variant="outlined"
                sx={{ 
                  backgroundColor: 'background.surface',
                  borderColor: 'neutral.300',
                  '&:hover': {
                    borderColor: 'neutral.400'
                  }
                }}
              />
            </FormControl>

            <FormControl>
              <FormLabel sx={{ color: 'neutral.700', fontWeight: 500 }}>Website</FormLabel>
              <Input
                name="website"
                value={formData?.website || ''}
                onChange={handleChange}
                variant="outlined"
                sx={{ 
                  backgroundColor: 'background.surface',
                  borderColor: 'neutral.300',
                  '&:hover': {
                    borderColor: 'neutral.400'
                  }
                }}
              />
            </FormControl>

            <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
              <Button 
                variant="outlined" 
                color="neutral"
                onClick={handleClose}
                sx={{ 
                  flex: 1,
                  borderColor: 'neutral.300',
                  color: 'neutral.700',
                  '&:hover': {
                    backgroundColor: 'neutral.50'
                  }
                }}
              >
                Cancel
              </Button>
              <Button 
                variant="solid" 
                color="neutral"
                onClick={handleSave}
                sx={{ 
                  flex: 1,
                  backgroundColor: 'neutral.900',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'neutral.800'
                  }
                }}
              >
                Save Changes
              </Button>
            </Stack>
          </Stack>
        </ModalDialog>
      </Modal>
    </Container>
  );
};

export default PartnerProfile;