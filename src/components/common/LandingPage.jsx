import React, { useState } from 'react';
import Box from '@mui/joy/Box';
import PostCard from './PostCard'; // Adjust the path as necessary
import DribbbleShotDialog from './DribbbleShotDialog'; // Adjust the path as necessary
import { Button, Typography } from '@mui/joy';

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
  // Add more sample data as needed
];

const SocialMediaFeed = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [requestPanelOpen, setRequestPanelOpen] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleOpenDialog = (photo) => {
    setSelectedPhoto(photo);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedPhoto(null);
  };

  const handleOpenRequestPanel = (request) => {
    setSelectedRequest(request);
    setRequestPanelOpen(true);
  };

  const handleCloseRequestPanel = () => {
    setRequestPanelOpen(false);
    setSelectedRequest(null);
  };

  const handleConfirmRequest = () => {
    // Handle confirm request logic here
    handleCloseRequestPanel();
  };

  const handleRejectRequest = () => {
    // Handle reject request logic here
    handleCloseRequestPanel();
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        sx={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(800px, 1fr))',
          gap: 2,
          p: 2,
        }}
      >
        {sampleData.map(post => (
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
            onRequestClick={() => handleOpenRequestPanel({ avatar: post.avatar, name: post.author })} // Open request panel
          />
        ))}
      </Box>

      {requestPanelOpen && selectedRequest && (
        <Box
          sx={{
            width: '300px',
            height: '100%',
            p: 2,
            borderLeft: '1px solid',
            borderColor: 'divider',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              overflow: 'hidden',
              mb: 2,
            }}
          >
            <img
              src={selectedRequest.avatar}
              alt={selectedRequest.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6">{selectedRequest.name}</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button  variant="contained" color="success" onClick={handleConfirmRequest}>
              Confirm
            </Button>
            <Button variant="outlined" color="error" onClick={handleRejectRequest}>
              Reject
            </Button>
          </Box>
        </Box>
      )}

      {selectedPhoto && (
        <DribbbleShotDialog
          open={dialogOpen}
          handleClose={handleCloseDialog}
          {...selectedPhoto}
          newComment=""
          handleCommentChange={() => {}}
          handleAddComment={() => {}}
        />
      )}
    </Box>
  );
};

export default SocialMediaFeed;
