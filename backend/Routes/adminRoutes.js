import express from "express";
import {signUp, login, addCourse, editCourse, adminCourses, me, courseWithId, uploadFile, deleteFile, getVideos, resetPassword} from '../Controller/adminController.js';
import {authenticateAdminJWT} from '../Authentication/adminAuth.js';
const app = express();
const adminRouter = express.Router();
import multer from 'multer';

const upload = multer({ storage : multer.memoryStorage() });


adminRouter.post('/signup', signUp);
adminRouter.post('/courses', authenticateAdminJWT, addCourse);
adminRouter.post('/login', login);
adminRouter.get('/courses', authenticateAdminJWT, adminCourses);
adminRouter.put('/courses/:courseId', authenticateAdminJWT, editCourse);
adminRouter.get('/me', authenticateAdminJWT, me);
adminRouter.get('/courses/:courseId', authenticateAdminJWT, courseWithId);
adminRouter.post('/upload/video/:courseId', authenticateAdminJWT, upload.single('file'), uploadFile);
adminRouter.delete('/delete/video/:courseId/:videoId', authenticateAdminJWT, deleteFile); 
adminRouter.get('/videos/:courseId', authenticateAdminJWT, getVideos);
adminRouter.put('/resetPassword', resetPassword);

export default adminRouter;