import express from 'express'
import Users from '../Models/UserModel.js'
import Course from '../Models/CourseModel.js'
import createUserToken from '../Authentication/jwtGenerator.js'
import jwt from 'jsonwebtoken'
import orderModel from '../Models/orderModel.js'
import braintree from "braintree";
import Video from '../Models/Video.js'


//payment gateway
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "9yqq52jzsy7pxf6s",
  publicKey: "s7qshvdtnbgpgbq5",
  privateKey: "f0274771291a0b023ec6460594af142a",
});


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
      const token = jwt.sign(userJSON, process.env.SECRET_KEY, {expiresIn : '24h'});
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
      const token = jwt.sign(userJSON, process.env.SECRET_KEY, {expiresIn : '24h'});
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

  export const courseWithId = async (req, res) => {
    const user = await Users.findOne({ email: req.user.email });
    if(user){
      const course = await Course.findById(req.params.courseId);
      if (course) {
        res.json({
          title: course.title,
          description: course.description,
          price: course.price,
          image: course.imgLink,
          rating: course.rating,
          ratingCount: course.ratingCount,
          _id : course._id
        });
      } else {
        console.log('Course not found');
        res.status(404).json({ message: 'Course not found' });
      }
    }
    else {
      res.status(403).json({ message: 'User not found' });
    }
  }


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

export const courseVideos = async (req, res) => {
  const course = await Course.findById(req.params.courseId).populate('videos');
  if(course){
    res.json(course.videos);
  }
  else {
    console.log('Course not found');
    res.status(404).json({message : 'Course not found'});
  }

}

export const purschasedFreeCourse = async (req, res) => {
  const course = await Course.findById(req.params.courseId);
  if(course){
    const user = await Users.findOne({ email: req.user.email });
    if (user) {
      user.purchasedCourses.push(course._id);
      await user.save();
      res.json({ message: 'Course purchased successfully' });
    } else {
      res.status(403).json({ message: 'User not found' });
    }
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
}


//payment gateway api
//token
export const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

//payment
export const brainTreePaymentController = async (req, res) => {
  try {
    const data = req.user;
    const { nonce, cart } = req.body;
    let total = cart.price;
    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      async function (error, result) {
        if (result) {
          console.log("payment result", result);
          const user = await Users.findOne({ email: data.email });
          if(user && result.success){
            user.purchasedCourses.push(cart);
            await user.save();
          }
          else {
            res.status(403).json({ message: 'User not found' });
          }
          const order = new orderModel({
            products: cart,
            payment: result,
            buyer: req.user._id,
            status: "deliverd",
          }).save();
          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};




  





