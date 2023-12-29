import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Appbar from './Appbar.jsx';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import {signIn} from '../Logics/Signin.js';
import {useNavigate} from 'react-router-dom';


export default function Signup() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alignment, setAlignment] = useState('USER');

    const handleChange = (e) => {
        setAlignment(e.target.value);
    };

    const navigate = useNavigate();

    return <div>
        <Appbar></Appbar>
        <div style={{
                paddingTop : 150,
                marginBottom : '10', 
                display: 'flex',
                justifyContent: 'center',
            }}>
                <Typography variant="h6">
                    Welcome Back !! Signin Below
                </Typography>
        </div>
        <div style={{
            display: 'flex',
            justifyContent: 'center',
        }}>
            <Card variant='outlined' style={{
                padding : '10px',
                width : '400px',
            }}>
                <div style={{
                    marginBottom : '10px',
                    display: 'flex',
                    justifyContent: 'center',
                }}>
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
                <TextField label="Email" variant="outlined" style={{
                    width : "100%",
                    marginBottom : '10px',
                }} onChange={(e) => {
                    setEmail(e.target.value);
                }} />
                <TextField type='password' label="Password" variant="outlined" style={{
                    width : "100%",
                    marginBottom : '10px',
                }} onChange={(p) => {
                    setPassword(p.target.value);
                }} />
                <Button size={'large'} variant='contained' onClick={() => signIn({
                    alignment,
                    email,
                    password
                }, navigate)}>signin</Button>
            </Card>
        </div>
    </div>
}