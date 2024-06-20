import Logo from './logo.jsx';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Link, useNavigate } from 'react-router-dom';



function Appbar() {
    const navigate = useNavigate();

    const handleSignupClick = () => {
        navigate('/signup');
    };

    const handleSigninClick = () => {
        navigate('/signin');
    };

    return (
        
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '80px',
        background: 'linear-gradient(45deg, #000080, 30%, #ffffff 90%)',
        boxShadow: '0px 6px 10px rgba(0, 0, 0, 0.1)',
        width: '100vw', 
        position: 'relative',
        left: '50%',
        transform: 'translateX(-50%)', 
    }}>
      

  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100px', 
      height: '38px',
      margin: '20px',
    }}
  >
    <Logo />
    <div>  <h1 style={{ color: "#fff", margin: "0px 15px" }}>EduFlex</h1></div>
  </div>
  <div
    style={{
      padding: '1px',
      margin: '20px',
    }}
  >
    <ButtonGroup style={{ color: '#000080' }} variant="text" aria-label="text button group">
      <Button   style={{  color: '#000080',borderColor: "#000080",  marginRight:"5px"  }}  variant="outlined" component={Link} to="/signup" onClick={handleSignupClick}>
        SIGNUP
      </Button>
      <Button style={{ color: '#000080',borderColor: "#000080" }}  variant="outlined" component={Link} to="/signin" onClick={handleSigninClick}>
        SIGNIN
      </Button>
      
    </ButtonGroup>
  </div>
</div>

    );
}

export default Appbar;