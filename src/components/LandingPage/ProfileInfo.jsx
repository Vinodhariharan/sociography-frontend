// import React from 'react';
// import Avatar from '@mui/joy/Avatar';
// import Chip from '@mui/joy/Chip';
// import Box from '@mui/joy/Box';
// import Button from '@mui/joy/Button';
// import ButtonGroup from '@mui/joy/ButtonGroup';
// import Card from '@mui/joy/Card';
// import CardContent from '@mui/joy/CardContent';
// import CardOverflow from '@mui/joy/CardOverflow';
// import CardActions from '@mui/joy/CardActions';
// import IconButton from '@mui/joy/IconButton';
// import Typography from '@mui/joy/Typography';
// import SvgIcon from '@mui/joy/SvgIcon';
// import { useAuth } from '../AuthContext';

// const profile = {
//   imageUrl: '/profilepic1.jpg',
//   altText: 'Profile Picture',
//   name: 'John Doe',
//   email: 'john.doe@example.com',
//   bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.',
//   contactDetails: '123-456-7890',
//   likesCount: 125,
//   contactedCount: 45,
//   follower: 100
// };

// const ProfileInfo = () => {
//   const {authState} = useAuth();
//   return (
//     <Card
//       sx={{
//         width: '80%',
//         maxWidth: '100%',
//         marginLeft:2
//         // boxShadow: '',
//       }}
//     >
//       <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
//         <Avatar src={profile.imageUrl} alt={profile.altText} sx={{ '--Avatar-size': '4rem' }} />
//         <Chip
//           size="sm"
//           variant="soft"
//           color="primary"
//           sx={{
//             mt: -1,
//             mb: 1,
//             border: '3px solid',
//             borderColor: 'background.surface',
//           }}
//         >
//           {authState.mode}
//         </Chip>
//         <Typography level="title-lg">{profile.name}</Typography>
//         <Typography level="body-sm">{profile.email}</Typography>
//         <Typography level="body-sm" sx={{ maxWidth: '24ch', mt: 1 }}>
//           {profile.bio}
//         </Typography>
//         <Typography level="body-sm" sx={{ maxWidth: '24ch', mt: 1 }}>
//           Contact: {profile.contactDetails}
//         </Typography>
//         {/* <Box
//           sx={{
//             display: 'flex',
//             gap: 2,
//             mt: 2,
//             '& > button': { borderRadius: '2rem' },
//           }}
//         >
//           <IconButton size="sm" variant="plain" color="neutral">
//             <SvgIcon>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   fill="currentColor"
//                   d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5Z"
//                 />
//               </svg>
//             </SvgIcon>
//           </IconButton>
//           <IconButton size="sm" variant="plain" color="neutral">
//             <SvgIcon>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   fill="currentColor"
//                   d="M12 6.865A5.135 5.135 0 1 0 17.135 12A5.135 5.135 0 0 0 12 6.865Zm0 8.469A3.334 3.334 0 1 1 15.334 12A3.333 3.333 0 0 1 12 15.334Z"
//                 />
//                 <path
//                   fill="currentColor"
//                   d="M21.94 7.877a7.333 7.333 0 0 0-.465-2.427a4.918 4.918 0 0 0-1.153-1.772a4.894 4.894 0 0 0-1.77-1.153a7.323 7.323 0 0 0-2.428-.464C15.058 2.012 14.717 2 12.001 2s-3.057.011-4.123.06a7.333 7.333 0 0 0-2.428.465a4.905 4.905 0 0 0-1.77 1.153A4.886 4.886 0 0 0 2.525 5.45a7.333 7.333 0 0 0-.464 2.427c-.05 1.066-.06 1.407-.06 4.123s.01 3.057.06 4.123a7.334 7.334 0 0 0 .464 2.427a4.888 4.888 0 0 0 1.154 1.772a4.917 4.917 0 0 0 1.771 1.153a7.338 7.338 0 0 0 2.428.464C8.944 21.988 9.285 22 12 22s3.057-.011 4.123-.06a7.333 7.333 0 0 0 2.427-.465a5.113 5.113 0 0 0 2.925-2.925a7.316 7.316 0 0 0 .465-2.427c.048-1.067.06-1.407.06-4.123s-.012-3.057-.06-4.123Zm-1.8 8.164a5.549 5.549 0 0 1-.343 1.857a3.311 3.311 0 0 1-1.898 1.898a5.522 5.522 0 0 1-1.857.344c-1.055.048-1.371.058-4.042.058s-2.986-.01-4.04-.058a5.526 5.526 0 0 1-1.857-.344a3.108 3.108 0 0 1-1.15-.748a3.085 3.085 0 0 1-.748-1.15a5.521 5.521 0 0 1-.344-1.857c-.048-1.054-.058-1.37-.058-4.04s.01-2.987.058-4.042a5.563 5.563 0 0 1 .344-1.857a3.107 3.107 0 0 1 .748-1.15a3.082 3.082 0 0 1 1.15-.748A5.523 5.523 0 0 1 7.96 3.86C9.014 3.81 9.331 3.8 12 3.8s2.987.011 4.042.059a5.564 5.564 0 0 1 1.857.344a3.31 3.31 0 0 1 1.898 1.898a5.523 5.523 0 0 1 .344 1.857c.048 1.055.058 1.37.058 4.041s-.01 2.986-.058 4.041ZM17.339 5.462Z"
//                 />
//               </svg>
//             </SvgIcon>
//           </IconButton>
//           <IconButton size="sm" variant="plain" color="neutral">
//             <SvgIcon>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   fill="currentColor"
//                   d="M22.212 5.656a8.384 8.384 0 0 1-2.401.658A4.195 4.195 0 0 0 21.649 4c-.82.488-1.719.83-2.655 1.015a4.182 4.182 0 0 0-7.126 3.814a11.874 11.874 0 0 1-8.621-4.37a4.168 4.168 0 0 0-.566 2.103c0 1.45.739 2.731 1.866 3.483a4.168 4.168 0 0 1-1.893-.523v.052a4.186 4.186 0 0 0 3.355 4.1a4.204 4.204 0 0 1-1.887.072a4.188 4.188 0 0 0 3.91 2.91A8.393 8.393 0 0 1 2 19.43a11.815 11.815 0 0 0 6.29 1.84c7.547 0 11.675-6.254 11.675-11.675c0-.179-.004-.355-.012-.53a8.324 8.324 0 0 0 2.05-2.116l.005-.004Z"
//                 />
//               </svg>
//             </SvgIcon>
//           </IconButton>
//         </Box> */}
//       </CardContent>
//       <CardActions>
//         <ButtonGroup size="sm" sx={{ alignItems: 'center' }}>
//           {/* <Button variant="plain" color="neutral">
//             {profile.likesCount} Likes
//           </Button> */}
//           <Button variant="plain" color="neutral">
//             {profile.contactedCount} Following
//           </Button>
//           <Button variant="plain" color="neutral">
//             {profile.follower} Followers
//           </Button>
//         </ButtonGroup>
//       </CardActions>
//     </Card>
//   );
// };

// export default ProfileInfo;
import React, { useEffect, useState } from 'react';
import Avatar from '@mui/joy/Avatar';
import Chip from '@mui/joy/Chip';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardActions from '@mui/joy/CardActions';
import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import Typography from '@mui/joy/Typography';
import axios from '../../axiosInstance';
import { useAuth } from '../AuthContext';
import { convertToBase64 } from '../../utils/convertToBase64';

const ProfileInfo = () => {
  const { authState } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (authState.mode && (authState.mode === 'partner' || authState.mode === 'photographer')) {
      axios.get(`/${authState.mode === 'partner' ? 'partners' : 'photographers'}/${authState.photographerId}`)
        .then(response => { 
          const profileData = response.data;
          console.log(profileData)
          setProfile({
            imageUrl: profileData.profilePic ? `data:image/png;base64,${profileData.profilePic}` : '/default-profile-pic.jpg', // Default image if none provided
            altText: 'Profile Picture',
            name: profileData.name || 'N/A',
            email: profileData.email || 'N/A',
            selfInfo: profileData.selfInfo || profileData.tagline || 'No bio available',
            contact: profileData.contact || 'No contact details available',
            likesCount: profileData.likesCount || 0,
            contactedCount: profileData.contactedCount || 0,
            follower: profileData.follower || 0
          });
        })
        .catch(error => {
          console.error('Error fetching profile picture:', error);
        });
    }
  }, [authState.mode, authState.photographerId]);

  return (
    <Card sx={{ width: '80%', maxWidth: '100%', marginLeft: 2 }}>
      <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
        {authState.token ? (
          <>
            <Avatar src={profile?.imageUrl} alt={profile?.altText} sx={{ '--Avatar-size': '10rem' }} />
            <Chip
              size="sm"
              variant="soft"
              color="primary"
              sx={{
                mt: -1,
                mb: 1,
                border: '3px solid',
                borderColor: 'background.surface',
              }}
            >
              {authState.mode}
            </Chip>
            <Typography level="title-lg">{profile?.name}</Typography>
            <Chip level="body-sm">{profile?.email}</Chip  >
            <Typography level="body-md" sx={{ maxWidth: '24ch', mt: 1 }}>
              {profile?.selfInfo}
            </Typography>
            <Chip level="body-sm"               variant="soft"
              color="primary"  sx={{ maxWidth: '24ch', mt: 1,color:'#14273a' }}>
              Contact: {profile?.contact}
            </Chip>
          </>
        ) : (
          <Typography level="body-lg"  sx={{ mt: 2 }}>
            Login to see the profile.
          </Typography>
        )}
      </CardContent>
      {/* {authState.token && (
        <CardActions>
          <ButtonGroup size="sm" sx={{ alignItems: 'center' }}>
            <Button variant="plain" color="neutral">
              {profile?.contactedCount} Following
            </Button>
            <Button variant="plain" color="neutral">
              {profile?.follower} Followers
            </Button>
          </ButtonGroup>
        </CardActions>
      )} */}
    </Card>
  );
};

export default ProfileInfo;
