import express from "express";
import {signUp, login, considerableCourses, purchaseCourse, allBuyings} from '../Controller/userController.js'
import authenticateJWT from '../Authentication/userAuth.js'

const app = express();
app.use(express.json());

app.post('/signup', signUp);
app.post('/login', login);
app.get('/courses', authenticateJWT, considerableCourses);
app.post('/courses/:courseId', authenticateJWT, purchaseCourse);
app.get('/purchasedCourses', authenticateJWT, allBuyings);