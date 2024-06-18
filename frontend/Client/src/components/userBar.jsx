import * as React from 'react';
import Logo from "./logo.jsx";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbar from './navbar.jsx';

export default function UserBar() {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);

    return (
    <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        height: '80px',
        background: 'linear-gradient(45deg, #624EDF 30%, #ffffff 90%)',
        }}>
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '80px',
            background: '#000',
            color: '#fff',
            padding: '0 20px',
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
            }}>
                <Logo />
                <h1 style={{ color: '#fff', margin: '0 10px' }}>EduFlex</h1>
            </div>

            <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ margin: '0 10px' }}>
                    <Button
                        component={Link}
                        to="/users/freecourses"
                        variant="outlined"
                        style={{ color: '#fff', borderColor: '#fff' }}
                    >
                        Free Courses
                    </Button>
                </div>

                <div style={{ margin: '0 10px' }}>
                    <Button
                        component={Link}
                        to="/users/courses"
                        variant="outlined"
                        style={{ color: '#fff', borderColor: '#fff' }}
                    >
                        Buy Courses
                    </Button>
                </div>

                <div style={{ margin: '0 10px' }}>
                    <Button
                        component={Link}
                        to="/users/mycourses"
                        variant="outlined"
                        style={{ color: '#fff', borderColor: '#fff' }}
                    >
                        My Courses
                    </Button>
                </div>

                <Avatar {...stringAvatar(username)} onClick={handleMenuClick} style={{ cursor: "pointer", marginLeft: '10px', backgroundColor: '#4caf50', color: '#fff' }}></Avatar>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={() => navigate("/users/editprofile")}>Edit Profile</MenuItem>
                    <MenuItem onClick={() => {
                        localStorage.setItem("token", null);
                        window.location = "/";
                    }}>Logout</MenuItem>
                </Menu>
            </div>
        </div>
        </div>
    );
}
