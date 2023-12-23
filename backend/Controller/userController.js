import express from 'express'
import Users from '../Models/UserModel.js'
import Course from '../Models/CourseModel.js'
import createUserToken from '../Authentication/jwtGenerator.js'


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
      const token = createUserToken(newUser);
      res.json({ message: 'User created successfully', token });
    }
  };
  
export const login = async (req, res) => {
    const { username, password } = req.headers;
    const user = await Users.findOne({ username, password });
    if (user) {
      const token = createUserToken(user);
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
    console.log(course);
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
      res.json({ purchasedCourses: user.purchasedCourses || [] });
    } else {
      res.status(403).json({ message: 'User not found' });
    }
  };
