import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Typography from '@mui/joy/Typography';
import { Button } from '@mui/joy';
import CloseIcon from '@mui/icons-material/Close';
import { convertToBase64 } from '../../utils/convertToBase64';

export default function RequestsSection({ requests, onConfirm, onReject, mode }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%',
        flexDirection: 'column',
        gap: 4,
        mt: 2,
      }}
    >
      <div>
        <Typography level="h3" mb={2}>
          Contact Requests
        </Typography>
        {requests.length === 0 ? (
          <Typography level="body1" color="text.secondary">
            No requests
          </Typography>
        ) : (
          <List
            variant="soft"
            sx={{
              width: '100%',
              borderRadius: 'sm',
            }}
          >
            {requests.map((request, index) => {
              const details = mode === 'photographer' ? request.partner : request.photographer;

              return (
                <React.Fragment key={request.id}>
                  <ListItem>
                    <ListItemDecorator>
                      <Avatar size="sm" src={convertToBase64(details.profilePic)} />
                    </ListItemDecorator>
                    {details.name}
                    <Button
                      variant="plain"
                      sx={{ ml: 'auto' }}
                      onClick={() => onConfirm(index)}
                    >
                      Accept
                    </Button>
                    <Button
                      variant="plain"
                      sx={{ p: 1 }}
                      onClick={() => onReject(index)}
                    >
                      <CloseIcon sx={{ color: 'red' }} />
                    </Button>
                  </ListItem>
                  {index < requests.length - 1 && <ListDivider inset="gutter" />}
                </React.Fragment>
              );
            })}
          </List>
        )}
      </div>
    </Box>
  );
}
