import TUTORING from '../images/TUTORING.webp';
import { useNavigate } from 'react-router-dom';
import Appbar from './Appbar.jsx';
import {AppBar, Typography} from "@mui/material";
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import {Grid } from '@mui/material';
import { ClassNames } from '@emotion/react';
import Navbar from './navbar.jsx';


export default function Homepage() {
    const navigate = useNavigate();
  
    return (
      <Grid container style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #DAAE5F, #9E7C4F)' }}>
        <Grid item xs={12}>
          <Navbar />
        </Grid>
        <Grid item xs={12} style={{ paddingTop: 40 }}>
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(10px)',
        borderRadius: '10px',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '50px',
    }}>
        <Typography variant='h1' align='center' style={{ color: '#ffffff', fontWeight: 'bold', fontSize: 48 }}>EduFlex</Typography>
        <Typography variant='h6' align='center' style={{ color: '#ffffff', fontSize: 20, marginTop: 20 }}>Learn In-Demand Skills With Interactive Courses Made By Career Experts</Typography>
        <Typography variant='subtitle1' align='center' style={{ color: '#ffffff', fontSize: 12, marginTop: 20, maxWidth: 800 }}>We believe everyone should have access to professional skills anywhere, anytime. SkillSync is a place where people develop their creative potential!</Typography>
    </div>
</Grid>
        <Grid container item xs={12} style={{ background: '#DAAE5F', padding: 40 }}>
          <Grid item xs={12} md={6}>
            <img src={TUTORING} alt="Tutoring" style={{ width: '100%', height: 'auto', borderRadius: 8 }} />
          </Grid>
          <Grid item xs={12} md={6} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
            <Typography variant='h4' style={{ color: '#9E7C4F', marginBottom: 20 }}>Become a Tutor at SkillSync</Typography>
            <Typography variant='subtitle1' style={{ color: '#000000', marginBottom: 20 }}>Join our platform and share your expertise with others</Typography>
            <Button variant="contained" color="primary" onClick={() => navigate('/signup')} style={{ borderRadius: 20 }}>Sign Up</Button>
          </Grid>
        </Grid>
      </Grid>
    );
  }