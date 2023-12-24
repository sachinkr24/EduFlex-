import express from 'express'
import Users from '../Models/UserModel.js'
import Course from '../Models/CourseModel.js'
import createUserToken from '../Authentication/jwtGenerator.js'
import jwt from 'jsonwebtoken'


const app = express();
app.use(express.json());


export const signUp = async (req, res) => {
    const { username, email, password } = req.body;
    const user = await Users.findOne({ username }); 
    if (user) {
      res.status(403).json({ message: 'User already exists' });
    } else {
      const newUser = new Users({ username, email, password });
      await newUser.save();
      const userJSON = {
        username : username,
        email : email,
        role : "USER",
      }
      const token = jwt.sign(userJSON, process.env.SECRET_KEY, {expiresIn : '1h'});
      res.json({ message: 'User created successfully', token });
    }
  };
  
export const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await Users.findOne({ username, password });
    if (user) {
      const userJSON = {
        username : user.username,
        email : user.email,
        role : "USER",
      }
      const token = jwt.sign(userJSON, process.env.SECRET_KEY, {expiresIn : '1h'});
      res.json({ message: 'Logged in successfully', token });
    } else {
      res.status(403).json({ message: 'Invalid username or password' });
    }
  };
  
export const considerableCourses = async (req, res) => {
    const courses = await Course.find({published: true});
    res.json({ courses });
  };
  
export const purchaseCourse = async (req, res) => {
    const course = await Course.findById(req.params.courseId);
    if (course) {
      const user = await Users.findOne({ username: req.user.username });
      if (user) {
        user.purchasedCourses.push(course);
        await user.save();
        res.json({ message: 'Course purchased successfully' });
      } else {
        res.status(403).json({ message: 'User not found' });
      }
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  };
  
export const allBuyings = async (req, res) => {
    const user = await Users.findOne({ username: req.user.username }).populate('purchasedCourses');
    if (user) {
      const courses = await Promise.all(user.purchasedCourses.map(async (course) => {
        const purchasedCourse = await Course.findById(course);
        if(purchasedCourse){
          return purchasedCourse;
        }
      }
      ));
      res.json({ courses });
    } else {
      res.status(403).json({ message: 'User not found' });
    }
  };
