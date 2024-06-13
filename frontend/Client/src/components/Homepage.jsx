import TUTORING from '../images/TUTORING.webp';
import { useNavigate } from 'react-router-dom';
import Appbar from './Appbar.jsx';
import {Typography} from "@mui/material";
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import {Grid } from '@mui/material';


export default function Homepage() {
    const navigate = useNavigate();
  
    return (
      <Grid container style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #DAAE5F, #9E7C4F)' }}>
        <Grid item xs={12}>
          <Appbar />
        </Grid>
        <Grid item xs={12} style={{ paddingTop: 40 }}>
          <Typography variant='h1' align='center' style={{ color: '#ffffff', fontWeight: 'bold', fontSize: 48 }}>SkillSync</Typography>
          <Typography variant='h6' align='center' style={{ color: '#ffffff', fontSize: 20, marginTop: 20 }}>Learn In-Demand Skills With Interactive Courses Made By Career Experts</Typography>
          <Typography variant='subtitle1' align='center' style={{ color: '#ffffff', fontSize: 16, marginTop: 20, maxWidth: 800, margin: 'auto' }}>We believe everyone should have access to professional skills anywhere, anytime. SkillSync is a place where people develop their creative potential!</Typography>
        </Grid>
        <Grid container item xs={12} style={{ background: '#DAAE5F', padding: 40 }}>
          <Grid item xs={12} md={6}>
            <img src={TUTORING} alt="Tutoring" style={{ width: '100%', height: 'auto', borderRadius: 8 }} />
          </Grid>
        </Box>
      </Box>

      {/* Testimonials */}
      <Box sx={{ py: 8, backgroundColor: '#f5f5f5', borderRadius: 2, mb: 0 }}>
        <Typography variant="h4" sx={{ mb: 4, textAlign: 'center', fontWeight: 'bold' }}>
          What Our Students Say
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 0, background: `linear-gradient(45deg, #7eff9b 30%, #ffffff 90%)` }}>
                      <Avatar src={testimonial.avatar} alt={testimonial.name} sx={{ mr: 2 }} />
                      <Typography variant="h6">{testimonial.name}</Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {testimonial.feedback}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* Footer */}
      <Box sx={{ py: 4, textAlign: 'center', background: `linear-gradient(45deg, #7eff9b 30%, #ffffff 90%)`, borderRadius: 2 }}>
        <Typography variant="body2" color="text.secondary">
          &copy; {new Date().getFullYear()} EduFlex. All rights reserved.
        </Typography>
      </Box>
    </Container>
  );
};

export default Homepage;
