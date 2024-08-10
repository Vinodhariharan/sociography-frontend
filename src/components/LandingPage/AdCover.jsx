import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import Typography from '@mui/joy/Typography';
import { styled } from '@mui/material/styles';

const Overlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#fff',
  fontSize: '1.5rem',
  opacity: 0,
  transition: 'opacity 0.3s ease-in-out',
  '&:hover': {
    opacity: 1,
  },
}));

export default function MediaCard() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/partner-listing');
  };

  return (
    <Card sx={{ minWidth: 300, flexGrow: 1, mt: 2, position: 'relative', aspectRatio: '3 / 4' }} onClick={handleClick}>
      <CardCover>
        <img
          src="ad.gif" // Example GIF
          loading="lazy"
          alt="GIF"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </CardCover>
      <Overlay sx={{ borderRadius: 2 }}>
        <Typography level="h3" sx={{ color: 'white' }}>Click Me</Typography>
      </Overlay>
    </Card>
  );
}
