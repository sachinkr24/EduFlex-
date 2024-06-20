import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, CircularProgress, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import UserBar from './userBar';

const UNSPLASH_ACCESS_KEY = 'YOUR_UNSPLASH_ACCESS_KEY'; // Replace with your Unsplash access key

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

  const getImageUrl = async (title) => {
    try {
      const response = await axios.get('https://api.unsplash.com/search/photos', {
        params: { query: title, per_page: 1, order_by: 'latest' },
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        },
      });
      if (response.data.results.length > 0) {
        return response.data.results[0].urls.small;
      } else {
        return `https://via.placeholder.com/150?text=${encodeURIComponent(title)}`; // Placeholder with title text
      }
    } catch (error) {
      console.error('Error fetching image:', error);
      return `https://via.placeholder.com/150?text=${encodeURIComponent(title)}`; // Placeholder with title text on error
    }
  };

  const truncateText = (text, length = 500) => {
    if (text.length <= length) return text;
    return text.substring(0, length) + '...';
  };

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
          position: 'relative',
          backgroundColor: '#000',
          color: '#fff',
          py: { xs: 10, md: 20 },
          textAlign: 'center',
          backgroundImage: `url(${post.image ? post.image : 'https://via.placeholder.com/150'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 0,
          },
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
