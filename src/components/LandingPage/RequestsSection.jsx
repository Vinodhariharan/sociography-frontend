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


// Example profile data
const profiles = [
  { id: 1, name: 'Mabel Boyle', src: 'profilepic1.jpg' },
  { id: 2, name: 'Boyd Burt', src: 'profilepic2.png' },
  { id: 3, name: 'Flora Ray', src: 'profilepic3.png' },
  { id: 4, name: 'Omar Alston', src: 'profilepic4.jpg' },
  { id: 5, name: 'Sheryl Rice', src: 'profilepic5.jpg' },
];

export default function SuggestedProfileList() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        width:'100%',
        flexDirection: 'column',
        // justifyContent: 'center',
        gap: 4,
        mt:2
      }}
    >
      <div>
        <Typography level="h3" mb={2}>
         Contact Requests 
        </Typography>
        <List
          variant="soft"
          sx={{
            width: '100%',
            borderRadius: 'sm',

          }}
        >
          {profiles.map((profile, index) => (
            <React.Fragment key={profile.id}>
              <ListItem>
                <ListItemDecorator>
                  <Avatar size="sm" src={profile.src} />
                </ListItemDecorator>
                {profile.name}
                <Button variant="plain" sx={{ ml: 'auto' }}>Accept</Button>
                <Button variant="plain" sx={{p:1  }}><CloseIcon sx={{color:'red'}} /></Button>
              </ListItem>
              {index < profiles.length - 1 && <ListDivider inset="gutter" />}
            </React.Fragment>
          ))}
        </List>
      </div>
    </Box>
  );
}
