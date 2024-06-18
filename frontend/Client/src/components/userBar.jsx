import * as React from 'react';
import Logo from "./logo.jsx";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function UserBar() {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const username = sessionStorage.getItem('username');

    function stringAvatar(name) {
        const contains = name.split(' ').length > 1;
        if(contains) {
            return {
                children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
            };
        }
        return {
            children: `${name[0]}`,
        };
      }

    return (
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
    );
}
