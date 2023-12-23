import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db/database.js'
import userRoutes from './Routes/userRoutes.js'
import adminRoutes from './Routes/adminRoutes.js'
import cors from 'cors'


const app = express();
app.use(cors());
app.use(express.json());


dotenv.config('./.env');

connectDB();

app.use('/users', userRoutes);
app.use('/admin', adminRoutes);
app.get('/', (req, res) => {
    res.send('Server is working fine');
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('server started successfully');
})