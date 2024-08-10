  // import React from 'react';
  // import PartnerCard from './PartnerCard';
  // import { Grid, Container, Box } from '@mui/material';
  // import { Typography } from '@mui/joy';

  // const partners = [
  //   {
  //     id: 4,
  //     title: 'Luna Café',
  //     description: 'Seeking vibrant images that capture the essence of our cozy ambiance.',
  //     imageUrl: '/cafe.webp',
  //   },
  //   {
  //     id: 5,
  //     title: 'Oceanic Adventures',
  //     description: 'Looking for dynamic shots of thrilling water sports and oceanic landscapes.',
  //     imageUrl: '/ocean.jpg',
  //   },
  //   {
  //     id: 6,
  //     title: 'Urban Threads',
  //     description: 'In search of stylish photographs showcasing our latest fashion collections.',
  //     imageUrl: '/threads.jpg',
  //   },
  //   {
  //     id: 7,
  //     title: 'Green Leaf Botanicals',
  //     description: 'Searching for high-quality images of lush gardens and exotic plants.',
  //     imageUrl: '/botanicals.png',
  //   },
  //   {
  //     id: 8,
  //     title: 'Rustic Retreats',
  //     description: 'Looking for captivating images of rustic interiors and peaceful countryside settings.',
  //     imageUrl: '/rustic.jpg',
  //   },
  // ];

  // const PartnerList = () => {
  //   return (
  //     <div>
  //       <Typography fontWeight='500' level='h1' sx={{ mb: 2 }}>
  //         Partner Listing
  //       </Typography>
  //       <Grid container spacing={4} sx={{ mb: 2 }}>
  //         {partners.map(partner => (
  //           <Grid item xs={12} sm={6} md={4} lg={3} key={partner.id}>
  //             <PartnerCard
  //               title={partner.title}
  //               description={partner.description}
  //               imageUrl={partner.imageUrl}
  //             />
  //           </Grid>
  //         ))}
  //       </Grid>
  //       </div>
  //   );
  // };

  // export default PartnerList;
  import React, { useState, useEffect } from 'react';
import PartnerCard from './PartnerCard';
import { Grid } from '@mui/material';
import { Typography } from '@mui/joy';
import axiosInstance from '../../axiosInstance'; // Import the custom axios instance
import { convertToBase64 } from '../../utils/convertToBase64';

const PartnerList = () => {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await axiosInstance.get('/partners'); // Use the axios instance
        setPartners(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching partners:', error);
      }
    };

    fetchPartners();
  }, []);

  const getImageUrl = (profilePic) => {
    // Define a default image URL or return null if none
    const defaultImageUrl = '/default-image.jpg';
    return profilePic ? profilePic : defaultImageUrl;
  };

  return (
    <div>
      <Typography fontWeight='500' level='h1' sx={{ mb: 2 }}>
        Partner Listing
      </Typography>
      <Grid container spacing={4} sx={{ mb: 2 }}>
        {partners.map(partner => (
          <Grid item xs={12} key={partner.id}>
            <PartnerCard
              title={partner.name}
              description={partner.description}
              imageUrl={convertToBase64(partner.profilePic)}
              id={partner.id}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default PartnerList;
