import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, CircularProgress, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import UserBar from './userBar';

const GradientText = styled('span')({
  background: 'linear-gradient(45deg, #4f38db, #6a5acd)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
});

const DetailView = () => {
  const { postId } = useParams(); // Accessing postId parameter from URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/users/blog/${postId}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'), // Add authorization header if required
          },
        });
        setPost(response.data);
      } catch (error) {
        setError('There was an error fetching the blog post!');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]); // Fetch data whenever postId changes

  if (loading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  if (error || !post) {
    return (
      <Container style={{ textAlign: 'center', marginTop: '20px' }}>
        <Alert severity="error">{error || 'No post found!'}</Alert>
      </Container>
    );
  }

  return (
    <div>
      <UserBar />
      <Box
        sx={{
          textAlign: 'center',
          py: { xs: 8, md: 12 },
          color: '#ffffff',
          borderRadius: 2,
          mb: 4,
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
          backgroundImage: `url("https://img.freepik.com/premium-photo/robot-humanoid-use-laptop-sit-table-future-office_31965-8702.jpg?w=1380"), linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7))`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay',
          borderRadius: 2,
         
        }}
      >
        <Typography variant="h1" sx={{ fontWeight: 'bold', zIndex: 1, position: 'relative' }}>
          <GradientText>{post.title}</GradientText>
        </Typography>
      </Box>

      <Container sx={{ mt: 4 }}>
        <Box
          sx={{
            backgroundColor: '#f0f0f0',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Author Name: {post.user.username}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Last updated on {post.date} 20/05/2024 {/* Replace with your date format */}
          </Typography>
          {/* Render paragraphs from post.content */}
          {post.content.split('\n').map((paragraph, index) => (
            <Typography key={index} variant="body1" gutterBottom>
              {paragraph}
            </Typography>
          ))}
        </Box>
      </Container>
    </div>
  );
};

export default DetailView;
