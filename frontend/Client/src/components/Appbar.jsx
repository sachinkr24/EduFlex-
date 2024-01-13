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
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                height: '80px',
                background: 'linear-gradient(45deg, #2980b9 30%, #ffffff 90%)',
            }}
        >
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
                <Logo></Logo>
            </div>
            <div
                style={{
                    padding: '1px',
                    margin: '20px',
                }}
            >
                <ButtonGroup variant="text" aria-label="text button group">
                    <Button component={Link} to="/signup" onClick={handleSignupClick}>
                        SIGNUP
                    </Button>
                    <Button component={Link} to="/signin" onClick={handleSigninClick}>
                        SIGNIN
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    );
}

export default Appbar;