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
            backgroundImage: 'url("https://img.freepik.com/free-vector/flat-design-illustration-customer-support_23-2148887720.jpg?t=st=1718697971~exp=1718698571~hmac=041906bef4cca145919c8e0337f394ab60823c70c4b9c0beae2060eddd439517")',
            color: '#333',
        }}>
            
            
                {/* <Avatar 
                    style={{
                        margin: '10px auto',
                        backgroundColor: '#3a7bd5',
                        width: '80px',
                        height: '80px',
                        fontSize: '30px'
                    }}
                >
                    {username.split(' ').map(n => n[0]).join('').toUpperCase()}
                </Avatar> */}
                <Typography variant="h4" style={{color: '#000',marginTop:'0px'}}><h3>Welcome, {username}</h3></Typography>
                {/* <Typography variant="body1" style={{color: '#333', marginTop: '0px'}}>Email: {email}</Typography> */}
                {/* <Button
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
                </Button> */}
            </div>

        </>
    );
}
