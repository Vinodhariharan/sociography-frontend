import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import PostCard from './PostCard'; // Adjust the path as necessary
import DribbbleShotDialog from '../common/Post/DribbbleShotDialog'; // Adjust the path as necessary
import RequestsSection from './RequestsSection'; // Adjust the path as necessary
import { Divider, LinearProgress } from '@mui/material';
import ProfileInfo from './ProfileInfo';
import MediaCard from './AdCover';
import axiosInstance from '../../axiosInstance';
import {useAuth} from '../AuthContext'

import { convertToBase64 } from '../../utils/convertToBase64';
import SuggestedProfileList from './SuggestedProfileList';

const SocialMediaFeed = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedRequests, setSelectedRequests] = useState([]);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const {authState} = useAuth();

  useEffect(() => {
    fetchPosts(page);
    fetchRequests();
  }, [page]);

  const fetchRequests = async () => {
    try {
      console.log(authState)
      const { mode: recipientType, photographerId: recipientId } = localStorage; 

      const response = await axiosInstance.get(
        `/requests/${recipientType}/${recipientId}/PENDING`
      );
      const data = response.data;

      console.log('Fetched requests:', data);

      if (Array.isArray(data)) {
        setSelectedRequests(data);
      } else {
        console.error('Expected an array but received:', data);
        setSelectedRequests([]); // Default to an empty array if the format is not as expected
      }
    } catch (error) {
      console.error('Error fetching requests:', error);
      setSelectedRequests([]); // Default to an empty array on error
    }
  };


  const fetchPosts = async (page) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/pictures/page?page=${page}&size=7`);
      const data = response.data;
      const convertedPosts = await Promise.all(data.content.map(async (post) => {
        const base64Image = convertToBase64(post.picture);
        console.log(post);
        return {
          ...post,
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
  
  const handleConfirmRequest = async (index) => {
    try {
      const requestId = selectedRequests[index].id;
      await axiosInstance.put(`/requests/${requestId}/status`, 'ACCEPTED',{
        headers: {
          'Content-Type': 'text/plain',
        },
      });
      const updatedRequests = selectedRequests.filter((_, i) => i !== index);
      setSelectedRequests(updatedRequests);
    } catch (error) {
      console.error('Error confirming request:', error);
    }
  };
  
  const handleRejectRequest = async (index) => {
    try {
      const requestId = selectedRequests[index].id;
      await axiosInstance.put(`/requests/${requestId}/status`, 'REJECTED', {
        headers: {
          'Content-Type': 'text/plain',
        },
      });
            const updatedRequests = selectedRequests.filter((_, i) => i !== index);
      setSelectedRequests(updatedRequests);
    } catch (error) {
      console.error('Error rejecting request:', error);
    }
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
    <Box display="flex" sx={{marginTop:'75px'}} gap={2} p={2}>
      <Box width={{ xs: '100%', md: '25%' }} sx={{mt:2}} display="flex" flexDirection="column" gap={2}>
        <Box sx={{ position: 'sticky', top: '75px', mt: 2 }}>
        <ProfileInfo />
          <RequestsSection 
            requests={selectedRequests} 
            onConfirm={handleConfirmRequest} 
            onReject={handleRejectRequest} 
            mode={authState.mode}
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
        {/*<SuggestedProfileList />*/}
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
          picAuthId={selectedPhoto.photographer.id}
        />
      )}
    </Box>
  );
};

export default SocialMediaFeed;
