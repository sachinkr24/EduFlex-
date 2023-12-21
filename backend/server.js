import express from 'express'
import dotenv from 'dotenv'
// import {connectDB} from './db/database.js'


const app = express();
dotenv.config({path : "backend/.env"});

// connectDB();


app.get('/', (req, res) => {
    res.send('Server is working fine');
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('server started successfully');
})