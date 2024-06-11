import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Appbar from './Appbar.jsx';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { signIn } from '../Logics/Signin.js';
import axios from 'axios';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alignment, setAlignment] = useState('USER');
  const [reset, setReset] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  const handleChange = (e, newAlignment) => {
    setAlignment(newAlignment);
  };

  const resetPass = () => {
    setReset(true);
  };

  const navigate = useNavigate();

  const changePassword = async (email, newPassword, role) => {
      var sendTo = 'admin';
      if(role == 'USER') sendTo = 'users';
      try {
        await axios.put(`http://localhost:3000/${sendTo}/resetPassword`, {
                email: email,
                password: newPassword
        }, {
                headers: {
                    'Content-Type': 'application/json'
                }
        })
      } catch (err) {
        console.log('Error : ', err)
      }
  }

  return (
    <div>
      <Appbar />
      {reset ? (
        <div style={{
          paddingTop: 150,
          display: 'flex',
          justifyContent: 'center',
        }}>
          <Card variant='outlined' style={{
            padding: '10px',
            width: '400px',
          }}>
            <div
                style={{
                  marginBottom: '10px',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <ToggleButtonGroup
                  color="primary"
                  exclusive
                  value={alignment}
                  aria-label="Platform"
                  onChange={handleChange}
                >
                  <ToggleButton value="USER">USER</ToggleButton>
                  <ToggleButton value="ADMIN">ADMIN</ToggleButton>
                </ToggleButtonGroup>
              </div>
            <TextField
              label="Email"
              variant="outlined"
              style={{
                width: '100%',
                marginBottom: '10px',
              }}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <TextField
              label="New Password"
              variant="outlined"
              style={{
                width: '100%',
                marginBottom: '10px',
              }}
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
            />
            <Button
              size='large'
              variant='contained'
              onClick={async() => {
                try{
                    await changePassword(email, newPassword, alignment);
                    alert('Password Reset');
                    setReset(false);
                }catch(err) {
                    console.log('Error : ', err)
                }
              }}
            >
              Reset Password
            </Button>
          </Card>
        </div>
      ) : (
        <>
          <div
            style={{
              paddingTop: 150,
              marginBottom: '10px',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h6">Welcome Back!! Sign in Below</Typography>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Card
              variant='outlined'
              style={{
                padding: '10px',
                width: '400px',
              }}
            >
              <div
                style={{
                  marginBottom: '10px',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <ToggleButtonGroup
                  color="primary"
                  exclusive
                  value={alignment}
                  aria-label="Platform"
                  onChange={handleChange}
                >
                  <ToggleButton value="USER">USER</ToggleButton>
                  <ToggleButton value="ADMIN">ADMIN</ToggleButton>
                </ToggleButtonGroup>
              </div>
              <TextField
                label="Email"
                variant="outlined"
                style={{
                  width: '100%',
                  marginBottom: '10px',
                }}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <TextField
                type="password"
                label="Password"
                variant="outlined"
                style={{
                  width: '100%',
                  marginBottom: '10px',
                }}
                onChange={(p) => {
                  setPassword(p.target.value);
                }}
              />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Button
                  size='large'
                  variant='contained'
                  onClick={() => signIn({ alignment, email, password }, navigate)}
                >
                  Sign In
                </Button>
                <Typography
                  variant="body1"
                  style={{
                    marginTop: '10px',
                    color: 'blue',
                    cursor: 'pointer',
                  }}
                  onClick={resetPass}
                >
                  Forgot Password?
                </Typography>
              </div>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
