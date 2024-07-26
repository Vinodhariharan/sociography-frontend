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

const DribbbleShot = ({ image, title, location }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
          <Typography level="title-lg" textColor="#fff">
            {title}
          </Typography>
          <Typography
            startDecorator={<LocationOnRoundedIcon />}
            textColor="neutral.300"
          >
            {location}
          </Typography>
        </CardContent>
      </Box>

      {/* Dialog with full image and details */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md" // Adjust maxWidth as needed
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            width: 'calc(100vw - 100px)', // Adjust width to be almost full screen, less from sides
            height: 'calc(100vh - 100px)', // Adjust height similarly
            maxWidth: '100vw',
            maxHeight: '100vh',
            borderRadius: '16px', // Optional: rounded corners
          },
        }}
      >
        <DialogContent
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
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
              '& img': {
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '8px',
              },
            }}
          >
            <img
              src={image}
              alt={title}
              loading="lazy"
            />
          </Box>
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
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
            >
              {location}
            </Typography>
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
