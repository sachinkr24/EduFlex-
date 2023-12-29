
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config('../.env');


export const authenticateUserJWT = (req, res, next) => {
    const authHead = req.headers.Authorization;
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
export default authenticateUserJWT;