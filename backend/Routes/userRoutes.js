

import express from "express";
import {signUp, login, considerableCourses, purchaseCourse, allBuyings} from '../Controller/userController.js'
import authenticateUserJWT from '../Authentication/userAuth.js'

const app = express();

const userRouter = express.Router();

userRouter.post('/signup', signUp);
userRouter.post('/login', login);
userRouter.get('/courses', authenticateUserJWT, considerableCourses);
userRouter.post('/courses/:courseId', authenticateUserJWT, purchaseCourse);
userRouter.get('/purchasedCourses', authenticateUserJWT, allBuyings);

export default userRouter;