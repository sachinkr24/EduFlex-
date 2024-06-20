import React, { useEffect, useState } from 'react';
import { Container, Typography, Card, Box, Grid, CardContent, CircularProgress, Alert, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import UserBar from './userBar.jsx';
import Categories from './Categories.jsx';

const UNSPLASH_ACCESS_KEY = '3F2LoccWCog6Kkc0nD-7oKDlMDUQsg7c9_y6KGje7qY';

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
}));

const GradientText = styled('span')({
  background: 'linear-gradient(45deg, #4f38db, #6a5acd)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
});

const DisplayBlogs = () => {
  const navigate = useNavigate();
  const { postId } = useParams(); // Accessing postId parameter from URL
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageUrls, setImageUrls] = useState({});

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/users/blog', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
          },
        });
        setPosts(response.data);
        fetchImages(response.data);
      } catch (error) {
        setError('There was an error fetching the blog posts!');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const fetchImages = async (posts) => {
    const urls = {};
    for (const post of posts) {
      const url = await getImageUrl(post.title);
      urls[post.id] = url;
    }
    setImageUrls(urls);
  };

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

  const truncateText = (text, length) => {
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

  if (error) {
    return (
      <Container style={{ textAlign: 'center', marginTop: '20px' }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <div>
      <UserBar />
      <Box
        sx={{
          textAlign: 'center',
          py: { xs: 10, md: 20 },
          color: '#ffffff',
          borderRadius: 2,
          mb: 0,
          position: 'relative',
          overflow: 'hidden',
          width: '100vw',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1,
            backgroundImage: `url("https://www.shutterstock.com/image-photo/banner-blogger-woman-hands-typing-600nw-2137810931.jpg"), linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundBlendMode: 'overlay',
            opacity: 1.0,
            borderRadius: 'inherit',
          }}
        />
        <Typography variant="h1" sx={{ fontWeight: 'bold', mb: 2 }}>
          Write Blogs on <GradientText>EduFlex</GradientText>
        </Typography>
        <Typography variant="h4" sx={{ mb: 4 }}>
          Earn Money while sharing your knowledge
        </Typography>
        <Button
          style={{
            marginLeft: "auto",
            color: '#ffffff',
            borderColor: "#ffffff",
            marginRight: "5px",
            fontWeight: 'bold',
          }}
          type="button"
          variant="outlined"
          color="primary"
          onClick={() => navigate("/users/write_blogs")}
        >
          Tap here to start your journey
        </Button>
      </Box>

      <Box sx={{ width: '100%', overflowX: 'auto' }}>
        <Categories />
      </Box>

      <Container>
        <Typography variant="h4" gutterBottom style={{ textAlign: 'center', marginTop: '20px' }}>
          Blog Posts
        </Typography>
        <Grid container spacing={4}>
          {posts.map((post) => (
            <Grid item key={post._id} xs={12} sm={6} md={4}>
              <StyledCard>
                <img
                  src={imageUrls[post._id] || 'https://via.placeholder.com/150'}
                  alt={post.title}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    borderTopLeftRadius: '4px',
                    borderTopRightRadius: '4px',
                  }}
                />
                <CardContent>
                  <Typography variant="caption" color="textSecondary">
                    {post.user.username}
                  </Typography>
                  <Typography variant="caption" color="textSecondary" style={{ float: 'right' }}>
                    last updated on {post.date} 20/05/2024
                  </Typography>
                  <Typography variant="h5" component="h2" gutterBottom>
                    {post.title}
                  </Typography>
                  <Typography variant="body2" component="p">
                    {truncateText(post.content, 100)} 
                  </Typography>
                  <Button
                    style={{
                      marginLeft: "auto",
                      color: '#000080',
                      borderColor: "#000080",
                      marginRight: "5px",
                      fontWeight: 'bold',
                    }}
                    type="button"
                    onClick={() => navigate(`/users/detailView/${post._id}`)} // Navigate to DetailView with postId parameter
                    variant="outlined"
                    color="primary"
                  >
                    View More
                  </Button>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default DisplayBlogs;
