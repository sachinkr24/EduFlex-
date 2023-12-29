import * as React from 'react';
import Logo from "./logo.jsx";
import Button from "@mui/material/Button";
import { Link } from "react";
import { useNavigate } from "react-router-dom";

export default function UserBar() {

    const navigate = useNavigate();

    return <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        height: '80px',
        backgroundColor: 'white',
        }}>
        <div style={{marginLeft: 10}}>
            <Logo></Logo>
        </div>

        <div style={{display: "flex"}}>
            <div style={{marginRight: 10, display: "flex"}}>
            <div style={{
                padding: '1px',
                margin: '20px',
            }}>
                <Button component={Link} to = '/users/freeCourses'
                    onClick={() => {
                        navigate("/users/freeCourses")
                    }}
                >Free Courses</Button>
            </div>

            <div style={{
            padding: '1px',
            margin: '20px',
            }}>
                <Button component={Link} to = {'/users/courses'}
                    onClick={() => {
                        navigate("/users/courses")
                    }}
                >All Courses</Button>
            </div>

            <div style={{
            padding: '1px',
            margin: '20px',
            }}>
                <Button component={Link} to = {'/users/mycourses'}
                    onClick={() => {
                        navigate("/users/mycourses")
                    }}
                >My Courses</Button>
            </div>

            <Button
                variant={"contained"}
                onClick={() => {
                    localStorage.setItem("token", null);
                    window.location = "/";
                }}
            >Logout</Button>
        </div>
    </div>
  </div>
}