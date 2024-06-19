import React, { useEffect, useState } from 'react';
import { Container, Typography, Card, CardContent, Grid } from '@mui/material';
import axios from 'axios';

const DisplayBlogs = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('https://example.com/api/posts'); // replace with your API endpoint
                setPosts(response.data);
            } catch (error) {
                console.error('There was an error fetching the blog posts!', error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Blog Posts</Typography>
            <Grid container spacing={4}>
                {posts.map((post) => (
                    <Grid item key={post.id} xs={12} sm={6} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" component="h2">{post.title}</Typography>
                                <Typography variant="body2" component="p">{post.content}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};




export default DisplayBlogs;