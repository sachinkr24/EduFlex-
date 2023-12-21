import express from 'express'



const app = express();
app.use(express.json());


// app.post('/users/signup', async (req, res) => {
//     const { username, password } = req.body;
//     const user = await User.findOne({ username });
//     if (user) {
//       res.status(403).json({ message: 'User already exists' });
//     } else {
//       const newUser = new User({ username, password });
//       await newUser.save();
//       const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
//       res.json({ message: 'User created successfully', token });
//     }
//   });
  
//   app.post('/users/login', async (req, res) => {
//     const { username, password } = req.headers;
//     const user = await User.findOne({ username, password });
//     if (user) {
//       const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
//       res.json({ message: 'Logged in successfully', token });
//     } else {
//       res.status(403).json({ message: 'Invalid username or password' });
//     }
//   });
  
//   app.get('/users/courses', authenticateJwt, async (req, res) => {
//     const courses = await Course.find({published: true});
//     res.json({ courses });
//   });
  
//   app.post('/users/courses/:courseId', authenticateJwt, async (req, res) => {
//     const course = await Course.findById(req.params.courseId);
//     console.log(course);
//     if (course) {
//       const user = await User.findOne({ username: req.user.username });
//       if (user) {
//         user.purchasedCourses.push(course);
//         await user.save();
//         res.json({ message: 'Course purchased successfully' });
//       } else {
//         res.status(403).json({ message: 'User not found' });
//       }
//     } else {
//       res.status(404).json({ message: 'Course not found' });
//     }
//   });
  
//   app.get('/users/purchasedCourses', authenticateJwt, async (req, res) => {
//     const user = await User.findOne({ username: req.user.username }).populate('purchasedCourses');
//     if (user) {
//       res.json({ purchasedCourses: user.purchasedCourses || [] });
//     } else {
//       res.status(403).json({ message: 'User not found' });
//     }
//   });