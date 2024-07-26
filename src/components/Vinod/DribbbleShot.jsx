import * as React from 'react';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import Box from '@mui/joy/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const DribbbleShot = ({ image, title, location, initialComments = [] }) => {
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
      setComments([...comments, { user: 'Current User', text: newComment }]);
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
          alt={title}
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
            {title}
          </Typography>
          <Typography
            startDecorator={<LocationOnRoundedIcon />}
            textColor="neutral.300"
            fontSize="14px"
          >
            {location}
          </Typography>
        </CardContent>
      </Box>

      {/* Dialog with full image and details */}
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
              flex: 1,
              marginRight: 2,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box
              component="img"
              src={image}
              alt={title}
              loading="lazy"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                borderRadius: '8px',
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
            }}
          >
            <Typography variant="h4" sx={{ marginBottom: 2 }}>
              {title}
            </Typography>
            <Typography
              variant="h6"
              startDecorator={<LocationOnRoundedIcon />}
              fontSize="16px"
            >
              {location}
            </Typography>

            <Divider sx={{ marginY: 2 }} />

            <Box
              sx={{
                flexGrow: 1,
                overflowY: 'auto',
              }}
            >
              <Typography variant="h6" sx={{ marginBottom: 1 }}>
                Comments
              </Typography>
              <List>
                {comments.map((comment, index) => (
                  <React.Fragment key={index}>
                    <ListItem alignItems="flex-start">
                      <ListItemText 
                        primary={comment.user} 
                        primaryTypographyProps={{ fontSize: '14px', fontWeight: 'bold' }}
                        secondary={comment.text} 
                        secondaryTypographyProps={{ fontSize: '12px' }}
                      />
                    </ListItem>
                    {index < comments.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
              <Box sx={{ display: 'flex', marginTop: 2 }}>
                <TextField
                  fullWidth
                  label="Add a comment"
                  value={newComment}
                  onChange={handleCommentChange}
                  variant="outlined"
                  size="small"
                  sx={{ marginRight: 1 }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddComment}
                >
                  Post
                </Button>
              </Box>
            </Box>
          </Box>
          <IconButton
            onClick={handleClose}
            sx={{ position: 'absolute', top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DribbbleShot;
