
import SkillSyncLogo from '../images/SkillSyncLogo.png';
import { useNavigate } from 'react-router-dom';


function Logo(){
    const navigate = useNavigate();
    return <div>
       <img src={SkillSyncLogo} style={{ height : '80px'}} onClick={
            () => {
                navigate('/');
            }
       }/> 
    </div>
}

export default Logo;