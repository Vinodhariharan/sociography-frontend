import React, { useState, useEffect } from 'react';
import PartnerCard from './PartnerCard';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Skeleton,
  Stack,
  Divider,
  IconButton,
  Chip,
  Input,
  Sheet
} from '@mui/joy';
import { 
  Search, 
  FilterList, 
  Business, 
  LocationOn,
  Refresh
} from '@mui/icons-material';
import axiosInstance from '../../axiosInstance';
import { convertToBase64 } from '../../utils/convertToBase64';

const PartnerList = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  const fetchPartners = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get('/partners');
      setPartners(response.data);
    } catch (error) {
      console.error('Error fetching partners:', error);
      setError('Failed to load partners. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  const filteredPartners = partners.filter(partner =>
    partner.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    partner.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getImageUrl = (profilePic) => {
    const defaultImageUrl = '/default-image.jpg';
    return profilePic ? convertToBase64(profilePic) : defaultImageUrl;
  };

  const SkeletonCard = () => (
    <Card
      variant="outlined"
      sx={{
        backgroundColor: 'white',
        borderColor: '#e5e5e5',
        borderRadius: '12px',
        overflow: 'hidden',
        transition: 'all 0.2s ease',
        '&:hover': {
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          transform: 'translateY(-2px)',
        },
      }}
    >
      <Skeleton 
        variant="rectangular" 
        height={200} 
        sx={{ backgroundColor: '#f5f5f5' }}
      />
      <CardContent>
        <Stack spacing={2}>
          <Skeleton 
            variant="text" 
            width="70%" 
            height={28}
            sx={{ backgroundColor: '#f5f5f5' }}
          />
          <Skeleton 
            variant="text" 
            width="100%" 
            height={20}
            sx={{ backgroundColor: '#f5f5f5' }}
          />
          <Skeleton 
            variant="text" 
            width="85%" 
            height={20}
            sx={{ backgroundColor: '#f5f5f5' }}
          />
        </Stack>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ 
      minHeight: '100vh',
      backgroundColor: '#fafafa',
      py: 4
    }}>
      <Box sx={{ 
        maxWidth: '1200px', 
        mx: 'auto', 
        px: 3 
      }}>
        {/* Header Section */}
        <Box sx={{ mb: 4 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 2 }}
          >
            <Box>
              <Typography 
                level="h1" 
                sx={{ 
                  fontFamily: 'League Spartan, sans-serif',
                  fontWeight: 700,
                  color: '#1a1a1a',
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                  mb: 1
                }}
              >
                Partner Network
              </Typography>
              <Typography 
                level="body-lg" 
                sx={{ 
                  color: '#666',
                  fontFamily: 'League Spartan, sans-serif',
                  fontWeight: 400,
                  maxWidth: '600px'
                }}
              >
                Discover businesses actively seeking high-quality photography for their projects and campaigns.
              </Typography>
            </Box>
            
            <IconButton
              onClick={fetchPartners}
              disabled={loading}
              sx={{
                backgroundColor: 'white',
                border: '1px solid #e5e5e5',
                borderRadius: '8px',
                color: '#1a1a1a',
                '&:hover': {
                  backgroundColor: '#f9f9f9',
                  borderColor: '#d4d4d4',
                },
                '&:disabled': {
                  backgroundColor: '#f5f5f5',
                  color: '#ccc',
                },
              }}
            >
              <Refresh />
            </IconButton>
          </Stack>

          <Divider sx={{ borderColor: '#e5e5e5', mb: 3 }} />

          {/* Search and Filter Section */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            alignItems="center"
            sx={{ mb: 3 }}
          >
            <Box sx={{ flex: 1, minWidth: { xs: '100%', sm: '300px' } }}>
              <Input
                startDecorator={<Search sx={{ color: '#666' }} />}
                placeholder="Search partners by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e5e5',
                  borderRadius: '8px',
                  fontFamily: 'League Spartan, sans-serif',
                  '--Input-focusedThickness': '2px',
                  '--Input-focusedHighlight': '#1a1a1a',
                  '&:hover': {
                    borderColor: '#d4d4d4',
                  },
                }}
              />
            </Box>

            <Chip
              variant="outlined"
              startDecorator={<Business sx={{ fontSize: 16 }} />}
              sx={{
                backgroundColor: 'white',
                borderColor: '#e5e5e5',
                color: '#1a1a1a',
                fontFamily: 'League Spartan, sans-serif',
                fontWeight: 500,
                px: 2,
                py: 1,
              }}
            >
              {filteredPartners.length} Partner{filteredPartners.length !== 1 ? 's' : ''}
            </Chip>
          </Stack>
        </Box>

        {/* Error State */}
        {error && (
          <Card
            variant="outlined"
            sx={{
              backgroundColor: '#fff5f5',
              borderColor: '#fecaca',
              borderRadius: '8px',
              mb: 3,
            }}
          >
            <CardContent>
              <Typography 
                level="body-md" 
                sx={{ 
                  color: '#dc2626',
                  fontFamily: 'League Spartan, sans-serif',
                  textAlign: 'center'
                }}
              >
                {error}
              </Typography>
            </CardContent>
          </Card>
        )}

        {/* Partners Grid */}
        <Grid container spacing={3}>
          {loading ? (
            // Loading Skeletons
            [...Array(6)].map((_, index) => (
              <Grid xs={12} sm={6} md={4} key={index}>
                <SkeletonCard />
              </Grid>
            ))
          ) : filteredPartners.length === 0 ? (
            // Empty State
            <Grid xs={12}>
              <Card
                variant="outlined"
                sx={{
                  backgroundColor: 'white',
                  borderColor: '#e5e5e5',
                  borderRadius: '12px',
                  p: 6,
                  textAlign: 'center',
                }}
              >
                <Stack spacing={2} alignItems="center">
                  <Business 
                    sx={{ 
                      fontSize: 64, 
                      color: '#d4d4d4' 
                    }} 
                  />
                  <Typography 
                    level="h3" 
                    sx={{ 
                      fontFamily: 'League Spartan, sans-serif',
                      fontWeight: 600,
                      color: '#1a1a1a'
                    }}
                  >
                    No Partners Found
                  </Typography>
                  <Typography 
                    level="body-lg" 
                    sx={{ 
                      color: '#666',
                      fontFamily: 'League Spartan, sans-serif',
                      maxWidth: '400px'
                    }}
                  >
                    {searchTerm 
                      ? `No partners match "${searchTerm}". Try adjusting your search terms.`
                      : 'No partners are currently available. Check back later for new opportunities.'
                    }
                  </Typography>
                  {searchTerm && (
                    <Box sx={{ mt: 2 }}>
                      <Typography
                        level="body-sm"
                        sx={{
                          color: '#1a1a1a',
                          fontFamily: 'League Spartan, sans-serif',
                          cursor: 'pointer',
                          textDecoration: 'underline',
                          '&:hover': {
                            color: '#333',
                          },
                        }}
                        onClick={() => setSearchTerm('')}
                      >
                        Clear search
                      </Typography>
                    </Box>
                  )}
                </Stack>
              </Card>
            </Grid>
          ) : (
            // Partners List
            filteredPartners.map((partner) => (
              <Grid xs={12} key={partner.id}>
                <Card
                  variant="outlined"
                  sx={{
                    backgroundColor: 'white',
                    borderColor: '#e5e5e5',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                      transform: 'translateY(-2px)',
                      borderColor: '#d4d4d4',
                    },
                  }}
                >
                  <PartnerCard
                    title={partner.name}
                    description={partner.description}
                    imageUrl={getImageUrl(partner.profilePic)}
                    id={partner.id}
                  />
                </Card>
              </Grid>
            ))
          )}
        </Grid>

        {/* Footer Info */}
        {!loading && filteredPartners.length > 0 && (
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography 
              level="body-sm" 
              sx={{ 
                color: '#999',
                fontFamily: 'League Spartan, sans-serif'
              }}
            >
              Showing {filteredPartners.length} of {partners.length} partners
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default PartnerList;