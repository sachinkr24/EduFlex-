import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import altimg from '../images/alt_course_img.webp';
import { Button, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import UserBar from './userBar.jsx';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import axios from 'axios';

function UserCourses() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:3000/users/purchasedCourses', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        });
        const data = await response.json();
        setCourses(data.courses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div>
      <UserBar />
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {courses.map(course => (
          <Course key={course._id} course={course} />
        ))}
      </div>
    </div>
  );
}

export function Course({ course }) {
  const navigate = useNavigate();
  const [rating, setRating] = useState(course.rating);

  const handleRatingClick = async (value) => {
    try {
      const response = await axios.post(`http://localhost:3000/users/updateRating/${course._id}`, { rating: value }, {
        headers: {
          'Content-Type': 'application/json',
          authorization: 'Bearer ' + localStorage.getItem('token'),
        }
      });

      if (response.data) {
        setRating(response.data); // Update rating locally to reflect the change immediately
      } else {
        console.error('Rating update response is not in the expected format.', response);
      }
    } catch (error) {
      console.error('Failed to update rating:', error);
    }
  };

  return (
    <Card sx={{ maxWidth: 345 }} style={{ margin: 10, width: 300, minHeight: 200, padding: 0 }}>
      <CardMedia component="img" image={course.image ? course.image : altimg} style={{ height: 200, width: '100%' }} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" style={{ textAlign: 'center', width: '100%' }}>
          {course.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" style={{ maxHeight: 100, overflow: "auto" }}>
          {course.description}
        </Typography>
        <div style={{ display: 'flex', marginTop: 20 }}>
          <Typography variant="subtitle2">Rating:</Typography>
          <div>
            {[1, 2, 3, 4, 5].map(value => (
              <IconButton key={value} onClick={() => handleRatingClick(value)}>
                {rating >= value ? <StarIcon /> : <StarBorderIcon value = {rating} />}
              </IconButton>
            ))}
          </div>
        </div>
      </CardContent>
      <CardActions>
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
