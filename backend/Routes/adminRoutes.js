import express from "express";
import {signUp, login, addCourse, editCourse, adminCourses, me, courseWithId, uploadFile, deleteFile} from '../Controller/adminController.js';
import {authenticateAdminJWT} from '../Authentication/adminAuth.js';
// import multer from 'multer';

// const upload = multer();
const app = express();
const adminRouter = express.Router();


adminRouter.post('/signup', signUp);
adminRouter.post('/courses', authenticateAdminJWT, addCourse);
adminRouter.post('/login', login);
adminRouter.get('/courses', authenticateAdminJWT, adminCourses);
adminRouter.put('/courses/:courseId', authenticateAdminJWT, editCourse);
adminRouter.get('/me', authenticateAdminJWT, me);
adminRouter.get('/courses/:courseId', authenticateAdminJWT, courseWithId);
adminRouter.post('/upload/video/:courseId', authenticateAdminJWT, uploadFile);
adminRouter.delete('/delete/video/:courseId', authenticateAdminJWT, deleteFile); 

export default adminRouter;