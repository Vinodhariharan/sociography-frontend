import React from 'react';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Link from '@mui/joy/Link';
import Divider from '@mui/joy/Divider';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import ShareIcon from '@mui/icons-material/Share';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CameraAltIcon from '@mui/icons-material/CameraAlt'; // Camera icon
import AspectRatio from '@mui/joy/AspectRatio';
import CardOverflow from '@mui/joy/CardOverflow';

const PostCard = ({
  src,
  description,
  location,
  date,
  likes,
  author,
  avatar,
  category,
  comments,
  onClick,
  camera
}) => {
  return (
    <Card
      variant="soft"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        p:0,
        // gap: 2,
        position: 'relative',
        transition: 'transform 0.3s, border 0.3s',
        '&:hover': {
          borderColor: 'primary.main',
          transform: 'translateY(-2px)',
          cursor: 'pointer'
        },
        width: '100%', // Make the card take full width
        maxWidth: '800px', // Set a maximum width for the card
        margin: 'auto', // Center the card horizontally
      }}
      onClick={onClick} // Handle the click event
    >
      <CardOverflow>
        <AspectRatio
          ratio="16/9"
          sx={{
            width: '100%',
            '& img': {
              borderTopRightRadius: 0,
              borderBottomLeftRadius: 0,
            },
            m:0
          }}
        >
          <img
            src={src}
            alt={description}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: 'inherit', // Inherit the border-radius from AspectRatio
            }}
          />
        </AspectRatio>
      </CardOverflow>
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
          p: 2,
          backgroundColor: 'background.paper',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar src={avatar} alt={author} sx={{ mr: 2, width: 56, height: 56 }} /> {/* Larger avatar */}
          <Box>
            <Typography variant="plain" fontWeight="bold">
              {author}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CameraAltIcon sx={{ mr: 1 }} /> {/* Camera icon */}
              <Typography variant="body2" color="text.secondary">
                {camera}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
            <IconButton
              size="sm"
              variant="plain"
              color="neutral"
            >
              <FavoriteBorderRoundedIcon />
            </IconButton>
            <IconButton
              size="sm"
              variant="plain"
              color="neutral"
            >
              <ShareIcon />
            </IconButton>
          </Box>
        </Box>
        <Box sx={{ mt: 'auto' }}>
          <Typography level="h6" sx={{ mb: 1 }}>
            <Link
              href="#"
              underline="none"
              sx={{ color: 'text.primary', '&:hover': { textDecoration: 'underline' } }}
            >
              {description}
            </Link>
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <LocationOnIcon sx={{ color: 'primary.main', mr: 1 }} /> {/* Location icon */}
              <Typography variant="body2" color="text.primary">
                {location}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}>
              {date}
            </Typography>
          </Box>
          {comments && comments.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Divider />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                <Typography component="span" sx={{ fontWeight: 'bold' }}>
                  {comments[0].user}:
                </Typography> {comments[0].text} <Link href="#">more...</Link>
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Card>
  );
};

export default PostCard;
