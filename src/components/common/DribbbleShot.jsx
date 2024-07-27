import * as React from 'react';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import Box from '@mui/joy/Box';
import DribbbleShotDialog from './DribbbleShotDialog'; // Adjust the path as necessary

const DribbbleShot = ({
  image,
  description,
  location,
  date,
  likes,
  author,
  avatar,
  category,
  initialComments = []
}) => {
  const [open, setOpen] = React.useState(false);
  const [comments, setComments] = React.useState(initialComments);
  const [newComment, setNewComment] = React.useState('');

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleAddComment = () => {
    if (newComment.trim() !== '') {
      setComments([...comments, { user: 'Current User', text: newComment, avatar: 'path/to/current-user-avatar.png' }]);
      setNewComment('');
    }
  };

  return (
    <>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          borderRadius: '12px',
          '&:hover .gradient-cover, &:hover .card-content': {
            opacity: 1,
          },
          cursor: 'pointer',
        }}
        onClick={handleClickOpen}
      >
        <img
          src={image}
          alt={description}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: 'inherit',
          }}
        />
        <CardCover
          className="gradient-cover"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background:
              'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)',
            opacity: 0,
            transition: 'opacity 0.3s',
            borderRadius: 'inherit',
          }}
        />
        <CardContent
          className="card-content"
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            opacity: 0,
            transition: 'opacity 0.3s',
            padding: 2,
            boxSizing: 'border-box',
            borderRadius: 'inherit',
          }}
        >
          <Typography level="h5" textColor="#fff">
            {description}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography
              startDecorator={<LocationOnRoundedIcon />}
              textColor="neutral.300"
              fontSize="14px"
            >
              {location}
            </Typography>
            <Typography
              textColor="neutral.300"
              fontSize="14px"
            >
              {date}
            </Typography>
          </Box>
        </CardContent>
      </Box>

      <DribbbleShotDialog
        open={open}
        handleClose={handleClose}
        image={image}
        description={description}
        location={location}
        date={date}
        likes={likes}
        author={author}
        avatar={avatar}
        category={category}
        comments={comments}
        newComment={newComment}
        handleCommentChange={handleCommentChange}
        handleAddComment={handleAddComment}
      />
    </>
  );
};

export default DribbbleShot;
