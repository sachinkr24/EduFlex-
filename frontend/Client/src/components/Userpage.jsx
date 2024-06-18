import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, Button, CardMedia, Avatar } from '@mui/material';
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
      <Typography variant="h4" style={{ textAlign: 'center', marginBottom: '20px' }}>
        Start Learning
      </Typography>
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
          padding: '20px',
          boxSizing: 'border-box',
          textAlign: 'center',
          background: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '15px',
          display: 'flex',
          flexDirection: 'column', // Ensure the image container is flexible in column direction
        }}>
          <Typography variant="h4" style={{ color: '#333', marginBottom: '10px' }}>
            Welcome, {username}
          </Typography>
         
          <img
            src="https://img.freepik.com/free-vector/browser-stats-concept-illustration_114360-312.jpg?w=740&t=st=1718699377~exp=1718702977~hmac=36e98f5ed2a54001a0b5e6d0b1e29d6ddd99175c7ec3cf1b9da220d8e5ca0dbc"
            alt="Welcome"
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '50vh', // Ensure the image covers 30% of the viewport height
              borderRadius: '15px',
              marginBottom: '20px',
            }}
          />
        </div>
        <CourseGrid />
      </div>
    </>
  );
}
