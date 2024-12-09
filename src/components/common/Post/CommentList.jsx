import React from 'react';
import { Box, Typography, Avatar, IconButton, Divider } from '@mui/joy';
import { formatDate } from '../../../utils/formatDate';  // Assuming this is a utility function
import { convertToBase64 } from '../../../utils/convertToBase64';
import DeleteIcon from '@mui/icons-material/Delete';

const CommentsList = ({ comments, handleDeleteComment }) => {
  return (
    <>
    <>Comments: </>
    <Divider sx={{ marginY: 1 }} />
      {comments.map((comment, index) => (
        <Box key={comment.id} sx={{ padding: '8px 0', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar 
              src={convertToBase64(comment.photographer.profilePic)} 
              alt={comment.photographer.name} 
              sx={{ width: 30, height: 30 }} // Smaller avatar size
            />
            <Typography fontWeight={500} sx={{ fontSize: '0.875rem' }}>
              {comment.photographer.name}
            </Typography>
            <IconButton 
              onClick={() => handleDeleteComment(comment.id)} 
              sx={{ marginLeft: 'auto', padding: 0 }}
            >
              <DeleteIcon sx={{ fontSize: '1rem' }} />
            </IconButton>
          </Box>

          {/* Comment and Date in same line */}
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: 1 }}>
            <Typography variant="body2" sx={{ fontSize: '0.875rem', marginTop: 0.5 }}>
              {comment.comment}
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ color: 'text.secondary', fontSize: '0.75rem', marginTop: 0.5, marginLeft: 'auto', padding: 0  }}
            >
              {formatDate(comment.timestamp)}
            </Typography>
          </Box>

          {/* Divider between comments */}
          {index < comments.length - 1 && <Divider sx={{ marginY: 1 }} />}
        </Box>
      ))}
    </>
  );
};

export default CommentsList;
