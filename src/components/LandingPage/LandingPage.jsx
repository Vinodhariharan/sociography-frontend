import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Divider,
  LinearProgress,
  Typography,
  Fab,
  Zoom,
  useScrollTrigger,
  useTheme,
  useMediaQuery,
  Fade,
  Slide,
  Card,
  CardContent,
  Skeleton
} from '@mui/material';
import {
  KeyboardArrowUp,
  PhotoCamera,
  TrendingUp
} from '@mui/icons-material';
import PostCard from './PostCard';
import DribbbleShotDialog from '../common/Post/DribbbleShotDialog';
import RequestsSection from './RequestsSection';
import ProfileInfo from './ProfileInfo';
import MediaCard from './AdCover';
import axiosInstance from '../../axiosInstance';
import { useAuth } from '../AuthContext';
import { convertToBase64 } from '../../utils/convertToBase64';
import SuggestedProfileList from './SuggestedProfileList';

// Scroll to Top Button
const ScrollToTop = () => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Zoom in={trigger}>
      <Fab
        onClick={handleClick}
        size="small"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
          color: '#fff',
          '&:hover': {
            background: 'linear-gradient(45deg, #764ba2 30%, #667eea 90%)',
          },
        }}
      >
        <KeyboardArrowUp />
      </Fab>
    </Zoom>
  );
};

// Enhanced Loading Skeleton
const PostSkeleton = () => (
  <Paper 
    elevation={2}
    sx={{ 
      mb: 3, 
      borderRadius: 3, 
      overflow: 'hidden',
    }}
  >
    <CardContent>
      <Box display="flex" alignItems="center" gap={2} mb={2}>
        <Skeleton variant="circular" width={40} height={40} />
        <Box flex={1}>
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="40%" />
        </Box>
      </Box>
      <Skeleton 
        variant="rectangular" 
        height={300} 
        sx={{ borderRadius: 2, mb: 2 }} 
      />
      <Skeleton variant="text" width="80%" />
      <Skeleton variant="text" width="60%" />
    </CardContent>
  </Paper>
);

// Enhanced Stats Card
const StatsCard = ({ icon, title, value, color }) => (
  <Paper 
    elevation={1}
    sx={{ 
      p: 2, 
      textAlign: 'center',
      background: `linear-gradient(135deg, ${color}20 0%, ${color}10 100%)`,
      border: `1px solid ${color}30`,
      borderRadius: 3,
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-2px)',
        elevation: 3,
      }
    }}
  >
    <Box sx={{ color, mb: 1 }}>
      {icon}
    </Box>
    <Typography variant="h6" fontWeight="bold">
      {value}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      {title}
    </Typography>
  </Paper>
);

const SocialMediaFeed = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedRequests, setSelectedRequests] = useState([]);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const { authState } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    fetchPosts(page);
    fetchRequests();
  }, [page]);

  const fetchRequests = async () => {
    try {
      const { mode: recipientType, photographerId: recipientId } = localStorage;
      const response = await axiosInstance.get(
        `/requests/${recipientType}/${recipientId}/PENDING`
      );
      const data = response.data;

      if (Array.isArray(data)) {
        setSelectedRequests(data);
      } else {
        console.error('Expected an array but received:', data);
        setSelectedRequests([]);
      }
    } catch (error) {
      console.error('Error fetching requests:', error);
      setSelectedRequests([]);
    }
  };

  const fetchPosts = async (page) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/pictures/page?page=${page}&size=7`);
      const data = response.data;
      const convertedPosts = await Promise.all(data.content.map(async (post) => {
        const base64Image = convertToBase64(post.picture);
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
      await axiosInstance.put(`/requests/${requestId}/status`, 'ACCEPTED', {
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
    <Box sx={{ 
      minHeight: '100vh', 
      backgroundColor: '#f8fafc',
      pt: { xs: 10, md: 12 }
    }}>
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Grid container spacing={3}>
          {/* Left Sidebar */}
          <Grid item xs={12} md={3}>
            <Box sx={{ 
              position: 'sticky', 
              top: { xs: 90, md: 100 },
              display: 'flex',
              flexDirection: 'column',
              gap: 2
            }}>
              <Slide direction="right" in={true} timeout={600}>
                <Box>
                  <ProfileInfo />
                  
                  {/* Stats Section */}
                  <Paper 
                    elevation={2}
                    sx={{ 
                      p: 2, 
                      mb: 2, 
                      borderRadius: 3,
                      background: 'linear-gradient(135deg, #fff 0%, #f8fafc 100%)'
                    }}
                  >
                    <Typography variant="h6" gutterBottom fontWeight="bold" color="primary">
                      Quick Stats
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <StatsCard
                          icon={<PhotoCamera />}
                          title="Photos"
                          value={posts.length}
                          color={theme.palette.primary.main}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <StatsCard
                          icon={<TrendingUp />}
                          title="Pending"
                          value={selectedRequests.length}
                          color={theme.palette.secondary.main}
                        />
                      </Grid>
                    </Grid>
                  </Paper>

                  <RequestsSection
                    requests={selectedRequests}
                    onConfirm={handleConfirmRequest}
                    onReject={handleRejectRequest}
                    mode={authState.mode}
                  />
                </Box>
              </Slide>
            </Box>
          </Grid>

          {/* Main Content */}
          <Grid item xs={12} md={6}>
            <Box sx={{ px: { xs: 0, md: 2 } }}>
              <Fade in={true} timeout={800}>
                <Box>
                  {/* Posts Section */}
                  <Box>
                    {loading && posts.length === 0 ? (
                      // Loading skeletons
                      Array.from({ length: 3 }).map((_, index) => (
                        <PostSkeleton key={index} />
                      ))
                    ) : (
                      posts.map((post, index) => (
                        <Fade in={true} timeout={300 + index * 100} key={post.id}>
                          <Paper 
                            elevation={2}
                            sx={{ 
                              mb: 3, 
                              borderRadius: 3, 
                              overflow: 'hidden',
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: theme.shadows[4],
                              }
                            }}
                          >
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
                          </Paper>
                        </Fade>
                      ))
                    )}
                  </Box>

                  {/* Loading Indicator */}
                  {loading && posts.length > 0 && (
                    <Box sx={{ mt: 2 }}>
                      <LinearProgress 
                        sx={{ 
                          borderRadius: 2,
                          height: 4,
                          backgroundColor: theme.palette.grey[200],
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: theme.palette.primary.main,
                          }
                        }} 
                      />
                    </Box>
                  )}
                </Box>
              </Fade>
            </Box>
          </Grid>

          {/* Right Sidebar */}
          <Grid item xs={12} md={3}>
            <Box sx={{ 
              position: 'sticky', 
              top: { xs: 90, md: 100 },
              display: 'flex',
              flexDirection: 'column',
              gap: 2
            }}>
              <Slide direction="left" in={true} timeout={800}>
                <Box>
                  <SuggestedProfileList />
                  
                  <MediaCard />
                  
                  {/* Trending Section */}
                  <Paper 
                    elevation={2}
                    sx={{ 
                      p: 2, 
                      mt: 2, 
                      borderRadius: 3,
                      background: 'linear-gradient(135deg, #fff 0%, #f8fafc 100%)'
                    }}
                  >
                    <Typography variant="h6" gutterBottom fontWeight="bold" color="primary">
                      🔥 Trending
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {['#Nature', '#Portrait', '#Street', '#Golden'].map((tag) => (
                        <Box
                          key={tag}
                          sx={{
                            backgroundColor: theme.palette.grey[100],
                            color: theme.palette.text.secondary,
                            px: 2,
                            py: 0.5,
                            borderRadius: 20,
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                              backgroundColor: theme.palette.primary.light,
                              color: theme.palette.primary.contrastText,
                              transform: 'translateY(-1px)',
                            },
                          }}
                        >
                          {tag}
                        </Box>
                      ))}
                    </Box>
                  </Paper>
                </Box>
              </Slide>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Dialog */}
      {selectedPhoto && (
        <DribbbleShotDialog
          open={dialogOpen}
          handleClose={handleCloseDialog}
          image={convertToBase64(selectedPhoto.picture)}
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

      <ScrollToTop />
    </Box>
  );
};

export default SocialMediaFeed;