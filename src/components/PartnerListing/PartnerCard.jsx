import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Avatar,
  Stack,
  Chip,
  IconButton,
  Divider,
  AspectRatio
} from '@mui/joy';
import {
  Business,
  LocationOn,
  Cable,
  ArrowForward,
  Favorite,
  FavoriteBorder,
  Share,
  MoreVert
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const PartnerCard = ({ title, description, imageUrl, id }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  if (!title || !description || !imageUrl) {
    return (
      <Card
        variant="outlined"
        sx={{
          backgroundColor: '#fff5f5',
          borderColor: '#fecaca',
          borderRadius: '12px',
          p: 3,
          textAlign: 'center',
        }}
      >
        <Typography 
          level="body-md" 
          sx={{ 
            color: '#dc2626',
            fontFamily: 'League Spartan, sans-serif'
          }}
        >
          Error: Missing partner information
        </Typography>
      </Card>
    );
  }

  const handleConnect = async () => {
    setIsConnecting(true);
    // Simulate API call
    setTimeout(() => {
      setIsConnecting(false);
      // Add success feedback here
    }, 1000);
  };

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  const handleShare = () => {
    // Implement share functionality
    if (navigator.share) {
      navigator.share({
        title: title,
        text: description,
        url: window.location.href,
      });
    }
  };

  return (
    <Card
      variant="outlined"
      sx={{
        backgroundColor: 'white',
        borderColor: '#e5e5e5',
        borderRadius: '12px',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        position: 'relative',
        '&:hover': {
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          transform: 'translateY(-4px)',
          borderColor: '#d4d4d4',
        },
      }}
    >
      <Box sx={{ position: 'relative' }}>
        {/* Header with Avatar and Actions */}
        <Box sx={{ 
          p: 3, 
          pb: 2,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between'
        }}>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ flex: 1 }}>
            <Box sx={{ position: 'relative' }}>
              <Avatar
                src={imageUrl}
                alt={title}
                sx={{
                  width: 80,
                  height: 80,
                  border: '3px solid white',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  backgroundColor: '#f5f5f5',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: -2,
                  right: -2,
                  width: 20,
                  height: 20,
                  backgroundColor: '#10b981',
                  borderRadius: '50%',
                  border: '2px solid white',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }}
              />
            </Box>
            
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography 
                level="h3" 
                sx={{ 
                  fontFamily: 'League Spartan, sans-serif',
                  fontWeight: 700,
                  color: '#1a1a1a',
                  mb: 0.5,
                  fontSize: '1.5rem',
                  lineHeight: 1.2
                }}
              >
                {title}
              </Typography>
              <Chip
                variant="outlined"
                startDecorator={<Business sx={{ fontSize: 14 }} />}
                size="sm"
                sx={{
                  backgroundColor: '#f9f9f9',
                  borderColor: '#e5e5e5',
                  color: '#666',
                  fontFamily: 'League Spartan, sans-serif',
                  fontWeight: 500,
                  fontSize: '0.75rem',
                }}
              >
                Partner
              </Chip>
            </Box>
          </Stack>

          <Stack direction="row" spacing={1}>
            <IconButton
              variant="plain"
              size="sm"
              onClick={handleFavorite}
              sx={{
                color: isFavorited ? '#ef4444' : '#666',
                backgroundColor: isFavorited ? '#fef2f2' : '#f9f9f9',
                border: '1px solid',
                borderColor: isFavorited ? '#fecaca' : '#e5e5e5',
                borderRadius: '6px',
                '&:hover': {
                  backgroundColor: isFavorited ? '#fee2e2' : '#f5f5f5',
                },
              }}
            >
              {isFavorited ? <Favorite sx={{ fontSize: 16 }} /> : <FavoriteBorder sx={{ fontSize: 16 }} />}
            </IconButton>
            
            <IconButton
              variant="plain"
              size="sm"
              onClick={handleShare}
              sx={{
                color: '#666',
                backgroundColor: '#f9f9f9',
                border: '1px solid #e5e5e5',
                borderRadius: '6px',
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                },
              }}
            >
              <Share sx={{ fontSize: 16 }} />
            </IconButton>
          </Stack>
        </Box>

        <Divider sx={{ borderColor: '#f0f0f0' }} />

        {/* Content */}
        <CardContent sx={{ p: 3, pt: 2 }}>
          <Typography 
            level="body-md" 
            sx={{ 
              color: '#555',
              fontFamily: 'League Spartan, sans-serif',
              fontWeight: 400,
              lineHeight: 1.6,
              mb: 3,
              fontSize: '1rem',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {description}
          </Typography>

          {/* Action Buttons */}
          <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
            <Button
              variant="solid"
              loading={isConnecting}
              loadingPosition="start"
              startDecorator={!isConnecting && <Cable sx={{ fontSize: 18 }} />}
              onClick={handleConnect}
              sx={{
                flex: 1,
                backgroundColor: '#1a1a1a',
                color: 'white',
                fontFamily: 'League Spartan, sans-serif',
                fontWeight: 600,
                textTransform: 'none',
                borderRadius: '8px',
                py: 1.5,
                fontSize: '0.95rem',
                '&:hover': {
                  backgroundColor: '#333',
                },
                '&:disabled': {
                  backgroundColor: '#ccc',
                },
              }}
            >
              {isConnecting ? 'Connecting...' : 'Connect'}
            </Button>

            <Button
              variant="outlined"
              component={Link}
              to={`/partner-profile/${id}`}
              endDecorator={<ArrowForward sx={{ fontSize: 16 }} />}
              sx={{
                flex: 1,
                backgroundColor: 'white',
                color: '#1a1a1a',
                borderColor: '#e5e5e5',
                fontFamily: 'League Spartan, sans-serif',
                fontWeight: 600,
                textTransform: 'none',
                borderRadius: '8px',
                py: 1.5,
                fontSize: '0.95rem',
                '&:hover': {
                  backgroundColor: '#f9f9f9',
                  borderColor: '#d4d4d4',
                },
              }}
            >
              Learn More
            </Button>
          </Stack>
        </CardContent>

        {/* Status Indicator */}
        <Box
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            backgroundColor: '#10b981',
            color: 'white',
            borderRadius: '12px',
            px: 2,
            py: 0.5,
            fontSize: '0.75rem',
            fontFamily: 'League Spartan, sans-serif',
            fontWeight: 600,
            boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)',
          }}
        >
          Active
        </Box>
      </Box>
    </Card>
  );
};

PartnerCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default PartnerCard;