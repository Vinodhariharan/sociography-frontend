import React from 'react';
import Avatar from '@mui/material/Avatar';

const ProfileAvatar = ({ imageUrl, altText, width = 200, height = 200 }) => {
  return (
    <Avatar
      alt={altText}
      src={imageUrl}
      sx={{
        width: width,
        height: height,
        backgroundColor: '#f0f0f0', // fallback color if image fails to load
        border: '2px solid #fff', // white border
      }}
    />
  );
}

export default ProfileAvatar;
