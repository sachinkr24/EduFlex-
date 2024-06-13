import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import altimg from "../images/alt_course_img.webp";
import { CardActionArea } from '@mui/material';
import UserBar from './userBar';

function AllCourses() {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        function callback2(data) {
            setCourses(data.formattedCourses);
        }
        function callback1(res) {
            res.json().then(callback2)
        }
        fetch("http://localhost:3000/users/courses", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                "authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(callback1)
    }, []);

    return <div>
        <UserBar />
    <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
        {courses.map(course => {
            return <Course course={course} keyy = {course._id} />}
        )}
    </div>
    </div>
}

export function Course({course}) {

    const handleEnroll = async (courseId) => {
        try {
            const res = await fetch("http://localhost:3000/users/purchase/course/" + courseId, {
              method: "POST",
              headers: {
                'Content-Type': 'application/json',
                "authorization": "Bearer " + localStorage.getItem("token"),
              }
            });
        
            if (!res.ok) {
              throw new Error(`HTTP error! status: ${res.status}`);
            }
        
            const data = await res.json();
            console.log(data);
          } catch (error) {
            console.error('Failed to enroll in course:', error);
          }
    }

    const navigate = useNavigate();
    return <Card sx={{ maxWidth: 345 }} style={{
        margin: 10,
        width: 300,
        minHeight: 200,
        padding: 20
    }}>
    <CardMedia
      component="img"
      image={course.image ? course.image : altimg}
      style={{minHeight: 200, maxHeight: 200, width: "100%"}}
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div" style={{
        textAlign: "center",
        width: "100%",
      }}>
        {course.title}
      </Typography>
      <Typography variant="body2" color="text.secondary" style={{maxHeight: 200, overflow: "auto"}}>
        {course.description}
      </Typography>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: 20
      }}>
        <div>
            <Typography variant = 'subtitle2'>
                {course.price === 0 ? "Free" : "Price - Rs " + course.price + "/-"}
            </Typography>
        </div>
        <div>
            <Typography variant='subtitle2'>
            {
                course.rating ? (
                    course.rating + "/5"
                ) : (
                    "Not rated yet"
                )
            }
            </Typography>
        </div>
      </div>
      
    </CardContent>
    <CardActions>
        {course.price === 0 ? (
            <Button size="small" onClick = {() => {
                async function enroll() {
                    await handleEnroll(course._id);
                    navigate('/users/mycourses');
                }
            }}>Enroll</Button>
        ) : (
            <Button size="small" onClick = {() => {
               navigate('/users/courses/payment/' + course._id);
            }}>Enroll</Button>
        )}
    </CardActions>

    
  </Card>

}



export default AllCourses;