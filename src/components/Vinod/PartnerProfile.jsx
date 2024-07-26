import React from 'react';
import { Box, Typography, Button, Sheet, Divider } from '@mui/joy';
import ProfileAvatar from './ProfileAvatar';

const PartnerProfile = () => {
  // Example partner data
  const partnerData = {
    imageUrl: '/partnerpic.jpg',
    name: 'Alex Morrison',
    tagline: 'Professional Charity Holder | Landscape & Portrait Specialist',
    likesCount: 125,
    contactedCount: 45,
    address: '123 Partner Street, City, Country',
    website: 'https://partnerwebsite.com',
    description: 'Alex is a highly skilled photographer specializing in landscape and portrait photography. Known for captivating images and professional services.',
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          mb: 4,
          borderBottom: '2px solid',
          borderColor: 'background.level1',
          pb: 2,
        }}
      >
        <ProfileAvatar 
            imageUrl={partnerData.imageUrl} 
            altText={`${partnerData.name}'s Profile Picture`} 
            sx={{ width: 182, height: 182 }} // Adjust size as needed
          />
        <Box sx={{ flex: 1 }}>
          <Typography fontSize="xl" fontWeight="lg">
            {partnerData.name}
          </Typography>
          <Typography variant="h6" sx={{ mb: 1, color: 'text.secondary' }}>
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
        </Box>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
          Description
        </Typography>
        <Typography variant="body2">
          {partnerData.description}
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
          Address
        </Typography>
        <Typography variant="body2">
          {partnerData.address}
        </Typography>
      </Box>

      <Box>
        <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
          Website
        </Typography>
        <Typography variant="body2">
          <a href={partnerData.website} target="_blank" rel="noopener noreferrer">
            {partnerData.website}
          </a>
        </Typography>
      </Box>
    </Box>
  );
};

export default PartnerProfile;
