import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, List, ListItem, ListItemText, CircularProgress } from '@mui/material';

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts'); 
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <Container>
      <Typography variant="h2" align="center" gutterBottom>
        Posts
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <List>
          {posts.map(post => (
            <ListItem key={post.id}>
              <ListItemText
                primary={post.title}
                secondary={post.body}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
};

export default PostsPage;
