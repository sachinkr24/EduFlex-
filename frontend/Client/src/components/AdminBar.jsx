import Logo from "./logo.jsx";
import {Typography} from "@mui/material";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";

export default function AdminBar() {

    const navigate = useNavigate();

    return <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        height: '80px',
        background: 'linear-gradient(45deg, #2980b9 30%, #ffffff 90%)',
        }}>
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100px',
            height: '38px',
            margin: '20px',
        }}>
            <Logo></Logo>
        </div>

        <div style={{display: "flex"}}>
            <div style={{marginRight: 10, display: "flex"}}>
            <div style={{
                padding: '1px',
                margin: '20px',
            }}>
                <Button
                    onClick={() => {
                        navigate("/admin/addcourse")
                    }}
                >Add course</Button>
            </div>

            <div style={{
            padding: '1px',
            margin: '20px',
            }}>
                <Button 
                    onClick={() => {
                        navigate("/admin/courses")
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