import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Appbar from './Appbar.jsx';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { signIn } from '../Logics/Signin.js';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

export default function Signup() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alignment, setAlignment] = useState('USER');
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setAlignment(e.target.value);
    };

    const navigate = useNavigate();

    // Define the Zod schema here
    const authSchema = z.object({
        email: z.string().email({ message: "Invalid email address" }),
        password: z.string().min(5, { message: "Password must be at least 6 characters long" }),
        alignment: z.enum(['USER', 'ADMIN'], { message: "Invalid alignment" }),
    });

    const handleSubmit = () => {
        const result = authSchema.safeParse({ email, password, alignment });

        if (!result.success) {
            const fieldErrors = result.error.errors.reduce(
                (acc, curr) => ({ ...acc, [curr.path[0]]: curr.message }),
                {}
            );
            setErrors(fieldErrors);
        } else {
            setErrors({});
            signIn({
                alignment,
                email,
                password
            }, navigate);
        }
    };

    return <div>
        <Appbar />
        <div style={{
            paddingTop: 150,
            marginBottom: '10',
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
                <Button
                    size={'large'}
                    variant='contained'
                    onClick={handleSubmit}
                >
                    signin
                </Button>
            </Card>
        </div>
    </div>
}
