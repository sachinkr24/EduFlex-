import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Logo from './logo.jsx';

export default function UserBar() {
  return <div style={{
      display: 'flex',
      height: '80px',
      backgroundColor: 'IndianRed',
  }}>
    <div style={{
          display: 'flex',

          alignItems: 'center',
          width: '100px',
          height: '38px',
          margin: '20px',
      }}>
          <Logo></Logo>
    </div>

    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100px',
      height: '38px',
      margin: '20px',
      marginLeft: '500px',
    
    }}>
      <div>
      <Button color="inherit">Courses</Button>
      </div>
      <div>
        <Button color="inherit">Free Courses</Button>
      </div>
      <div>
        <Button color="inherit">My Courses</Button>
      </div>
      <div>
      <Button color="inherit">Log Out</Button>
      </div>
    </div>

  </div>
}