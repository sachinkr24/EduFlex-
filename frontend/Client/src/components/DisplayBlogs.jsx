// DisplayBlogs.jsx
import React, { useEffect, useState } from 'react';
import { Container, Typography, Card, Box, Grid, CardContent, CircularProgress, Alert, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import UserBar from './userBar.jsx';
import Categories from './Categories.jsx';
import { fetchImages } from './Image_api.jsx';

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
  [theme.breakpoints.down('sm')]: {
    height: 'auto',
  },
}));

const GradientText = styled('span')({
  background: 'linear-gradient(45deg, #4f38db, #6a5acd)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
});

const DisplayBlogs = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
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
        const urls = await fetchImages(response.data);
        setImageUrls(urls);
      } catch (error) {
        setError('There was an error fetching the blog posts!');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

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
          py: { xs: 8, md: 12 },
          color: '#ffffff',
          borderRadius: 2,
          mb: 4,
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
          backgroundImage: `url("https://www.shutterstock.com/image-photo/banner-blogger-woman-hands-typing-600nw-2137810931.jpg"), linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay',
          borderRadius: 2,
        }}
      >
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

      <Container sx={{ mb: 4 }}>
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
                    onClick={() => navigate(`/users/detailView/${post._id}`)}
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
