import React, { useEffect, useState } from 'react';
import { Container, Typography, Card, CardContent, Grid, CircularProgress, Alert, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { Link } from "react-router-dom";
import Logo from "./logo.jsx";

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const DisplayBlogs = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      } catch (error) {
        setError('There was an error fetching the blog posts!');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <Container style={{ textAlign: 'center', marginTop: '20px' }}>
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
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '80px',
            background: 'linear-gradient(45deg, #000080, 60%, #ffffff 90%)',
            boxShadow: '0px 6px 10px rgba(0, 0, 0, 0.1)',
            width: '100vw', 
            position: 'relative',
            left: '50%',
            transform: 'translateX(-50%)', 
            marginBottom:"5px"
        }}>
            <div
                style={{
                display: "flex",
                alignItems: "center",
                margin: "10px",
                boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.1)",
                }}
            >
                <Button component={Link} to="/">
                <Logo />
                </Button>
                <h1 style={{ color: "#fff", margin: "0px 15px" }}>EduFlex</h1>
            </div>
            <div style={{ margin: "0 10px", marginRight : '25px' }}>
                <Button
                    component={Link}
                    to="/users/write_blogs"
                    variant="outlined"
                    style={{ color: "#363636", borderColor: "#363636" }}
                >
                    Write Blog
                </Button>
            </div>
        </div>
        <Container>
        <Typography variant="h4" gutterBottom style={{ textAlign: 'center', marginTop: '20px' }}>
            Blog Posts
        </Typography>
        <Grid container spacing={4}>
            {posts.map((post) => (
            <Grid item key={post.id} xs={12} sm={6} md={4}>
                <StyledCard>
                <CardContent>
                    <Typography variant="caption" color="textSecondary">
                    {post.user.username}
                    </Typography>
                    <Typography variant="h5" component="h2" gutterBottom>
                    {post.title}
                    </Typography>
                    <Typography variant="body2" component="p">
                    {post.content}
                    </Typography>
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
