import React, { useState } from 'react';
import Box from '@mui/joy/Box';
import PostCard from './PostCard'; // Adjust the path as necessary
import DribbbleShotDialog from './DribbbleShotDialog'; // Adjust the path as necessary
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/material/Button';
import { Avatar } from '@mui/material';

const sampleData = [
  {
    id: 1,
    src: '/image1.jpg', // Ensure this path is correct
    description: 'A majestic mountain range covered in snow.',
    location: 'Location 1',
    date: 'July 27, 2024',
    likes: 155,
    author: 'Photographer 1',
    avatar: '/profilepic1.jpg', // Ensure this path is correct
    category: 'Mountain',
    comments: [{ user: 'User1', text: 'Beautiful scenery!' }]
  },
  {
    id: 2,
    src: '/image2.jpg', // Ensure this path is correct
    description: 'A serene lake surrounded by trees.',
    location: 'Location 2',
    date: 'July 26, 2024',
    likes: 120,
    author: 'Photographer 2',
    avatar: '/profilepic2.jpg', // Ensure this path is correct
    category: 'Nature',
    comments: [{ user: 'User2', text: 'So peaceful!' }]
  },
  {
    id: 3,
    src: '/image3.jpg',
    description: 'A close-up of a beautiful flower.',
    location: 'Location 3',
    date: 'July 22, 2024',
    likes: 150,
    author: 'Photographer 3',
    avatar: '/profilepic1p.jpg',
    category: 'Floral',
    comments: [{ user: 'User3', text: 'Inspiring work!' }]
  },
  {
    id: 4,
    src: '/image4.jpg',
    description: 'A serene landscape with a river.',
    location: 'Location 4',
    date: 'July 23, 2024',
    likes: 110,
    author: 'Photographer 4',
    avatar: '/profilepic1p.jpg',
    category: 'Landscape',
    comments: [{ user: 'User4', text: 'Lovely composition!' }]
  },
  {
    id: 5,
    src: '/image5.jpg',
    description: 'A bustling city street at night.',
    location: 'Location 5',
    date: 'July 24, 2024',
    likes: 132,
    author: 'Photographer 5',
    avatar: '/profilepic1p.jpg',
    category: 'Urban',
    comments: [{ user: 'User5', text: 'Awesome!' }]
  },
  {
    id: 6,
    src: '/image6.jpg',
    description: 'A tranquil beach with crystal-clear water.',
    location: 'Location 6',
    date: 'July 25, 2024',
    likes: 145,
    author: 'Photographer 6',
    avatar: '/profilepic1p.jpg',
    category: 'Beach',
    comments: [{ user: 'User6', text: 'Wonderful!' }]
  },
  {
    id: 7,
    src: '/image7.jpg',
    description: 'An artistic black and white portrait.',
    location: 'Location 7',
    date: 'July 26, 2024',
    likes: 120,
    author: 'Photographer 7',
    avatar: '/profilepic1p.jpg',
    category: 'Portrait',
    comments: [{ user: 'User7', text: 'Excellent!' }]
  },
  // Add more sample data as needed
];

const dummyRequests = [
  {
    avatar: '/default-avatar1.jpg', // Ensure this path is correct
    name: 'Creative User 1',
  },
  {
    avatar: '/default-avatar2.jpg', // Ensure this path is correct
    name: 'Creative User 2',
  },
  {
    avatar: '/default-avatar3.jpg', // Ensure this path is correct
    name: 'Creative User 3',
  },
  {
    avatar: '/default-avatar4.jpg', // Ensure this path is correct
    name: 'Creative User 4',
  },
];

const SocialMediaFeed = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedRequests, setSelectedRequests] = useState(dummyRequests);

  const handleOpenDialog = (photo) => {
    setSelectedPhoto(photo);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedPhoto(null);
  };

  const handleConfirmRequest = (index) => {
    const updatedRequests = selectedRequests.filter((_, i) => i !== index);
    setSelectedRequests(updatedRequests);
  };

  const handleRejectRequest = (index) => {
    const updatedRequests = selectedRequests.filter((_, i) => i !== index);
    setSelectedRequests(updatedRequests);
  };

  return (
    <Box sx={{ display: 'flex', position: 'relative' }}>
      <Box
        sx={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(830px, 1fr))',
          gap: 2,
          p: 2,
        }}
      >
        {sampleData.map((post) => (
          <PostCard
            key={post.id}
            src={post.src}
            description={post.description}
            location={post.location}
            date={post.date}
            likes={post.likes}
            author={post.author}
            avatar={post.avatar}
            category={post.category}
            comments={post.comments}
            onClick={() => handleOpenDialog(post)} // Trigger the dialog
          />
        ))}
      </Box>

      <Box
        sx={{
          width: '260px',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderLeft: '1px solid',
          borderColor: 'divider',
          position: 'sticky',
          top: '72px', // Adjust this value if needed
        }}
      >
        <Typography variant="h6" component="div" sx={{ mb: 2 }}>
          Requests
        </Typography>
        {selectedRequests.map((request, index) => (
          <Card
            key={index}
            variant="outlined"
            orientation="horizontal"
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              ml: 3,
              mb: 2,
              '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
            }}
          >
            <AspectRatio ratio="1" sx={{ width: 50 }}>
              <Avatar
                src={request.avatar}
                alt={request.name}
                loading="lazy"
              />
            </AspectRatio>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', p: 1, flexGrow: 1 }}>
              <Typography level="body2" noWrap>{request.name}</Typography>
              <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                <Button size="small" variant="contained" color="success" onClick={() => handleConfirmRequest(index)}>
                  Confirm
                </Button>
                <Button size="small" variant="outlined" color="error" onClick={() => handleRejectRequest(index)}>
                  Reject
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {selectedPhoto && (
        <DribbbleShotDialog
          open={dialogOpen}
          handleClose={handleCloseDialog}
          image={selectedPhoto.src}
          description={selectedPhoto.description}
          location={selectedPhoto.location}
          date={selectedPhoto.date}
          likes={selectedPhoto.likes}
          author={selectedPhoto.author}
          avatar={selectedPhoto.avatar}
          category={selectedPhoto.category}
          comments={selectedPhoto.comments}
        />
      )}
    </Box>
  );
};

export default SocialMediaFeed;
