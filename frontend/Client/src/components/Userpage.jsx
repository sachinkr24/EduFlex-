import React from 'react';
import { Container, Grid, Card, CardContent, Typography, Button, CardMedia } from '@mui/material';
import UserBar from "./userBar"
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
    <Container>
      <Grid container spacing={3}>
        {courses.map((course, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <CourseCard course={course} />
          </Grid>
        ))}
      </Grid>
      <Button variant="contained" onClick={direct} style={{ marginTop: '20px' }}>Show all</Button>
    </Container>
  );
}

// UserPage component
export default function UserPage() {
  return (
    <div>
      <UserBar />
      <CourseGrid />
    </div>
  );
}
