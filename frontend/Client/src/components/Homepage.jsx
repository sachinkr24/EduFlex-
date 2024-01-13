import Appbar from './Appbar.jsx';
import {Typography} from "@mui/material";
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';


export default function Homepage() {
    return <div style={{
        background: 'linear-gradient(#0575e6, #021b79)',
        height: '100vh',
    }}>
        <div>
            <Appbar />
        </div>
        <div>
            <Paper variant="outlined" square = {false} style={{
                textAlign: 'center',
                marginTop: '10px',
                background: 'linear-gradient(45deg, #ffffff 30%, #1565c0 90%)',
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
        <div>

        </div>
    </div>
}