import express from 'express'
import Admin from '../Models/AdminModel.js'
import Course from '../Models/CourseModel.js'
import createAdminToken from '../Authentication/jwtGenerator.js'


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
        const token = createAdminToken(newAdmin);
        res.json({ message: 'Admin created successfully', token });
      }
  
    }
    Admin.findOne({ username }).then(callback);
  };
  
export const login = async (req, res) => {
    const { username, password } = req.headers;
    const admin = await Admin.findOne({ username, password });
    if (admin) {
      const token = createAdminToken(admin);
      res.json({ message: 'Logged in successfully', token });
    } else {
      res.status(403).json({ message: 'Invalid username or password' });
    }
  };
  
  export const addCourse = async (req, res) => {
    const admin = req.admin;
    const course = new Course(req.body);
    await course.save();
    const newCourse = new admin.myCourses(req.body);
    await newCourse.save();
    res.json({ message: 'Course created successfully', courseId: newCourse.id });
  };
  
  export const editCourse = async (req, res) => {
    const admin = req.admin;
    const course = await admin.myCourses.findByIdAndUpdate(req.params.courseId, req.body, { new: true });
    if (course) {
      res.json({ message: 'Course updated successfully' });
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  };
  
  export const adminCourses = async (req, res) => {
    const admin = req.admin;
    const courses = await admin.myCourses.find({});
    res.json({ courses });
  };