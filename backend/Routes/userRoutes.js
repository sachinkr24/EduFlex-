// Desc: user routes
import express from "express";
import {signUp, login, considerableCourses, purchaseCourse, allBuyings, updateRating, freeCourses, braintreeTokenController, brainTreePaymentController, courseWithId} from '../Controller/userController.js'
import authenticateUserJWT from '../Authentication/userAuth.js'
import { me } from "../Controller/adminController.js";

const app = express();

const userRouter = express.Router();

userRouter.post('/signup', signUp);
userRouter.post('/login', login);
userRouter.get('/courses', authenticateUserJWT, considerableCourses);
userRouter.post('/courses/:courseId', authenticateUserJWT, purchaseCourse);
userRouter.get('/purchasedCourses', authenticateUserJWT, allBuyings);
userRouter.post('/updateRating', authenticateUserJWT, updateRating);
userRouter.get('/me', authenticateUserJWT, me);
userRouter.get('/freecourses', authenticateUserJWT, freeCourses)
userRouter.get("/braintree/token", braintreeTokenController);
userRouter.get("/courses/:courseId", authenticateUserJWT, courseWithId)
//payments
userRouter.post("/braintree/payment", authenticateUserJWT,brainTreePaymentController);

export default userRouter;