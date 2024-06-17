import express from "express";
import {signUp, login, addCourse, editCourse, adminCourses, me, 
    courseWithId, uploadFile, deleteFile, getVideos, resetPassword,
    getComments,
    getFeedbacks, deleteComment, addComment, addReply, deleteReply} from '../Controller/adminController.js';
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
adminRouter.get('/comments/:courseId', authenticateAdminJWT, getComments);
adminRouter.delete('/comments/:courseId/:commentId', authenticateAdminJWT, deleteComment);
adminRouter.post('/comments/:courseId', authenticateAdminJWT, addComment);
adminRouter.get('/feedbacks/:courseId', authenticateAdminJWT, getFeedbacks);
adminRouter.post('/comments/replies/:courseId/:commentId', authenticateAdminJWT, addReply);
adminRouter.delete('/comments/replies/:courseId/:commentId/:replyId', authenticateAdminJWT, deleteReply);

export default adminRouter;