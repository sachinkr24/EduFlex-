import React, { useEffect, useState } from 'react';
import { Container,styled, Grid, Card, CardContent, Typography, Button,Box, CardMedia, Avatar } from '@mui/material';
import UserBar from "./userBar";
import { useNavigate } from 'react-router-dom';

const courses = [
  {
    title: 'Google AI Essentials',
    provider: 'Google',
    type: 'Course',
    level: 'Beginner',
    imageUrl: 'https://techovedas.com/wp-content/uploads/2024/04/unnamed.png'
  },
  {
    title: 'Python for Everybody',
    provider: 'University of Michigan',
    type: 'Specialization',
    level: 'Beginner',
    imageUrl: 'https://i.ytimg.com/vi/8DvywoWv6fI/maxresdefault.jpg'
  },
  {
    title: 'Prompt Engineering',
    provider: 'Vanderbilt University',
    type: 'Specialization',
    level: 'Beginner',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP1nsS-JARGeyiLx6utca9P1Q7L5jr9pJSmw&s'
  },
  {
    title: 'IBM Data Science',
    provider: 'IBM',
    type: 'Professional Certificate',
    level: 'Beginner',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmoqTAP2SH7Sby2hLs6W_9fdq3sF6n97miAw&s'
  }
];
const GradientText = styled('span')({
  background: 'linear-gradient(45deg, #000080, #6a5acd)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
});


// CourseCard component
function CourseCard({ course }) {
  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={course.imageUrl}
        alt={course.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {course.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {course.provider}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {course.level} &middot; {course.type}
        </Typography>
      </CardContent>
    </Card>
  );
}

// CourseGrid component
function CourseGrid() {
  const navigate = useNavigate();

  const direct = () => {
    navigate('/users/mycourses');
  };

  return (
    <Container style={{ marginTop: '20px' }}>
      <Grid container spacing={3}>
        {courses.map((course, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <CourseCard course={course} />
          </Grid>
        ))}
      </Grid>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Button variant="contained" onClick={direct}>Show all</Button>
      </div>
    </Container>
  );
}

// UserPage component
export default function UserPage() {
  const [username, setUsername] = useState('User');
  const [email, setEmail] = useState('user@example.com');

  useEffect(() => {
    const storedUsername = sessionStorage.getItem('username');
    const storedEmail = sessionStorage.getItem('email');
    if (storedUsername) setUsername(storedUsername);
    if (storedEmail) setEmail(storedEmail);
  }, []);

  return (
    <>
      <UserBar />
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        marginTop: '0px', // Adjust margin to ensure content starts below UserBar
      }}>
        <div style={{
          width: '100%',
          maxWidth: '1200px',
          height:'100%',
          maxHeight: '1200px',
          
         
          boxSizing: 'border-box',
          textAlign: 'center',
          background: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '15px',
          display: 'flex',
          flexDirection: 'column', // Ensure the image container is flexible in column direction
        }}>
         
         
          <Box
        sx={{
          textAlign: 'center',
          py: { xs: 10, md: 20 }, // Adjust padding for mobile and desktop
          color: '#ffffff',
          borderRadius: 2,
          mb: 0,
          position: 'relative',
          overflow: 'hidden',
          width: '100vw', // Make the Box span the full viewport width
          height: '10vw',
          left: '50%',
          transform: 'translateX(-50%)', // Center the Box horizontally with no margins
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
            backgroundImage: `url("https://img.freepik.com/premium-vector/online-course-banners-study-from-home-using-internet-banners-promotional-media_101434-777.jpg?w=1380")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center', // Ensure the image is centered
            backgroundBlendMode: 'overlay',
            opacity: 1.0,
            borderRadius: 'inherit',
          }}
        />
        
      </Box>
        </div>
        <Typography variant="h3" style={{ marginTop: '10px' , fontWeight: 'bold', mb: 2, color:'#000080', borderColor:'#000080' }}>
        <GradientText>Welcome {username}</GradientText>
          </Typography>
        <Typography variant="h1" sx={{ fontWeight: 'bold', mb: 2, color:'#2C2D2D'}}>
        Start Learning at <GradientText>EduFlex</GradientText>
        </Typography>
        <CourseGrid />
      </div>
    </>
  );
}
