import mongoose from 'mongoose';
import dotenv from 'dotenv'
import path from 'path';
import {dirname} from 'path';
import { fileURLToPath } from 'url';


const __dirname = fileURLToPath(import.meta.url);
const dirName = dirname(__dirname);
dotenv.config({path : path.join(dirName + './../.env')});

const DB_URI = process.env.MONGO_DB;

const connectDB = () => {
    
    mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        console.log("database connected");
    }).catch((err) => {
        console.log(err);
    })
}

export default connectDB
