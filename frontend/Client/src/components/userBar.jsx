import * as React from "react";
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
  const [blogAnchorEl, setBlogAnchorEl] = React.useState(null);
  const username = "User"; // Replace this with actual username logic

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleBlogMenuClick = (event) => {
    setBlogAnchorEl(event.currentTarget);
  };

  const handleBlogMenuClose = () => {
    setBlogAnchorEl(null);
  };

  const stringAvatar = (name) => {
    const initials = name
      .split(" ")
      .map((word) => word[0])
      .join("");
    return {
      children: initials,
    };
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '80px',
        background: 'linear-gradient(45deg, #000080, 60%, #ffffff 90%)',
        boxShadow: '0px 6px 10px rgba(0, 0, 0, 0.1)',
        width: '100vw', 
        position: 'relative',
        left: '50%',
        transform: 'translateX(-50%)', 
        marginBottom:"5px"
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          margin: "10px",
          boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Button component={Link} to="/">
          <Logo />
        </Button>
        <h1 style={{ color: "#fff", margin: "0px 15px" }}>EduFlex</h1>
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ margin: "0 10px" }}>
          <Button
            component={Link}
            to="/users/freecourses"
            variant="outlined"
            style={{ color: "#363636", borderColor: "#363636" }}
          >
            Free Courses
          </Button>
        </div>

        <div style={{ margin: "0 10px" }}>
          <Button
            variant="outlined"
            style={{ color: "#363636", borderColor: "#363636" }}
            onClick={handleBlogMenuClick}
          >
            Blogs
          </Button>
          <Menu
            anchorEl={blogAnchorEl}
            open={Boolean(blogAnchorEl)}
            onClose={handleBlogMenuClose}
          >
            <MenuItem onClick={() => navigate("/users/write_blogs")}>
              Write Blogs
            </MenuItem>
            <MenuItem onClick={() => navigate("/users/see_blogs")}>
              See Blogs
            </MenuItem>
          </Menu>
        </div>

        <div style={{ margin: "0 10px" }}>
          <Button
            component={Link}
            to="/users/courses"
            variant="outlined"
            style={{ color: "#363636", borderColor: "#363636" }}
          >
            Buy Courses
          </Button>
        </div>

        <div style={{ margin: "0 10px" }}>
          <Button
            component={Link}
            to="/users/mycourses"
            variant="outlined"
            style={{ color: "#363636", borderColor: "#363636" }}
          >
            My Courses
          </Button>
        </div>

        <Avatar
          {...stringAvatar(username)}
          onClick={handleMenuClick}
          style={{
            cursor: "pointer",
            marginLeft: "10px",
            marginRight: "10px",
            backgroundColor: "#000080",
            color: "#fff",
          }}
        ></Avatar>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => navigate("/users/editprofile")}>
            Edit Profile
          </MenuItem>
          <MenuItem
            onClick={() => {
              localStorage.setItem("token", null);
              window.location = "/";
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
}
