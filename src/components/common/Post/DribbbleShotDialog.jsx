import React, { useState, useEffect } from 'react';
import axios from '../../../axiosInstance';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import { Input, Card, CardContent } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Typography from '@mui/material/Typography';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import { Sheet } from '@mui/joy';
import { useAuth } from '../../AuthContext';
import { Link } from 'react-router-dom';
import { formatDate } from '../../../utils/formatDate';
import { convertToBase64 } from '../../../utils/convertToBase64';
import CommentsList from './CommentList';

const DribbbleShotDialog = ({
  open,
  handleClose,
  image,
  description,
  location,
  date,
  likes,
  author,
  avatar,
  category,
  id,
  photographerId,
  picAuthId
}) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [likeId, setLikeId] = useState(null);
  const { authState } = useAuth();

  useEffect(() => {
    if (open) {
      fetchComments();
      fetchLikeCount();
      checkIfLiked();
    }
  }, [open]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`/api/pictures/${id}/comments`);
      setComments(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Failed to fetch comments', error);
    }
  };

  const fetchLikeCount = async () => {
    try {
      const response = await axios.get(`/api/pictures/${id}/likes/count`);
      setLikeCount(response.data);
    } catch (error) {
      console.error('Failed to fetch like count', error);
    }
  };

  const checkIfLiked = async () => {
    console.log(photographerId);
    try {
      const response = await axios.post(`/api/pictures/${id}/likes/check`, {
        pictureId: id,
        photographerId,
      });
      const liked = response.data;
      console.log(liked);
      setLiked(liked);
      setLikeId(liked ? { pictureId: id, photographerId } : null);
    } catch (error) {
      console.error('Failed to check if liked', error);
    }
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  // const handleAddComment = async () => {
  //   if (newComment.trim() !== '') {
  //     try {
  //       const pid = authState.photographerId;

  //       console.log(id,pid);
  //       const response = await axios.post(`/api/pictures/${id}/comments`, {
  //         comment: newComment,
  //         photographer: {
  //           id: pid,
  //         },
  //       });
  //       setComments([...comments, response.data]);
  //       setNewComment('');
  //     } catch (error) {
  //       console.error('Failed to add comment', error);
  //     }
  //   }
  // };
  
  const handleAddComment = async () => {
    if (newComment.trim() !== '') {
      try {
        const pid = authState.photographerId;
        const pictureId = id;  // Ensure this `id` is the correct pictureId
  
        console.log(pictureId, pid);  // Log both for debugging
  
        const response = await axios.post(`/api/pictures/${pictureId}/comments`, {
          comment: newComment,
          photographer: {
            id: pid,
          },
        });
  
        // Update the comments list with the newly added comment
        setComments([...comments, response.data]);
        setNewComment('');  // Clear the input field after adding the comment
      } catch (error) {
        console.error('Failed to add comment', error);
      }
    }
  };
  

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`/api/pictures/${id}/comments/${commentId}`);
      setComments(comments.filter((comment) => comment.id !== commentId));
    } catch (error) {
      console.error('Failed to delete comment', error);
    }
  };

  const handleLike = async () => {
    try {
      const pid = authState.photographerId;
      const likeRequest = {
        pictureId: id,
        photographerId: pid,
      };

      if (liked) {
        await axios.delete(`/api/pictures/${id}/likes`, {
          data: likeRequest,
        });
        setLikeCount(likeCount - 1);
        setLikeId(null);
      } else {
        const response = await axios.post(`/api/pictures/${id}/likes`, likeRequest);
        setLikeCount(likeCount + 1);
        setLikeId({ pictureId: id, photographerId: pid });
      }
      setLiked(!liked);
    } catch (error) {
      console.error('Failed to like/unlike picture', error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          width: 'calc(100vw - 100px)',
          height: 'calc(100vh - 100px)',
          maxWidth: '100vw',
          maxHeight: '100vh',
          borderRadius: '16px',
        },
      }}
    >
      <DialogContent
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          padding: 0,
          boxSizing: 'border-box',
          height: '100%',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            flex: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'black',
            overflow: 'hidden',
            height: '100%',
            width: '100%',
          }}
        >
          <Sheet
            component="img"
            src={image}
            alt={description}
            loading="lazy"
            sx={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
            }}
          />
        </Box>

        <Divider orientation="vertical" flexItem />

        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            padding: 2,
            height: '100%',
            overflowY: 'auto',
          }}
        >
          <IconButton
            onClick={handleClose}
            sx={{ position: 'absolute', top: 8, right: 8 }}
          >
            <CloseIcon sx={{ color: 'black' }} />
          </IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
            <Avatar src={avatar} alt={author} sx={{ marginRight: 1, width: 32, height: 32 }} />
            <Typography color='black' component={Link} to={`/profile-photographer/${picAuthId}`} fontWeight={500} variant="body2">{author}</Typography>
          </Box>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            {description}
          </Typography>
          {/* <Chip label={category} color="primary" size='small' sx={{ marginBottom: 2, width: '15%' }} /> */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography
  variant="caption"
  fontSize="12  px"
  sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
>
  <LocationOnRoundedIcon sx={{ fontSize: '16px' }} />
  {location}
</Typography>
            <Typography
              variant="h6"
              fontSize="16px"
            >
              {formatDate(date)}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
            <IconButton onClick={handleLike}>
              {liked ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
            </IconButton>
            <Typography variant="body2" sx={{ marginLeft: 1 }}>
              {likeCount} {likeCount === 1 ? 'Like' : 'Likes'}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              {/* {comments.map((comment) => (
                <React.Fragment key={comment.id}>
                  <Card variant="outlined" sx={{ marginBottom: 2 }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar src={convertToBase64(comment.photographer.profilePic)} alt={comment.photographer.name} sx={{ marginRight: 1 }} />
                        <Typography fontWeight={500}>{comment.photographer.name}</Typography>
                        <IconButton
                          onClick={() => handleDeleteComment(comment.id)}
                          sx={{ marginLeft: 'auto' }}
                        >
                          
                        </IconButton>
                      </Box>
                      <Typography variant="body2">{comment.comment}</Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
                        {formatDate(comment.timestamp)}
                      </Typography>
                    </CardContent>
                  </Card>
                </React.Fragment>
              ))} */}
              <CommentsList comments={comments} handleDeleteComment={handleDeleteComment} />
          </Box>
          <Divider sx={{ marginY: 2, borderColor: 'black' }} />
<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom:1}}>
  <Button
    variant="contained"
    onClick={handleAddComment}
    disabled={newComment.trim() === ''}
    sx={{ alignSelf: 'flex-start' }}
  >
    Comment
  </Button>
  <Input
    value={newComment}
    onChange={handleCommentChange}
    placeholder="Add a comment"
    fullWidth
    multiline
    minRows={2}
    maxRows={4}
    sx={{
      flexGrow: 1,
      marginLeft: 2,
      maxWidth: '80%', // Control the maximum width of the input field
    }}
  />
</Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default DribbbleShotDialog;
