import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Appbar from './Appbar.jsx';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { signUp } from '../Logics/Signup.js';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import Banner from './banner.jsx';

export default function Signup() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [alignment, setAlignment] = useState('USER');
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setAlignment(e.target.value);
    };

    const navigate = useNavigate();

    // Define the Zod schema here
    const authSchema = z.object({
        username: z.string().min(1, { message: "Username is required" }),
        email: z.string().email({ message: "Invalid email address" }),
        password: z.string().min(5, { message: "Password must be at least 6 characters long" }),
        alignment: z.enum(['USER', 'ADMIN'], { message: "Invalid alignment" }),
    });

    const handleSubmit = () => {
        const result = authSchema.safeParse({ username, email, password, alignment });

        if (!result.success) {
            const fieldErrors = result.error.errors.reduce(
                (acc, curr) => ({ ...acc, [curr.path[0]]: curr.message }),
                {}
            );
            setErrors(fieldErrors);
        } else {
            setErrors({});
            signUp({
                alignment,
                email,
                password,
                username
            }, navigate);
        }
    };

    return <div>
        <Appbar />
       <Banner/>
        <div style={{
            paddingTop: 150,
            marginBottom: '10',
            display: 'flex',
            justifyContent: 'center',
        }}>
            <Typography variant="h6">
            <Typography variant="h5" sx={{ color: '#ffffff' }}>
            Welcome to EduFlex !! Signup Below
</Typography>
                
            </Typography>
        </div>
        <div style={{
            display: 'flex',
            justifyContent: 'center',
        }}>
            <Card variant='outlined' style={{
                padding: '10px',
                width: '400px',
            }}>
                <div style={{
                    marginBottom: '10px',
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
                <TextField
                    label="Username"
                    variant="outlined"
                    style={{
                        width: "100%",
                        marginBottom: '10px',
                    }}
                    onChange={(e) => setUsername(e.target.value)}
                    error={Boolean(errors.username)}
                    helperText={errors.username}
                />
                <TextField
                    label="Email"
                    variant="outlined"
                    style={{
                        width: "100%",
                        marginBottom: '10px',
                    }}
                    onChange={(e) => setEmail(e.target.value)}
                    error={Boolean(errors.email)}
                    helperText={errors.email}
                />
                <TextField
                    type='password'
                    label="Password"
                    variant="outlined"
                    style={{
                        width: "100%",
                        marginBottom: '10px',
                    }}
                    onChange={(e) => setPassword(e.target.value)}
                    error={Boolean(errors.password)}
                    helperText={errors.password}
                />
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}>
                    <Button size={'large'} variant='contained' onClick={handleSubmit}>signup</Button>
                    <Typography style={{ justifyContent: 'center', cursor: 'pointer', color: '#1976d2' }} variant='caption' onClick={() => {
                        navigate('/signin');
                    }}>Already have a account?</Typography>
                </div>
            </Card>
        </div>
    </div>
}
