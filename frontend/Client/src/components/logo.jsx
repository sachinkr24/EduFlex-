
import SkillSyncLogo from '../images/EduFlex.png';
import { useNavigate } from 'react-router-dom';


function Logo(){
    const navigate = useNavigate();
    return <div>
       <img src={SkillSyncLogo} style={{ boxShadow: '0px 2px 8px rgba(0,0,0,0.32)', height : '50px', }} onClick={
            () => {
                navigate('/');
            }
       }/> 
    </div>
}

export default Logo;