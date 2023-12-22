import express from 'express'
import jwt from 'jsonwebtoken'

const app = express();


export const authenticateJWT = (req, res, next) => {
    const authHead = req.headers.authorization;
    if(authHead){
        const token = authHead.split(' ')[1];
        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if(err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        })
    } else {
        res.status(401);
    }

}
export default authenticateJWT;