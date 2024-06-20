import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import axios from 'axios';

const CreateBlog = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            title,
            content,
        };

        try {
            await axios.post('http://localhost:3000/users/blog', newPost, {
                headers : {
                    'contentType': 'application/json',
                    'authorization': 'Bearer ' + localStorage.getItem('token'),
                }
            });
            alert('Blog post created successfully!');
            setTitle('');
            setContent('');
        } catch (error) {
            console.error('There was an error creating the blog post!', error);
        }
    };

    return (
        
        <Container>
        
            <Typography variant="h4" gutterBottom>Create a New Blog Post</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Title"
                    variant="outlined"
                    fullWidth
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    margin="normal"
                />
                <TextField
                    label="Content"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={6}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary">Submit</Button>
            </form>
        </Container>
    );
};

export default CreateBlog;

