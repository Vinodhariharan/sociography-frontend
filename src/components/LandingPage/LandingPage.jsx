  // import React, { useState } from 'react';
  // import Box from '@mui/material/Box';
  // import PostCard from './PostCard'; // Adjust the path as necessary
  // import DribbbleShotDialog from './Post/DribbbleShotDialog'; // Adjust the path as necessary
  // import RequestsSection from './RequestsSection'; // Adjust the path as necessary
  // import { Divider } from '@mui/material';
  // import { sampleData } from './sampleData';
  // import SuggestedProfileList from './SuggestedProfileList';
  // import ProfileInfo from './ProfileInfo';
  // import MediaCard from './AdCover';

  // const dummyRequests = [
  //   {
  //     avatar: '/profilepic4.jpg', // Ensure this path is correct
  //     name: 'Creative User 1',
  //   },
  //   {
  //     avatar: '/profilepic5.jpg', // Ensure this path is correct
  //     name: 'Creative User 2',
  //   },
  //   {
  //     avatar: '/profilepic6.jpg', // Ensure this path is correct
  //     name: 'Creative User 3',
  //   },
  //   {
  //     avatar: '/profilepic2.png', // Ensure this path is correct
  //     name: 'Creative User 4',
  //   },
  // ];

  // const SocialMediaFeed = () => {
  //   const [dialogOpen, setDialogOpen] = useState(false);
  //   const [selectedPhoto, setSelectedPhoto] = useState(null);
  //   const [selectedRequests, setSelectedRequests] = useState(dummyRequests);

  //   const handleOpenDialog = (photo) => {
  //     setSelectedPhoto(photo);
  //     setDialogOpen(true);
  //   };

  //   const handleCloseDialog = () => {
  //     setDialogOpen(false);
  //     setSelectedPhoto(null);
  //   };

  //   const handleConfirmRequest = (index) => {
  //     const updatedRequests = selectedRequests.filter((_, i) => i !== index);
  //     setSelectedRequests(updatedRequests);
  //   };

  //   const handleRejectRequest = (index) => {
  //     const updatedRequests = selectedRequests.filter((_, i) => i !== index);
  //     setSelectedRequests(updatedRequests);
  //   };

  //   return (
  //     <Box display="flex" gap={2} p={2}>
  //       <Box width={{ xs: '100%', md: '25%' }} display="flex" flexDirection="column" gap={2}>
  //         <ProfileInfo />
  //         <Box sx={{ position: 'sticky', top: '75px', mt: 2 }}>
  //         <RequestsSection 
  //           requests={selectedRequests} 
  //           onConfirm={handleConfirmRequest} 
  //           onReject={handleRejectRequest} 
  //         />
  //         </Box>
  //       </Box>
  //       <Divider orientation="vertical" flexItem />
  //       <Box width={{ xs: '100%', md: '50%' }} sx={{ mt: 2 }}>
  //         {sampleData.map((post) => (
  //           <React.Fragment key={post.id}>
  //             <Box width="100%" sx={{ mb: 2 }}>
  //               <PostCard
  //                 src={post.src}
  //                 description={post.description}
  //                 location={post.location}
  //                 date={post.date}
  //                 likes={post.likes}
  //                 author={post.author}
  //                 avatar={post.avatar}
  //                 category={post.category}
  //                 comments={post.comments}
  //                 camera={post.camera}
  //                 onClick={() => handleOpenDialog(post)} // Trigger the dialog
  //               />
  //             </Box>
  //             <Divider sx={{ mb: 2 }} />
  //           </React.Fragment>
  //         ))}
  //       </Box>
  //       <Divider orientation="vertical" flexItem />
  //       <Box width={{ xs: '100%', md: '25%' }} display="flex" flexDirection="column" gap={2}>
  //           <SuggestedProfileList />
  //         <Box sx={{ position: 'sticky', top: '75px', mt: 2 }}>
  //         <MediaCard />
  //         </Box>
  //       </Box>
  //       {selectedPhoto && (
  //         <DribbbleShotDialog
  //           open={dialogOpen}
  //           handleClose={handleCloseDialog}
  //           image={selectedPhoto.src}
  //           description={selectedPhoto.description}
  //           location={selectedPhoto.location}
  //           date={selectedPhoto.date}
  //           likes={selectedPhoto.likes}
  //           author={selectedPhoto.author}
  //           avatar={selectedPhoto.avatar}
  //           category={selectedPhoto.category}
  //           comments={selectedPhoto.comments}
  //         />
  //       )}
  //     </Box>
  //   );
  // };

  // export default SocialMediaFeed;
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import PostCard from './PostCard'; // Adjust the path as necessary
import DribbbleShotDialog from '../common/Post/DribbbleShotDialog'; // Adjust the path as necessary
import RequestsSection from './RequestsSection'; // Adjust the path as necessary
import { Divider, LinearProgress } from '@mui/material';
import SuggestedProfileList from './SuggestedProfileList';
import ProfileInfo from './ProfileInfo';
import MediaCard from './AdCover';
import axiosInstance from '../../axiosInstance';
import {useAuth} from '../AuthContext'

import { convertToBase64 } from '../../utils/convertToBase64';
const dummyRequests = [
  {
    avatar: '/profilepic4.jpg', // Ensure this path is correct
    name: 'Creative User 1',
  },
  {
    avatar: '/profilepic5.jpg', // Ensure this path is correct
    name: 'Creative User 2',
  },
  {
    avatar: '/profilepic6.jpg', // Ensure this path is correct
    name: 'Creative User 3',
  },
  {
    avatar: '/profilepic2.png', // Ensure this path is correct
    name: 'Creative User 4',
  },
];

const SocialMediaFeed = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedRequests, setSelectedRequests] = useState(dummyRequests);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const {authState} = useAuth();

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  const fetchPosts = async (page) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/pictures/page?page=${page}&size=7`);
      const data = response.data;
      // // Function to convert a single image to base64
      // const convertToBase64 = async (url) => {
      //   return new Promise((resolve, reject) => {
      //     const xhr = new XMLHttpRequest();
      //     xhr.onload = () => {
      //       const reader = new FileReader();
      //       reader.onloadend = () => {
      //         resolve(reader.result);
      //       };
      //       reader.readAsDataURL(xhr.response);
      //     };
      //     xhr.onerror = reject;
      //     xhr.open('GET', url);
      //     xhr.responseType = 'blob';
      //     xhr.send();
      //   });
      // };
  
      // Convert all images to base64 format
      const convertedPosts = await Promise.all(data.content.map(async (post) => {
        const base64Image = await convertToBase64(post.picture);
        return {
          ...post,
          // base64Src: base64Image,
        };
      }));
  
      setPosts((prevPosts) => [...prevPosts, ...convertedPosts]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setLoading(false);
    }
  };
  
  const handleOpenDialog = (photo) => {
    setSelectedPhoto(photo);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedPhoto(null);
  };

  const handleConfirmRequest = (index) => {
    const updatedRequests = selectedRequests.filter((_, i) => i !== index);
    setSelectedRequests(updatedRequests);
  };

  const handleRejectRequest = (index) => {
    const updatedRequests = selectedRequests.filter((_, i) => i !== index);
    setSelectedRequests(updatedRequests);
  };

  const handleScroll = (e) => {
    const { scrollHeight, scrollTop, clientHeight } = e.target.documentElement;
    if (scrollHeight - scrollTop === clientHeight && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  return (
    <Box display="flex" gap={2} p={2}>
      <Box width={{ xs: '100%', md: '25%' }} display="flex" flexDirection="column" gap={2}>
        <ProfileInfo />
        <Box sx={{ position: 'sticky', top: '75px', mt: 2 }}>
          <RequestsSection 
            requests={selectedRequests} 
            onConfirm={handleConfirmRequest} 
            onReject={handleRejectRequest} 
          />
        </Box>
      </Box>
      <Divider orientation="vertical" flexItem />
      <Box width={{ xs: '100%', md: '50%' }} sx={{ mt: 2 }}>
        {posts.map((post) => (
          <React.Fragment key={post.id}>
            <Box width="100%" sx={{ mb: 2 }}>
              <PostCard
                src={convertToBase64(post.picture)}
                description={post.description}
                location={post.location}
                date={post.timestamp}
                likes={post.likes}
                author={post.photographer?.name}
                avatar={convertToBase64(post.photographer?.profilePic)}
                category={post.categories ? post.categories.map(cat => cat.name).join(', ') : ''}
                comments={post.comments}
                camera={post.camera}
                onClick={() => handleOpenDialog(post)}
              />
            </Box>
            <Divider sx={{ mb: 2 }} />
          </React.Fragment>
        ))}
        {loading && <LinearProgress />}
      </Box>
      <Divider orientation="vertical" flexItem />
      <Box width={{ xs: '100%', md: '25%' }} display="flex" flexDirection="column" gap={2}>
        {/* <SuggestedProfileList /> */}
        <Box sx={{ position: 'sticky', top: '75px', }}>
          <MediaCard />
        </Box>
      </Box>
      {selectedPhoto && (
        <DribbbleShotDialog
          open={dialogOpen}
          handleClose={handleCloseDialog}
          image={convertToBase64(selectedPhoto.picture)} // Change to base64Src
          description={selectedPhoto.description}
          location={selectedPhoto.location}
          date={selectedPhoto.timestamp}
          likes={selectedPhoto.likes}
          author={selectedPhoto.photographer?.name}
          avatar={convertToBase64(selectedPhoto.photographer?.profilePic)}
          category={selectedPhoto.categories ? selectedPhoto.categories.map(cat => cat.name).join(', ') : ''}
          comments={selectedPhoto.comments}
          camera={selectedPhoto.camera}
          id={selectedPhoto.id}
          photographerId={authState.photographerId}
        />
      )}
    </Box>
  );
};

export default SocialMediaFeed;
