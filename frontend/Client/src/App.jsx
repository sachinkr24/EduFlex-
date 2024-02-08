import './App.css'
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Signup from './components/Signup.jsx'
import Signin from './components/Signin.jsx'
import Addcourse from './components/AddCourse.jsx'
import Homepage from './components/Homepage.jsx';
import Userpage from './components/Userpage.jsx';
import Adminpage from './components/Adminpage.jsx';
import AllCourses from './components/AllCourses.jsx';
import { useEffect, useState } from 'react';
import { whoIsLogged } from './Logics/whoIsLogged.js';
import AdminCourses from './components/adminCourses.jsx';
import EditCourse from './components/editCourse.jsx';
import UserCourses from './components/userCourses.jsx';
import FreeCourses from './components/FreeCourses.jsx';
import UploadVid from './components/uploadVideo.jsx';
// import Ratecourse from './components/rateCourse.jsx';


function RoleBasedRedirect() {
  const [role, setRole] = useState(0); // ['admin' - 1, 'user' - 2]
  const navigate = useNavigate();

  useEffect(() => {
    const checkRole = async () => {
      const isAdmin = await whoIsLogged("admin");
      const isUser = await whoIsLogged("users");
    
      if (isAdmin === 1) {
        setRole(1);
      } else if (isUser === 1) {
        setRole(2);
      }
    };

    checkRole();
  }, []);

  useEffect(() => {
    if (role === 1) {
      navigate('/admin');
    } else if (role === 2) {
      navigate('/users');
    }
  }, [role]);
}

function App() {

  return (
    <div>
      <Router>
        <RoleBasedRedirect />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/users" element={<Userpage />} />
          <Route path='/admin' element={<Adminpage />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/signin' element={<Signin />}></Route>
          <Route path='/admin/addcourse' element={<Addcourse />}></Route>
          <Route path='/admin/courses' element={<AdminCourses></AdminCourses>}></Route>
          <Route path='/admin/courses/:courseId' element={<EditCourse />}></Route>
          <Route path='/users/courses' element={<AllCourses></AllCourses>}></Route>
          <Route path='/users/mycourses' element={<UserCourses></UserCourses>}></Route>
          <Route path='/users/freecourses' element={<FreeCourses></FreeCourses>}></Route>
          <Route path='/admin/upload/:courseId' element={<UploadVid></UploadVid>}></Route>
          {/* <Route path='/users/ratecourse/:courseId' element={Ratecourse}></Route> */}
        </Routes>
      </Router>

    </div>
  )
}

export default App
