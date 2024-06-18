import { useState, useEffect } from "react";
import { Typography, Avatar, Button } from "@mui/material";
import AdminBar from "./AdminBar";

export default function Adminpage() {
    const [username, setUsername] = useState('Admin');
    const [email, setEmail] = useState('admin@example.com');
    const [profileClicked, setProfileClicked] = useState(false);

    useEffect(() => {
        const storedUsername = sessionStorage.getItem('username');
        const storedEmail = sessionStorage.getItem('email');
        
        if (storedUsername) setUsername(storedUsername);
        if (storedEmail) setEmail(storedEmail);
    }, []);

    const handleProfileClick = () => {
        setProfileClicked(true);
        setTimeout(() => {
            setProfileClicked(false);
        }, 300);
    };

    return (
        <>
        <AdminBar />
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundImage: 'url("https://img.freepik.com/free-vector/browser-stats-concept-illustration_114360-312.jpg?w=740&t=st=1718698261~exp=1718698861~hmac=4ac970287a100ea1b2459ab7bbb2863fbc61064f5d5436c7abc7a9cced973434")',
            color: '#333',
        }}>
            
            <div style={{
                width: '100%',
                maxWidth: '600px',
                padding: '20px',
                boxSizing: 'border-box',
                textAlign: 'center',
                marginTop: '80px', 
               background: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '15px'
            }}>
                <Avatar 
                    style={{
                        margin: '10px auto',
                        backgroundColor: '#3a7bd5',
                        width: '80px',
                        height: '80px',
                        fontSize: '30px'
                    }}
                >
                    {username.split(' ').map(n => n[0]).join('').toUpperCase()}
                </Avatar>
                <Typography variant="h4" style={{color: '#000'}}>Welcome, {username}</Typography>
                <Typography variant="body1" style={{color: '#333', marginTop: '10px'}}>Email: {email}</Typography>
                <Button
                    variant="outlined"
                    onClick={handleProfileClick}
                    style={{
                        marginTop: '20px',
                        borderColor: profileClicked ? '#3a7bd5' : '#000',
                        color: profileClicked ? '#3a7bd5' : '#000',
                        transition: 'all 0.3s ease-in-out',
                    }}
                >
                    Edit Profile
                </Button>
            </div>
        </div>
        </>
    );
}
