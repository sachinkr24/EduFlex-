import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db/database.js'
import userRoutes from './Routes/userRoutes.js'


const app = express();
app.use(cors());
dotenv.config({path : "backend/.env"});

connectDB();

app.get('/users', userRoutes);
app.get('/', (req, res) => {
    res.send('Server is working fine');
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('server started successfully');
})