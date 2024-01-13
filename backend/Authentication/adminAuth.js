
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config({path : 'D:/Coursella/backend/.env'});


export const authenticateAdminJWT = (req, res, next) => {
    const authHead = req.headers.authorization;
    if(authHead){
        const token = authHead.split(' ')[1];
        jwt.verify(token, process.env.SECRET_KEY, (err, admin) => {
            if(err) {
                return;
            }
            req.admin = admin;
            next();
        })
    } else {
        res.status(401);
    }

}