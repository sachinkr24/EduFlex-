import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/Signup.jsx'
import Signin from './components/Signin.jsx'
import Addcourse from './components/AddCourse.jsx'
import Homepage from './components/Homepage.jsx';
import Userpage from './components/Userpage.jsx';
import Adminpage from './components/Adminpage.jsx';
import { useEffect, useState } from 'react';
import { whoIsLogged } from './Logics/whoIsLogged.js';



function App() {

  // const [role, setRole] = useState(0); // ['admin' - 1, 'user' - 2]

  // useEffect(async () => {
  //   const isAdmin = await whoIsLogged("admin");
  //   const isUser = await whoIsLogged("users");
    
  //   if (isAdmin === 1) {
  //     setRole(1);
  //   } else if (isUser === 1) {
  //     setRole(2);
  //   }
  // }, [])
  // if(role === 1) {
  //   return (
  //     <div>
  //       <Router>
  //         navigate('/admin');
  //       </Router>
  //     </div>
  //   )
  // }
  // else if (role === 2) {
  //   return (
  //     <div>
  //       <Router>
  //         navigate('/users');
  //       </Router>
  //     </div>
  //   )
  // }

  return (
    <div style={{
      backgroundColor: '#f5f5f5',
    }}>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/users" element={<Userpage />} />
          <Route path='/admin' element={<Adminpage />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/signin' element={<Signin />}></Route>
          <Route path='/admin/addcourse' element={<Addcourse />}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
