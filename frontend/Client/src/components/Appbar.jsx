import logo from '../images/logo1.png'




function Appbar(){
    return <div>
        <img src={logo} alt="Coursella" style={{
            width: '90px',
            height: '90px',
        }}  />
    </div>
}

export default Appbar;