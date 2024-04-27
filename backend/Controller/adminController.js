import express from 'express'
import Admin from '../Models/AdminModel.js'
import Course from '../Models/CourseModel.js'
import jwt from 'jsonwebtoken'
import { ref, uploadBytesResumable, getDownloadURL, uploadBytes } from "firebase/storage";
import storage from '../db/firebase.js';
import Video from '../Models/Video.js';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';


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
        const token = jwt.sign(adminJSON, process.env.SECRET_KEY, {expiresIn : '24h'});
        res.json({ message: 'Admin created successfully', token });
      }
  
    }
    Admin.findOne({ email }).then(callback);
  };
  
export const login = async (req, res) => {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email, password });
    if (admin) {
      const adminJSON = {
        username : admin.username,
        email : email,
        role : "ADMIN",
      }
      const token = jwt.sign(adminJSON, process.env.SECRET_KEY, {expiresIn : '24h'});
      res.json({ message: 'Logged in successfully', token });
    } else {
      res.status(403).json({ message: 'Invalid username or password' });
    }
  };
  
export const addCourse = async (req, res) => {
  const admin = await Admin.findOne({ email: req.admin.email });
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
  const admin = await Admin.findOne({ email: req.admin.email });
  if(admin){
    const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, { new: true });
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
  const admin = await Admin.findOne({ email: req.admin.email });
  if(admin){
    const coursesIds = admin.myCourses;
    const courses = [];
    for(var i = 0; i < coursesIds.length; i++){
      const course = await Course.findById(coursesIds[i]);
      courses.push({
        title: course.title,
        description: course.description,
        price: course.price,
        image: course.imgLink,
        // category: course.category,
        rating: course.rating,
        ratingCount: course.ratingCount,
        _id: course.id,
      });
    }
    res.json({ courses });
  }
  else {
    res.status(403).json({ message: 'Admin not found' });
  }
};


export const me = async (req, res) => {
  if(req.admin.role === 'ADMIN')
      res.json({role : 'ADMIN'});
  else 
      res.status(403).json({message : 'Admin is not logged in'});
}

export const courseWithId = async (req, res) => {
  const admin = await Admin.findOne({ email: req.admin.email });
  if(admin){
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
      res.status(404).json({ message: 'Course not found' });
    }
  }
  else {
    res.status(403).json({ message: 'Admin not found' });
  }
}

export const getVideos = async (req, res) => {
  const course = await Course.findById(req.params.courseId).populate("videos");
  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }
  res.json(course.videos);

}

export const uploadFile = async (req, res) => {

  const videoName = req.body.name;
  const videoFile = req.file.buffer; // Convert Buffer to Uint8Array
  const videoRef = ref(storage, `videos/${videoName}`);

  const uploadTask = uploadBytesResumable(videoRef, videoFile);

  uploadTask.on('state_changed',
  (snapshot) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    switch (snapshot.state) {
      case 'paused':
        break;
      case 'running':
        break;
    }
  }, 
  (error) => {
    switch (error.code) {
      case 'storage/unauthorized':
        break;
      case 'storage/canceled':
        break;

      // ...

      case 'storage/unknown':
        break;
    }
  }, 
  async () => {
    await getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
        const video = new Video({name: videoName, path: downloadURL});
        try {
          await video.save();
          const course = await Course.findById(req.params.courseId);
          if (!course) {
            console.log("course not found", req.params.courseId);
            return res.status(404).json({ message: "Course not found" });
          }
          course.videos.push(video);
          await course.save();
        res.status(200).json({
        message: "Video uploaded successfully",
        videoName: videoName,
        downloadURL: downloadURL,
        });            
      } catch (err) {
          res.status(500).json({ error: err.message });
        }
      });
    });
  }

export const deleteFile = async (req, res) => {
  const { courseId, videoId } = req.params;

  const course = await Course.findById(courseId);
  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }

  const videoIndex = course.videos.findIndex(
    (video) => video.toString() === videoId
  );
  if (videoIndex === -1) {
    return res.status(404).json({ message: "Video not found in course" });
  }

  course.videos.splice(videoIndex, 1);
  await course.save();

  await Video.findByIdAndDelete(videoId);

  res.json({ message: "Video deleted successfully" });
}
