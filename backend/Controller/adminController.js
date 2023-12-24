import express from 'express'
import Admin from '../Models/AdminModel.js'
import Course from '../Models/CourseModel.js'
import createAdminToken from '../Authentication/jwtGenerator.js'
import jwt from 'jsonwebtoken'


const app = express();
app.use(express.json());

export const signUp = (req, res) => {
    const { username, email, password } = req.body;
    function callback(admin) {
      if (admin) {
        res.status(403).json({ message: 'Admin already exists' });
      } else {
        const obj = { username: username, password: password, email };
        const newAdmin = new Admin(obj);
        newAdmin.save();
        const adminJSON = {
          username : username,
          email : email,
          role : "ADMIN",
        }
        const token = jwt.sign(adminJSON, process.env.SECRET_KEY, {expiresIn : '1h'});
        res.json({ message: 'Admin created successfully', token });
      }
  
    }
    Admin.findOne({ username }).then(callback);
  };
  
export const login = async (req, res) => {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username, password });
    if (admin) {
      const adminJSON = {
        username : username,
        email : admin.email,
        role : "ADMIN",
      }
      const token = jwt.sign(adminJSON, process.env.SECRET_KEY, {expiresIn : '1h'});
      res.json({ message: 'Logged in successfully', token });
    } else {
      res.status(403).json({ message: 'Invalid username or password' });
    }
  };
  
export const addCourse = async (req, res) => {
  const admin = await Admin.findOne({ username: req.admin.username });
  if(admin){
    const course = new Course(req.body);
    await course.save();
    admin.myCourses.push(course);
    await admin.save();
    res.json({ message: 'Course created successfully', courseId: course.id });
  }else {
    res.status(403).json({ message: 'Admin not found' });
  }
  
};

export const editCourse = async (req, res) => {
  const admin = await Admin.findOne({ username: req.admin.username });
  if(admin){
    const course = await admin.myCourses.findByIdAndUpdate(req.params.courseId, req.body, { new: true });
    if (course) {
      res.json({ message: 'Course updated successfully' });
    } 
    else {
      res.status(404).json({ message: 'Course not found' });
    }
  }
  else {
    res.status(403).json({ message: 'Admin not found' });
  }
};

export const adminCourses = async (req, res) => {
  const admin = await Admin.findOne({ username: req.admin.username });
  if(admin){
    const coursesIds = admin.myCourses;
    const courses = [];
    for(var i = 0; i < coursesIds.length; i++){
      const course = await Course.findById(coursesIds[i]);
      courses.push(course);
    }
    res.json({ courses });
  }
  else {
    res.status(403).json({ message: 'Admin not found' });
  }
};