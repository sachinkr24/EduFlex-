
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'


dotenv.config({path: 'D:/Coursella/backend/.env'})

const createUserToken = (data) => {
    data.role = 'USER';
    return jwt.sign(data, process.env.SECRET_KEY, {expiresIN : '1h'});
}

const createAdminToken = (data) => {
    data.role = 'ADMIN';
    return jwt.sign(data, process.env.SECRET_KEY, {expiresIN : '1h'});
}

export default {createUserToken, createAdminToken}

