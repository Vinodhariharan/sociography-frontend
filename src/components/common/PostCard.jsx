// PostCard.js
import React from 'react';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Link from '@mui/joy/Link';
import Divider from '@mui/joy/Divider';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';

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
  onClick // Add onClick prop
}) => {
  return (
    <Card
      variant="outlined"
      sx={{
        width: '800px',
        height: '400px',
        display: 'flex',
        flexDirection: 'row',
        overflow: 'hidden',
        gap: 2,
        position: 'relative',
        transition: 'transform 0.3s, border 0.3s',
        '&:hover': {
          borderColor: 'primary.main',
          transform: 'translateY(-2px)',
        },
      }}
      onClick={onClick} // Handle the click event
    >
      <Box
        sx={{
          width: '400px',
          height: '100%',
          display: 'flex',
          flex: 2,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src={src}
          alt={description}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
          p: 2,
          width: '400px',
          backgroundColor: 'background.paper',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar src={avatar} alt={author} sx={{ mr: 2 }} />
          <Typography variant="plain" fontWeight="bold">
            {author}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
            <IconButton
              size="sm"
              variant="plain"
              color="neutral"
            >
              <FavoriteBorderRoundedIcon />
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
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">
              {location}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {date}
            </Typography>
          </Box>
          {comments && comments.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Divider />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {comments[0].user}: {comments[0].text} <Link href="#">more...</Link>
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Card>
  );
};

export default PostCard;
