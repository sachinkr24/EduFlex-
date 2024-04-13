
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import path from 'path';
import {dirname} from 'path';
import { fileURLToPath } from 'url';


const __dirname = fileURLToPath(import.meta.url);
const dirName = dirname(__dirname);
dotenv.config({path : path.join(dirName + './../.env')});


export const authenticateAdminJWT = (req, res, next) => {
    const authHead = req.headers.authorization;
    if(authHead){
        const token = authHead.split(' ')[1];
        jwt.verify(token, process.env.SECRET_KEY, (err, admin) => {
            if(err) {
                return;
            }
            req.admin = admin;
            if(admin.role === 'ADMIN')
                next();
        })
    } else {
        res.status(401);
    }

}