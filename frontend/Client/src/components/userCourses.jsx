import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import altimg from '../images/alt_course_img.webp';
import { Button, IconButton } from '@mui/material';
import { CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import UserBar from './userBar';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

function UserCourses() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    function callback2(data) {
      setCourses(data.courses);
    }
    function callback1(res) {
      res.json().then(callback2);
    }
    fetch('http://localhost:3000/users/purchasedCourses', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    }).then(callback1);
  }, []);

  return (
    <div>
      <UserBar />
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {courses.map(course => {
          return <Course key={course._id} course={course} />;
        })}
      </div>
    </div>
  );
}

export function Course({ course }) {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0); // State to hold the rating

  const handleRatingClick = (value) => {
    // Function to update the rating
    setRating(value);
  };

  return (
    <Card sx={{ maxWidth: 345 }} style={{ margin: 10, width: 300, minHeight: 200, padding: 20 }}>
      <CardMedia component="img" image={course.image ? course.image : altimg} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" style={{ textAlign: 'center', width: '100%' }}>
          {course.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {course.description}
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
          <div>
            <Typography variant="subtitle2">Rating:</Typography>
            <div style={{ display: 'flex' }}>
              {[...Array(5)].map((_, index) => (
                <IconButton
                  key={index}
                  onClick={() => handleRatingClick(index + 1)}
                  color={index < rating ? 'primary' : 'inherit'}
                  size="large"
                >
                  {index < rating ? <StarIcon fontSize="large" /> : <StarBorderIcon fontSize="large" />}
                </IconButton>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardActions>
        {/* Render View button */}
        <Button
          size="small"
          onClick={() => {
            navigate('/users/courses/' + course._id, { state: { course } });
          }}
        >
          View
        </Button>
      </CardActions>
    </Card>
  );
}

export default UserCourses;
