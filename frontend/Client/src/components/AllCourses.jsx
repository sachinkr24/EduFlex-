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

  function addCourse(courseId) {
    fetch("http://localhost:3000/users/courses/" + courseId, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'authorization' : 'Bearer ' + localStorage.getItem('token')
        }
        }).then(res => {
            if (res.status === 200) {
                alert("Course added successfully");
            } else {
                alert("Failed to add course");
            }
        });
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
            <Button size="small" onClick = {async () => {
                try {
                    await addCourse(course._id);
                    navigate('/users/mycourses/');
                }catch(err) {
                    console.error("Failed to add course:", err);
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