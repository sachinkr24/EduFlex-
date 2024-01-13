import express from 'express'
import Users from '../Models/UserModel.js'
import Course from '../Models/CourseModel.js'
import createUserToken from '../Authentication/jwtGenerator.js'
import jwt from 'jsonwebtoken'


const app = express();
app.use(express.json());


export const signUp = async (req, res) => {
    const { username, email, password } = req.body;
    const user = await Users.findOne({ email }); 
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
    const { email, password } = req.body;
    const user = await Users.findOne({ email, password });
    if (user) {
      const userJSON = {
        username : user.username,
        email : email,
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
    const formattedCourses = courses.map((course) => {
      return {
        title: course.title,
        description: course.description,
        price: course.price,
        image: course.imgLink,
        // category: course.category,
        rating: course.rating,
        ratingCount: course.ratingCount,
        _id : course._id,
      }
    })
    res.json({formattedCourses});
  };
  
export const purchaseCourse = async (req, res) => {
    const course = await Course.findById(req.params.courseId);
    if (course) {
      const user = await Users.findOne({ email: req.user.email });
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
    const user = await Users.findOne({ email: req.user.email }).populate('purchasedCourses');
    if (user) {
      const courses = await Promise.all(user.purchasedCourses.map(async (course) => {
        const purchasedCourse = await Course.findById(course);
        if(purchasedCourse){
          return {
            title: purchasedCourse.title,
            description: purchasedCourse.description,
            price: purchasedCourse.price,
            image: purchasedCourse.imgLink,
            // category: purchasedCourse.category,
            rating: purchasedCourse.rating,
            ratingCount: purchasedCourse.ratingCount,
            _id : purchasedCourse._id,
          }
        }
      }
      ));
      res.json({ courses });
    } else {
      res.status(403).json({ message: 'User not found' });
    }
  };


export const updateRating = async (req, res) => {
  const course = await Course.findById(req.params.courseId);
  if(course) {
    let rating = course.rating;
    let ratingCount = course.ratingCount + 1;
    rating = (rating + req.body.rating)/ratingCount;
    await course.updateOne({rating: rating, ratingCount: ratingCount});
    res.json({message: 'Rating updated successfully'});
  }else {
    res.status(402).json({message: 'Course not found'});
  }
}

export const freeCourses = async (req, res) => {
  const courses = await Course.find({published: true, price: 0});
  const formattedCourses = courses.map((course) => {
    return {
      title: course.title,
      description: course.description,
      price: course.price,
      image: course.imgLink,
      // category: course.category,
      rating: course.rating,
      ratingCount: course.ratingCount,
      _id : course._id,
    }
  })
  res.json({formattedCourses});
};

export const me = async (req, res) => {
  if(req.user.role === 'USER'){
    return res.json({role : 'USER'});
  }
  else {
    return res.status(403).json({message : 'User is not logged in'});
  }
}





