import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import jwt from 'jsonwebtoken'


const app = express();
dotenv.config({path: "backend/.env"})


function createUserToken(data) {
    jwt.sign(data, process.env.SECRET_KEY, {expiresIN : '1h'});
}

function createAdminToken(data){
    jwt.sign(data, process.env.SECRET_KEY, {expiresIN : '1h'});
}

