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
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import AdminBar from './AdminBar';

function AdminCourses() {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        function callback2(data) {
            setCourses(data.courses);
        }
        function callback1(res) {
            res.json().then(callback2)
        }
        fetch("http://localhost:3000/admin/courses/", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(callback1)
    }, []);

    return <div>
        <AdminBar />
    <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
            <Card sx={{ maxWidth: 345}} style={{
                margin: 10,
                width: 300,
                minHeight: 200,
                padding: 20,
                filter: "blur(0.5px)"
            }}>
            <CardActionArea style={{
                width: "100%",
                height: "100%"
            }} onClick={() => {
                navigate('/admin/addcourse');
            }}>
                <CardContent>
                    <div style={{
                        justifyContent: "center",
                        textAlign: "center",
                        marginTop: '25px',
                    }}>
                        <div>
                            <AddRoundedIcon></AddRoundedIcon>
                        </div>
                        <div>
                            <Typography >
                                Add Course
                            </Typography>
                        </div>
                    </div>
                    
                </CardContent>
            </CardActionArea>
            </Card>
        {courses.map(course => {
            return <Course course={course} />}
        )}
    </div>
    </div>
}

export function Course({course}) {
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
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div" style={{
        textAlign: "center",
        width: "100%",
      }}>
        {course.title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {course.description}
      </Typography>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: 20
      }}>
        <div>
            <Typography variant = 'subtitle2'>
                Price - Rs {course.price}/-
            </Typography>
        </div>
        <div>
            <Typography variant='subtitle2'>
            Rating - {course.rating} ({course.ratingCount ? course.ratingCount : 0} ratings)
            </Typography>
        </div>
      </div>
      
    </CardContent>
    <CardActions>
      <Button size="small" onClick = {() => {
        navigate('/admin/courses/' + course._id);
      }}>Edit</Button>
    </CardActions>
  </Card>

}



export default AdminCourses;