import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
  Avatar,
  Chip,
  Link,
  Alert,
} from '@mui/joy';
import { 
  Globe, 
  MapPin, 
  Heart, 
  MessageCircle, 
  Camera, 
  Mail, 
  Phone,
  CheckCircle,
  Clock
} from 'lucide-react';
import axiosInstance from '../../axiosInstance';
import { useParams } from 'react-router-dom';
import { convertToBase64 } from '../../utils/convertToBase64';

const PartnerPage = () => {
  const { partnerId } = useParams();
  const [partnerData, setPartnerData] = useState(null);
  const [contactRequestSent, setContactRequestSent] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPartnerData = async () => {
      if (isNaN(partnerId)) {
        setError('Invalid partner ID');
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/partners/${partnerId}`);
        setPartnerData(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching partner data:', error);
        setError('Failed to load partner information');
      } finally {
        setLoading(false);
      }
    };

    fetchPartnerData();
  }, [partnerId]);

  const handleContactRequest = async () => {
    try {
      // Add API call to send contact request
      // await axiosInstance.post(`/partners/${partnerId}/contact`);
      setContactRequestSent(true);
      console.log('Contact request sent');
    } catch (error) {
      console.error('Error sending contact request:', error);
    }
  };

  if (loading) {
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

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert color="danger" variant="soft">
          {error}
        </Alert>
      </Container>
    );
  }

  if (!partnerData) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert color="warning" variant="soft">
          Partner not found
        </Alert>
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
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 8,
                  right: 8,
                  backgroundColor: 'background.surface',
                  borderRadius: '50%',
                  p: 1,
                  border: '2px solid',
                  borderColor: 'neutral.200',
                  boxShadow: 'sm'
                }}
              >
                <Camera size={16} color="#666" />
              </Box>
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
                <Box
                  sx={{
                    backgroundColor: 'neutral.50',
                    borderRadius: 'md',
                    p: 2,
                    border: '1px solid',
                    borderColor: 'neutral.200'
                  }}
                >
                  <Grid container spacing={3}>
                    <Grid xs={6} sm={4}>
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
                    <Grid xs={6} sm={4}>
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
                    <Grid xs={12} sm={4}>
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
                </Box>

                {/* Contact Request Status */}
                {contactRequestSent && (
                  <Alert 
                    color="success" 
                    variant="soft"
                    startDecorator={<CheckCircle size={20} />}
                    sx={{ mt: 2 }}
                  >
                    Contact request sent successfully!
                  </Alert>
                )}

                {/* Action Buttons */}
                <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                  <Button
                    variant="solid"
                    color="neutral"
                    startDecorator={contactRequestSent ? <CheckCircle size={16} /> : <Mail size={16} />}
                    onClick={handleContactRequest}
                    disabled={contactRequestSent}
                    sx={{ 
                      fontFamily: 'League Spartan, sans-serif',
                      backgroundColor: contactRequestSent ? 'success.500' : 'neutral.900',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: contactRequestSent ? 'success.600' : 'neutral.800'
                      },
                      '&:disabled': {
                        backgroundColor: 'success.500',
                        color: 'white'
                      }
                    }}
                  >
                    {contactRequestSent ? 'Request Sent' : 'Send Contact Request'}
                  </Button>
                  
                  <Button
                    variant="outlined"
                    color="neutral"
                    startDecorator={<Heart size={16} />}
                    sx={{ 
                      fontFamily: 'League Spartan, sans-serif',
                      borderColor: 'neutral.300',
                      color: 'neutral.700',
                      '&:hover': {
                        backgroundColor: 'neutral.50'
                      }
                    }}
                  >
                    Save to Favorites
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
              About {partnerData.name}
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

        {/* Additional Information */}
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
              level="h4" 
              sx={{ 
                fontFamily: 'League Spartan, sans-serif', 
                fontWeight: 600,
                color: 'neutral.900',
                mb: 2
              }}
            >
              Quick Info
            </Typography>
            <Divider sx={{ mb: 3, borderColor: 'neutral.200' }} />
            
            <Grid container spacing={3}>
              <Grid xs={12} sm={6}>
                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Clock size={16} color="#666" />
                    <Typography level="body-sm" fontWeight="600" sx={{ color: 'neutral.700' }}>
                      Response Time:
                    </Typography>
                    <Typography level="body-sm" sx={{ color: 'neutral.600' }}>
                      Usually within 24 hours
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <MessageCircle size={16} color="#666" />
                    <Typography level="body-sm" fontWeight="600" sx={{ color: 'neutral.700' }}>
                      Availability:
                    </Typography>
                    <Chip 
                      variant="soft" 
                      color="success" 
                      size="sm"
                      sx={{ backgroundColor: 'success.50', color: 'success.700' }}
                    >
                      Available
                    </Chip>
                  </Box>
                </Stack>
              </Grid>
              
              <Grid xs={12} sm={6}>
                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Camera size={16} color="#666" />
                    <Typography level="body-sm" fontWeight="600" sx={{ color: 'neutral.700' }}>
                      Specialization:
                    </Typography>
                    <Typography level="body-sm" sx={{ color: 'neutral.600' }}>
                      Portrait & Landscape
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Heart size={16} color="#666" />
                    <Typography level="body-sm" fontWeight="600" sx={{ color: 'neutral.700' }}>
                      Rating:
                    </Typography>
                    <Typography level="body-sm" sx={{ color: 'neutral.600' }}>
                      4.9/5 (based on {partnerData.likesCount || 0} likes)
                    </Typography>
                  </Box>
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Stack>
    </Container>
  );
};

export default PartnerPage;