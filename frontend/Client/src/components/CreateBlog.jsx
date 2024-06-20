import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import axios from "axios";
import { AddCircle as Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import {
  styled,
  Box,
} from "@mui/material";
import UserBar from "./userBar";

const url =
  "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";

const Container = styled(Box)(({ theme }) => ({
  margin: "50px 100px",
  [theme.breakpoints.down("md")]: {
    margin: 0,
  },
}));

const Image = styled("img")({
  width: "100%",
  height: "50vh",
  objectFit: "cover",
});
;

const CreateBlog = () => {
    const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);

    try {
        await axios.post('http://localhost:3000/users/blog', formData, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
          });
      alert("Blog post created successfully!");
      setTitle("");
      setContent("");
      navigate('/users/see_blogs');
    } catch (error) {
      console.error("There was an error creating the blog post!", error);
    }
  };

  return (
    <Container>
      <UserBar />
      <Image src={url} alt="post" />
      <Typography variant="h4" gutterBottom  style={{ 
    display: 'flex', 
    alignItems: 'center', 
    color: '#000080', 
    fontWeight: 'bold', 
    marginRight: '10px',
    textDecoration: 'underline' ,
    textDecorationColor: '#000080',
    textUnderlineOffset: '12px'
  }}>
   
  Create a New Blog Post
  <Button
    style={{
      marginLeft: "auto",
      color: '#000080',
      borderColor: "#000080",
      marginRight: "5px",
      fontWeight: 'bold',

    }}
    type="button"
    onClick={handleSubmit}
    variant="outlined"
    color="primary"
  >
   Publish 
  </Button>
</Typography>

<label htmlFor="fileInput" style={{  color:"#000080", display: "flex", alignItems: "center" }}>
  <Add fontSize="large" />
  <input
    type="file"
    id="fileInput"
    style={{ marginLeft: '5px' }} 
    onChange={(e) => setFile(e.target.files[0])}
  />
</label>

              
               
                

      <form >
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          
          required
          margin="normal"
          style={{ color: '#000080',
            borderColor: '#000080'}}
        />
         

        <TextField
          label="Content"
          variant="outlined"
          fullWidth
          multiline
          rows={20}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          margin="normal"
        />
         
      </form>
    </Container>
  );
};

export default CreateBlog;
