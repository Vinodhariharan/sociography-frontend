import React from 'react';
import Avatar from '@mui/material/Avatar';

const ProfileAvatar = ({ imageUrl, altText }) => {
  return (
    <Avatar
      alt={altText}
      src={imageUrl}
      sx={{
        width: 200,
        height: 200,
        backgroundColor: '#f0f0f0', // fallback color if image fails to load
        border: '2px solid #fff', // white border
        // '&:hover': {
        //   opacity: 0.8, // adjust opacity on hover
        // },
      }}
    />
  );
}

export default ProfileAvatar;
