import React, { useState } from 'react';
import { Popover, Typography, IconButton, Paper, List, ListItem, ListItemAvatar, ListItemText, Avatar, Divider, ListItemSecondaryAction, Badge } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail';
import ReportIcon from '@mui/icons-material/Report';
import InfoIcon from '@mui/icons-material/Info';
import DeleteIcon from '@mui/icons-material/Delete';

const initialNotifications = [
  { id: 1, icon: <MailIcon />, title: 'New Email', description: 'You have received a new email.' },
  { id: 2, icon: <ReportIcon />, title: 'System Alert', description: 'Your system requires attention.' },
  { id: 3, icon: <InfoIcon />, title: 'Information', description: 'Here is some information for you.' },
  { id: 4, icon: <MailIcon />, title: 'Email Reminder', description: 'Don’t forget to check your email.' },
  { id: 5, icon: <ReportIcon />, title: 'Security Alert', description: 'Suspicious activity detected.' }
];

const NotificationDropdown = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState(initialNotifications);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <IconButton aria-describedby={id} color="black" onClick={handleClick}>
        <Badge 
          badgeContent={notifications.length} 
          color="primary"
          sx={{
            '& .MuiBadge-badge': {
              fontSize: '0.65rem', // Change the font size
              minWidth: '15px', // Adjust the width
              height: '15px', // Adjust the height
              padding: '0 2px' // Add padding
            }
          }}
        >
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          style: { maxHeight: 300, width: '350px', borderRadius: '10px' },
        }}
      >
        <Paper sx={{ padding: 1 }}>
          {notifications.length > 0 ? (
            <List>
              {notifications.map((notification, index) => (
                <React.Fragment key={notification.id}>
                  <ListItem alignItems="flex-start" sx={{ paddingY: 1 }}>
                    <ListItemAvatar>
                      <Avatar>
                        {notification.icon}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={<Typography variant="subtitle2" sx={{ fontFamily: 'League Spartan, sans-serif' }}>{notification.title}</Typography>}
                      secondary={<Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'League Spartan, sans-serif' }}>{notification.description}</Typography>}
                    />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(notification.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  {index < notifications.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          ) : (
            <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'League Spartan, sans-serif', padding: 2 }}>
              No notifications.
            </Typography>
          )}
        </Paper>
      </Popover>
    </div>
  );
};

export default NotificationDropdown;
