import Appbar from './Appbar.jsx';
import {Typography} from "@mui/material";
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TUTORING from '../images/TUTORING.webp';
import { useNavigate } from 'react-router-dom';

export default function Homepage() {

    const navigate = useNavigate();

    return <div style={{
        background: 'linear-gradient(#0575e6, #021b79)',
        height: '100%',
    }}>
        <div style={{
            width: '100%',
        }}>
            <Appbar />
        </div>
        <div style={{
            width: '100%',
        }}>
            <Paper square = {false} style={{
                textAlign: 'center',
                marginTop: '10px',
                // background: 'linear-gradient(45deg, #ffffff 90%, #1565c0 30%)',
            }}>
                <Typography variant='h1' style={{
                    paddingq: '10px',
                    color: '#1565c0',
                }}> SkillSync </Typography>
                <Typography variant='h6' flexWrap={true} style={{
                    padding: '10px',
                    margin: '10px',
                }}>Learn In-Demand Skills With Interactive <br /> Courses Made By Career Experts</Typography>
                <Typography variant='subtitle2' flexWrap={true} style={{
                    padding: '10px',
                    margin: '10px',
                    color: '#2193b0',
                }}>We believe everyone should have access to professional skills anywhere,<br /> 
                anytime. SkillSync is a place where people develop their creative potetial !</Typography>
            </Paper>
        </div>
        <div style={{
            backgroundColor: '#1565c0',
            height : '300px',
            display: 'flex',

        }}>
            <div style={{
                position: 'absolute',
            }}>
                <Stack spacing={10}>
                    <Paper elevation={2}>
                        
                    </Paper>
                </Stack>
            </div>
            <div style={{
                position: 'relative',
                zIndex: 1,
            }}>

            </div>

        </div>
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            height: '400px',
            marginTop: '10px',
            background: 'linear-gradient(45deg, #1565c0 30%, #ffffff 90%)',
        }}>
            <div style={{
                width: '50%',
                height: '100%',
            }}>
                <img src={TUTORING} alt="" style={{
                    width: '100%',
                    height: 'calc(100% - 4px)',
                    margin: '2px',
                    boxSizing: 'border-box',
                }}/>
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '250px',
            }}>
                <div style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Typography variant = 'h2'>Become Tutor</Typography>
                    <Typography varinat = 'h6'>At SkillSync</Typography>
                </div>
                <div style={{
                    margin : '10px',
                }}>
                    <Button variant="contained" onClick={() => {
                        navigate('/signup');
                    }}>SignUp</Button>    
                </div>
            </div>   
        </div>
    </div>
}