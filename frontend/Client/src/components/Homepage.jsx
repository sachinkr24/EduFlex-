import React from 'react';
import { Container, Box, Typography, Button, Grid, Card, CardContent, CardMedia, Avatar } from '@mui/material';
import { Star, PlayCircleFilled } from '@mui/icons-material';
import styled from '@emotion/styled';
import banner from './banner.jsx';
import { Link } from 'react-router-dom';
import Appbar from './Appbar.jsx';  
import Banner from './banner.jsx';


const courses = [
  {
    title: "Web Development Bootcamp",
    description: "Learn the basics of HTML, CSS, and JavaScript to start your career as a web developer.",
    image: "https://i.ytimg.com/vi/zJSY8tbf_ys/sddefault.jpg",
    rating: 4.5,
  },
  {
    title: "Data Science with Python",
    description: "A comprehensive guide to learning data science and machine learning using Python.",
    image: "https://imarticus.org/blog/wp-content/uploads/2021/12/learn-Python-for-data-science.jpg",
    rating: 4.8,
  },
  {
    title: "Graphic Design Masterclass",
    description: "Master the art of graphic design with tools like Photoshop, Illustrator, and InDesign.",
    image: "https://d3f1iyfxxz8i1e.cloudfront.net/courses/course_image/69a83eff3774.jpeg",
    rating: 4.7,
  },
];

const testimonials = [
  {
    name: "John Doe",
    feedback: "This platform transformed my career. The courses are well-structured and the instructors are top-notch.",
    avatar: "https://www.img2go.com/assets/dist/sample-files/img/convert_to_jpg.png",
  },
  {
    name: "Jane Smith",
    feedback: "I love the flexibility and the variety of courses offered. I can learn at my own pace.",
    avatar: "https://www.img2go.com/assets/dist/sample-files/img/convert_to_jpg.png",
  },
  {
    name: "Dhiraj Singh",
    feedback: "EduFlex offers excellent courses with practical hands-on experience. Highly recommended!",
    avatar: "https://www.img2go.com/assets/dist/sample-files/img/convert_to_jpg.png",
  },
  {
    name: "Kapil Sharma",
    feedback: "I've never had a more enjoyable learning experience. The instructors are knowledgeable and engaging.",
    avatar: "https://www.img2go.com/assets/dist/sample-files/img/convert_to_jpg.png",
  },
  {
    name: "Sachin Gupta",
    feedback: "The content is comprehensive, the platform is easy to use, and the community support is fantastic!",
    avatar: "https://www.img2go.com/assets/dist/sample-files/img/convert_to_jpg.png",
  },
  {
    name: "Samdesh Ahuja",
    feedback: "The content is comprehensive, the platform is easy to use, and the community support is fantastic!",
    avatar: "https://www.img2go.com/assets/dist/sample-files/img/convert_to_jpg.png",
  },
];

const GradientText = styled('span')({
  background: 'linear-gradient(45deg, #4f38db, #6a5acd)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
});
const Homepage = () => {
  return (
    <Container maxWidth="lg">
      {/* Appbar */}
      <Appbar />

      {/* Hero Section */}
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
    left: '50%',
    transform: 'translateX(-50%)', // Center the Box horizontally with no margins
  }}
>
<Banner/>
  <Typography variant="h1"sx={{ fontWeight: 'bold', mb: 2}} >
      Welcome to <GradientText>EduFlex</GradientText>
    </Typography>
  <Typography variant="h4" sx={{  mb: 4 }} >
    Transform your career with expert-led courses
  </Typography>
  {/* <Button variant="contained" size="large" color="secondary" sx={{ mr: 2 }} component={Link} to="/courses">
    View Courses
  </Button>
  <Button variant="outlined" size="large" sx={{ color: '#ffffff', borderColor: '#ffffff' }} component={Link} to="/play">
    <PlayCircleFilled sx={{ mr: 1 }} /> Play Now
  </Button> */}
</Box>



      {/* Featured Courses */}
      <Box sx={{ py: 8, mb: 0 }}>
        <Typography variant="h4" sx={{ mb: 4, textAlign: 'center', fontWeight: 'bold' ,textDecoration: 'underline' ,textDecorationColor: '#000080',  textUnderlineOffset: '8px'}}>
          Featured Courses
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          <Grid container spacing={4}>
            {courses.map((course, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ height: '100%' , boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'}}>
                
                  <CardMedia component="img" height="160" image={course.image} alt={course.title} />
                  <CardContent>
                    <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                      {course.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {course.description}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Star sx={{ color: '#FFD700', mr: 1 }} />
                      <Typography variant="body2">{course.rating}</Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

       {/* Testimonials */}
       <Box sx={{ py: 8, backgroundColor: '#f5f5f5', borderRadius: 2, mb: 0 }}>
        <Typography variant="h4" sx={{ mb: 4, textAlign: 'center', fontWeight: 'bold',textDecoration: 'underline' ,textDecorationColor: '#000080',  textUnderlineOffset: '8px' }}>
        Student Testimonials
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Card sx={{boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'}}>
                  <CardContent>
                  <Box 
                      Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                         mb: 2, 
                         background: `linear-gradient(45deg, #000080 30%, #ffffff 90%)`,
                          borderRadius: '30px  30px ' 
                         }}>
                      <Avatar src={testimonial.avatar} alt={testimonial.name} sx={{ mr: 2 }} />
                      <Typography style={{color: '#ffffff'}}variant="h6">{testimonial.name}</Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {testimonial.feedback}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
      {/* Footer */}
      <Box sx={{ py: 4, textAlign: 'center', background: `linear-gradient(45deg, #000080 40%, #ffffff 90%)`, borderRadius: 2, boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'}}>
        <Typography variant="body2" color="#ffffff">
          &copy; {new Date().getFullYear()} EduFlex. All rights reserved.
        </Typography>
      </Box>
    </Container>
  );
};

export default Homepage;