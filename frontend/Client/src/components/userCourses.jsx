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
  const [rating, setRating] = useState(0); 

  const handleRatingClick = async (value, courseId) => {
    try {
      const response = await axios.post(`http://localhost:3000/users/updateRating/${courseId}`, { rating: value }, {
        headers: {
          'Content-Type': 'application/json',
          "authorization": 'Bearer ' + localStorage.getItem('token'),
        }
      });
  
      if (response && response.data) {
        setRating(response.data); 
      } else {
        console.error('Rating update response is not in the expected format.', response);
      }
    } catch (error) {
      console.error('Failed to update rating:', error);
    }
  };

  return (
    <Card sx={{ maxWidth: 345 }} style={{ margin: 10, width: 300, minHeight: 200, padding: 0 }}>
      <CardMedia component="img" image={course.image ? course.image : altimg} style={{height: 200, width: '100%'}} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" style={{ textAlign: 'center', width: '100%' }}>
          {course.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" style={{maxHeight: 100, overflow: "auto"}}>
          {course.description}
        </Typography>
        <div style={{ display: 'flex', marginTop: 20}}>
          <div>
            <Typography variant="subtitle2">Rating:</Typography>
          </div>
            {course.rated == false ? (
              <div>
                <IconButton onClick={() => handleRatingClick(1, course._id)}>
                  <StarBorderIcon />
                </IconButton>
                <IconButton onClick={() => handleRatingClick(2, course._id)}>
                  <StarBorderIcon />
                </IconButton>
                <IconButton onClick={() => handleRatingClick(3, course._id)}>
                  <StarBorderIcon />
                </IconButton>
                <IconButton onClick={() => handleRatingClick(4, course._id)}>
                  <StarBorderIcon />
                </IconButton>
                <IconButton onClick={() => handleRatingClick(5, course._id)}>
                  <StarBorderIcon />
                </IconButton>
              </div>
            ) : (
              <div>
                <Typography variant='body2'>{course.rating}</Typography>
              </div>
            )}
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
