import express from "express";
import {signUp, login, addCourse, editCourse, adminCourses, logOut, me, courseWithId} from '../Controller/adminController.js'
import authenticateAdminJWT from '../Authentication/adminAuth.js'

const app = express();
const adminRouter = express.Router();



adminRouter.post('/signup', signUp);
adminRouter.post('/courses', authenticateAdminJWT, addCourse);
adminRouter.post('/login', login);
adminRouter.get('/courses', authenticateAdminJWT, adminCourses);
adminRouter.put('/courses/:courseId', authenticateAdminJWT, editCourse);
adminRouter.put('/logout', authenticateAdminJWT, logOut);
adminRouter.get('/me', authenticateAdminJWT, me)
adminRouter.get('/courses/:courseId', authenticateAdminJWT, courseWithId);

export default adminRouter;